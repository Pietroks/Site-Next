"use client";

import { Cursos } from "@/utils/cursos";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import CarouselButtons from "./CarouselButtons";
import { Animated } from "../Animated";
import CourseCard from "../CourseCard";

export default function Courses() {
  const [category, setCategory] = useState("libras/pedagogia");
  const [index, setIndex] = useState(0);
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
      setIndex(0);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cursosFiltrador = Cursos.filter((curso) => curso.category === category);

  const totalPaginas = Math.ceil(cursosFiltrador.length / itensPorPagina);

  const voltarPagina = () => setIndex((prev) => (prev === 0 ? totalPaginas - 1 : prev - 1));
  const avancerPagina = () => setIndex((prev) => (prev === totalPaginas - 1 ? 0 : prev + 1));

  const mudarCategoria = (novaCategoria: string) => {
    setCategory(novaCategoria);
    setIndex(0);
  };

  return (
    <section
      id="cursos"
      className="py-15 px-8 bg-[rgb(247,247,249)] dark:bg-gray-800 overflow-hidden lg:[clip-path:ellipse(90%_100%_at_50%_0%)]"
    >
      <div className="max-w-7xl mx-auto">
        <Animated
          as="div"
          preset="fadeUp"
          className="border-b-gray-200 border-b-2 border-t-0 border-x-0 border flex flex-col md:flex-row w-full md:items-center mb-6 gap-6 md:gap-8 lg:gap-24"
        >
          <Animated
            as="h2"
            preset="fadeLeft"
            className="text-4xl text-indigo-950 dark:text-gray-200 font-bold mb-3 text-center md:text-left"
          >
            Nossos Cursos
          </Animated>

          <nav className="md:flex md:mb-0 lg:mb-5">
            <div className="relative flex gap-0 md:gap-3 lg:gap-6 flex-wrap justify-evenly md:min-w-max pb-2 md:pb-0">
              {[
                { label: "Libras e Pedagogia", value: "libras/pedagogia" },
                { label: "Pós-Graduação", value: "pos" },
                { label: "Cursos Livres", value: "livres" },
                { label: "Tecnologia e Gestão", value: "tecgea" },
              ].map((item, idx) => (
                <Animated
                  key={item.value}
                  as="button"
                  preset="fadeUp"
                  delay={idx * 0.1}
                  hover="lift"
                  onClick={() => mudarCategoria(item.value)}
                  className={`relative px-4 md:px-1 lg:px-4 py-2 font-semibold cursor-pointer transition-all duration-500 md:text-wrap lg:whitespace-nowrap ${
                    category === item.value
                      ? "text-orange-600"
                      : "text-indigo-950 dark:text-gray-200 hover:text-orange-600 dark:hover:text-orange-500"
                  }`}
                >
                  {item.label}

                  {category === item.value && (
                    <Animated as="div" className="hidden lg:block absolute left-0 right-0 -bottom-5.5 h-1.5 bg-orange-500 rounded-full" />
                  )}
                </Animated>
              ))}
            </div>
          </nav>
        </Animated>

        <div className="relative px-2">
          <div className="overflow-hidden w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${category}-${index}`}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(e, { offset }) => {
                  if (offset.x < -50) avancerPagina();
                  else if (offset.x > 50) voltarPagina();
                }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5 items-stretch cursor-grab active:cursor-grabbing"
              >
                {cursosFiltrador.slice(index * itensPorPagina, (index + 1) * itensPorPagina).map((curso, i) => (
                  <CourseCard key={i} curso={curso} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <CarouselButtons onLeftClick={voltarPagina} onRightClick={avancerPagina} show={totalPaginas > 1} top="top-45" />

          <Animated as="h2" preset="fadeUp" className="text-5xl mb-6 text-primary dark:text-gray-100 text-center mt-15">
            Por que escolher a <strong>Uníntese?</strong>
          </Animated>
        </div>
      </div>
    </section>
  );
}
