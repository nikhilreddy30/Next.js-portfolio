"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimizePresence } from "framer-motion";
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
    <div className={`relative overflow-hidden rounded-3xl bg-slate-900/60 border border-slate-700/50 p-4 h-full flex flex-col ${isActive ? 'shadow-xl' : ''}`}>
      {/* Gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${cert.bg} ${isActive ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
      />

      <div className="relative z-10 flex flex-col h-full">
        {/* TOP: ISSUER ICON */}
        <div className="flex justify-between items-start mb-3">
          <div
            className={`w-10 h-10 rounded-xl ${cert.iconBg} flex items-center justify-center`}
          >
            <img
              src={cert.issuerLogo}
              alt={cert.issuer}
              className="w-6 h-6 object-contain"
            />
          </div>
          <span
            className={`px-2 py-0.5 rounded-full text-xs border ${cert.color}`}
          >
            {cert.category}
          </span>
        </div>

        {/* TITLE */}
        <h3 className="text-base font-bold text-white mb-1.5 line-clamp-2 flex-shrink-0">
          {cert.title}
        </h3>

        {/* DESCRIPTION */}
        <p className="text-sm text-slate-400 mb-3 line-clamp-3 flex-grow min-h-[50px] overflow-hidden">
          {cert.description}
        </p>

        {/* ISSUER + YEAR */}
        <div className="flex items-center justify-between mb-3 flex-shrink-0">
          <span className="text-sm text-slate-300 font-medium">
            {cert.issuer}
          </span>
          <span className="text-sm text-slate-400 font-semibold">
            {cert.year}
          </span>
        </div>

        {/* BUTTON */}
        <motion.a
          href={cert.certificateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-white font-semibold transition ${cert.button} mt-auto`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span className="text-sm">View Certificate</span>
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
  const containerRef = useRef<HTMLDivElement>(null);

  // Card dimensions (responsive)
  const getCardWidth = () => {
    if (typeof window === "undefined") return 300;
    if (window.innerWidth < 640) return Math.min(window.innerWidth - 40, 260);
    if (window.innerWidth < 1024) return 300;
    return 320;
  };

  const [cardWidth, setCardWidth] = useState(320);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    const update = () => {
      const width = getCardWidth();
      setCardWidth(width);
      // Calculate height based on card aspect ratio (approx 1.4:1)
      setContainerHeight(width * 1.4);
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

  // Get visible cards
  const getVisibleCards = () => {
    const visible = [];
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + items.length) % items.length;
      visible.push({
        item: items[index],
        index,
        position: i,
        isActive: i === 0,
      });
    }
    return visible;
  };

  const visibleCards = getVisibleCards();

  return (
    <div
      ref={containerRef}
      className="relative w-full select-none overflow-visible"
      onMouseEnter={() => (isHovering.current = true)}
      onMouseLeave={() => (isHovering.current = false)}
    >
      {/* Carousel container - increased height to accommodate scaled center card */}
      <div 
        className="relative mx-auto overflow-visible"
        style={{ height: `${containerHeight * 1.2}px` }}
      >
        <div
          className="flex items-center justify-center relative"
          style={{
            height: "100%",
            width: "100%",
            maxWidth: "1200px",
          }}
        >
          {visibleCards.map(({ item, position, isActive }, idx) => {
            // Calculate visibility percentage (30% for side cards)
            const visibility = isActive ? 1 : 0.3;
            
            return (
              <motion.div
                key={`${item.id}-${idx}`}
                onClick={() => position !== 0 && goToIndex((currentIndex + position + items.length) % items.length)}
                className="absolute cursor-pointer"
                style={{
                  width: cardWidth,
                  height: containerHeight,
                  // Position using translateX for better control
                  left: "50%",
                  transform: `translateX(${position * cardWidth * 0.7}px) translateX(-50%)`,
                }}
                animate={{
                  scale: isActive ? 1.18 : 0.85,
                  opacity: isActive ? 1 : 0.65,
                  zIndex: isActive ? 10 : 1,
                  y: isActive ? 0 : 20, // Slight vertical offset for depth
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                  mass: 0.8,
                }}
              >
                <CertificationCard cert={item} isActive={isActive} />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Navigation dots */}
      <div className="flex justify-center gap-2 mt-6">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => goToIndex(i)}
            className={`rounded-full transition-all duration-300 ${
              currentIndex === i
                ? "w-8 h-2 bg-white"
                : "w-2 h-2 bg-slate-600 hover:bg-slate-400"
            }`}
            aria-label={`Go to card ${i + 1}`}
          />
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-[20] w-12 h-12 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center text-white hover:bg-slate-700 transition"
        aria-label="Previous"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-[20] w-12 h-12 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center text-white hover:bg-slate-700 transition"
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
    <section id="certifications" className="py-16 px-4 overflow-x-hidden">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-2">Certifications</h2>
          <p className="text-slate-400">
            Verified credentials across cloud, development, and AI
          </p>
        </div>

        {/* FILTER */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full border transition-colors ${
                activeFilter === cat
                  ? "bg-primary text-white border-primary"
                  : "bg-slate-800 text-slate-300 border-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* CENTER-FOCUSED CAROUSEL (all) or GRID (filtered) */}
        {activeFilter === "all" ? (
          <div className="px-2">
            <CenterFocusedCarousel items={certifications} />
          </div>
        ) : (
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filtered.map((cert) => (
              <motion.div
                key={cert.id}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative"
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
