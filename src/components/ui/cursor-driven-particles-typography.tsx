"use client";

// Style 14. Additions to the original: the animation loop only runs while
// the canvas is on screen, a touch drags the particles like a cursor, and
// under reduced motion the word is drawn once and left still.

import React, { useEffect, useRef } from "react";

function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export interface CursorDrivenParticleTypographyProps {
  className?: string;
  text: string;
  fontSize?: number;
  /** Cap on the font size as a share of the container width. */
  maxWidthRatio?: number;
  fontFamily?: string;
  particleSize?: number;
  particleDensity?: number;
  dispersionStrength?: number;
  returnSpeed?: number;
  color?: string;
}

class Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  dispersion: number;
  returnSpd: number;

  constructor(
    x: number,
    y: number,
    size: number,
    color: string,
    dispersion: number,
    returnSpd: number
  ) {
    this.x = x + (Math.random() - 0.5) * 10;
    this.y = y + (Math.random() - 0.5) * 10;
    this.originX = x;
    this.originY = y;
    this.vx = (Math.random() - 0.5) * 5;
    this.vy = (Math.random() - 0.5) * 5;
    this.size = size;
    this.color = color;
    this.dispersion = dispersion;
    this.returnSpd = returnSpd;
  }

  update(mouseX: number, mouseY: number) {
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const interactionRadius = 120;

    if (distance < interactionRadius && mouseX !== -1000 && mouseY !== -1000) {
      const forceDirectionX = dx / distance;
      const forceDirectionY = dy / distance;
      const force = (interactionRadius - distance) / interactionRadius;

      const repulsionX = forceDirectionX * force * this.dispersion;
      const repulsionY = forceDirectionY * force * this.dispersion;

      this.vx -= repulsionX;
      this.vy -= repulsionY;
    }

    this.vx += (this.originX - this.x) * this.returnSpd;
    this.vy += (this.originY - this.y) * this.returnSpd;

    this.vx *= 0.85;
    this.vy *= 0.85;

    const distToOrigin = Math.sqrt(
      Math.pow(this.x - this.originX, 2) +
        Math.pow(this.y - this.originY, 2)
    );

    if (distToOrigin < 1 && Math.random() > 0.95) {
      this.vx += (Math.random() - 0.5) * 0.2;
      this.vy += (Math.random() - 0.5) * 0.2;
    }

    this.x += this.vx;
    this.y += this.vy;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

export function CursorDrivenParticleTypography({
  className,
  text,
  fontSize = 120,
  maxWidthRatio = 0.15,
  fontFamily = "Inter, sans-serif",
  particleSize = 1.5,
  particleDensity = 6,
  dispersionStrength = 15,
  returnSpeed = 0.08,
  color,
}: CursorDrivenParticleTypographyProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    let mouseX = -1000;
    let mouseY = -1000;

    let containerWidth = 0;
    let containerHeight = 0;

    const init = () => {
      const container = containerRef.current;
      if (!container) return;

      containerWidth = container.clientWidth;
      containerHeight = container.clientHeight;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = containerWidth * dpr;
      canvas.height = containerHeight * dpr;
      canvas.style.width = `${containerWidth}px`;
      canvas.style.height = `${containerHeight}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      const computedStyle = window.getComputedStyle(container);
      const textColor = color || computedStyle.color || "#000000";

      ctx.clearRect(0, 0, containerWidth, containerHeight);

      const effectiveFontSize = Math.min(fontSize, containerWidth * maxWidthRatio);
      ctx.fillStyle = textColor;
      ctx.font = `bold ${effectiveFontSize}px ${fontFamily}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.fillText(text, containerWidth / 2, containerHeight / 2);

      const textCoordinates = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );

      particles = [];

      const step = Math.max(1, Math.floor(particleDensity * dpr));

      for (let y = 0; y < textCoordinates.height; y += step) {
        for (let x = 0; x < textCoordinates.width; x += step) {
          const index = (y * textCoordinates.width + x) * 4;
          const alpha = textCoordinates.data[index + 3] || 0;

          if (alpha > 128) {
            particles.push(
              new Particle(
                x / dpr,
                y / dpr,
                particleSize,
                textColor,
                dispersionStrength,
                returnSpeed
              )
            );
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, containerWidth, containerHeight);

      particles.forEach((particle) => {
        particle.update(mouseX, mouseY);
        particle.draw(ctx);
      });

      if (running) animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    const handleResize = () => {
      init();
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let running = false;
    const start = () => {
      if (running) return;
      running = true;
      animate();
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(animationFrameId);
    };
    const io = new IntersectionObserver(([e]) => {
      if (reduce) return;
      if (e.isIntersecting) start();
      else stop();
    });

    const timeoutId = setTimeout(() => {
      init();
      if (reduce) {
        particles.forEach((p) => { p.x = p.originX; p.y = p.originY; p.draw(ctx); });
        return;
      }
      if (containerRef.current) io.observe(containerRef.current);
    }, 100);

    const resizeObserver = new ResizeObserver(handleResize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    const handleTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      const rect = canvas.getBoundingClientRect();
      mouseX = t.clientX - rect.left;
      mouseY = t.clientY - rect.top;
    };
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("touchmove", handleTouch, { passive: true });
    canvas.addEventListener("touchend", handleMouseLeave);

    return () => {
      clearTimeout(timeoutId);
      resizeObserver.disconnect();
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("touchmove", handleTouch);
      canvas.removeEventListener("touchend", handleMouseLeave);
      io.disconnect();
      stop();
    };
  }, [
    text,
    fontSize,
    maxWidthRatio,
    fontFamily,
    particleSize,
    particleDensity,
    dispersionStrength,
    returnSpeed,
    color,
  ]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "w-full h-full min-h-[400px] flex items-center justify-center relative",
        className
      )}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
