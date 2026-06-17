"use client";

import { motion } from "framer-motion";
import { HeroWaveBackgrounds, WhatsAppIcon } from "./IconsSvg";
import PrimaryButton from "./PrimaryButton";
import { Animated } from "./Animated";

export default function Hero() {
  return (
    <section className="relative bg-linear-to-r from-purple-700 to-blue-600 text-white py-12 md:py-20 px-4 sm:px-8 overflow-hidden">
      <div className="hidden sm:block">
        <HeroWaveBackgrounds />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <Animated as="div" preset="fadeLeft" className="flex flex-col justify-center pb-4 md:pb-20 text-center md:text-left">
          <h1 className="text-5xl md:text-5xl lg:text-6xl font-bold leading-tight">Educação que</h1>
          <h1 className="text-5xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight lg:whitespace-nowrap">
            transforma seu <strong className="text-orange-400">futuro</strong>
          </h1>

          <p className="text-base sm:text-lg">Cursos reconhecidos pelo MEC</p>
          <p className="mb-10 text-lg sm:text-xl">Aprendizagem flexível para você</p>

          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <PrimaryButton
              className="px-8 md:px-2 py-3 md:text-base"
              onClick={() => document.getElementById("cursos")?.scrollIntoView({ behavior: "smooth" })}
            >
              Conheça os Cursos
            </PrimaryButton>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 md:px-3 py-2 group rounded-xl shadow-lg font-semibold flex items-center justify-center gap-3 bg-white text-purple-900 transition-all duration-300 hover:bg-orange-500 hover:text-white cursor-pointer md:text-base text-lg"
            >
              <WhatsAppIcon className="w-8 h-8 text-purple-900 transition-all duration-500 group-hover:text-white" />
              Fale com um consultor
            </motion.button>
          </div>
        </Animated>

        <Animated
          as="img"
          preset="fadeRight"
          src="/Agrupar 2.png"
          alt="Ilustração Uníntese"
          className="hidden md:block md:w-100 lg:w-125 mx-auto absolute z-10 md:top-40 lg:top-0 md:-right-8"
        />
      </div>
    </section>
  );
}
