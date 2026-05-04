"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Award, Calendar, Filter, X } from "lucide-react";
import { certifications } from "@/data/portfolio";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const ISSUERS = ["All", ...Array.from(new Set(certifications.map((c) => c.issuer)))];

const CertificationsSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [selectedIssuer, setSelectedIssuer] = useState("All");
  const shouldReduceMotion = useReducedMotion();

  const filtered = selectedIssuer === "All" 
    ? certifications 
    : certifications.filter((c) => c.issuer === selectedIssuer);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0.05 : 0.1,
        delayChildren: shouldReduceMotion ? 0.1 : 0.2,
      },
    },
  };

  const cardVariants = {
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

  const headerVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.2 : 0.7,
      },
    },
  };

  const badgeVariants = {
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
        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
          backgroundImage: "radial-gradient(hsl(var(--primary)) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }} />

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
            className="inline-flex items-center px-3 py-1.5 rounded-full glass-subtle border border-primary/20 text-xs font-mono text-primary mb-6 shadow-[0_0_12px_rgba(41,214,185,0.15)]"
          >
            <motion.span
              animate={inView ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
              className="w-2 h-2 rounded-full bg-primary mr-2 shadow-[0_0_8px_rgba(41,214,185,0.6)]"
            />
            Professional Credentials
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: shouldReduceMotion ? 0.2 : 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
          >
            My <span className="text-gradient">Certifications</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: shouldReduceMotion ? 0.2 : 0.6, delay: 0.2 }}
            className="text-muted-foreground leading-relaxed max-w-xl text-lg"
          >
            Industry-recognized certifications validating expertise in programming, databases, and cloud technologies.
          </motion.p>
        </motion.div>

        {/* Filter Section */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: shouldReduceMotion ? 0.2 : 0.6, delay: 0.25 }}
          className="flex flex-wrap justify-center gap-3 mb-14 relative z-10"
        >
          <div className="inline-flex items-center gap-2 mr-4 text-sm font-semibold text-muted-foreground">
            <Filter className="w-4 h-4" />
            Filter:
          </div>
          {ISSUERS.map((issuer) => (
            <motion.button
              key={issuer}
              onClick={() => setSelectedIssuer(issuer)}
              whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 active:scale-95 border ${
                selectedIssuer === issuer
                  ? "bg-primary text-primary-foreground border-primary shadow-[0_0_20px_rgba(41,214,185,0.3)]"
                  : "glass-subtle text-muted-foreground border-white/10 hover:text-foreground hover:bg-white/10 hover:border-primary/30"
              }`}
            >
              {issuer}
            </motion.button>
          ))}
        </motion.div>

        {/* Certifications Grid with Sliding Animation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto relative z-10 mb-8"
        >
          {filtered.length > 0 ? (
            filtered.map((cert, index) => (
              <motion.div
                key={cert.title}
                variants={cardVariants}
                exit="exit"
                layout
                className="group perspective"
              >
                <SpotlightCard delay={0.05 + index * 0.08} className="h-full overflow-hidden">
                  {/* Animated Background Gradient */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.5 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none"
                  />

                  <div className="relative p-6 sm:p-8 flex flex-col h-full">
                    {/* Top Section with Icon and Title */}
                    <motion.div
                      initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.08, duration: 0.4 }}
                      className="flex items-start gap-4 mb-6 relative z-10"
                    >
                      {/* Icon Container with Hover Animation */}
                      <motion.div
                        whileHover={shouldReduceMotion ? {} : { scale: 1.1, rotate: 8 }}
                        whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-gradient-to-br from-primary/20 to-primary/5 text-primary shadow-[0_0_24px_rgba(41,214,185,0.15)] group-hover:shadow-[0_0_40px_rgba(41,214,185,0.3)] transition-all duration-300"
                      >
                        <Award className="h-6 w-6" />
                      </motion.div>

                      {/* Title and Issuer */}
                      <div className="flex-1 min-w-0">
                        <motion.h3
                          initial={shouldReduceMotion ? {} : { opacity: 0, x: -15 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.15 + index * 0.08, duration: 0.4 }}
                          className="text-lg font-bold tracking-tight text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors duration-300"
                        >
                          {cert.title}
                        </motion.h3>
                        <motion.span
                          initial={shouldReduceMotion ? {} : { opacity: 0, x: -15 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + index * 0.08, duration: 0.4 }}
                          className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/30 mt-1"
                        >
                          {cert.issuer}
                        </motion.span>
                      </div>
                    </motion.div>

                    {/* Description */}
                    <motion.p
                      initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + index * 0.08, duration: 0.4 }}
                      className="text-sm leading-relaxed text-muted-foreground mb-6 flex-1 relative z-10"
                    >
                      {cert.description}
                    </motion.p>

                    {/* Divider Line with Slide Animation */}
                    <motion.div
                      initial={shouldReduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ delay: 0.25 + index * 0.08, duration: 0.5 }}
                      className="origin-left border-t border-white/15 relative z-10"
                    />

                    {/* Date with Icon Animation */}
                    <motion.div
                      initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.08, duration: 0.4 }}
                      className="flex items-center gap-2 mt-4 pt-4 relative z-10"
                    >
                      <motion.div
                        animate={inView && !shouldReduceMotion ? { rotate: 360 } : {}}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      >
                        <Calendar className="h-4 w-4 text-primary/70" />
                      </motion.div>
                      <span className="text-xs font-mono font-semibold text-muted-foreground uppercase tracking-widest">
                        {cert.date}
                      </span>
                    </motion.div>

                    {/* Credential Link with Slide Animation */}
                    {cert.credentialUrl && (
                      <motion.a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={shouldReduceMotion ? {} : { opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        whileHover={shouldReduceMotion ? {} : { x: 8 }}
                        transition={{ delay: 0.35 + index * 0.08, duration: 0.4 }}
                        className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary/80 group-hover:gap-2 transition-all relative z-10"
                      >
                        <span>View Credential</span>
                        <motion.span
                          animate={shouldReduceMotion ? {} : { x: [0, 4, 0] }}
                          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                        >
                          →
                        </motion.span>
                      </motion.a>
                    )}
                  </div>
                </SpotlightCard>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="col-span-full text-center py-12"
            >
              <p className="text-muted-foreground">No certifications found for this issuer.</p>
            </motion.div>
          )}
        </motion.div>

        {/* Empty State Indicator */}
        {filtered.length === 0 && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-center mb-8 relative z-10"
          >
            <motion.button
              onClick={() => setSelectedIssuer("All")}
              whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 transition-all"
            >
              <X className="w-4 h-4" />
              Clear Filters
            </motion.button>
          </motion.div>
        )}

        {/* Result Count */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="text-center text-xs font-mono text-muted-foreground mb-8 relative z-10"
        >
          Showing {filtered.length} of {certifications.length} certifications
        </motion.div>
      </div>
    </section>
  );
};

export default CertificationsSection;
