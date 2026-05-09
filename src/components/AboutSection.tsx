"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const AboutSection = () => {
  const stats = [
    { label: "CGPA", value: "8.5 / 10", icon: "🎓" },
    { label: "Projects Completed", value: "3+", icon: "📦" },
    { label: "Certifications Earned", value: "18+", icon: "📜" },
  ];

  return (
    <section id="about" className="py-20 text-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            About{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Me
            </span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left - Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative w-72 h-72">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full rotate-6 blur-xl opacity-40" />
              
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-gray-700 hover:border-cyan-400 transition">
                <Image
                  src="/profile.png"
                  alt="Nikhil"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold">
              Hi, I'm{" "}
              <span className="text-cyan-400">Nikhil 👋</span>
            </h3>

            {/* About Text */}
            <div className="text-gray-300 leading-relaxed space-y-4 text-lg">
              <p>
                <span className="text-cyan-400 font-semibold">
                  Computer Science Engineering student
                </span>{" "}
                with hands-on experience in{" "}
                <span className="text-cyan-400">web application development</span>.
              </p>

              <p>
                Proficient in{" "}
                <span className="text-cyan-400 font-semibold">Java</span>,{" "}
                <span className="text-cyan-400 font-semibold">Python</span>, and{" "}
                <span className="text-cyan-400">modern web technologies</span>, with practical
                exposure to{" "}
                <span className="text-cyan-400">MERN stack</span> and{" "}
                <span className="text-cyan-400">PHP–MySQL applications</span>.
              </p>

              <p>
                Passionate about{" "}
                <span className="text-cyan-400">problem-solving</span>,{" "}
                <span className="text-cyan-400">clean code</span>, and{" "}
                <span className="text-cyan-400">scalable systems</span>, while continuously
                learning{" "}
                <span className="text-cyan-400">industry-level development practices</span>.
              </p>

              <p className="text-cyan-400 font-semibold text-xl">
                🎯 Goal: Full Stack Developer + AI Integration
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-center bg-gray-800 rounded-xl p-4 border border-gray-700 hover:border-cyan-400 transition"
              >
                {/* ✅ Icon */}
                <div className="text-2xl mb-2">{stat.icon}</div>
          
                {/* Value */}
                <div className="text-3xl font-bold text-cyan-400">
                  {stat.value}
                </div>
          
                {/* Label */}
                <div className="text-gray-400 text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
