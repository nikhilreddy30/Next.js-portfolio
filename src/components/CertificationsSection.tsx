"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { certifications as portfolioCertifications } from "@/data/portfolio";

/* ================= CATEGORY CONFIG ================= */
const CATEGORY_CONFIG = {
  Programming: {
    color: "border-emerald-500 text-emerald-400",
    bg: "from-emerald-500/20 to-emerald-500/5",
    iconBg: "bg-emerald-500/20 border-emerald-500/30",
    button: "bg-emerald-500 hover:bg-emerald-600",
    glow: "rgba(16,185,129,0.35)",
  },
  Database: {
    color: "border-cyan-500 text-cyan-400",
    bg: "from-cyan-500/20 to-cyan-500/5",
    iconBg: "bg-cyan-500/20 border-cyan-500/30",
    button: "bg-cyan-500 hover:bg-cyan-600",
    glow: "rgba(6,182,212,0.35)",
  },
  Cloud: {
    color: "border-purple-500 text-purple-400",
    bg: "from-purple-500/20 to-purple-500/5",
    iconBg: "bg-purple-500/20 border-purple-500/30",
    button: "bg-purple-500 hover:bg-purple-600",
    glow: "rgba(168,85,247,0.35)",
  },
  DevOps: {
    color: "border-pink-500 text-pink-400",
    bg: "from-pink-500/20 to-pink-500/5",
    iconBg: "bg-pink-500/20 border-pink-500/30",
    button: "bg-pink-500 hover:bg-pink-600",
    glow: "rgba(236,72,153,0.35)",
  },
  "AI/ML": {
    color: "border-indigo-500 text-indigo-400",
    bg: "from-indigo-500/20 to-indigo-500/5",
    iconBg: "bg-indigo-500/20 border-indigo-500/30",
    button: "bg-indigo-500 hover:bg-cyan-600",
    glow: "rgba(99,102,241,0.35)",
  },
  Professional: {
    color: "border-orange-500 text-orange-400",
    bg: "from-orange-500/20 to-orange-500/5",
    iconBg: "bg-orange-500/20 border-orange-500/30",
    button: "bg-orange-500 hover:bg-orange-600",
    glow: "rgba(249,115,22,0.35)",
  },
} as const;

/* ================= ISSUER LOGOS ================= */
const ISSUER_LOGOS: Record<string, string> = {
  Oracle: "/images/issuers/oracle.png",
  "AWS Academy": "/images/issuers/aws.png",
  IBM: "/images/issuers/ibm.png",
  Microsoft: "/images/issuers/microsoft.png",
  Udemy: "/images/issuers/udemy.png",
  "Great Learning": "/images/issuers/greatlearning.png",
};

/* ================= TYPES ================= */
type CategoryKey = keyof typeof CATEGORY_CONFIG;

type CertificationUI = {
  id: string;
  title: string;
  issuer: string;
  issuerLogo: string;
  year: string;
  category: CategoryKey;
  color: string;
  bg: string;
  iconBg: string;
  button: string;
  glow: string;
  certificateUrl: string;
  description: string;
};

/* ================= DATA ================= */
const certifications: CertificationUI[] = portfolioCertifications.map(
  (cert, index) => {
    const config = CATEGORY_CONFIG[cert.category as CategoryKey];
    return {
      id: (index + 1).toString(),
      title: cert.title,
      issuer: cert.issuer,
      issuerLogo: ISSUER_LOGOS[cert.issuer] || "/images/issuers/default.png",
      year: cert.date,
      description: cert.description,
      certificateUrl: cert.credentialUrl || "#",
      category: cert.category as CategoryKey,
      ...config,
    };
  }
);

