import React, { useEffect, useRef, useCallback, useMemo } from "react";
import { createNoise3D } from "simplex-noise";
import { motion } from "framer-motion";

interface VortexProps {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  particleCount?: number;
  rangeY?: number;
  baseHue?: number;
  baseSpeed?: number;
  rangeSpeed?: number;
  baseRadius?: number;
  rangeRadius?: number;
}

export const Vortex: React.FC<VortexProps> = ({
  particleCount = 30,
  rangeY = 60,
  baseHue = 80,
  baseSpeed = 0.0,
  rangeSpeed = 1.5,
  baseRadius = 1,
  rangeRadius = 2,
  children,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const offscreenCanvas = useRef<HTMLCanvasElement>(
    document.createElement("canvas")
  );
  const tickRef = useRef(0); // Use useRef to store tick
  const particlePropsRef = useRef<Float32Array | null>(null); // Use useRef for particleProps
  const particlePropCount = 9;
  const particlePropsLength = particleCount * particlePropCount;
  const baseTTL = 50;
  const rangeTTL = 150;
  const rangeHue = 100;
  const noiseSteps = 1;
  const xOff = 0.00125;
  const yOff = 0.00125;
  const zOff = 0.0005;
  const noise3D = createNoise3D();
  const TAU = 2 * Math.PI;
  const rand = (n: number) => n * Math.random();
  const randRange = useCallback((n: number) => n - rand(2 * n), []);  
  const fadeInOut = (t: number, m: number) =>
    Math.abs(((t + 0.5 * m) % m) - 0.5 * m) / (0.5 * m);
  const lerp = (n1: number, n2: number, speed: number) =>
    (1 - speed) * n1 + speed * n2;

  const center = useMemo(() => [0, 0], []);

  const resize = useCallback(
    (canvas: { width: number; height: number; }, _ctx: any, offscreen: { width: number; height: number; }) => {
      const { innerWidth, innerHeight } = window;
      canvas.width = innerWidth;
      canvas.height = innerHeight;
      offscreen.width = innerWidth;
      offscreen.height = innerHeight;
      center[0] = 0.5 * canvas.width;
      center[1] = 0.5 * canvas.height;
    },
    [center]
  );

  const initParticle = useCallback((i: number) => {
    const canvas = offscreenCanvas.current;
    if (!canvas) return;
    const x = rand(canvas.width);
    const y = center[1] + randRange(rangeY);
    const vx = 0;
    const vy = 0;
    const life = 0;
    const ttl = baseTTL + rand(rangeTTL);
    const speed = baseSpeed + rand(rangeSpeed);
    const radius = baseRadius + rand(rangeRadius);
    const hue = baseHue + rand(rangeHue);
    particlePropsRef.current?.set([x, y, vx, vy, life, ttl, speed, radius, hue], i);
  }, [rangeY, baseTTL, rangeTTL, baseSpeed, rangeSpeed, baseRadius, rangeRadius, baseHue, rangeHue, center, randRange]);

  const initParticles = useCallback(() => {
    tickRef.current = 0; // Initialize tickRef
    particlePropsRef.current = new Float32Array(particlePropsLength); // Initialize particleProps
    for (let i = 0; i < particlePropsLength; i += particlePropCount) {
      initParticle(i);
    }
  }, [particlePropsLength, particlePropCount, initParticle]);

  const drawParticle = useCallback(
    (
      x: number,
      y: number,
      x2: number,
      y2: number,
      life: number,
      ttl: number,
      radius: number,
      hue: number,
      ctx: CanvasRenderingContext2D
    ) => {
      ctx.save();
      ctx.lineCap = "round";
      ctx.lineWidth = radius;
      ctx.strokeStyle = `hsla(${hue},100%,60%,${fadeInOut(life, ttl)})`;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
    },
    []
  );

  const checkBounds = useCallback(
    (x: number, y: number, canvas: HTMLCanvasElement) =>
      x > canvas.width || x < 0 || y > canvas.height || y < 0,
    []
  );

  const renderGlow = useCallback(
    (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
      ctx.save();
      ctx.filter = "blur(4px) brightness(200%)";
      ctx.globalCompositeOperation = "lighter";
      ctx.drawImage(canvas, 0, 0);
      ctx.restore();
      ctx.save();
      ctx.filter = "blur(2px) brightness(200%)";
      ctx.globalCompositeOperation = "lighter";
      ctx.drawImage(canvas, 0, 0);
      ctx.restore();
    },
    []
  );

  const updateParticle = useCallback(
    (i: number, ctx: CanvasRenderingContext2D) => {
      const canvas = offscreenCanvas.current;
      if (!canvas) return;
      const x = particlePropsRef.current![i];
      const y = particlePropsRef.current![i + 1];
      const n =
        noise3D(x * xOff, y * yOff, tickRef.current * zOff) * noiseSteps * TAU; // Use tickRef.current
      const vx = lerp(particlePropsRef.current![i + 2], Math.cos(n), 0.5);
      const vy = lerp(particlePropsRef.current![i + 3], Math.sin(n), 0.5);
      const life = particlePropsRef.current![i + 4];
      const ttl = particlePropsRef.current![i + 5];
      const speed = particlePropsRef.current![i + 6];
      const x2 = x + vx * speed;
      const y2 = y + vy * speed;
      const radius = particlePropsRef.current![i + 7];
      const hue = particlePropsRef.current![i + 8];
      drawParticle(x, y, x2, y2, life, ttl, radius, hue, ctx);
      particlePropsRef.current!.set([x2, y2, vx, vy, life + 1], i);
      (checkBounds(x, y, canvas) || life > ttl) && initParticle(i);
    },
    [drawParticle, checkBounds, initParticle, TAU, noise3D, xOff, yOff, zOff, noiseSteps]
  );

  const drawParticles = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      for (let i = 0; i < particlePropsLength; i += particlePropCount) {
        updateParticle(i, ctx);
      }
    },
    [particlePropsLength, particlePropCount, updateParticle]
  );

  const draw = useCallback(
    (
      canvas: HTMLCanvasElement,
      ctx: CanvasRenderingContext2D,
      offscreen: HTMLCanvasElement,
      offscreenCtx: CanvasRenderingContext2D
    ) => {
      tickRef.current++; // Increment tickRef
      offscreenCtx.clearRect(0, 0, offscreen.width, offscreen.height);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawParticles(offscreenCtx);
      renderGlow(offscreen, offscreenCtx);
      ctx.drawImage(offscreen, 0, 0);
      requestAnimationFrame(() => draw(canvas, ctx, offscreen, offscreenCtx));
    },
    [drawParticles, renderGlow]
  );

  const setup = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const offscreen = offscreenCanvas.current;
    if (canvas && container) {
      const ctx = canvas.getContext("2d");
      const offscreenCtx = offscreen.getContext("2d");
      if (ctx && offscreenCtx) {
        resize(canvas, ctx, offscreen);
        initParticles();
        draw(canvas, ctx, offscreen, offscreenCtx);
      }
    }
  }, [resize, initParticles, draw]);

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const offscreen = offscreenCanvas.current;
    const offscreenCtx = offscreen?.getContext("2d");
    if (canvas && ctx && offscreen && offscreenCtx) {
      resize(canvas, ctx, offscreen);
    }
  }, [resize]);

  useEffect(() => {
    setup();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize, setup]);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        ref={containerRef}
      >
        <canvas ref={canvasRef}></canvas>
      </motion.div>
      <div>{children}</div>
    </div>
  );
};
