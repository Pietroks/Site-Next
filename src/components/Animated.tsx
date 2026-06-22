"use client";

import { animations, hovers, stagger, transition } from "@/utils/animations";
import { motion, MotionProps } from "framer-motion";
import { ReactNode } from "react";

type AnimationKey = keyof typeof animations;
type HoverKey = keyof typeof hovers;

type AnimatedProps<T extends React.ElementType> = MotionProps & {
  children?: ReactNode;
  as?: T;
  preset?: AnimationKey;
  delay?: number;
  index?: number;
  hover?: HoverKey;
} & Omit<React.ComponentPropsWithoutRef<T>, keyof MotionProps | "as" | "preset" | "delay" | "index">;

export function Animated<T extends React.ElementType = "div">({
  children,
  as,
  preset,
  delay = 0,
  index,
  hover,
  transition: customTransition,
  ...props
}: AnimatedProps<T>) {
  const Tag = (as || "div") as string;
  const Component = (motion as any)[Tag] || motion.div;

  const animation = preset ? animations[preset] : {};
  const finalDelay = delay + (index !== undefined ? stagger(index) : 0);
  const hoverAnimation = hover ? hovers[hover] : undefined;

  return (
    <Component
      {...(preset && {
        initial: "hidden",
        whileInView: "show",
        viewport: { once: true, margin: "0px 0px 200px 0px" },
        variants: animation,
      })}
      whileHover={hoverAnimation}
      transition={{
        ...transition(finalDelay),
        ...customTransition,
      }}
      {...props}
    >
      {children}
    </Component>
  );
}
