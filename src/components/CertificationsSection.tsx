"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Award, Calendar, CheckCircle2 } from "lucide-react";
import { certifications } from "@/data/portfolio";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const CertificationsSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const shouldReduceMotion = useReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: shouldReduceMotion
        ? { staggerChildren: 0.05, delayChildren: 0.1 }
        : { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  };

  const item = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 20, filter: "blur(4px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: shouldReduceMotion ? 0.2 : 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section id="certifications" className="section-padding relative z-10">
      <div className="container-narrow" ref={ref}>
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
          backgroundImage: "radial-gradient(hsl(var(--primary)) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }} />

        {/* Header */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: shouldReduceMotion ? 0.2 : 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 flex flex-col items-center relative z-10"
        >
          {/* Animated Badge */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0, scale: 0.8 } : { opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: shouldReduceMotion ? 0.2 : 0.5, delay: 0.1 }}
            className="inline-flex items-center px-3 py-1.5 rounded-full glass-subtle border border-primary/20 text-xs font-mono text-primary mb-6 shadow-[0_0_12px_rgba(41,214,185,0.15)]"
          >
            <motion.span
              animate={inView ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="w-2 h-2 rounded-full bg-primary mr-2"
            />
            Credentials
          </motion.div>

          {/* Animated Title */}
          <motion.h2
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: shouldReduceMotion ? 0.2 : 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
          >
            Professional <span className="text-gradient">Certifications</span>
          </motion.h2>

          {/* Animated Description */}
          <motion.p
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: shouldReduceMotion ? 0.2 : 0.6, delay: 0.2 }}
            className="text-muted-foreground leading-relaxed mb-10 max-w-xl text-lg"
          >
            Industry-recognized certifications validating expertise in programming, databases, and cloud technologies.
          </motion.p>
        </motion.div>

        {/* Certifications Grid with Stagger Animation */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto relative z-10"
        >
          {certifications.map((cert, index) => (
            <motion.div key={cert.title} variants={item}>
              <SpotlightCard delay={0.1 + index * 0.05} className="h-full group">
                <div className="p-6 sm:p-8 flex flex-col h-full relative">
                  {/* Animated Gradient Background */}
                  <motion.div
                    initial={shouldReduceMotion ? {} : { opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] bg-gradient-to-br from-primary to-transparent pointer-events-none rounded-lg transition-all duration-500"
                  />

                  {/* Award Icon with Animation */}
                  <motion.div
                    initial={shouldReduceMotion ? {} : { scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ delay: index * 0.1 + 0.2, duration: 0.6, type: "spring", stiffness: 100 }}
                    className="flex items-start gap-4 mb-6 relative z-10"
                  >
                    <motion.div
                      whileHover={shouldReduceMotion ? {} : { scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-primary shadow-[0_0_24px_rgba(41,214,185,0.12)] group-hover:shadow-[0_0_32px_rgba(41,214,185,0.25)] transition-all duration-300"
                    >
                      <Award className="h-5 w-5" />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <motion.h3
                        initial={shouldReduceMotion ? {} : { opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                        className="text-lg font-bold tracking-tight text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors duration-300"
                      >
                        {cert.title}
                      </motion.h3>
                      <motion.p
                        initial={shouldReduceMotion ? {} : { opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.4 }}
                        className="text-sm font-medium text-primary"
                      >
                        {cert.issuer}
                      </motion.p>
                    </div>
                  </motion.div>

                  {/* Animated Check Mark */}
                  <motion.div
                    initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.5, type: "spring" }}
                    className="absolute top-6 right-6 text-green-500/30 group-hover:text-green-500/60 transition-colors duration-300"
                  >
                    <CheckCircle2 className="h-5 w-5" />
                  </motion.div>

                  {/* Description with Fade In */}
                  <motion.p
                    initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.35 }}
                    className="text-sm leading-relaxed text-muted-foreground mb-6 flex-1 relative z-10"
                  >
                    {cert.description}
                  </motion.p>

                  {/* Animated Divider */}
                  <motion.div
                    initial={shouldReduceMotion ? {} : { scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ delay: index * 0.1 + 0.45, duration: 0.5 }}
                    className="origin-left pt-4 border-t border-white/10 relative z-10"
                  />

                  {/* Date with Slide In Animation */}
                  <motion.div
                    initial={shouldReduceMotion ? {} : { opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                    className="flex items-center gap-2 mt-4 relative z-10"
                  >
                    <motion.div
                      animate={inView && !shouldReduceMotion ? { rotate: 360 } : {}}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <Calendar className="h-4 w-4 text-primary/60" />
                    </motion.div>
                    <span className="text-xs font-mono text-muted-foreground uppercase tracking-wide">{cert.date}</span>
                  </motion.div>

                  {/* Animated Credential Link */}
                  {cert.credentialUrl && (
                    <motion.a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      whileHover={shouldReduceMotion ? {} : { x: 5 }}
                      transition={{ delay: index * 0.1 + 0.55, duration: 0.3 }}
                      className="mt-4 inline-flex items-center text-xs font-semibold text-primary hover:text-primary/80 transition-colors relative z-10"
                    >
                      <span>View Credential</span>
                      <motion.span
                        animate={shouldReduceMotion ? {} : { x: [0, 3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </motion.a>
                  )}
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Decorative Gradient */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"
        />
      </div>
    </section>
  );
};

export default CertificationsSection;
