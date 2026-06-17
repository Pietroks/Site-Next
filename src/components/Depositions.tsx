"use client";

import { Depoimentos } from "@/utils/depoimentos";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import CarouselButtons from "./CarouselButtons";
import { HeartBanner } from "./HeartBanner";
import { IconHeart, IconStar } from "./IconsSvg";
import PageModel from "@/components/PageModel";
import { Animated } from "./Animated";
import { AnimatedGradientBar } from "./AnimatedGradientBar";

export default function Depositions() {
  const depoimentos = Depoimentos;
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [itensPorPagina, setItensPorPagina] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItensPorPagina(1);
      } else if (window.innerWidth < 1024) {
        setItensPorPagina(2);
      } else {
        setItensPorPagina(3);
      }
      setPaginaAtual(0);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPaginas = Math.ceil(depoimentos.length / itensPorPagina);

  const voltarPagina = () => {
    setPaginaAtual((prev) => (prev === 0 ? totalPaginas - 1 : prev - 1));
  };

  const avancarPagina = () => {
    setPaginaAtual((prev) => (prev === totalPaginas - 1 ? 0 : prev + 1));
  };

  const depoimentosVisiveis = depoimentos.slice(paginaAtual * itensPorPagina, (paginaAtual + 1) * itensPorPagina);

  return (
    <PageModel
      titulo1="Depoimentos de"
      titulo2="Nossos Alunos"
      subTitulo="Histórias reais de quem transformou a carreira com a Uníntese e hoje conquista caminhos."
      quebrarTitulo
    >
      <div className="w-full relative bg-white shadow-lg rounded-xl p-10 mb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={paginaAtual}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, { offset }) => {
              if (offset.x < -50) avancarPagina();
              else if (offset.x > 50) voltarPagina();
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 cursor-grab active:cursor-grabbing"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            {depoimentosVisiveis.map((depoimento, index) => (
              <Animated
                key={`${paginaAtual}-${index}`}
                preset="fadeUpScale"
                index={index}
                className="flex-1 p-8 flex gap-3 flex-col shadow-lg bg-[#F7F7FD] relative rounded-xl overflow-hidden"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.6 }}
              >
                <AnimatedGradientBar />

                <div className="flex items-center justify-between">
                  <Animated
                    as="img"
                    src="/citar.png"
                    alt="Aspas"
                    className="w-15 h-15"
                    animate={{ rotate: 180, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                  />

                  <Animated preset="fadeRight" delay={0.2} className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <IconStar key={i} />
                    ))}
                  </Animated>
                </div>

                <Animated preset="fadeUp" delay={0.25} className="text-left my-3 text-gray-400">
                  {depoimento.depoimento}
                </Animated>

                <div className="flex items-center justify-start gap-3 mt-auto">
                  <Animated
                    as="img"
                    src={depoimento.imagem || "/depoimentos/placeholder.jpg"}
                    alt={depoimento.nome}
                    className="w-20 h-20 shrink-0 rounded-full object-cover object-top border-2 border-gray-300 shadow-lg"
                    hover="icon"
                    onError={(e) => {
                      e.currentTarget.src = "/depoimentos/placeholder.jpg";
                    }}
                  />

                  <div className="flex flex-col items-start">
                    <p className="font-bold text-primary">{depoimento.nome}</p>
                    <p className="text-sm text-gray-400 text-left">{depoimento.curso}</p>
                  </div>
                </div>
              </Animated>
            ))}
          </motion.div>
        </AnimatePresence>

        <Animated
          preset="fadeUp"
          delay={0.5}
          className="absolute bg-white rounded-full shadow-lg flex items-center justify-center gap-3 px-5 py-3 -bottom-8 left-1/2 -translate-x-1/2"
        >
          {[...Array(totalPaginas)].map((_, index) => (
            <button
              key={index}
              onClick={() => setPaginaAtual(index)}
              className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-500 ${
                paginaAtual === index ? "bg-purple-600 scale-125" : "bg-gray-300 hover:bg-gray-500"
              }`}
            />
          ))}
        </Animated>

        <div className="hidden md:flex">
          <CarouselButtons onLeftClick={voltarPagina} onRightClick={avancarPagina} show={totalPaginas > 1} />
        </div>
      </div>

      <HeartBanner
        textButton="Conheça nossos cursos"
        onClick={() => document.getElementById("cursos")?.scrollIntoView({ behavior: "smooth" })}
        icon={<IconHeart />}
        text={
          <>
            Mais de <strong className="text-purple-800 font-bold">120 mil alunos</strong> já transformaram seu futuro com a gente. Faça
            parte você também!
          </>
        }
      />
    </PageModel>
  );
}
