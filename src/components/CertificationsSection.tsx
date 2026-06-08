"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, animate } from "framer-motion";
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
    button: "bg-indigo-500 hover:bg-indigo-600",
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
  isCenter = false,
}: {
  cert: CertificationUI;
  isCenter?: boolean;
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-slate-900/60 border border-slate-700/50 p-6 h-full hover:shadow-xl transition-all w-full">
      {/* Gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${cert.bg} ${isCenter ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
      />

      <div className="relative z-10">
        {/* TOP: ISSUER ICON */}
        <div className="flex justify-between items-start mb-5">
          <div
            className={`w-14 h-14 rounded-xl ${cert.iconBg} flex items-center justify-center`}
          >
            <img
              src={cert.issuerLogo}
              alt={cert.issuer}
              className="w-8 h-8 object-contain"
            />
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs border ${cert.color}`}
          >
            {cert.category}
          </span>
        </div>

        {/* TITLE */}
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
          {cert.title}
        </h3>

        {/* DESCRIPTION */}
        <p className="text-sm text-slate-400 mb-4 line-clamp-3 min-h-[60px]">
          {cert.description}
        </p>

        {/* ISSUER + YEAR */}
        <div className="flex items-center justify-between mb-5">
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
          className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white font-semibold transition ${cert.button}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
        >
          <ExternalLink className="w-4 h-4" />
          View Certificate
        </motion.a>
      </div>
    </div>
  );
};

/* ================= COVER FLOW CAROUSEL ================= */

// Duplicate items for seamless infinite loop
function buildLoopItems(items: CertificationUI[]) {
  // Triple the array so we can loop seamlessly
  return [...items, ...items, ...items];
}

const CoverFlowCarousel = ({ items }: { items: CertificationUI[] }) => {
  const looped = buildLoopItems(items);
  const count = items.length;
  const totalCount = looped.length;

  // Start at the middle copy
  const [activeIndex, setActiveIndex] = useState(count);
  const isHovering = useRef(false);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Drag state
  const dragStartX = useRef(0);
  const isDragging = useRef(false);

  // Card dimensions (responsive)
  const getCardWidth = () => {
    if (typeof window === "undefined") return 320;
    if (window.innerWidth < 640) return Math.min(window.innerWidth - 48, 300);
    if (window.innerWidth < 1024) return 300;
    return 340;
  };

  const getGap = () => {
    if (typeof window === "undefined") return 24;
    if (window.innerWidth < 640) return 16;
    return 28;
  };

  const [cardWidth, setCardWidth] = useState(340);
  const [gap, setGap] = useState(28);

  useEffect(() => {
    const update = () => {
      setCardWidth(getCardWidth());
      setGap(getGap());
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Snap to index with infinite loop correction
  const goTo = useCallback(
    (idx: number) => {
      let target = idx;
      // Keep within the middle copy range to allow infinite feel
      if (target < count / 2) target += count;
      if (target >= totalCount - count / 2) target -= count;
      setActiveIndex(target);
    },
    [count, totalCount]
  );

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  // Autoplay
  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      if (!isHovering.current) next();
    }, 2800);
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [next]);

  // Drag handlers
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = true;
    dragStartX.current =
      "touches" in e ? e.touches[0].clientX : e.clientX;
  };

  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const endX =
      "changedTouches" in e
        ? e.changedTouches[0].clientX
        : e.clientX;
    const delta = dragStartX.current - endX;
    if (Math.abs(delta) > 40) {
      delta > 0 ? next() : prev();
    }
  };

  // Compute per-card transform
  const getCardStyle = (idx: number) => {
    const offset = idx - activeIndex;
    const absOffset = Math.abs(offset);

    // Only render cards within visible range
    const visible = absOffset <= 3;

    // Scale: center=1.18, ±1=0.88, ±2=0.72, beyond=0.6
    const scaleMap: Record<number, number> = {
      0: 1.18,
      1: 0.87,
      2: 0.70,
      3: 0.58,
    };
    const scale = scaleMap[Math.min(absOffset, 3)] ?? 0.55;

    // Opacity
    const opacityMap: Record<number, number> = {
      0: 1,
      1: 0.72,
      2: 0.45,
      3: 0.2,
    };
    const opacity = opacityMap[Math.min(absOffset, 3)] ?? 0;

    // Horizontal translation — cards spread out from center
    const spreadFactor = cardWidth * 0.62 + gap;
    const translateX = offset * spreadFactor;

    // 3D rotation for side cards
    const rotateY = offset === 0 ? 0 : offset > 0 ? -28 : 28;

    // Blur
    const blur = absOffset === 0 ? 0 : absOffset === 1 ? 1 : absOffset === 2 ? 3 : 5;

    // Z-index
    const zIndex = 100 - absOffset * 10;

    return { scale, opacity, translateX, rotateY, blur, zIndex, visible };
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full select-none"
      style={{ perspective: "1200px" }}
      onMouseEnter={() => (isHovering.current = true)}
      onMouseLeave={() => (isHovering.current = false)}
      onMouseDown={handleDragStart}
      onMouseUp={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchEnd={handleDragEnd}
    >
      {/* Carousel stage */}
      <div
        className="relative mx-auto overflow-visible"
        style={{
          height: `${cardWidth * 1.42}px`,
          width: "100%",
          maxWidth: "100%",
        }}
      >
        {looped.map((cert, idx) => {
          const s = getCardStyle(idx);
          if (!s.visible) return null;

          const isCenter = idx === activeIndex;

          return (
            <motion.div
              key={`${cert.id}-${idx}`}
              onClick={() => !isDragging.current && goTo(idx)}
              animate={{
                x: `calc(50% - ${cardWidth / 2}px + ${s.translateX}px)`,
                scale: s.scale,
                opacity: s.opacity,
                rotateY: s.rotateY,
                filter: s.blur > 0 ? `blur(${s.blur}px)` : "none",
                zIndex: s.zIndex,
              }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 32,
                mass: 0.8,
              }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: cardWidth,
                height: "100%",
                cursor: isCenter ? "default" : "pointer",
                transformStyle: "preserve-3d",
                boxShadow: isCenter
                  ? `0 0 48px 8px ${cert.glow}, 0 24px 60px rgba(0,0,0,0.55)`
                  : "0 8px 32px rgba(0,0,0,0.3)",
                borderRadius: "24px",
              }}
            >
              <CertificationCard cert={cert} isCenter={isCenter} />
            </motion.div>
          );
        })}
      </div>

      {/* Navigation dots — based on original items */}
      <div className="flex justify-center gap-2 mt-8">
        {items.map((_, i) => {
          const isActive = ((activeIndex % count) + count) % count === i;
          return (
            <button
              key={i}
              onClick={() => goTo(count + i)}
              className={`rounded-full transition-all duration-300 ${
                isActive
                  ? "w-6 h-2 bg-white"
                  : "w-2 h-2 bg-slate-600 hover:bg-slate-400"
              }`}
              aria-label={`Go to card ${i + 1}`}
            />
          );
        })}
      </div>

      {/* Nav arrows */}
      <button
        onClick={prev}
        className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-[200] w-10 h-10 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center text-white hover:bg-slate-700 transition"
        aria-label="Previous"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-[200] w-10 h-10 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center text-white hover:bg-slate-700 transition"
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
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-3">Certifications</h2>
          <p className="text-slate-400">
            Verified credentials across cloud, development, and AI
          </p>
        </div>

        {/* FILTER */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
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

        {/* COVER FLOW (all) or GRID (filtered) */}
        {activeFilter === "all" ? (
          <CoverFlowCarousel items={certifications} />
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
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative"
              >
                <CertificationCard cert={cert} isCenter />
              </motion.div>
            ))}
          </motion.div>
        )}

      </div>
    </section>
  );
};

export default CertificationsSection;
