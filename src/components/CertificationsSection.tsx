"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { Award, Calendar, Filter } from "lucide-react";
import { certifications } from "@/data/portfolio";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const AUTO_PLAY_INTERVAL = 3500;

const ISSUERS = [
  "All",
  ...Array.from(new Set(certifications.map((c) => c.issuer))),
];

const CertificationsSection = () => {
  const [index, setIndex] = useState(0);
  const [selectedIssuer, setSelectedIssuer] = useState("All");
  const [isDragging, setIsDragging] = useState(false);

  const shouldReduceMotion = useReducedMotion();

  const progress = useMotionValue(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // 🎯 Filter
  const filtered = useMemo(() => {
    return selectedIssuer === "All"
      ? certifications
      : certifications.filter((c) => c.issuer === selectedIssuer);
  }, [selectedIssuer]);

  const total = filtered.length;

  // 🔁 Reset on filter change
  useEffect(() => {
    setIndex(0);
    progress.set(0);
  }, [selectedIssuer]);

  // 👉 Motion values
  const x = useMotionValue(0);
  const rotateY = useTransform(x, [-200, 0, 200], [25, 0, -25]);
  const scale = useTransform(x, [-200, 0, 200], [0.96, 1, 0.96]);

  // 🔁 Pagination
  const paginate = (dir: number) => {
    if (total === 0) return;
    setIndex((prev) => (prev + dir + total) % total);
  };

  // 👉 Jump via progress
  const goToIndex = (i: number) => {
    setIndex(i);
    progress.set(0);
  };

  // 👉 Drag
  const handleDragEnd = (_: any, info: any) => {
    const velocity = info.velocity.x;
    const offset = info.offset.x;

    if (offset < -80 || velocity < -500) paginate(1);
    else if (offset > 80 || velocity > 500) paginate(-1);

    x.set(0);
    setIsDragging(false);
  };

  // 🔄 Autoplay
  useEffect(() => {
    if (shouldReduceMotion || total <= 1 || isDragging) return;

    if (intervalRef.current) clearInterval(intervalRef.current);

    progress.set(0);
    const duration = AUTO_PLAY_INTERVAL;
    const start = Date.now();

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      const value = elapsed / duration;

      progress.set(value);

      if (value >= 1) {
        progress.set(0);
        paginate(1);
      }
    }, 50);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [index, total, shouldReduceMotion, isDragging]);

  return (
    <section id="certifications" className="section-padding">
      <div className="container-narrow">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            My <span className="text-gradient">Certifications</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Swipe through my certifications like a premium card deck.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Filter className="w-4 h-4" />
            Filter:
          </div>

          {ISSUERS.map((issuer) => (
            <button
              key={issuer}
              onClick={() => setSelectedIssuer(issuer)}
              className={`px-4 py-2 rounded-full text-sm transition ${
                selectedIssuer === issuer
                  ? "bg-primary text-primary-foreground"
                  : "glass-subtle text-muted-foreground"
              }`}
            >
              {issuer}
            </button>
          ))}
        </div>

        {/* Progress Bars */}
        {total > 0 && (
          <div className="flex gap-2 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] mx-auto mb-6">
            {filtered.map((_, i) => (
              <button
                key={i}
                onClick={() => goToIndex(i)}
                className="flex-1 h-1 bg-white/20 rounded overflow-hidden relative group"
              >
                <motion.div
                  className="h-full bg-primary"
                  style={{
                    scaleX:
                      i === index ? progress : i < index ? 1 : 0,
                    transformOrigin: "left",
                  }}
                />
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition" />
              </button>
            ))}
          </div>
        )}

        {/* Empty */}
        {total === 0 && (
          <p className="text-center text-muted-foreground">
            No certifications found.
          </p>
        )}

        {/* Carousel */}
        <div className="relative h-[360px] sm:h-[420px] lg:h-[520px] xl:h-[600px] flex items-center justify-center perspective-[1200px]">
          {filtered.map((cert, i) => {
            const offset = (i - index + total) % total;

            if (offset > 3) return null;

            const isActive = offset === 0;

            return (
              <motion.div
                key={cert.title}
                className="absolute w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[45%]"
                style={{
                  zIndex: 20 - offset,
                  filter: offset === 0 ? "none" : "blur(4px)",
                }}
                animate={{
                  x: offset * 40,
                  y: offset * 16,
                  scale: 1 - offset * 0.08,
                  opacity: 1 - offset * 0.3,
                }}
                transition={{
                  type: "spring",
                  stiffness: 280,
                  damping: 28,
                }}
              >
                <motion.div
                  drag={isActive ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.6}
                  onDragStart={() => setIsDragging(true)}
                  onDragEnd={handleDragEnd}
                  style={{
                    x: isActive ? x : 0,
                    rotateY: isActive ? rotateY : 0,
                    scale: isActive ? scale : 1,
                  }}
                  className="cursor-grab active:cursor-grabbing"
                >
                  <SpotlightCard className="p-6 sm:p-8 lg:p-10 xl:p-12 backdrop-blur-xl">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="h-12 w-12 lg:h-14 lg:w-14 xl:h-16 xl:w-16 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Award />
                      </div>

                      <div>
                        <h3 className="font-bold text-base sm:text-lg lg:text-xl xl:text-2xl">
                          {cert.title}
                        </h3>
                        <span className="text-xs sm:text-sm text-primary">
                          {cert.issuer}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-4">
                      {cert.description}
                    </p>

                    <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 lg:w-5 lg:h-5" />
                      {cert.date}
                    </div>
                  </SpotlightCard>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
