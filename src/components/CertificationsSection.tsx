"use client";

import { useState } from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Award, Calendar, Filter, X } from "lucide-react";
import { certifications } from "@/data/portfolio";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const ISSUERS = ["All", ...Array.from(new Set(certifications.map((c) => c.issuer)))];

const CertificationsSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [selectedIssuer, setSelectedIssuer] = useState("All");
  const shouldReduceMotion = useReducedMotion();

  const filtered =
    selectedIssuer === "All"
      ? certifications
      : certifications.filter((c) => c.issuer === selectedIssuer);

  // ✅ Typed Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0.05 : 0.1,
        delayChildren: shouldReduceMotion ? 0.1 : 0.2,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, x: -100, rotateY: -90 },
    show: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        duration: shouldReduceMotion ? 0.3 : 0.6,
        type: "spring",
        stiffness: 100,
        damping: 25,
      },
    },
    exit: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, x: 100, rotateY: 90 },
  };

  const headerVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.2 : 0.7,
      },
    },
  };

  const badgeVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.5 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0.2 : 0.5,
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
            Industry-recognized certifications validating expertise.
          </motion.p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {ISSUERS.map((issuer) => (
            <button
              key={issuer}
              onClick={() => setSelectedIssuer(issuer)}
              className={`px-5 py-2.5 rounded-full text-sm ${
                selectedIssuer === issuer ? "bg-primary text-white" : ""
              }`}
            >
              {issuer}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto"
        >
          {filtered.map((cert, index) => (
            <motion.div
              key={cert.title}
              variants={cardVariants}
              className="group"
            >
              <SpotlightCard className="p-6">
                <h3 className="font-bold">{cert.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {cert.description}
                </p>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CertificationsSection;
