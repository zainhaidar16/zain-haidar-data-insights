import { useEffect, useRef } from "react";

interface ParticleNetworkProps {
  className?: string;
}

/**
 * Three.js particle network: floating purple nodes connected by lines
 * when close together, with slow drift and mouse-driven parallax tilt.
 * Client-only (dynamic import of three), SSR-safe, and gated on
 * prefers-reduced-motion / coarse pointers for graceful degradation.
 */
export default function ParticleNetwork({ className }: ParticleNetworkProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCoarsePointer = !window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const isSmallScreen = window.matchMedia("(max-width: 768px)").matches;

    // Skip WebGL entirely on touch/mobile devices — the static
    // CurvedLines/GlowingDots decoration in HeroSection covers the
    // background there, so this is pure performance/battery savings.
    if (isCoarsePointer) return;

    let disposed = false;
    let cleanup = () => {};

    import("three").then((THREE) => {
      if (disposed || !containerRef.current) return;

      const styles = getComputedStyle(document.documentElement);
      const purple = new THREE.Color(styles.getPropertyValue("--purple").trim() || "#7048E8");
      const purpleLight = new THREE.Color(styles.getPropertyValue("--purple-light").trim() || "#8B5CF6");

      const nodeCount = isSmallScreen ? 34 : 78;
      const linkDistance = isSmallScreen ? 105 : 130;
      const spread = { x: isSmallScreen ? 260 : 420, y: isSmallScreen ? 220 : 260, z: 140 };

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
      container.appendChild(renderer.domElement);
      renderer.domElement.style.position = "absolute";
      renderer.domElement.style.inset = "0";
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, 1, 1, 2000);
      camera.position.z = 560;

      const group = new THREE.Group();
      scene.add(group);

      // Particle positions + drift velocities
      const positions = new Float32Array(nodeCount * 3);
      const velocities: { x: number; y: number; z: number }[] = [];
      const colors = new Float32Array(nodeCount * 3);

      for (let i = 0; i < nodeCount; i++) {
        const x = (Math.random() - 0.5) * spread.x * 2;
        const y = (Math.random() - 0.5) * spread.y * 2;
        const z = (Math.random() - 0.5) * spread.z * 2;
        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
        velocities.push({
          x: (Math.random() - 0.5) * 0.12,
          y: (Math.random() - 0.5) * 0.12,
          z: (Math.random() - 0.5) * 0.08,
        });
        const mixed = purple.clone().lerp(purpleLight, Math.random());
        colors[i * 3] = mixed.r;
        colors[i * 3 + 1] = mixed.g;
        colors[i * 3 + 2] = mixed.b;
      }

      const pointsGeometry = new THREE.BufferGeometry();
      pointsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      pointsGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      const pointsMaterial = new THREE.PointsMaterial({
        size: isSmallScreen ? 3.2 : 3.8,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        sizeAttenuation: true,
      });
      const points = new THREE.Points(pointsGeometry, pointsMaterial);
      group.add(points);

      // Line segments pool, rebuilt each frame from current node distances
      const maxLines = nodeCount * 6;
      const linePositions = new Float32Array(maxLines * 2 * 3);
      const lineGeometry = new THREE.BufferGeometry();
      lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
      const lineMaterial = new THREE.LineBasicMaterial({
        color: purple,
        transparent: true,
        opacity: 0.18,
      });
      const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
      group.add(lines);

      let width = 0;
      let height = 0;

      const resize = () => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        width = rect.width;
        height = rect.height;
        if (width === 0 || height === 0) return;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      };

      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(container);
      resize();

      let isVisible = true;
      const intersectionObserver = new IntersectionObserver(
        (entries) => entries.forEach((entry) => (isVisible = entry.isIntersecting)),
        { threshold: 0.05 },
      );
      intersectionObserver.observe(container);

      // Parallax tilt driven by pointer position
      let targetRotY = 0;
      let targetRotX = 0;
      let currentRotY = 0;
      let currentRotX = 0;

      const handlePointerMove = (e: PointerEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        targetRotY = nx * 0.35;
        targetRotX = -ny * 0.2;
      };
      if (!prefersReducedMotion && !isCoarsePointer) {
        window.addEventListener("pointermove", handlePointerMove, { passive: true });
      }

      const posAttr = pointsGeometry.getAttribute("position") as InstanceType<typeof THREE.BufferAttribute>;
      const lineAttr = lineGeometry.getAttribute("position") as InstanceType<typeof THREE.BufferAttribute>;

      function stepParticles() {
        for (let i = 0; i < nodeCount; i++) {
          let x = posAttr.getX(i) + velocities[i].x;
          let y = posAttr.getY(i) + velocities[i].y;
          let z = posAttr.getZ(i) + velocities[i].z;

          if (x > spread.x) x = -spread.x;
          if (x < -spread.x) x = spread.x;
          if (y > spread.y) y = -spread.y;
          if (y < -spread.y) y = spread.y;
          if (z > spread.z) z = -spread.z;
          if (z < -spread.z) z = spread.z;

          posAttr.setXYZ(i, x, y, z);
        }
        posAttr.needsUpdate = true;
      }

      function rebuildLines() {
        let segIndex = 0;
        const linkDistSq = linkDistance * linkDistance;
        for (let i = 0; i < nodeCount && segIndex < maxLines; i++) {
          for (let j = i + 1; j < nodeCount && segIndex < maxLines; j++) {
            const dx = posAttr.getX(i) - posAttr.getX(j);
            const dy = posAttr.getY(i) - posAttr.getY(j);
            const dz = posAttr.getZ(i) - posAttr.getZ(j);
            const distSq = dx * dx + dy * dy + dz * dz;
            if (distSq < linkDistSq) {
              lineAttr.setXYZ(segIndex * 2, posAttr.getX(i), posAttr.getY(i), posAttr.getZ(i));
              lineAttr.setXYZ(segIndex * 2 + 1, posAttr.getX(j), posAttr.getY(j), posAttr.getZ(j));
              segIndex++;
            }
          }
        }
        lineGeometry.setDrawRange(0, segIndex * 2);
        lineAttr.needsUpdate = true;
      }

      let animationId = 0;
      let frame = 0;

      function renderFrame() {
        currentRotY += (targetRotY - currentRotY) * 0.04;
        currentRotX += (targetRotX - currentRotX) * 0.04;
        group.rotation.y = currentRotY;
        group.rotation.x = currentRotX;
        renderer.render(scene, camera);
      }

      function loop() {
        if (isVisible) {
          frame++;
          stepParticles();
          if (frame % 2 === 0) rebuildLines();
          renderFrame();
        }
        animationId = requestAnimationFrame(loop);
      }

      if (prefersReducedMotion) {
        rebuildLines();
        renderFrame();
      } else {
        loop();
      }

      cleanup = () => {
        if (!prefersReducedMotion && !isCoarsePointer) {
          window.removeEventListener("pointermove", handlePointerMove);
        }
        cancelAnimationFrame(animationId);
        resizeObserver.disconnect();
        intersectionObserver.disconnect();
        pointsGeometry.dispose();
        pointsMaterial.dispose();
        lineGeometry.dispose();
        lineMaterial.dispose();
        renderer.dispose();
        if (renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
      };
    });

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className || ""}`}
    />
  );
}
