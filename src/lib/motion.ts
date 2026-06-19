import type { Variants, Transition } from "framer-motion";

export const springTransition: Transition = {
  type: "spring",
  damping: 22,
  stiffness: 250,
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.97, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: springTransition,
  },
};

export const fadeSlideUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springTransition,
  },
};

export const fadeSlideInLeft: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: springTransition,
  },
};

export const cardHover = {
  y: -4,
  scale: 1.01,
  transition: { type: "spring" as const, damping: 18, stiffness: 300 },
};

export const cardTap = {
  scale: 0.98,
};

export const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.98, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring" as const, damping: 24, stiffness: 280 },
  },
};

export const blurFadeHeader: Variants = {
  hidden: { opacity: 0, y: -6, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: springTransition,
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: springTransition,
  },
};

export const staggerChildDelay = (idx: number) => ({
  transition: { delay: idx * 0.04, ...springTransition },
});
