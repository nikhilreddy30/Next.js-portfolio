"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowDown, MessageCircle, Download } from "lucide-react";
import { personalInfo, stats } from "@/data/portfolio";
import Card3D from "./Card3D";
import cardImage from "@/assets/card.png";

const AnimatedCounter = ({ value, suffix, start }: { value: number; suffix: string; start: boolean }) => {
  const [count, setCount] = useState(0);
  const started = useRef(false);
  const frameRef = useRef<number | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const displayCount = shouldReduceMotion && start ? value : count;

  useEffect(() => {
    if (!start || started.current || shouldReduceMotion) return;

    started.current = true;

    const duration = 2600;
    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));
      if (progress < 1) {
        frameRef.current = window.requestAnimationFrame(step);
      }
    };

    frameRef.current = window.requestAnimationFrame(step);

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [shouldReduceMotion, start, value]);

  return <span className="tabular-nums">{displayCount}{suffix}</span>;
};

const HeroSection = () => {
  const shouldReduceMotion = useReducedMotion();
  const [statsTriggerRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.05,
    rootMargin: "0px 0px -2% 0px",
  });
  const [statsRevealStarted, setStatsRevealStarted] = useState(false);

  const shouldStartStats = Boolean(statsInView && (shouldReduceMotion || statsRevealStarted));

  const container = {
    hidden: {},
    show: {
      transition: shouldReduceMotion
        ? { staggerChildren: 0.04, delayChildren: 0.1 }
        : { staggerChildren: 0.12, delayChildren: 0.3 },
    },
  };

  const item = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 24, filter: "blur(4px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: shouldReduceMotion ? 0.2 : 0.7,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-start overflow-hidden pt-[calc(5rem+env(safe-area-inset-top))] pb-[max(2rem,env(safe-area-inset-bottom))] sm:pt-[calc(5.5rem+env(safe-area-inset-top))] sm:pb-[max(2.5rem,env(safe-area-inset-bottom))] lg:min-h-screen lg:items-center lg:pt-20 lg:pb-12"
    >
      {/* Subtle background grid & Animated Glow Orb */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: "radial-gradient(hsl(var(--gradient-start)) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }} />

      {/* Mesh gradient background */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-60 pointer-events-none" />

      {/* Massive Glowing Animated Orbs - Multi-color */}
      <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] rounded-full animate-[pulse_8s_ease-in-out_infinite] motion-reduce:animate-none opacity-50 pointer-events-none bg-[radial-gradient(circle,hsl(var(--gradient-start)/0.25)_0%,hsl(var(--gradient-mid)/0.1)_40%,transparent_70%)]" />
      <div className="absolute bottom-0 -left-1/4 w-[600px] h-[600px] rounded-full animate-[pulse_10s_ease-in-out_infinite_reverse] motion-reduce:animate-none opacity-40 pointer-events-none bg-[radial-gradient(circle,hsl(var(--gradient-mid)/0.2)_0%,hsl(var(--gradient-end)/0.1)_40%,transparent_70%)]" />
      <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] rounded-full animate-[pulse_12s_ease-in-out_infinite] motion-reduce:animate-none opacity-30 pointer-events-none bg-[radial-gradient(circle,hsl(var(--gradient-end)/0.15)_0%,transparent_60%)]" />
      
      {/* Smooth fade into the next section */}
      <div className="absolute bottom-0 inset-x-0 h-32 sm:h-64 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none z-0" />

      <div className="container-narrow relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left - Content */}
          <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-6 sm:gap-8 lg:col-span-7">
            <motion.div variants={item}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-bold glass-subtle border border-primary/30 text-primary tracking-wide glow-accent">
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent-secondary animate-pulse motion-reduce:animate-none" />
                Available for New Opportunities
              </span>
            </motion.div>

            <div className="flex flex-col gap-2">
              <motion.h1 variants={item} className="text-4xl sm:text-7xl lg:text-[5.5rem] font-bold tracking-tighter leading-[1.1] sm:leading-[1.05]">
                {personalInfo.name}
              </motion.h1>
              <motion.h2 variants={item} className="text-xl sm:text-4xl font-semibold tracking-tight text-muted-foreground mt-2">
                {personalInfo.role.split(" ").slice(0, -1).join(" ")} <span className="text-gradient">{personalInfo.role.split(" ").slice(-1)[0]}</span>
              </motion.h2>
            </div>

            <motion.p variants={item} className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-xl font-medium" style={{ textWrap: "pretty" }}>
              {personalInfo.tagline}
            </motion.p>

            <motion.div variants={item} className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mt-1 sm:mt-2">
              <a
                href="#projects"
                className="group inline-flex w-full sm:w-auto justify-center items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-primary via-accent-secondary to-primary bg-[length:200%_auto] text-white font-bold text-sm tracking-wide shadow-accent-strong hover:shadow-[0_0_32px_hsla(262,83%,58%,0.35)] hover:bg-right transition-all duration-500 active:scale-95"
              >
                View Projects
                <ArrowDown className="w-4 h-4 ml-1 group-hover:translate-y-0.5 transition-transform" />
              </a>
              <a
                href={personalInfo.resumeUrl}
                download
                className="group inline-flex w-full sm:w-auto justify-center items-center gap-2 px-8 py-3.5 rounded-full bg-white/5 dark:bg-white/[0.02] backdrop-blur-lg border border-primary/40 dark:border-primary/40 font-bold text-foreground text-sm tracking-wide hover:bg-primary/10 hover:border-primary/60 transition-all duration-300 active:scale-95"
              >
                <Download className="w-4 h-4 mr-1 text-primary group-hover:text-accent-secondary transition-colors" />
                Resume
              </a>
              <a
                href="#ai-twin"
                className="group inline-flex w-full sm:w-auto justify-center items-center gap-2 px-6 py-3.5 rounded-full hover:bg-white/5 transition-all duration-300 font-semibold text-sm text-muted-foreground hover:text-foreground active:scale-95"
              >
                <MessageCircle className="w-4 h-4 text-primary group-hover:text-accent-tertiary transition-colors" />
                Talk to AI Twin
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              ref={statsTriggerRef}
              variants={item}
              onAnimationStart={() => setStatsRevealStarted(true)}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 sm:mt-6"
            >
              {stats.map((stat, i) => (
                <div key={stat.label} className="border-l-2 border-transparent pl-4 py-1" style={{
                  borderImage: `linear-gradient(to bottom, hsl(var(--gradient-start)), hsl(var(--gradient-mid))) 1`,
                }}>
                  <div className="text-2xl font-bold tracking-tighter text-foreground">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} start={shouldStartStats} />
                  </div>
                  <div className="text-xs font-medium text-muted-foreground mt-1 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - 3D Card wrapped in a delicate glow */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: shouldReduceMotion ? 0.2 : 1.2, delay: shouldReduceMotion ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex justify-end lg:col-span-5 relative"
          >
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--gradient-start)/0.2)_0%,hsl(var(--gradient-mid)/0.1)_40%,transparent_70%)] rounded-full scale-150" />
             <div className="relative z-10 w-full max-w-[500px] xl:max-w-[600px] lg:scale-110 xl:scale-125 lg:origin-right lg:translate-x-4 xl:translate-x-12">
              <Card3D className="w-full">
                  <Image
                     src={cardImage}
                     alt=""
                     aria-hidden="true"
                     className="w-full h-auto rounded-3xl border border-white/10 shadow-accent-strong pointer-events-none select-none"
                    draggable={false}
                    priority
                    sizes="(min-width: 1280px) 600px, (min-width: 1024px) 500px, 100vw"
                  />
              </Card3D>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
