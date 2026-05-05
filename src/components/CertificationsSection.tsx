"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { Award, Calendar, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { certifications } from "@/data/portfolio";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const AUTO_PLAY_INTERVAL = 5000;

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
    <section id="certifications" className="section-padding relative z-10">
      <div className="container-narrow">
        {/* Header */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 px-4"
        >
          <div className="inline-flex items-center px-3 py-1.5 rounded-full glass-subtle border border-primary/20 text-xs font-mono text-primary mb-4 sm:mb-6">
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-primary mr-2"
            />
            Professional Credentials
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            My <span className="text-gradient">Certifications</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
            Swipe through my certifications like a premium card deck.
          </p>
        </motion.div>

        {/* Filters - Mobile Optimized */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2 sm:gap-3 mb-6 sm:mb-10 px-4 overflow-x-auto"
        >
          <div className="hidden sm:flex items-center gap-2 text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
            <Filter className="w-4 h-4" />
            Filter:
          </div>

          <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 sm:pb-0">
            {ISSUERS.map((issuer) => (
              <motion.button
                key={issuer}
                onClick={() => setSelectedIssuer(issuer)}
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-300 border ${
                  selectedIssuer === issuer
                    ? "bg-primary text-primary-foreground border-primary shadow-lg"
                    : "glass-subtle text-muted-foreground border-white/10 hover:border-primary/30"
                }`}
              >
                {issuer}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Progress Bars - Mobile Responsive */}
        {total > 0 && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex gap-1.5 sm:gap-2 w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] mx-auto mb-4 sm:mb-8 px-4 sm:px-0"
          >
            {filtered.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => goToIndex(i)}
                whileHover={{ scale: 1.1 }}
                className="flex-1 h-1 sm:h-1.5 bg-white/20 rounded-full overflow-hidden relative group cursor-pointer hover:bg-white/30 transition-colors"
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full"
                  style={{
                    scaleX:
                      i === index ? progress : i < index ? 1 : 0,
                    transformOrigin: "left",
                  }}
                />
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {total === 0 && (
          <div className="text-center py-8 sm:py-12 px-4">
            <p className="text-muted-foreground mb-4">No certifications found.</p>
            <motion.button
              onClick={() => setSelectedIssuer("All")}
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/30 text-sm font-semibold"
            >
              Clear Filters
            </motion.button>
          </div>
        )}

        {/* Carousel Container - Mobile Optimized */}
        <div className="relative h-auto sm:h-[360px] md:h-[420px] lg:h-[500px] flex items-center justify-center px-4 sm:px-0 perspective-[1200px] mb-6 sm:mb-12">
          {total > 0 && filtered.map((cert, i) => {
            const offset = (i - index + total) % total;

            if (offset > 3) return null;

            const isActive = offset === 0;

            return (
              <motion.div
                key={cert.title}
                className="absolute w-full sm:w-[85%] md:w-[75%] lg:w-[65%] xl:w-[55%] 2xl:w-[50%]"
                style={{
                  zIndex: 20 - offset,
                  filter: offset === 0 ? "none" : "blur(3px)",
                }}
                animate={{
                  x: offset * (isActive ? 0 : 20),
                  y: offset * 12,
                  scale: 1 - offset * 0.08,
                  opacity: 1 - offset * 0.25,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              >
                <motion.div
                  drag={isActive ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.3}
                  onDragStart={() => setIsDragging(true)}
                  onDragEnd={handleDragEnd}
                  style={{
                    x: isActive ? x : 0,
                    rotateY: isActive ? rotateY : 0,
                    scale: isActive ? scale : 1,
                  }}
                  className={isActive ? "cursor-grab active:cursor-grabbing" : "cursor-default"}
                >
                  <SpotlightCard className="h-full overflow-hidden">
                    <div className="p-5 sm:p-6 md:p-8 lg:p-10 h-full flex flex-col relative">
                      {/* Icon and Title */}
                      <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                        <motion.div
                          whileHover={isActive ? { scale: 1.1, rotate: 8 } : {}}
                          className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 flex items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 text-primary border border-primary/30 shrink-0"
                        >
                          <Award className="w-5 h-5 sm:w-6 sm:h-6" />
                        </motion.div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-sm sm:text-base md:text-lg lg:text-xl line-clamp-2 mb-1 sm:mb-2">
                            {cert.title}
                          </h3>
                          <span className="inline-block text-xs font-semibold px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/30">
                            {cert.issuer}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm md:text-base text-muted-foreground mb-4 sm:mb-6 flex-1 line-clamp-3">
                        {cert.description}
                      </p>

                      {/* Date */}
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground pt-4 sm:pt-6 border-t border-white/10">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                          <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </motion.div>
                        <span className="font-mono font-semibold">{cert.date}</span>
                      </div>
                    </div>
                  </SpotlightCard>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Navigation Arrows - Mobile Visible */}
        {total > 1 && (
          <div className="flex items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0">
            <motion.button
              onClick={() => paginate(-1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 sm:p-3 rounded-full glass-subtle border border-primary/30 hover:border-primary/50 text-primary transition-all"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>

            <span className="text-xs sm:text-sm font-mono text-muted-foreground whitespace-nowrap">
              {index + 1} / {total}
            </span>

            <motion.button
              onClick={() => paginate(1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 sm:p-3 rounded-full glass-subtle border border-primary/30 hover:border-primary/50 text-primary transition-all"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CertificationsSection;
