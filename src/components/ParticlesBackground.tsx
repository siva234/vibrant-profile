
import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/components/ThemeProvider';

const ParticlesBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle configuration
    const particles: Array<{
      x: number;
      y: number;
      dx: number;
      dy: number;
      size: number;
      color: string;
      opacity: number;
    }> = [];

    // Create particles
    const createParticles = () => {
      const particleCount = 75;
      const colors = theme === 'dark' 
        ? [
            'rgba(139, 92, 246, 0.4)',   // Vibrant purple
            'rgba(255, 255, 255, 0.2)',  // Soft white
            'rgba(30, 64, 175, 0.3)'     // Deep blue
          ]
        : [
            'rgba(51, 195, 240, 0.4)',   // Sky blue
            'rgba(59, 130, 246, 0.3)',   // Bright blue
            'rgba(147, 51, 234, 0.2)'    // Soft purple
          ];

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          dx: (Math.random() - 0.5) * 0.7,
          dy: (Math.random() - 0.5) * 0.7,
          size: Math.random() * 8 + 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.7 + 0.3
        });
      }
    };

    // Animate particles
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.x += particle.dx;
        particle.y += particle.dy;

        // Wrap particles around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      requestAnimationFrame(animate);
    };

    createParticles();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 -z-10"
      style={{ opacity: 0.8 }}
    />
  );
};

export default ParticlesBackground;

