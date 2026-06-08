"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { certifications as portfolioCertifications } from "@/data/portfolio";

/* ================= CATEGORY CONFIG ================= */
const CATEGORY_CONFIG = {
  Programming: {
    color: "border-emerald-500 text-emerald-400",
    bg: "from-emerald-500/20 to-emerald-500/5",
    iconBg: "bg-emerald-500/20 border-emerald-500/30",
    button: "bg-emerald-500 hover:bg-emerald-600",
  },
  Database: {
    color: "border-cyan-500 text-cyan-400",
    bg: "from-cyan-500/20 to-cyan-500/5",
    iconBg: "bg-cyan-500/20 border-cyan-500/30",
    button: "bg-cyan-500 hover:bg-cyan-600",
  },
  Cloud: {
    color: "border-purple-500 text-purple-400",
    bg: "from-purple-500/20 to-purple-500/5",
    iconBg: "bg-purple-500/20 border-purple-500/30",
    button: "bg-purple-500 hover:bg-purple-600",
  },
  DevOps: {
    color: "border-pink-500 text-pink-400",
    bg: "from-pink-500/20 to-pink-500/5",
    iconBg: "bg-pink-500/20 border-pink-500/30",
    button: "bg-pink-500 hover:bg-pink-600",
  },
  "AI/ML": {
    color: "border-indigo-500 text-indigo-400",
    bg: "from-indigo-500/20 to-indigo-500/5",
    iconBg: "bg-indigo-500/20 border-indigo-500/30",
    button: "bg-indigo-500 hover:bg-indigo-600",
  },
  Professional: {
    color: "border-orange-500 text-orange-400",
    bg: "from-orange-500/20 to-orange-500/5",
    iconBg: "bg-orange-500/20 border-orange-500/30",
    button: "bg-orange-500 hover:bg-orange-600",
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
      issuerLogo:
        ISSUER_LOGOS[cert.issuer] || "/images/issuers/default.png",
      year: cert.date,
      description: cert.description,
      certificateUrl: cert.credentialUrl || "#",
      category: cert.category as CategoryKey,
      ...config,
    };
  }
);

