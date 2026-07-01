"use client";

import React, { Suspense, useCallback, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";

import { CURSOS_POR_NIVEL, getCursosByTag, NIVEL_LABELS, searchCursos } from "@/utils/cursos";
import { LEVEL_CONFIGS } from "@/utils/level_config";

import { Animated } from "../Animated";
import PageModel from "../PageModel";
import { IconSearch } from "../IconsSvg";

import { SortSelector, sortCursos, SortOption, SORT_OPTIONS } from "./SortSelector";
import { FilterButton, LevelSelector, GridSkeleton, LEVEL_OPTIONS } from "./FilterWidgets";
import { CourseGrid } from "./CourseGrid";

function CourseContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const [currentLevel, setCurrentLevel] = useState<string>(() => {
    const nivelUrl = searchParams.get("nivel");
    return nivelUrl && LEVEL_OPTIONS.some((o) => o.value === nivelUrl) ? nivelUrl : "graduacao";
  });

  const [subFilter, setSubFilter] = useState<string>(() => {
    return searchParams.get("filtro") || "todos";
  });

  const [searchTerm, setSearchTerm] = useState<string>(() => {
    return searchParams.get("busca") || "";
  });

  const [sortBy, setSortBy] = useState<SortOption>(() => {
    const sortUrl = searchParams.get("sort") as SortOption | null;
    return sortUrl && SORT_OPTIONS.some((o) => o.value === sortUrl) ? sortUrl : "destaque";
  });

  const config = useMemo(() => LEVEL_CONFIGS[currentLevel], [currentLevel]);

  const cursosDoNivel = useMemo(() => {
    return CURSOS_POR_NIVEL[config.nivel] || [];
  }, [config.nivel]);

  const cursosPorTag = useMemo(() => {
    if (subFilter === "todos") return cursosDoNivel;

    const filtroFn = config.filtrosMap[subFilter];
    if (filtroFn) {
      return cursosDoNivel.filter((c) => filtroFn(c));
    }

    return getCursosByTag(subFilter);
  }, [cursosDoNivel, subFilter, config]);

  const cursosFiltrados = useMemo(() => {
    if (!searchTerm.trim()) return cursosPorTag;

    const resultados = searchCursos(searchTerm);
    return resultados.filter((curso) => curso.nivel === config.nivel);
  }, [cursosPorTag, searchTerm, config.nivel]);

  const cursosOrdenados = useMemo(() => {
    return sortCursos(cursosFiltrados, sortBy);
  }, [cursosFiltrados, sortBy]);

  // HANDLERS

  const handleLevelChange = useCallback(
    (level: string) => {
      if (level === currentLevel) return;
      setIsLoading(true);
      setCurrentLevel(level);
      setSubFilter("todos");
      setSearchTerm("");
      setSortBy("destaque");

      const params = new URLSearchParams();
      params.set("nivel", level);

      router.replace(`${window.location.pathname}?${params.toString()}`, { scroll: false });
      setTimeout(() => setIsLoading(false), 150);
    },
    [currentLevel, router],
  );

  const handleFilterChange = useCallback(
    (value: string) => {
      if (value === subFilter) return;
      setIsLoading(true);
      setSubFilter(value);

      const params = new URLSearchParams();
      params.set("nivel", currentLevel);
      if (value !== "todos") params.set("filtro", value);
      if (searchTerm) params.set("busca", searchTerm);
      if (sortBy !== "destaque") params.set("sort", sortBy);

      router.replace(`${window.location.pathname}?${params.toString()}`, { scroll: false });
      setTimeout(() => setIsLoading(false), 150);
    },
    [currentLevel, subFilter, searchTerm, sortBy, router],
  );

  const handleSearch = useCallback(
    (term: string) => {
      setSearchTerm(term);

      const params = new URLSearchParams();
      params.set("nivel", currentLevel);
      if (subFilter !== "todos") params.set("filtro", subFilter);
      if (term.trim()) params.set("busca", term);
      if (sortBy !== "destaque") params.set("sort", sortBy);

      router.replace(`${window.location.pathname}?${params.toString()}`, { scroll: false });
    },
    [currentLevel, subFilter, sortBy, router],
  );

  const handleSortChange = useCallback(
    (value: SortOption) => {
      setIsLoading(true);
      setSortBy(value);

      const params = new URLSearchParams();
      params.set("nivel", currentLevel);
      if (subFilter !== "todos") params.set("filtro", subFilter);
      if (searchTerm) params.set("busca", searchTerm);
      if (value !== "destaque") params.set("sort", value);

      router.replace(`${window.location.pathname}?${params.toString()}`, { scroll: false });
      setTimeout(() => setIsLoading(false), 150);
    },
    [currentLevel, subFilter, searchTerm, router],
  );

  return (
    <PageModel titulo1={config.title1} titulo2={config.title2} subTitulo={config.subTitle}>
      <div className="relative px-2">
        <LevelSelector currentLevel={currentLevel} onChange={handleLevelChange} />

        <Animated as="div" preset="fadeUp" delay={0.1} className="flex flex-col sm:flex-row items-center gap-4 justify-center mb-6">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Buscar curso..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full px-5 py-3 rounded-full border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:border-orange-500 focus:outline-none transition-colors duration-500"
            />
            <IconSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          <SortSelector currentSort={sortBy} onChange={handleSortChange} />
        </Animated>

        <Animated
          as="div"
          preset="fadeUp"
          className="flex flex-wrap justify-center gap-3 md:gap-4 mb-10 border-b border-gray-200 dark:border-gray-800 pb-6"
        >
          {config.filtrosMenu.map((item) => (
            <FilterButton
              key={item.value}
              label={item.label}
              isActive={subFilter === item.value}
              onClick={() => handleFilterChange(item.value)}
            />
          ))}
        </Animated>

        <AnimatePresence mode="wait">
          <Animated
            key={`${currentLevel}-${subFilter}-${searchTerm}-${sortBy}`}
            as="div"
            preset="fadeScale"
            className="overflow-hidden w-full"
          >
            <CourseGrid
              cursos={cursosOrdenados}
              isLoading={isLoading}
              emptyMessage={`Nenhum curso de ${NIVEL_LABELS[config.nivel]?.toLowerCase() || "ensino"} encontrado.`}
            />
          </Animated>
        </AnimatePresence>

        {cursosOrdenados.length > 0 && !isLoading && (
          <Animated as="p" preset="fadeUp" delay={0.2} className="text-center text-sm text-gray-400 dark:text-gray-500 mt-6">
            {cursosOrdenados.length} curso{cursosOrdenados.length > 1 ? "s" : ""} encontrado{cursosOrdenados.length > 1 ? "s" : ""}
            {searchTerm && ` para "${searchTerm}"`}
          </Animated>
        )}
      </div>
    </PageModel>
  );
}

export default function CoursesPage() {
  return (
    <Suspense fallback={<GridSkeleton />}>
      <CourseContent />
    </Suspense>
  );
}
