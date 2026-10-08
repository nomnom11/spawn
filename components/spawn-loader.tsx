"use client";

import { useEffect, useRef, useState } from "react";
import FlowLines from "./flow-lines";
import PixelMascot from "./pixel-mascot";

const START_URL = "https://spawn.eco/";
const RING_C = 2 * Math.PI * 92;

export default function SpawnLoader() {
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [go, setGo] = useState(false);
  const btnRef = useRef<HTMLAnchorElement>(null);
  const fired = useRef(false);

  // Loading simulation: quick start, slow middle, final push.
  // Replace with real progress by calling setProgress(value) from your own loading logic.
  useEffect(() => {
    let p = 0;
    let last = performance.now();
    let raf = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      const speed = p < 70 ? 0.045 : p < 92 ? 0.02 : 0.03;
      p = Math.min(100, p + dt * speed * (0.5 + Math.random()));
      setProgress(p);
      if (p < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        timer = setTimeout(() => {
          setReady(true);
          btnRef.current?.focus();
        }, 350);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, []);

  const handleStart = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (fired.current) return;
    fired.current = true;
    setGo(true);
    setTimeout(() => {
      try {
        window.top!.location.href = START_URL;
      } catch {
        if (!window.open(START_URL, "_blank", "noopener")) {
          window.location.href = START_URL;
        }
      }
    }, 1400);
  };

  const pct = Math.floor(progress);

  return (
    <div className={`root${ready ? " ready" : ""}${go ? " go" : ""}`}>
      <FlowLines />
      <div className="vignette" />

      <main className="stage">
        <div className="orb">
          <div className="halo" />
          <svg viewBox="0 0 200 200" aria-hidden="true">
            <circle className="ring-bg" cx="100" cy="100" r="92" />
            <circle className="spin" cx="100" cy="100" r="82" />
            <circle
              id="ring"
              cx="100"
              cy="100"
              r="92"
              style={{
                strokeDasharray: RING_C,
                strokeDashoffset: RING_C * (1 - progress / 100),
              }}
            />
          </svg>
          <PixelMascot />
        </div>

        <h1>spawn</h1>
        <p className="sub">chainless launchpad</p>

        <div className="status">
          <div className="load" aria-live="polite">
            <div className="bar">
              <div id="fill" style={{ width: `${progress}%` }} />
            </div>
            <div id="pct">{pct}%</div>
          </div>
          <div className="start">
            <a
              ref={btnRef}
              id="startBtn"
              href={START_URL}
              target="_top"
              rel="noopener"
              onClick={handleStart}
            >
              Start
            </a>
          </div>
        </div>
      </main>

      <div className="flash" />
      <div className="done">LAUNCHING</div>
    </div>
  );
}
