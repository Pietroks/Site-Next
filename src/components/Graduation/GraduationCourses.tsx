"use client";

import { motion } from "framer-motion";
import PageModel from "../PageModel";
import { Cursos } from "@/utils/cursos";
import CourseCard from "../CourseCard";
import { Suspense, useEffect, useState } from "react";
import { Animated } from "../Animated";
import { useSearchParams } from "next/navigation";

function GraduationCoursesContent() {
  const [subFilter, setSubFilter] = useState("todos");
  const searchParams = useSearchParams();

  useEffect(() => {
    const filtroUrl = searchParams.get("filtro");
    if (filtroUrl) {
      setSubFilter(filtroUrl);
    }
  }, [searchParams]);

  const graduacaoApenas = Cursos.filter((curso) => curso.nivel.toLowerCase() === "graduacao");

  const cursosFiltrados = graduacaoApenas.filter((curso) => {
    const title = curso.title.toLowerCase();
    const grau = curso.grau ? curso.grau.toLowerCase() : "";

    if (subFilter === "libras") {
      return title.includes("libras") || title.includes("bilingue");
    }
    if (subFilter === "pedagogia") {
      return title.includes("pedagogia");
    }
    if (subFilter === "gestao") {
      return title.includes("financeira") || title.includes("comercial") || title.includes("processos") || title.includes("marketing");
    }
    if (subFilter === "tecnologia") {
      return title.includes("t.i") || title.includes("sistemas");
    }

    if (subFilter === "tecnologo") {
      return (
        grau === "tecnólogo" ||
        grau === "tecnologo" ||
        title.includes("gestão de t.i") ||
        title.includes("processos") ||
        title.includes("análise e desenvolvimento")
      );
    }
    if (subFilter === "licenciatura") {
      return grau === "licenciatura" || title.includes("licenciatura");
    }
    if (subFilter === "bacharelado") {
      return grau === "bacharelado" || title.includes("bacharelado");
    }

    return true;
  });

  const filtrosMenu = [
    { label: "Todos os cursos", value: "todos" },
    { label: "Licenciatura", value: "licenciatura" },
    { label: "Bacharelado", value: "bacharelado" },
    { label: "Tecnólogo", value: "tecnologo" },
    { label: "Libras", value: "libras" },
    { label: "Pedagogia", value: "pedagogia" },
    { label: "Gestão", value: "gestao" },
    { label: "Tecnologia", value: "tecnologia" },
  ];

  return (
    <PageModel
      titulo1="Nossos cursos de"
      titulo2="Graduação"
      subTitulo="Cursos reconhecidos pelo MEC, flexíveis e projetados para o seu sucesso. Explore todas as nossas opções EAD e Semipresenciais."
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
              Nenhum curso encontrado nesta categoria.
            </motion.div>
          )}
        </div>
      </div>
    </PageModel>
  );
}

export default function GraduationCoursers() {
  return (
    <Suspense fallback={null}>
      <GraduationCoursesContent />
    </Suspense>
  );
}
