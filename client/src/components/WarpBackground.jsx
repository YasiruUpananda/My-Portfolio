import { useEffect, useRef } from "react";

// Warp-tunnel light streak animation with mouse interaction
// Lines near the cursor get deflected/pushed away

const LINE_COUNT = 120;
const MOUSE_RADIUS = 120;    // px — influence radius around cursor
const DEFLECT_STRENGTH = 60; // px — max push distance

const COLORS = [
  "rgba(0, 242, 255, ",   // cyan
  "rgba(0, 180, 255, ",   // blue
  "rgba(0, 140, 220, ",   // deeper blue
  "rgba(100, 220, 255, ", // light cyan
  "rgba(0, 255, 200, ",   // teal accent
  "rgba(200, 240, 255, ", // white-blue
];

function createLine(w, h, full) {
  const angle = Math.random() * Math.PI * 2;
  const speed = 0.0005 + Math.random() * 0.003;
  const colorIdx = Math.floor(Math.random() * COLORS.length);
  const thickness = 0.3 + Math.random() * 1.2;
  const glow = 4 + Math.random() * 10;
  const progress = full ? Math.random() : 0;
  const curve = (Math.random() - 0.5) * 0.15;

  return { angle, speed, colorIdx, thickness, glow, progress, curve };
}

// Push a point away from the mouse
function deflect(px, py, mx, my) {
  const dx = px - mx;
  const dy = py - my;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist > MOUSE_RADIUS || dist < 1) return { x: px, y: py };

  const force = (1 - dist / MOUSE_RADIUS) * DEFLECT_STRENGTH;
  const nx = dx / dist;
  const ny = dy / dist;

  return { x: px + nx * force, y: py + ny * force };
}

export default function WarpBackground() {
  const canvasRef = useRef(null);
  const linesRef = useRef([]);
  const rafRef = useRef(null);
  const sizeRef = useRef({ w: 0, h: 0 });
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Track mouse globally (canvas has pointerEvents none, so we listen on window)
    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sizeRef.current = { w, h };

      linesRef.current = Array.from({ length: LINE_COUNT }, () =>
        createLine(w, h, true)
      );
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const { w, h } = sizeRef.current;
      const cx = w * 0.5;
      const cy = h * 0.55;
      const { x: mx, y: my } = mouseRef.current;

      // Fade trail
      ctx.fillStyle = "rgba(10, 14, 23, 0.12)";
      ctx.fillRect(0, 0, w, h);

      const lines = linesRef.current;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        line.progress += line.speed;

        if (line.progress > 1) {
          lines[i] = createLine(w, h, false);
          continue;
        }

        const p = line.progress;

        // Easing — accelerate outward (cubic ease-in)
        const easedStart = Math.max(0, p - 0.08);
        const t0 = easedStart * easedStart * easedStart;
        const t1 = p * p * p;

        const maxR = Math.max(w, h) * 0.85;
        const r0 = t0 * maxR;
        const r1 = t1 * maxR;

        // Apply slight curve
        const curvedAngle0 = line.angle + line.curve * easedStart;
        const curvedAngle1 = line.angle + line.curve * p;

        let x0 = cx + Math.cos(curvedAngle0) * r0;
        let y0 = cy + Math.sin(curvedAngle0) * r0;
        let x1 = cx + Math.cos(curvedAngle1) * r1;
        let y1 = cy + Math.sin(curvedAngle1) * r1;

        // ── Mouse deflection ──
        const d0 = deflect(x0, y0, mx, my);
        const d1 = deflect(x1, y1, mx, my);
        x0 = d0.x; y0 = d0.y;
        x1 = d1.x; y1 = d1.y;

        // Opacity
        const opacityFade =
          p < 0.1 ? p / 0.1 :
            p > 0.8 ? (1 - p) / 0.2 :
              1;
        const opacity = opacityFade * (0.15 + 0.5 * p);

        // Width increases with distance
        const lineWidth = line.thickness * (0.3 + p * 2);

        ctx.save();

        // Glow layer
        ctx.shadowColor = COLORS[line.colorIdx] + "0.6)";
        ctx.shadowBlur = line.glow * (0.5 + p);
        ctx.strokeStyle = COLORS[line.colorIdx] + opacity.toFixed(3) + ")";
        ctx.lineWidth = lineWidth;
        ctx.lineCap = "round";

        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.stroke();

        // Brighter core
        ctx.shadowBlur = 0;
        ctx.strokeStyle = COLORS[line.colorIdx] + (opacity * 0.7).toFixed(3) + ")";
        ctx.lineWidth = lineWidth * 0.4;
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.stroke();

        ctx.restore();
      }

      // Central glow hotspot
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 120);
      grad.addColorStop(0, "rgba(0, 242, 255, 0.03)");
      grad.addColorStop(0.5, "rgba(0, 180, 255, 0.01)");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(cx - 120, cy - 120, 240, 240);

      rafRef.current = requestAnimationFrame(draw);
    };

    // Initial clear
    ctx.fillStyle = "rgba(10, 14, 23, 1)";
    ctx.fillRect(0, 0, sizeRef.current.w, sizeRef.current.h);

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.6,
      }}
      aria-hidden="true"
    />
  );
}
