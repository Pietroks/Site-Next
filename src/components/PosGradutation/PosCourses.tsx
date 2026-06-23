"use client";

import { Cursos } from "@/utils/cursos";
import { Suspense, useState } from "react";
import PageModel from "../PageModel";
import { Animated } from "../Animated";
import CourseCard from "../CourseCard";
import { motion } from "framer-motion";

function PosCoursesContent() {
  const [subFilter, setSubFilter] = useState("todos");

  const posApenas = Cursos.filter((curso) => curso.nivel.toLowerCase() === "pos");

  const cursosFiltrados = posApenas.filter((curso) => {
    const title = curso.title.toLowerCase();
    const category = curso.category.toLowerCase();

    if (subFilter === "libras") {
      return title.includes("libras");
    }
    if (subFilter === "especializado") {
      return title.includes("autismo") || title.includes("aee") || title.includes("bilíngue") || category.includes("especializado");
    }

    return true;
  });

  const filtrosMenu = [
    { label: "Todos os cursos", value: "todos" },
    { label: "Libras (Tradução/Docência)", value: "libras" },
    { label: "Especializações (AEE/TEA)", value: "especializado" },
  ];

  return (
    <PageModel
      titulo1="Especializações e"
      titulo2="Pós-Graduação"
      subTitulo="Acelere sua evolução profissional com certificações focadas no mercado. Explore nossas opções 100% online com suporte especializado."
    >
      <div className="relative px-2">
        <Animated
          as="div"
          preset="fadeUp"
          className="flex flex-wrap justify-center gap-3 md:gap-4 mb-10 border-b border-gray-200 dark:border-gray-800 pb-6"
        >
          {filtrosMenu.map((item) => (
            <button
              key={item.value}
              onClick={() => setSubFilter(item.value)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
                subFilter === item.value
                  ? "bg-orange-600 text-white shadow-2xl scale-105"
                  : "bg-gray-200 dark:bg-gray-800 text-indigo-950 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700 hover:text-orange-600"
              }`}
            >
              {item.label}
            </button>
          ))}
        </Animated>

        <div className="overflow-hidden w-full">
          {cursosFiltrados.length > 0 ? (
            <motion.div layout transition={{ duration: 0.3 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-6 mb-5">
              {cursosFiltrados.map((curso, i) => (
                <motion.div layout key={curso.title} className="w-full">
                  <CourseCard curso={curso} index={i} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12 text-gray-500 dark:text-gray-400"
            >
              Nenhum curso de pós-graduação encontrado nesta categoria.
            </motion.div>
          )}
        </div>
      </div>
    </PageModel>
  );
}

export default function PosCourses() {
  return (
    <Suspense fallback={null}>
      <PosCoursesContent />
    </Suspense>
  );
}