/* ================= CARD ================= */
const CertificationCard = ({
  cert,
  isActive = false,
}: {
  cert: CertificationUI;
  isActive?: boolean;
}) => {
  return (
    <div className={`relative w-full h-full overflow-visible rounded-3xl bg-slate-900/60 border border-slate-700/50 p-5 flex flex-col shadow-2xl`}>
      {/* Gradient Background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${cert.bg} ${isActive ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
      />

      <div className="relative z-10 flex flex-col h-full">
        {/* TOP: ISSUER ICON + CATEGORY */}
        <div className="flex justify-between items-start mb-3">
          <div
            className={`w-10 h-10 rounded-xl ${cert.iconBg} flex items-center justify-center shrink-0`}
          >
            <img
              src={cert.issuerLogo}
              alt={cert.issuer}
              className="w-6 h-6 object-contain"
            />
          </div>
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider border ${cert.color} shrink-0`}
          >
            {cert.category}
          </span>
        </div>

        {/* TITLE */}
        <h3 className={`text-base font-bold text-white mb-1.5 line-clamp-2 leading-tight ${isActive ? "text-lg" : ""}`}>
          {cert.title}
        </h3>

        {/* DESCRIPTION */}
        <p className="text-xs text-slate-400 mb-3 line-clamp-3 leading-relaxed flex-grow">
          {cert.description}
        </p>

        {/* ISSUER + YEAR */}
        <div className="flex items-center justify-between mb-3 mt-auto">
          <span className="text-xs text-slate-300 font-medium">
            {cert.issuer}
          </span>
          <span className="text-xs text-slate-400 font-semibold">
            {cert.year}
          </span>
        </div>

        {/* BUTTON */}
        <motion.a
          href={cert.certificateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-white text-sm font-semibold transition ${cert.button}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Credential</span>
        </motion.a>
      </div>
    </div>
  );
};

/* ================= CENTER-FOCUSED CAROUSEL ================= */
const CenterFocusedCarousel = ({ items }: { items: CertificationUI[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isHovering = useRef(false);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  
  // Configuration
  const baseCardWidth = 320; 
  const sideCardVisibility = 0.35; // 35% visible
  const gap = 24; // px gap between cards
  
  // Calculate container width to ensure enough space for scaling + spacing
  // We want the active card (scale 1.2) + 2 side cards (35% width) to fit
  const getContainerStyle = useCallback(() => {
    const activeWidth = baseCardWidth * 1.2;
    const sideWidth = baseCardWidth * sideCardVisibility;
    const totalWidth = activeWidth + (sideWidth * 2) + (gap * 4); // Extra buffer for scale overflow
    return {
      maxWidth: "100%",
      width: Math.max(320, totalWidth), 
    };
  }, []);

  const [containerWidth, setContainerWidth] = useState(320);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle Resize
  useEffect(() => {
    const update = () => {
      if(containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Navigation
  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  const goToIndex = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Autoplay
  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      if (!isHovering.current) next();
    }, 3500);
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [next]);

  // Get visible cards logic
  const getVisibleCards = () => {
    const visible = [];
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + items.length) % items.length;
      visible.push({
        item: items[index],
        index,
        position: i, // -1 (left), 0 (center), 1 (right)
        isActive: i === 0,
      });
    }
    return visible;
  };

  const visibleCards = getVisibleCards();

  return (
    <div
      className="relative w-full select-none flex flex-col items-center"
      onMouseEnter={() => (isHovering.current = true)}
      onMouseLeave={() => (isHovering.current = false)}
    >
      {/* 
         Main Carousel Stage 
         - overflow-visible: Allows the active card to scale up (1.2x) without being cropped.
         - height: Dynamic based on base card height * scale factor + padding.
      */}
      <div 
        ref={containerRef}
        className="relative overflow-visible flex items-center justify-center"
        style={{ 
          ...getContainerStyle(),
          // Height calculation: Base 420px (approx card height) * 1.2 (scale) + 40px padding
          height: "520px", 
        }}
      >
        {visibleCards.map(({ item, position, isActive }, idx) => {
          // Calculate positioning
          // Base center is 50% of container.
          // Active card offset: 0
          // Side card offset: (Active Width / 2) + (Side Width / 2) + Gap
          
          const activeWidth = baseCardWidth * 1.2;
          const sideWidth = baseCardWidth * sideCardVisibility;
          
          // Determine X offset
          let xOffset = 0;
          if (position === -1) {
            // Left Card
            xOffset = -(activeWidth / 2) - (sideWidth / 2) - gap;
          } else if (position === 1) {
            // Right Card
            xOffset = (activeWidth / 2) + (sideWidth / 2) + gap;
          }

          return (
            <motion.div
              key={`${item.id}-${idx}`}
              onClick={() => position !== 0 && goToIndex((currentIndex + position + items.length) % items.length)}
              className="absolute cursor-pointer"
              // Positioning Logic
              style={{
                left: "50%", // Start from center
                top: "50%",  // Start from middle
                x: xOffset,  // Move left/right
                y: "-50%",   // Center vertically
              }}
              animate={{
                scale: isActive ? 1.2 : 1, // Center 1.2x, Side 1.0x
                opacity: isActive ? 1 : 0.6, // Center opaque, Side dimmed
                zIndex: isActive ? 20 : 10, // Center on top
                filter: isActive ? "blur(0px)" : "blur(1px)", // Slight blur for side cards
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                mass: 0.8,
              }}
            >
              <div style={{ width: baseCardWidth, height: "420px" }}>
                <CertificationCard cert={item} isActive={isActive} />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation dots */}
      <div className="flex justify-center gap-2 mt-4 z-30 relative">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => goToIndex(i)}
            className={`rounded-full transition-all duration-300 ${
              currentIndex === i
                ? "w-8 h-2 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                : "w-2 h-2 bg-slate-600 hover:bg-slate-400"
            }`}
            aria-label={`Go to card ${i + 1}`}
          />
        ))}
      </div>

      {/* Navigation arrows */}
      {/* Absolute positioned to ensure they are clickable on sides */}
      <button
        onClick={prev}
        className="absolute left-0 md:-left-8 top-1/2 -translate-y-1/2 z-[30] w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-800/90 backdrop-blur border border-slate-700 flex items-center justify-center text-white hover:bg-slate-700 transition shadow-lg"
        aria-label="Previous"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute right-0 md:-right-8 top-1/2 -translate-y-1/2 z-[30] w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-800/90 backdrop-blur border border-slate-700 flex items-center justify-center text-white hover:bg-slate-700 transition shadow-lg"
        aria-label="Next"
      >
        ›
      </button>
    </div>
  );
};

/* ================= MAIN ================= */
export const CertificationsSection = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const categories: (CategoryKey | "all")[] = [
    "all",
    "Programming",
    "Database",
    "Cloud",
    "DevOps",
    "AI/ML",
    "Professional",
  ];

  const filtered =
    activeFilter === "all"
      ? certifications
      : certifications.filter((c) => c.category === activeFilter);

  return (
    <section id="certifications" className="py-16 px-4 overflow-x-hidden bg-slate-950">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">Certifications</h2>
          <p className="text-slate-400">
            Verified credentials across cloud, development, and AI
          </p>
        </div>

        {/* FILTER */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-sm border transition-all duration-300 ${
                activeFilter === cat
                  ? "bg-white text-slate-950 border-white font-bold scale-105 shadow-lg shadow-white/10"
                  : "bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-600 hover:text-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* CENTER-FOCUSED CAROUSEL (all) or GRID (filtered) */}
        {activeFilter === "all" ? (
          <div className="relative w-full flex justify-center py-4">
            <CenterFocusedCarousel items={certifications} />
          </div>
        ) : (
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((cert) => (
              <motion.div
                key={cert.id}
                whileHover={{ y: -5 }}
                className="group relative w-full"
              >
                <CertificationCard cert={cert} isActive />
              </motion.div>
            ))}
          </motion.div>
        )}

      </div>
    </section>
  );
};

export default CertificationsSection;
