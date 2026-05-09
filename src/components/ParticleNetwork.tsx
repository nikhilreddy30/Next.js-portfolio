'use client';

import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

interface MousePosition {
  x: number;
  y: number;
}

export default function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<MousePosition>({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | undefined>(undefined);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Configuration
    const config = {
      particleCount: 150,
      particleSpeed: 0.3,
      connectionDistance: 120,
      mouseRadius: 150,
      mouseRepelForce: 0.8,
      particleColor: 'rgba(59, 130, 246, 0.6)', // Blue
      lineColor: 'rgba(59, 130, 246, 0.15)',
      glowColor: 'rgba(59, 130, 246, 0.4)',
    };

    // Handle high-DPI displays
    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      ctx.scale(dpr, dpr);

      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      for (let i = 0; i < config.particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * config.particleSpeed,
          vy: (Math.random() - 0.5) * config.particleSpeed,
          radius: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.5 + 0.5,
        });
      }
    };

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    // Mouse leave handler
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    // Update particle positions
    const updateParticles = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const mouse = mouseRef.current;

      particlesRef.current.forEach((particle) => {
        // Calculate distance to mouse
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Mouse repel effect
        if (distance < config.mouseRadius) {
          const force = (config.mouseRadius - distance) / config.mouseRadius;
          const angle = Math.atan2(dy, dx);
          particle.vx -= Math.cos(angle) * force * config.mouseRepelForce;
          particle.vy -= Math.sin(angle) * force * config.mouseRepelForce;
        }

        // Apply velocity with damping
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.98;
        particle.vy *= 0.98;

        // Add subtle random motion
        particle.vx += (Math.random() - 0.5) * 0.05;
        particle.vy += (Math.random() - 0.5) * 0.05;

        // Limit velocity
        const maxVelocity = 2;
        const velocity = Math.sqrt(particle.vx ** 2 + particle.vy ** 2);
        if (velocity > maxVelocity) {
          particle.vx = (particle.vx / velocity) * maxVelocity;
          particle.vy = (particle.vy / velocity) * maxVelocity;
        }

        // Boundary collision with bounce
        if (particle.x < 0 || particle.x > width) {
          particle.vx *= -0.5;
          particle.x = Math.max(0, Math.min(width, particle.x));
        }
        if (particle.y < 0 || particle.y > height) {
          particle.vy *= -0.5;
          particle.y = Math.max(0, Math.min(height, particle.y));
        }
      });
    };

    // Draw connections between nearby particles
    const drawConnections = () => {
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < config.connectionDistance) {
            // Calculate opacity based on distance
            const opacity = 1 - distance / config.connectionDistance;

            // Check if line is near mouse
            const midX = (particles[i].x + particles[j].x) / 2;
            const midY = (particles[i].y + particles[j].y) / 2;
            const mouseDistToLine = Math.sqrt(
              (mouse.x - midX) ** 2 + (mouse.y - midY) ** 2
            );

            // Brighten lines near mouse
            const mouseFactor = mouseDistToLine < config.mouseRadius
              ? 1 + (config.mouseRadius - mouseDistToLine) / config.mouseRadius
              : 1;

            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity * 0.15 * mouseFactor})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    // Draw particles
    const drawParticles = () => {
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      particles.forEach((particle) => {
        // Calculate distance to mouse
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Brighten particles near mouse
        let brightness = particle.opacity;
        if (distance < config.mouseRadius) {
          brightness += (config.mouseRadius - distance) / config.mouseRadius;
        }

        // Draw particle glow
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.radius * 3
        );
        gradient.addColorStop(0, `rgba(59, 130, 246, ${brightness * 0.6})`);
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius * 3, 0, Math.PI * 2);
        ctx.fill();

        // Draw particle core
        ctx.fillStyle = `rgba(59, 130, 246, ${brightness})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    // Animation loop
    const animate = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Update and draw
      updateParticles();
      drawConnections();
      drawParticles();

      // Continue animation
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Handle window resize
    const handleResize = () => {
      setCanvasSize();
      initParticles();
    };

    // Initialize
    setCanvasSize();
    initParticles();
    animate();

    // Event listeners
    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isClient]);

  if (!isClient) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{
        zIndex: 0,
        background: 'transparent',
      }}
    />
  );
}
