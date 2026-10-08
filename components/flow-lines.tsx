import type { CSSProperties } from "react";

// Deterministic PRNG so server and client render identical markup.
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Line = { d: string; opacity: number; pulse: boolean; dur: number; delay: number };

function buildLines(): Line[] {
  const rand = mulberry32(2026);
  const cx = 750;
  const cy = 250;
  const N = 22;
  const lines: Line[] = [];
  for (let side = 0; side < 2; side++) {
    for (let i = 0; i < N; i++) {
      const t = i / (N - 1);
      const y0 = -40 + t * 580;
      const x0 = side ? 1540 : -40;
      const sx = side ? -1 : 1;
      const tx = cx + sx * -(120 + Math.abs(t - 0.5) * 30);
      const ty = cy + (t - 0.5) * 40;
      const c1x = x0 + sx * (420 + (i % 5) * 50);
      const c1y = y0 + (t < 0.5 ? -1 : 1) * (60 + (i % 4) * 25);
      const c2x = tx - sx * (180 + (i % 3) * 30);
      const c2y = ty;
      const d = `M${x0} ${y0} C${c1x} ${c1y} ${c2x} ${c2y} ${tx} ${ty}`;
      lines.push({ d, opacity: +(0.18 + rand() * 0.3).toFixed(2), pulse: false, dur: 0, delay: 0 });
      if (i % 2 === 0) {
        lines.push({
          d,
          opacity: 0,
          pulse: true,
          dur: +(3 + rand() * 4).toFixed(1),
          delay: +(rand() * 6).toFixed(1),
        });
      }
    }
  }
  return lines;
}

const LINES = buildLines();

export default function FlowLines() {
  return (
    <svg id="lines" preserveAspectRatio="none" viewBox="0 0 1500 500" aria-hidden="true">
      {LINES.map((l, i) =>
        l.pulse ? (
          <path
            key={i}
            className="pulse"
            pathLength={1000}
            d={l.d}
            style={{ "--d": `${l.dur}s`, "--l": `-${l.delay}s` } as CSSProperties}
          />
        ) : (
          <path key={i} d={l.d} style={{ opacity: l.opacity }} />
        )
      )}
    </svg>
  );
}
