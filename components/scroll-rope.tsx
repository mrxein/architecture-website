"use client";

/**
 * ScrollRope
 * A thin, angular SVG line that spans the full document height, runs down the
 * side margins of every section with sharp corners, crosses sides only in the
 * gaps between sections, and is drawn progressively as you scroll.
 *
 * Usage (app/page.tsx or a layout):
 *   <ScrollRope>
 *     <Hero />        // <section>
 *     <Projects />    // <section>
 *     <Studio />      // <section>
 *     <Footer />      // <footer>
 *   </ScrollRope>
 *
 * Requires: npm i motion
 */

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

/* -------------------------------------------------------------------------- */
/*  Geometry helpers                                                          */
/* -------------------------------------------------------------------------- */

type Pt = { x: number; y: number };
type Section = { top: number; h: number };
type Lookup = { ys: Float32Array; fs: Float32Array; total: number };

// Deterministic pseudo-random (0..1): the rope looks hand-drawn but is stable
// across re-renders and resizes (no random jumps).
const rand = (n: number) => {
  const s = Math.sin(n * 127.1 + 311.7) * 43758.5453123;
  return s - Math.floor(s);
};

/**
 * Gutter route. The rope runs down the left or right margin of each section
 * (with small 45° jogs for extra corners) and only crosses to the opposite
 * side in the gap between two sections, so it never travels through the
 * content itself. Every segment moves downward, so y is strictly increasing.
 */
function buildPolyline(w: number, h: number, sections: Section[]): Pt[] {
  const gutter = Math.min(40, Math.max(8, w * 0.03));
  const step = Math.min(900, Math.max(520, w * 0.7));
  const maxJog = Math.min(24, gutter * 0.8);

  // Alternate sides per section, starting on the left.
  const xSide = (i: number) =>
    (i % 2 === 0 ? gutter : w - gutter) + (rand(i + 1) - 0.5) * gutter * 0.5;

  // The crossing sits on the boundary between section i and i + 1.
  const crossing = (i: number) => {
    const a = sections[i];
    const b = sections[i + 1];
    const mid = (a.top + a.h + b.top) / 2;
    const c = Math.min(140, 0.25 * Math.min(a.h, b.h));
    return { from: mid - c / 2, to: mid + c / 2 };
  };

  const pts: Pt[] = [];
  sections.forEach((s, i) => {
    const base = xSide(i);
    const inward = i % 2 === 0 ? 1 : -1;
    const enterY = i === 0 ? 0 : crossing(i - 1).to;
    let exitY =
      i < sections.length - 1 ? crossing(i).from : s.top + s.h * 0.6; // end inside the footer
    exitY = Math.min(h, Math.max(exitY, enterY + 8));

    let x = base;
    pts.push({ x, y: enterY });

    // Small 45° jogs along long runs: extra corners without leaving the gutter.
    const len = exitY - enterY;
    const m = Math.floor(len / step);
    for (let j = 0; j < m; j++) {
      const y0 = enterY + (len * (j + 1)) / (m + 1) + (rand(i * 9 + j + 4) - 0.5) * 60;
      const target =
        j % 2 === 0 ? base + inward * maxJog * (0.5 + 0.5 * rand(i * 7 + j)) : base;
      pts.push({ x, y: y0 });
      x = target;
      pts.push({ x, y: Math.min(exitY - 1, y0 + Math.abs(target - pts[pts.length - 1].x)) });
    }
    pts.push({ x, y: exitY });
  });
  return pts;
}

/** Straight segments with sharp corners; `r` > 0 softens each corner. */
function toPath(p: Pt[], r: number): string {
  if (p.length < 2) return "";
  const f = (n: number) => n.toFixed(1);
  if (r <= 0) return "M" + p.map((q) => `${f(q.x)} ${f(q.y)}`).join("L");

  let d = `M${f(p[0].x)} ${f(p[0].y)}`;
  for (let i = 1; i < p.length - 1; i++) {
    const a = p[i - 1];
    const b = p[i];
    const c = p[i + 1];
    const l1 = Math.hypot(b.x - a.x, b.y - a.y) || 1;
    const l2 = Math.hypot(c.x - b.x, c.y - b.y) || 1;
    const rr = Math.min(r, l1 / 2, l2 / 2);
    const x1 = b.x + ((a.x - b.x) / l1) * rr;
    const y1 = b.y + ((a.y - b.y) / l1) * rr;
    const x2 = b.x + ((c.x - b.x) / l2) * rr;
    const y2 = b.y + ((c.y - b.y) / l2) * rr;
    d += `L${f(x1)} ${f(y1)}Q${f(b.x)} ${f(b.y)} ${f(x2)} ${f(y2)}`;
  }
  const last = p[p.length - 1];
  return d + `L${f(last.x)} ${f(last.y)}`;
}

/** y (document px) -> fraction of path length, via a sampled lookup table. */
function fractionAtY(l: Lookup, y: number): number {
  const { ys, fs } = l;
  if (y <= ys[0]) return 0;
  if (y >= ys[ys.length - 1]) return 1;
  let lo = 0;
  let hi = ys.length - 1;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (ys[mid] < y) lo = mid;
    else hi = mid;
  }
  const span = ys[hi] - ys[lo] || 1;
  return fs[lo] + ((y - ys[lo]) / span) * (fs[hi] - fs[lo]);
}

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

