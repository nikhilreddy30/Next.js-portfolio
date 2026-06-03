"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Layers,
  Database,
  FileCode,
  Palette,
  Server,
  GitBranch,
  Github,
  Container,
  Flame,
  Terminal,
  Key,
  Table,
  Cpu,
  Braces,
} from "lucide-react";
import type { Skill } from "@/data/portfolio";
import { skills } from "@/data/portfolio";

const categories = [
  { id: "all", label: "All Skills", color: "bg-gradient-to-r from-purple-500 to-pink-500" },
  { id: "languages", label: "Languages", color: "bg-gradient-to-r from-blue-500 to-cyan-500" },
  { id: "frontend", label: "Frontend", color: "bg-gradient-to-r from-green-500 to-emerald-500" },
  { id: "backend", label: "Backend", color: "bg-gradient-to-r from-orange-500 to-yellow-500" },
  { id: "database", label: "Database", color: "bg-gradient-to-r from-red-500 to-rose-500" },
  { id: "tools", label: "Tools", color: "bg-gradient-to-r from-indigo-500 to-violet-500" },
];

// Icon mapping
const iconMap: Record<string, any> = {
  Code2,
  Layers,
  Database,
  FileCode,
  Palette,
  Server,
  GitBranch,
  Github,
  Container,
  Flame,
  Terminal,
  Key,
  Table,
  Cpu,
  Braces,
};

const SkillBar = ({ level }: { level: number }) => (
  <div className="w-full h-3 bg-secondary/20 rounded-full overflow-hidden">
    <motion.div
      initial={{ width: 0 }}
      whileInView={{ width: `${level}%` }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, delay: 0.2 }}
      className={`h-full rounded-full ${
        level > 75
          ? "bg-gradient-to-r from-green-400 to-emerald-500"
          : level > 50
          ? "bg-gradient-to-r from-yellow-400 to-amber-500"
          : "bg-gradient-to-r from-red-400 to-pink-500"
      }`}
    />
  </div>
);

const InfiniteScrollSkills = ({ skills }: { skills: Skill[] }) => {
  const duplicatedSkills = [
    ...skills,
    ...skills,
    ...skills,
    ...skills,
    ...skills,
  ];

  return (
    <div className="w-full overflow-hidden py-10">
      {/* Top Row */}
      <motion.div
        className="flex min-w-max gap-2 mb-10"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 80,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {duplicatedSkills.map((skill, index) => {
          const IconComponent = iconMap[skill.icon] || Code2;

          return (
            <div
              key={`${skill.name}-${index}`}
              className="flex-shrink-0 flex flex-col items-center gap-2 min-w-[80px]"
            >
              <div className="w-16 h-16 rounded-full glass-subtle border-2 border-primary/50 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <IconComponent className="w-8 h-8 text-primary" />
              </div>

              <span className="text-sm font-medium text-center whitespace-nowrap">
                {skill.name}
              </span>
            </div>
          );
        })}
      </motion.div>

      {/* Bottom Row */}
      <motion.div
        className="flex min-w-max gap-2"
        animate={{ x: ["-50%", "0%"] }}
        transition={{
          duration: 80,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {[...duplicatedSkills].reverse().map((skill, index) => {
          const IconComponent = iconMap[skill.icon] || Code2;

          return (
            <div
              key={`${skill.name}-reverse-${index}`}
              className="flex-shrink-0 flex flex-col items-center gap-2 min-w-[80px]"
            >
              <div className="w-16 h-16 rounded-full glass-subtle border-2 border-primary/50 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <IconComponent className="w-8 h-8 text-primary" />
              </div>

              <span className="text-sm font-medium text-center whitespace-nowrap">
                {skill.name}
              </span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );

  return (
    <section
      id="skills"
      className="py-16 px-0 bg-gradient-to-br from-background via-secondary/5 to-background"
    >
      <div className="w-full max-w-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-3 py-1.5 rounded-full glass-subtle border border-primary/30 text-xs font-mono text-primary mb-6 glow-primary">
            ──── EXPERTISE
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            My{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Skills
            </span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Technologies I've mastered and my proficiency levels
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2.5 rounded-full font-medium border border-transparent hover:shadow-lg transition-all ${
                activeCategory === category.id
                  ? `${category.color} text-white shadow-md`
                  : "bg-secondary/50 text-foreground hover:bg-secondary/70"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
            </motion.button>
          ))}
        </div>

        {activeCategory === "all" ? (
          <InfiniteScrollSkills skills={skills} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill) => {
                const IconComponent = iconMap[skill.icon] || Code2;
                return (
                  <motion.div
                    key={skill.name}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-card p-6 rounded-2xl border border-border/30 hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-lg group"
                  >
                    <div className="flex items-start gap-4 mb-5">
                      <div className="w-12 h-12 rounded-full glass-subtle border-2 border-primary/50 flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                            {skill.name}
                          </h3>
                          <span
                            className={`text-sm font-medium px-2 py-1 rounded-full ${
                              skill.level > 75
                                ? "bg-emerald-500/10 text-emerald-500"
                                : skill.level > 50
                                ? "bg-amber-500/10 text-amber-500"
                                : "bg-pink-500/10 text-pink-500"
                            }`}
                          >
                            {skill.level}%
                          </span>
                        </div>
                        <SkillBar level={skill.level} />
                        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                          <span>Basic</span>
                          <span>Advanced</span>
                          <span>Expert</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};

export default SkillsSection;
