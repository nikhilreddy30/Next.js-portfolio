"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, useReducedMotion } from "framer-motion";
import { Award, Calendar } from "lucide-react";
import { certifications } from "@/data/portfolio";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const AUTO_PLAY_INTERVAL = 3500;

const CertificationsSection = () => {
  const [index, setIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const total = certifications.length;

  // 👉 Motion values for drag
  const x = useMotionValue(0);

  // 🔥 3D tilt based on drag
  const rotateY = useTransform(x, [-200, 0, 200], [25, 0, -25]);

  // 🔥 Slight scale effect while dragging
  const scale = useTransform(x, [-200, 0, 200], [0.95, 1, 0.95]);

  // 🔁 Loop paginate
  const paginate = (dir: number) => {
    setIndex((prev) => (prev + dir + total) % total);
  };

  // 👉 Snap logic
  const handleDragEnd = (_: any, info: any) => {
    const velocity = info.velocity.x;
    const offset = info.offset.x;

    if (offset < -80 || velocity < -500) paginate(1);
    else if (offset > 80 || velocity > 500) paginate(-1);

    x.set(0); // snap back to center
  };

  // 🔄 Auto-play loop
  useEffect(() => {
    if (shouldReduceMotion) return;

    const interval = setInterval(() => {
      paginate(1);
    }, AUTO_PLAY_INTERVAL);

    return () => clearInterval(interval);
  }, [index, shouldReduceMotion]);

  return (
    <section id="certifications" className="section-padding">
      <div className="container-narrow">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            My <span className="text-gradient">Certifications</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Swipe through my certifications like a premium card deck.
          </p>
        </div>

        {/* 🔥 Perspective Wrapper */}
        <div className="relative h-[340px] flex items-center justify-center perspective-[1200px]">
          {certifications.map((cert, i) => {
            const offset = (i - index + total) % total;

            if (offset > 3) return null;

            const isActive = offset === 0;

            return (
              <motion.div
                key={cert.title}
                className="absolute w-full max-w-md"
                style={{
                  zIndex: 20 - offset,
                  filter: offset === 0 ? "none" : "blur(4px)",
                }}
                animate={{
                  x: offset * 30,
                  y: offset * 12,
                  scale: 1 - offset * 0.07,
                  opacity: 1 - offset * 0.25,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              >
                {/* 👉 Only active card is draggable */}
                <motion.div
                  drag={isActive ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.6}
                  style={{
                    x: isActive ? x : 0,
                    rotateY: isActive ? rotateY : 0,
                    scale: isActive ? scale : 1,
                  }}
                  onDragEnd={handleDragEnd}
                  className="cursor-grab active:cursor-grabbing"
                >
                  <SpotlightCard className="p-6 backdrop-blur-xl">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="h-12 w-12 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Award />
                      </div>

                      <div>
                        <h3 className="font-bold">{cert.title}</h3>
                        <span className="text-xs text-primary">
                          {cert.issuer}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4">
                      {cert.description}
                    </p>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {cert.date}
                    </div>
                  </SpotlightCard>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => paginate(-1)}
            className="px-4 py-2 rounded bg-primary text-white"
          >
            Prev
          </button>
          <button
            onClick={() => paginate(1)}
            className="px-4 py-2 rounded bg-primary text-white"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
