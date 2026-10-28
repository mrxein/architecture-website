"use client";
import { useEffect, useState } from "react";
export default function Loader() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => setDone(true), reduce ? 0 : 2000);
    return () => clearTimeout(t);
  }, []);
  if (done) return null;
  return (
    <div className="loader" aria-hidden="true">
      <svg viewBox="0 0 120 70" width="220"><path d="M5 60H115M20 60V25H60V60M60 40H100V60M30 25V10H50V25" /></svg>
    </div>
  );
}