/* ================= CARD ================= */
const CertificationCard = ({ cert }: { cert: CertificationUI }) => {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-3xl bg-slate-900/60 border border-slate-700/50 p-6 h-full hover:shadow-xl transition-all">
        {/* Gradient */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${cert.bg}`}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />

        <div className="relative z-10">
          {/* TOP: ISSUER ICON */}
          <div className="flex justify-between items-start mb-5">
            <div className={`w-14 h-14 rounded-xl ${cert.iconBg} flex items-center justify-center`}>
              <img
                src={cert.issuerLogo}
                alt={cert.issuer}
                className="w-8 h-8 object-contain"
              />
            </div>

            <span className={`px-3 py-1 rounded-full text-xs border ${cert.color}`}>
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

          {/* ISSUER TEXT ONLY (NO DUPLICATE LOGO) */}
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
          >
            <ExternalLink className="w-4 h-4" />
            View Certificate
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

/* ================= MAIN ================= */
export const CertificationsSection = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);

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

  // Carousel Configuration
  const step = 320; // Width + gap for each card
  const extended = [...certifications, ...certifications, ...certifications];
  const singleSetWidth = certifications.length * step;
  const centerIdx = Math.floor(extended.length / 2);
  
  // Start positioned at the middle set
  const x = useMotionValue(-centerIdx * step);

  // Autoplay Logic
  useEffect(() => {
    if (isDragging || isHovered || activeFilter !== "all") return;
    
    let animationFrameId: number;
    let lastTime = performance.now();

    const animateScroll = (time: number) => {
      const delta = Math.min(time - lastTime, 50); // Cap delta to prevent huge jumps
      lastTime = time;
      const speed = 0.05; // pixels per ms (~3px per frame, smooth premium feel)

      let newX = x.get() - speed * delta; // Move right to left

      // Seamless infinite wrap logic
      const limit = singleSetWidth;
      if (newX < -limit * 1.5 - 10) {
        newX += limit;
      } else if (newX > -limit * 0.5 + 10) {
        newX -= limit;
      }

      x.set(newX);
      animationFrameId = requestAnimationFrame(animateScroll);
    };

    animationFrameId = requestAnimationFrame(animateScroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isDragging, isHovered, activeFilter, singleSetWidth, x]);

  const handleDragEnd = () => {
    isDraggingRef.current = false;
    setIsDragging(false);
    
    const currentX = x.get();
    const limit = singleSetWidth;
    
    // Wrap before snapping to ensure we snap to the middle set
    let snappedX = currentX;
    if (snappedX < -limit * 1.5) snappedX += limit;
    if (snappedX > -limit * 0.5) snappedX -= limit;

    // Snap to nearest card
    const nearest = Math.round(snappedX / step) * step;
    animate(x, nearest, { type: "spring", stiffness: 300, damping: 30 });
  };

  const handleCardClick = (i: number) => {
    if (isDraggingRef.current) return;
    
    const limit = singleSetWidth;
    // Find the equivalent index in the middle set to avoid wrap jumps during animation
    const middleSetIndex = (i % certifications.length) + certifications.length;
    let targetX = -middleSetIndex * step;

    // Ensure targetX is within the safe wrap zone
    if (targetX < -limit * 1.5) targetX += limit;
    if (targetX > -limit * 0.5) targetX -= limit;

    animate(x, targetX, { type: "spring", stiffness: 300, damping: 30 });
  };

  return (
    <section id="certifications" className="py-16 px-4">
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
                  : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* CONTENT: CAROUSEL OR GRID */}
        {activeFilter === "all" ? (
          <div 
            className="relative w-full overflow-hidden py-10"
            style={{ perspective: "1000px", minHeight: "480px" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <motion.div
              className="flex items-center justify-center cursor-grab active:cursor-grabbing"
              drag="x"
              dragElastic={0.1}
              onDragStart={() => {
                isDraggingRef.current = true;
                setIsDragging(true);
              }}
              onDragEnd={handleDragEnd}
              style={{ x }}
            >
              {extended.map((cert, i) => {
                // Calculate transforms based on distance from center
                const centerX = -i * step;
                
                const scale = useTransform(
                  x,
                  [centerX - step * 2, centerX - step, centerX, centerX + step, centerX + step * 2],
                  [0.75, 0.85, 1.2, 0.85, 0.75]
                );
                
                const opacity = useTransform(
                  x,
                  [centerX - step * 2, centerX - step, centerX, centerX + step, centerX + step * 2],
                  [0.3, 0.6, 1, 0.6, 0.3]
                );
                
                const rotateY = useTransform(
                  x,
                  [centerX - step * 2, centerX - step, centerX, centerX + step, centerX + step * 2],
                  [15, 10, 0, -10, -15]
                );
                
                const zIndex = useTransform(
                  x,
                  [centerX - step * 2, centerX - step, centerX, centerX + step, centerX + step * 2],
                  [10, 20, 30, 20, 10]
                );
                
                const blur = useTransform(
                  x,
                  [centerX - step * 2, centerX - step, centerX, centerX + step, centerX + step * 2],
                  ["blur(4px)", "blur(2px)", "blur(0px)", "blur(2px)", "blur(4px)"]
                );

                const boxShadow = useTransform(
                  x,
                  [centerX - step * 2, centerX - step, centerX, centerX + step, centerX + step * 2],
                  [
                    "0 0 0px rgba(0,0,0,0)",
                    "0 10px 20px rgba(0,0,0,0.2)",
                    "0 25px 50px rgba(0,0,0,0.5), 0 0 30px rgba(255,255,255,0.1)",
                    "0 10px 20px rgba(0,0,0,0.2)",
                    "0 0 0px rgba(0,0,0,0)",
                  ]
                );

                return (
                  <motion.div
                    key={`${cert.id}-${i}`}
                    className="flex-shrink-0 w-[280px] md:w-[320px] mx-2"
                    style={{
                      scale,
                      opacity,
                      rotateY,
                      zIndex,
                      filter: blur,
                      boxShadow,
                      transformStyle: "preserve-3d",
                      willChange: "transform, opacity, filter",
                    }}
                    onTap={() => handleCardClick(i)}
                  >
                    <CertificationCard cert={cert} />
                  </motion.div>
                );
              })}
            </motion.div>
            
            {/* Gradient Fades on Edges */}
            <div className="absolute inset-y-0 left-0 w-20 md:w-32 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none z-20" />
            <div className="absolute inset-y-0 right-0 w-20 md:w-32 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none z-20" />
          </div>
        ) : (
          /* GRID FALLBACK */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((cert) => (
              <CertificationCard key={cert.id} cert={cert} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CertificationsSection;
