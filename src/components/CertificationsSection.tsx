"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
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
      className="group relative h-full"
    >
      <div className="relative overflow-hidden rounded-3xl bg-slate-900/60 border border-slate-700/50 p-6 h-full hover:shadow-xl transition-all">

        {/* Gradient */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${cert.bg}`}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />

        <div className="relative z-10 flex flex-col h-full">

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

          {/* ISSUER TEXT ONLY */}
          <div className="flex items-center justify-between mb-5 mt-auto">
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

/* ================= SLIDER ================= */
const CertificationSlider = ({ certs }: { certs: CertificationUI[] }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);

  // Cards per page based on screen size
  const cardsPerPage = 3;
  const totalPages = Math.ceil(certs.length / cardsPerPage);

  const currentCerts = certs.slice(
    currentPage * cardsPerPage,
    currentPage * cardsPerPage + cardsPerPage
  );

  const goToPage = (page: number) => {
    setDirection(page > currentPage ? 1 : -1);
    setCurrentPage(page);
  };

  const nextPage = () => {
    setDirection(1);
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setDirection(-1);
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  // Slide animation variants
  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  if (certs.length === 0) {
    return (
      <div className="text-center py-12 text-slate-400">
        No certifications found in this category.
      </div>
    );
  }

  return (
    <div className="relative">
      {/* SLIDER VIEWPORT */}
      <div className="overflow-hidden rounded-2xl">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentPage}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 },
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {currentCerts.map((cert) => (
              <CertificationCard key={cert.id} cert={cert} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* NAVIGATION BUTTONS */}
      {totalPages > 1 && (
        <>
          <button
            onClick={prevPage}
            className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-slate-800/80 backdrop-blur border border-slate-700 text-white flex items-center justify-center hover:bg-primary hover:border-primary transition-all shadow-lg hover:scale-110"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextPage}
            className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-slate-800/80 backdrop-blur border border-slate-700 text-white flex items-center justify-center hover:bg-primary hover:border-primary transition-all shadow-lg hover:scale-110"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* DOTS INDICATOR */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToPage(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentPage
                  ? "w-8 bg-gradient-to-r from-cyan-400 to-blue-500"
                  : "w-2 bg-slate-600 hover:bg-slate-500"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
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
    <section id="certifications" className="py-16 px-4">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-3 py-1.5 rounded-full glass-subtle border border-primary/30 text-xs font-mono text-primary mb-6 glow-primary">
            ──── ACHIEVEMENTS
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            My{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Certifications
            </span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full" />
          <p className="text-slate-400">
            Verified credentials across cloud, development, and AI
          </p>
        </motion.div>

        {/* FILTER */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full border ${
                activeFilter === cat
                  ? "bg-primary text-white"
                  : "bg-slate-800 text-slate-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* SLIDER */}
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="px-8"
        >
          <CertificationSlider certs={filtered} />
        </motion.div>

      </div>
    </section>
  );
};

export default CertificationsSection;
