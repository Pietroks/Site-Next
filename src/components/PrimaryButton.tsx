"use client";

import { HTMLMotionProps, motion } from "framer-motion";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface PrimaryButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
}

export default function PrimaryButton({ children, onClick, className = "", type = "button", ...props }: PrimaryButtonProps) {
  const hasCustomBg = className.includes("bg-");

  return (
    <motion.button
      {...props}
      type={type}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={twMerge(`
        text-lg tracking-wide font-semibold text-white rounded-xl cursor-pointer transition-all duration-500
        shadow-md shadow-purple-950/10
        
        ${!hasCustomBg ? "bg-linear-to-r from-blue-700 to-purple-700 hover:from-orange-500 hover:to-orange-700 hover:shadow-orange-500/40" : ""}
        
        hover:-translate-y-0.5
        ${className}
      `)}
    >
      {children}
    </motion.button>
  );
}
