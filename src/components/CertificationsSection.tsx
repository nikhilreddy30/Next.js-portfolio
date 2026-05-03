"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Award, Calendar } from "lucide-react";
import { certifications } from "@/data/portfolio";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const CertificationsSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="certifications" className="section-padding relative z-10">
      <div className="container-narrow" ref={ref}>
        {/* Header */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: shouldReduceMotion ? 0.2 : 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 flex flex-col items-center"
        >
          <div className="inline-flex items-center px-3 py-1.5 rounded-full glass-subtle border border-primary/20 text-xs font-mono text-primary mb-6">
            Credentials
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Professional <span className="text-gradient">Certifications</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-10 max-w-xl text-lg">
            Industry-recognized certifications validating expertise in programming, databases, and cloud technologies.
          </p>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {certifications.map((cert, index) => (
            <SpotlightCard key={cert.title} delay={0.1 + index * 0.05} className="h-full">
              <div className="p-6 sm:p-8 flex flex-col h-full">
                {/* Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-primary shadow-[0_0_24px_rgba(41,214,185,0.12)]">
                    <Award className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold tracking-tight text-foreground mb-1 line-clamp-2">
                      {cert.title}
                    </h3>
                    <p className="text-sm font-medium text-primary">{cert.issuer}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm leading-relaxed text-muted-foreground mb-6 flex-1">
                  {cert.description}
                </p>

                {/* Date */}
                <div className="flex items-center gap-2 pt-4 border-t border-white/10">
                  <Calendar className="h-4 w-4 text-primary/60" />
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-wide">{cert.date}</span>
                </div>

                {/* Credential Link */}
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                  >
                    View Credential →
                  </a>
                )}
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
