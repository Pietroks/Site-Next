"use client";

import { Animated } from "./Animated";
import { IconTitleWave } from "./IconsSvg";

interface PageModelProps {
  titulo1: string;
  titulo2: string;
  subTitulo: string;
  children: React.ReactNode;
  quebrarTitulo?: boolean;
}

export default function PageModel({ titulo1, titulo2, subTitulo, children, quebrarTitulo = false }: PageModelProps) {
  return (
    <section className="py-15 bg-[linear-gradient(to_bottom_left,#E4DFFB,#EEEBFC,#E1EFFD,#E9E6FD)] dark:bg-[linear-gradient(to_bottom_left,#0b0a14,#121026,#0d1527,#100e24)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col items-center">
        <Animated as="div" preset="fadeUp" delay={0.1} className="relative flex flex-col items-center text-center">
          <h2 className="text-primary dark:text-gray-200 font-bold text-4xl md:text-5xl">
            {titulo1} {quebrarTitulo ? <br /> : null} <strong className="bg-unintese-grad bg-clip-text text-transparent">{titulo2}</strong>
          </h2>

          <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-full h-5 max-w-25">
            <IconTitleWave />
          </span>
        </Animated>

        <Animated as="p" preset="fadeUp" delay={0.2} className="mt-6 mb-10 max-w-2xl text-[#A0A2BA] text-center mx-auto text-lg">
          {subTitulo}
        </Animated>

        <div>{children}</div>
      </div>
    </section>
  );
}
