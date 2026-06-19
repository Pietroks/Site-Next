"use client";

import { motion } from "framer-motion";
import { IconCarouselArrow } from "../IconsSvg";

interface CarouselButtonsProps {
  onLeftClick: () => void;
  onRightClick: () => void;
  show: boolean;
  top?: string;
}

export default function CarouselButtons({ onLeftClick, onRightClick, show, top = "top-1/2" }: CarouselButtonsProps) {
  if (!show) return null;

  return (
    <div>
      <motion.button
        whileHover={{ scale: 1.08, x: -3 }}
        whileTap={{ scale: 0.95 }}
        onClick={onLeftClick}
        className={`group absolute -left-8 bg-white dark:bg-gray-700 hover:bg-gray-900 rounded-full shadow-lg p-5 ${top} z-30 transition-all duration-500 cursor-pointer`}
      >
        <IconCarouselArrow className="-rotate-180 text-purple-600 dark:text-gray-200 dark:hover:text-purple-500" />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.08, x: 3 }}
        whileTap={{ scale: 0.95 }}
        onClick={onRightClick}
        className={`group absolute -right-8 bg-white dark:bg-gray-700 hover:bg-gray-200 rounded-full shadow-lg p-5 ${top} z-30 transition-all duration-500 cursor-pointer`}
      >
        <IconCarouselArrow className=" text-purple-600 dark:text-gray-200 dark:hover:text-purple-500" />
      </motion.button>
    </div>
  );
}
