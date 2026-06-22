import type { Transition, Variants } from "framer-motion";

export const animations = {
  fadeUp: {
    hidden: { opacity: 0, y: 60 },
    show: { opacity: 1, y: 0 },
  },

  fadeLeft: {
    hidden: { opacity: 0, x: -60 },
    show: { opacity: 1, x: 0 },
  },

  fadeRight: {
    hidden: { opacity: 0, x: 60 },
    show: { opacity: 1, x: 0 },
  },

  fadeScale: {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1 },
  },

  fadeUpScale: {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.95,
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
  },

  fadeDown: {
    hidden: { opacity: 0, y: -40 },
    show: { opacity: 1, y: 0 },
  },
} as const satisfies Record<string, Variants>;

export const hovers = {
  icon: {
    scale: 1.08,
    rotate: 3,
  },

  arrow: {
    x: 6,
  },

  link: {
    x: 4,
  },

  lift: {
    y: -2,
  },
};

export const transition = (delay = 0, duration = 0.5): Transition => ({
  duration,
  delay,
  ease: "easeInOut",
});

export const stagger = (index: number, step = 0.2) => index * step;
