"use client";

import { useState, useMemo } from "react";
import {
  motion,
  useReducedMotion,
  Variants,
  AnimatePresence,
} from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Award, Calendar, Filter, X } from "lucide-react";
import { certifications } from "@/data/portfolio";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const ISSUERS = [
  "All",
  ...Array.from(new Set(certifications.map((c) => c.issuer))),
];

// 🔀 Shuffle helper
const shuffleArray = (array: typeof certifications) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const CertificationsSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [selectedIssuer, setSelectedIssuer] = useState("All");
  const shouldReduceMotion = useReducedMotion();

  // 🎯 Filter logic
  const filtered = useMemo(() => {
    return selectedIssuer === "All"
      ? certifications
      : certifications.filter((c) => c.issuer === selectedIssuer);
  }, [selectedIssuer]);

  // 🔥 Shuffle whenever filter changes
  const shuffled = useMemo(() => shuffleArray(filtered), [filtered]);

  // Container animation
  const containerVariants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0.05 : 0.12,
        delayChildren: 0.15,
      },
    },
  };

  // 🔥 Shuffle-style animation
  const cardVariants: Variants = {
    hidden: () => {
      const randomX = Math.random() * 300 - 150;
      const randomY = Math.random() * 200 - 100;
      const randomRotate = Math.random() * 40 - 20;

      return shouldReduceMotion
        ? { opacity: 0 }
        : {
            opacity: 0,
            x: randomX,
            y: randomY,
            rotate: randomRotate,
            scale: 0.8,
          };
    },

    show: {
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15,
      },
    },

    exit: () => {
      const randomX = Math.random() * 300 - 150;
      const randomY = Math.random() * 200 - 100;

      return shouldReduceMotion
        ? { opacity: 0 }
        : {
            opacity: 0,
            x: randomX,
            y: randomY,
            scale: 0.7,
            transition: { duration: 0.3 },
          };
    },
  };

  const headerVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0.2 : 0.6 },
    },
  };

  const badgeVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.5 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0.2 : 0.4,
        type: "spring",
        stiffness: 200,
      },
    },
  };

  return (
    <section id="certifications" className="section-padding relative z-10">
      <div className="container-narrow" ref={ref}>
        {/* Background */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(hsl(var(--primary)) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        {/* Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="text-center mb-12 flex flex-col items-center relative z-10"
        >
          {/* Badge */}
          <motion.div
            variants={badgeVariants}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="inline-flex items-center px-3 py-1.5 rounded-full glass-subtle border border-primary/20 text-xs font-mono text-primary mb-6"
          >
            <motion.span
              animate={inView ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
              className="w-2 h-2 rounded-full bg-primary mr-2"
            />
            Professional Credentials
          </motion.div>

          <motion.h2
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: shouldReduceMotion ? 0.2 : 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
          >
            My <span className="text-gradient">Certifications</span>
          </motion.h2>

          <motion.p
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: shouldReduceMotion ? 0.2 : 0.6 }}
            className="text-muted-foreground max-w-xl"
          >
            Industry-recognized certifications validating expertise in programming,
            databases, and cloud technologies.
          </motion.p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-14 relative z-10">
          <div className="inline-flex items-center gap-2 mr-4 text-sm text-muted-foreground">
            <Filter className="w-4 h-4" />
            Filter:
          </div>

          {ISSUERS.map((issuer) => (
            <button
              key={issuer}
              onClick={() => setSelectedIssuer(issuer)}
              className={`px-5 py-2.5 rounded-full text-sm transition ${
                selectedIssuer === issuer
                  ? "bg-primary text-primary-foreground"
                  : "glass-subtle text-muted-foreground"
              }`}
            >
              {issuer}
            </button>
          ))}
        </div>

        {/* Cards */}
        <motion.div
          layout
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto perspective"
        >
          <AnimatePresence mode="popLayout">
            {shuffled.map((cert) => (
              <motion.div
                key={cert.title}
                layout
                layoutId={cert.title}
                variants={cardVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                className="group"
              >
                <SpotlightCard className="p-6 h-full">
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
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty */}
        {filtered.length === 0 && (
          <div className="text-center mt-10">
            <p className="text-muted-foreground mb-4">
              No certifications found.
            </p>
            <button
              onClick={() => setSelectedIssuer("All")}
              className="px-4 py-2 bg-primary text-white rounded"
            >
              <X className="inline w-4 h-4 mr-1" />
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CertificationsSection;
