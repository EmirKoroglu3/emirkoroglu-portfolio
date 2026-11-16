"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Opacity + a short rise only. A blur filter on whole sections is costly to paint and
// left content smeared for a moment when jumping to a section from the menu.
const variants: Variants = {
  // Instant: blocks are hidden off-screen right after hydration, so there is nothing to animate.
  hidden: { opacity: 0, y: 14, transition: { duration: 0 } },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.2, 0.8, 0.2, 1], delay },
  }),
};

/**
 * Content is server-rendered visible, so the hero (LCP) and no-JS visitors never see an
 * empty page. After hydration, only blocks still below the fold are hidden and then
 * revealed on scroll; that swap happens off-screen, so nothing flashes. Reduced-motion
 * users are never hidden. Server and first client render are identical (no hydration
 * mismatch from useReducedMotion).
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Measuring layout is only possible after mount, so this state update has to live here.
    if (el.getBoundingClientRect().top > window.innerHeight) setArmed(true);
  }, []);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={armed && !inView ? "hidden" : "show"}
      custom={delay}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
