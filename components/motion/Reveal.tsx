"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

// Opacity + a short rise only. A blur filter on whole sections is costly to paint and
// left content smeared for a moment when jumping to a section from the menu.
const variants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] },
  },
};

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
