"use client";

import { useState, useEffect } from "react";
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

const GitHubInsights = () => {
  const [info, setInfo] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace with your GitHub username
    const username = "your-github-username";
    
    fetch(`https://api.github.com/users/${username}`)
      .then((res) => res.json())
      .then((data) => {
        setInfo(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching GitHub data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-16"
    >
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold mb-2">
          GitHub{" "}
          <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Activity
          </span>
        </h3>
        <p className="text-muted-foreground">My coding journey on GitHub</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto px-4">
        {/* Profile Details Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-card rounded-2xl shadow-lg border border-border/30 overflow-hidden"
        >
          <div className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-b border-border/30">
            <h4 className="font-semibold text-lg flex items-center gap-2">
              <Github className="w-5 h-5" />
              Profile Overview
            </h4>
          </div>
          <div className="p-4 flex items-center justify-center bg-background">
            <img
              src={`https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=your-github-username&theme=algolia`}
              alt="GitHub Profile Details"
              className="max-w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
        </motion.div>

        {/* Languages Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-card rounded-2xl shadow-lg border border-border/30 overflow-hidden"
        >
          <div className="p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-b border-border/30">
            <h4 className="font-semibold text-lg flex items-center gap-2">
              <Code2 className="w-5 h-5" />
              Top Languages
            </h4>
          </div>
          <div className="p-4 flex items-center justify-center bg-background">
            <img
              src={`https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=your-github-username&theme=algolia`}
              alt="Top Languages"
              className="max-w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
        </motion.div>

        {/* Stats Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-card rounded-2xl shadow-lg border border-border/30 overflow-hidden"
        >
          <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-b border-border/30">
            <h4 className="font-semibold text-lg flex items-center gap-2">
              <GitBranch className="w-5 h-5" />
              GitHub Stats
            </h4>
          </div>
          <div className="p-4 flex items-center justify-center bg-background">
            <img
              src={`https://github-profile-summary-cards.vercel.app/api/cards/stats?username=your-github-username&theme=algolia`}
              alt="GitHub Stats"
              className="max-w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
        </motion.div>

        {/* Most Used Languages Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-card rounded-2xl shadow-lg border border-border/30 overflow-hidden"
        >
          <div className="p-4 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border-b border-border/30">
            <h4 className="font-semibold text-lg flex items-center gap-2">
              <Terminal className="w-5 h-5" />
              Most Productive Time
            </h4>
          </div>
          <div className="p-4 flex items-center justify-center bg-background">
            <img
              src={`https://github-profile-summary-cards.vercel.app/api/cards/most-commit-language?username=your-github-username&theme=algolia`}
              alt="Most Commit Language"
              className="max-w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>

      {/* GitHub Contribution Graph */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12 max-w-6xl mx-auto px-4"
      >
        <div className="bg-card rounded-2xl shadow-lg border border-border/30 overflow-hidden">
          <div className="p-4 bg-gradient-to-r from-indigo-500/10 to-violet-500/10 border-b border-border/30">
            <h4 className="font-semibold text-lg flex items-center gap-2">
              <Flame className="w-5 h-5" />
              Contribution Activity
            </h4>
          </div>
          <div className="p-6 flex items-center justify-center bg-background">
            <img
              src={`https://ghchart.rshah.org/your-github-username`}
              alt="GitHub Contribution Chart"
              className="max-w-full h-auto"
              loading="lazy"
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 max-w-7xl mx-auto">
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

        {/* GitHub Insights Section */}
        <GitHubInsights />
      </div>
    </section>
  );
};

export default SkillsSection;
