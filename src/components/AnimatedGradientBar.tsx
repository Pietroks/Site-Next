import { memo } from "react";
import { motion } from "framer-motion";

interface AnimatedGradientBar {
  width?: string | number;
  className?: string;
}

export const AnimatedGradientBar = memo(({ width = "100%", className }: AnimatedGradientBar) => (
  <motion.div
    className={`absolute bottom-0 left-0 w-full h-1 bg-[linear-gradient(to_right,#1857D6,#293ECE,#5839D1,#7745D0,#8E44D1,#7F30C2)] ${className}`}
    initial={{ width: 0 }}
    animate={{ width: width }}
    transition={{ duration: 0.8 }}
  />
));