type ScrollRopeProps = {
  children: ReactNode;
  /** Elements the rope should weave through. Nested matches are ignored. */
  selector?: string;
  /** Any CSS colour. Defaults to the inherited text colour. */
  color?: string;
  strokeWidth?: number;
  /** 0 = sharp corners (default). Small values (e.g. 12) soften them. */
  cornerRadius?: number;
  opacity?: number;
  /** Small dot marking the drawing head. */
  showTip?: boolean;
  /** Where the drawing head sits in the viewport at scroll 0 (0–1 of height). */
  startAt?: number;
  /** Default 30 draws the rope above section backgrounds so it is always
   *  visible; it stays in the side margins and ignores pointer events.
   *  Use -1 to tuck it behind content (opaque sections will then hide it). */
  zIndex?: number;
  /** e.g. "difference" keeps the line legible over both light and dark areas. */
  blendMode?: CSSProperties["mixBlendMode"];
};

export function ScrollRope({
  children,
  selector = "section, footer, [data-rope-section]",
  color = "currentColor",
  strokeWidth = 1.25,
  cornerRadius = 0,
  opacity = 0.6,
  showTip = true,
  startAt = 0.3,
  zIndex = 30,
  blendMode,
}: ScrollRopeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const tipRef = useRef<SVGCircleElement>(null);
  const lookup = useRef<Lookup | null>(null);

  const [geo, setGeo] = useState<{ w: number; h: number; d: string } | null>(
    null,
  );
  const reduce = useReducedMotion();

  /* ---- Scroll tracking: 0 when the wrapper's top reaches the viewport top,
          1 when its bottom reaches the viewport bottom. ------------------- */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const drawn = useMotionValue(0); // exact target (0–1 of path length)
  const smooth = useSpring(drawn, {
    stiffness: 140,
    damping: 28,
    mass: 0.4,
    restDelta: 0.0005,
  });
  const progress = reduce ? drawn : smooth;

  /* ---- Measure the document and (re)build the path -------------------- */
  const measure = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    if (!w || !h) return;

    const cTop = el.getBoundingClientRect().top;
    const sections: Section[] = Array.from(
      el.querySelectorAll<HTMLElement>(selector),
    )
      .filter((n) => {
        const parent = n.parentElement?.closest(selector);
        return !parent || parent === el || !el.contains(parent);
      })
      .map((n) => {
        const r = n.getBoundingClientRect();
        return { top: r.top - cTop, h: r.height };
      })
      .filter((s) => s.h > 0)
      .sort((a, b) => a.top - b.top);

    const d = toPath(
      buildPolyline(w, h, sections.length ? sections : [{ top: 0, h }]),
      cornerRadius,
    );
    setGeo((prev) =>
      prev && prev.d === d && prev.w === w && prev.h === h
        ? prev
        : { w, h, d },
    );
  }, [selector, cornerRadius]);

  useIsoLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let raf = 0;
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };

    measure();
    const ro = new ResizeObserver(schedule); // fires on any height/width change
    ro.observe(el);
    window.addEventListener("load", schedule);
    document.fonts?.ready.then(schedule);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("load", schedule);
    };
  }, [measure]);

  /* ---- Scroll position -> path length --------------------------------- */
  const placeTip = useCallback((f: number) => {
    const path = pathRef.current;
    const tip = tipRef.current;
    const l = lookup.current;
    if (!path || !tip || !l) return;
    const c = Math.min(1, Math.max(0, f));
    const p = path.getPointAtLength(l.total * c);
    tip.setAttribute("cx", p.x.toFixed(1));
    tip.setAttribute("cy", p.y.toFixed(1));
    tip.setAttribute("opacity", c > 0.002 ? "1" : "0");
  }, []);

  const sync = useCallback(() => {
    const l = lookup.current;
    if (!l) return;
    // The drawing head travels from `startAt` of the viewport down to the
    // path's end, so it reaches the footer exactly as the page bottoms out.
    const startY = window.innerHeight * startAt;
    const endY = l.ys[l.ys.length - 1];
    const tipY = startY + (endY - startY) * scrollYProgress.get();
    drawn.set(fractionAtY(l, tipY));
  }, [drawn, scrollYProgress, startAt]);

  useMotionValueEvent(scrollYProgress, "change", sync);
  useMotionValueEvent(progress, "change", placeTip);

  // Rebuild the y -> length lookup whenever the path changes.
  useIsoLayoutEffect(() => {
    const path = pathRef.current;
    if (!path || !geo) return;
    const total = path.getTotalLength();
    const N = 480;
    const ys = new Float32Array(N + 1);
    const fs = new Float32Array(N + 1);
    let maxY = 0;
    for (let i = 0; i <= N; i++) {
      const f = i / N;
      maxY = Math.max(maxY, path.getPointAtLength(total * f).y);
      ys[i] = maxY; // running max keeps the table monotonic
      fs[i] = f;
    }
    lookup.current = { ys, fs, total };
    sync();
    placeTip(progress.get());
  }, [geo, sync, placeTip, progress]);

  return (
    <div
      ref={containerRef}
      // `clip` (unlike `hidden`) doesn't create a scroll container, so
      // position: sticky and scroll tracking keep working.
      // `isolate` keeps the rope's z-index scoped to this wrapper.
      style={{ position: "relative", overflowX: "clip", isolation: "isolate" }}
    >
      {children}

      {geo && (
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox={`0 0 ${geo.w} ${geo.h}`}
          preserveAspectRatio="none"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            userSelect: "none",
            zIndex,
            mixBlendMode: blendMode,
          }}
        >
          <motion.path
            ref={pathRef}
            d={geo.d}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="miter"
            strokeMiterlimit={4}
            opacity={opacity}
            style={{ pathLength: progress }}
          />
          {showTip && (
            <circle
              ref={tipRef}
              r={2.5}
              fill={color}
              opacity={0}
              cx={0}
              cy={0}
            />
          )}
        </svg>
      )}
    </div>
  );
}

export default ScrollRope;