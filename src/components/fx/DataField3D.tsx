import { useEffect, useRef } from "react";

interface DataField3DProps {
  className?: string;
}

export default function DataField3D({ className }: DataField3DProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Grid config
    const cols = 38;
    const rows = 22;
    const spacing = 46;
    const focalLength = 460;

    // Camera settings
    const baseAlpha = 0.55; // base tilt down around X-axis
    const baseBeta = 0.0; // base Y-axis rotation
    const cameraY = -150; // camera height (above grid)
    const cameraZ = -550; // camera distance (behind grid)

    // Parallax tracking
    let targetRotateY = 0;
    let targetRotateX = 0;
    let currentRotateY = 0;
    let currentRotateX = 0;

    const handlePointerMove = (e: PointerEvent) => {
      // Normalize position to [-0.5, 0.5]
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      targetRotateY = nx * 0.28; // max 0.14 rad Y in each direction
      targetRotateX = ny * 0.16; // max 0.08 rad X in each direction
    };

    if (!prefersReducedMotion) {
      window.addEventListener("pointermove", handlePointerMove, { passive: true });
    }

    // Resize handling
    let width = 0;
    let height = 0;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const dpr = Math.min(2, window.devicePixelRatio || 1);
        width = entry.contentRect.width;
        height = entry.contentRect.height;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);

        // If reduced motion, draw once immediately upon resize
        if (prefersReducedMotion) {
          drawFrame(12);
        }
      }
    });
    resizeObserver.observe(canvas);

    // Visibility handling
    let isVisible = true;
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          isVisible = entry.isIntersecting;
        }
      },
      { threshold: 0.05 },
    );
    intersectionObserver.observe(canvas);

    let animationId: number;
    let t = 0;

    // Project 3D point to 2D screen space
    function project(col: number, row: number, time: number) {
      // Calculate local coordinates relative to grid center
      const gridWidth = (cols - 1) * spacing;
      const gridDepth = (rows - 1) * spacing;
      const x0 = col * spacing - gridWidth / 2;
      const z0 = row * spacing - gridDepth / 2;

      // Wave height function:
      // y = sin(x·0.011 + t·0.9)·26 + cos(z·0.013 + t·0.7)·22 + sin((x+z)·0.006 + t·0.5)·14
      // We flip Y because canvas Y points down
      const waveY = -(
        Math.sin(x0 * 0.011 + time * 0.9) * 26 +
        Math.cos(z0 * 0.013 + time * 0.7) * 22 +
        Math.sin((x0 + z0) * 0.006 + time * 0.5) * 14
      );

      // Total rotation angles (base + parallax)
      const alpha = baseAlpha + currentRotateX;
      const beta = baseBeta + currentRotateY;

      // Rotate around Y axis (beta)
      const x1 = x0 * Math.cos(beta) - z0 * Math.sin(beta);
      const z1 = x0 * Math.sin(beta) + z0 * Math.cos(beta);
      const y1 = waveY;

      // Rotate around X axis (alpha)
      const x2 = x1;
      const y2 = y1 * Math.cos(alpha) - z1 * Math.sin(alpha);
      const z2 = y1 * Math.sin(alpha) + z1 * Math.cos(alpha);

      // Relative to camera
      const relY = y2 - cameraY;
      const relZ = z2 - cameraZ;

      if (relZ <= 10) return null;

      // Perspective projection
      const screenX = (x2 * focalLength) / relZ + width / 2;
      const screenY = (relY * focalLength) / relZ + height / 2;

      return {
        x: screenX,
        y: screenY,
        z: relZ,
        waveY: waveY,
      };
    }

    function drawFrame(time: number) {
      if (!ctx || width === 0 || height === 0) return;

      // Clear screen
      ctx.clearRect(0, 0, width, height);

      // Project all points
      const points: ({ x: number; y: number; z: number; waveY: number } | null)[][] = [];
      for (let c = 0; c < cols; c++) {
        points[c] = [];
        for (let r = 0; r < rows; r++) {
          points[c][r] = project(c, r, time);
        }
      }

      // Draw vertical lines for every 2nd column
      for (let c = 0; c < cols; c += 2) {
        ctx.beginPath();
        let activePath = false;

        for (let r = 0; r < rows; r++) {
          const pt = points[c][r];
          if (!pt) {
            activePath = false;
            continue;
          }

          if (!activePath) {
            ctx.moveTo(pt.x, pt.y);
            activePath = true;
          } else {
            ctx.lineTo(pt.x, pt.y);
          }
        }

        if (activePath) {
          // Average depth of the middle row in this column for line fading
          const midRowPt = points[c][Math.floor(rows / 2)];
          const lineZ = midRowPt ? midRowPt.z : 600;
          const depthAlpha = Math.max(0, Math.min(1, (1300 - lineZ) / 950));

          ctx.strokeStyle = `rgba(249, 115, 22, ${depthAlpha * 0.05})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Draw particle points
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const pt = points[c][r];
          if (!pt) continue;

          // Depth fade calculation
          // Visible depth starts showing around Z=300 and fades out completely by Z=1300
          const depthAlpha = Math.max(0, Math.min(1, (1300 - pt.z) / 950));
          if (depthAlpha <= 0) continue;

          // Wave crest mapping: waveY ranges from -62 to +62. Crests are negative Y (floating higher)
          // Let's mix towards orange when floating up (waveY is positive in wave terms)
          // pt.waveY is flipped, so higher waves are positive values (crest)
          const actualHeight = -pt.waveY;
          const mix = Math.max(0, Math.min(1, (actualHeight + 18) / 46));

          // Interpolate colors: Zinc [228, 228, 231] to Signal Orange [249, 115, 22]
          const red = 228 + mix * (249 - 228);
          const green = 228 + mix * (115 - 228);
          const blue = 231 + mix * (22 - 231);

          // Orange gets full alpha, zinc gets 55% alpha scale
          const opacityScale = mix * depthAlpha + (1 - mix) * depthAlpha * 0.55;

          // Cap sizing
          const size = Math.max(0.4, Math.min(2.5, (1.8 * focalLength) / pt.z));

          ctx.beginPath();
          ctx.arc(pt.x, pt.y, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${Math.round(red)}, ${Math.round(green)}, ${Math.round(blue)}, ${opacityScale.toFixed(3)})`;
          ctx.fill();
        }
      }
    }

    const loop = () => {
      if (isVisible) {
        t += 0.015; // Animation speed step

        // Lerp parallax rotation
        currentRotateY += (targetRotateY - currentRotateY) * 0.05;
        currentRotateX += (targetRotateX - currentRotateX) * 0.05;

        drawFrame(t);
      }
      animationId = requestAnimationFrame(loop);
    };

    if (prefersReducedMotion) {
      // Draw a single static frame (seed t ≈ 12)
      drawFrame(12);
    } else {
      // Run normal loop
      loop();
    }

    return () => {
      if (!prefersReducedMotion) {
        window.removeEventListener("pointermove", handlePointerMove);
        cancelAnimationFrame(animationId);
      }
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className || ""}`}
    />
  );
}
