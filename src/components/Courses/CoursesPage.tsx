"use client";

import { Curso, Cursos } from "@/utils/cursos";
import { memo, Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { Animated } from "../Animated";
import { useSearchParams, useRouter } from "next/navigation";
import PageModel from "../PageModel";
import { AnimatePresence } from "framer-motion";
import CourseCard from "../CourseCard";

interface LevelConfig {
  title1: string;
  title2: string;
  subTitle: string;
  filtrosMenu: readonly { label: string; value: string }[];
  filtrosMap: Record<string, (curso: Curso) => boolean>;
  filterCursos: (curso: Curso) => boolean;
}

const LEVEL_CONFIGS: Record<string, LevelConfig> = {
  graduacao: {
    title1: "Nossos cursos de",
    title2: "Graduação",
    subTitle:
      "Cursos reconhecidos pelo MEC, flexíveis e projetados para o seu sucesso. Explore todas as nossas opções EAD e Semipresenciais.",
    filtrosMenu: [
      { label: "Todos os cursos", value: "todos" },
      { label: "Licenciatura", value: "licenciatura" },
      { label: "Bacharelado", value: "bacharelado" },
      { label: "Tecnólogo", value: "tecnologo" },
      { label: "Libras", value: "libras" },
      { label: "Pedagogia", value: "pedagogia" },
      { label: "Gestão", value: "gestao" },
      { label: "Tecnologia", value: "tecnologia" },
    ] as const,
    filtrosMap: {
      todos: () => true,
      libras: (curso) => {
        const title = curso.title.toLowerCase();
        return title.includes("libras") || title.includes("bilingue");
      },
      pedagogia: (curso) => curso.title.toLowerCase().includes("pedagogia"),
      gestao: (curso) => {
        const title = curso.title.toLowerCase();
        return title.includes("financeira") || title.includes("comercial") || title.includes("processos") || title.includes("marketing");
      },
      tecnologia: (curso) => {
        const title = curso.title.toLowerCase();
        return title.includes("t.i") || title.includes("sistemas");
      },
      tecnologo: (curso) => {
        const title = curso.title.toLowerCase();
        const grau = curso.grau?.toLowerCase() || "";
        return (
          grau === "tecnólogo" ||
          grau === "tecnologo" ||
          title.includes("gestão de t.i") ||
          title.includes("processos") ||
          title.includes("análise e desenvolvimento")
        );
      },
      licenciatura: (curso) => {
        const grau = curso.grau?.toLowerCase() || "";
        return grau === "licenciatura" || curso.title.toLowerCase().includes("licenciatura");
      },
      bacharelado: (curso) => {
        const grau = curso.grau?.toLowerCase() || "";
        return grau === "bacharelado" || curso.title.toLowerCase().includes("bacharelado");
      },
    },
    filterCursos: (curso) => curso.nivel?.toLowerCase() === "graduacao",
  },

  pos: {
    title1: "Especializações e",
    title2: "Pós-Graduação",
    subTitle:
      "Acelere sua evolução profissional com certificações focadas no mercado. Explore nossas opções 100% online com suporte especializado.",
    filtrosMenu: [
      { label: "Todos os cursos", value: "todos" },
      { label: "Libras (Tradução/Docência)", value: "libras" },
      { label: "Especializações (AEE/TEA)", value: "especializado" },
    ] as const,
    filtrosMap: {
      todos: () => true,
      libras: (curso) => curso.title.toLowerCase().includes("libras"),
      especializado: (curso) => {
        const title = curso.title.toLowerCase();
        const category = curso.category?.toLowerCase() || "";
        return title.includes("autismo") || title.includes("aee") || title.includes("bilíngue") || category.includes("especializado");
      },
    },
    filterCursos: (curso) => curso.nivel?.toLowerCase() === "pos",
  },
};

const LEVEL_OPTIONS = [
  { label: "Graduação", value: "graduacao" },
  { label: "Pós-Graduação", value: "pos" },
] as const;

type LevelValue = (typeof LEVEL_OPTIONS)[number]["value"];
type FiltroValue = string;

interface FilterButtonProps {
  label: string;
  value: string;
  isActive: boolean;
  onClick: () => void;
}

const FilterButton = memo(({ label, value, isActive, onClick }: FilterButtonProps) => (
  <button
    key={value}
    onClick={onClick}
    className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-500 cursor-pointer ${
      isActive
        ? "bg-orange-600 text-white shadow-2xl scale-105"
        : "bg-gray-200 dark:bg-gray-800 text-primary dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-gray-700 hover:text-orange-600"
    }`}
    aria-pressed={isActive}
  >
    {label}
  </button>
));
FilterButton.displayName = "FilterButton";

interface LevelSelectorProps {
  currentLevel: LevelValue;
  onChange: (level: LevelValue) => void;
}

const LevelSelector = memo(({ currentLevel, onChange }: LevelSelectorProps) => (
  <Animated as="div" preset="fadeUp" className="flex justify-center gap-4 mb-8">
    {LEVEL_OPTIONS.map((option) => (
      <button
        key={option.value}
        onClick={() => onChange(option.value)}
        className={`px-8 py-3 rounded-full text-base font-bold transition-all duration-500 cursor-pointer ${
          currentLevel === option.value
            ? "bg-orange-600 text-white shadow-2xl scale-105"
            : "bg-gray-200 dark:bg-gray-800 text-primary dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700 hover:text-orange-600"
        }`}
        aria-pressed={currentLevel === option.value}
      >
        {option.label}
      </button>
    ))}
  </Animated>
));
LevelSelector.displayName = "LevelSelector";

const EmptyState = memo(({ message }: { message?: string }) => (
  <Animated as="div" preset="fadeScale" className="text-center py-12 text-gray-500 dark:text-gray-400">
    <p className="text-lg font-medium">{message || "Nenhum curso encontrado nesta categoria."}</p>
    <p className="text-sm mt-2">Tente ajustar o filtro selecionado.</p>
  </Animated>
));
EmptyState.displayName = "EmptyState";

const GridSkeleton = memo(() => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-6 mb-5">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden animate-pulse">
        <div className="h-48 bg-gray-300 dark:bg-gray-700" />
        <div className="p-6">
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4" />
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-2" />
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3 mb-4" />
          <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-full" />
        </div>
      </div>
    ))}
  </div>
));
GridSkeleton.displayName = "GridSkeleton";

interface CourseGridProps {
  cursos: Curso[];
  isLoading?: boolean;
  emptyMessage?: string;
}

const CourseGrid = memo(({ cursos, isLoading = false, emptyMessage }: CourseGridProps) => {
  if (isLoading) {
    return <GridSkeleton />;
  }

  if (cursos.length === 0) {
    return <EmptyState message={emptyMessage} />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-6 mb-5">
      {cursos.map((curso, i) => (
        <Animated key={curso.id || curso.title} as="div" preset="fadeUpScale" index={i} hover="lift" className="h-full w-full">
          <CourseCard index={i} curso={curso} />
        </Animated>
      ))}
    </div>
  );
});
CourseGrid.displayName = "CourseGrid";

function CourseContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [subFilter, setSubFilter] = useState<FiltroValue>("todos");
  const [isLoading, setIsLoading] = useState(false);
  const [currentLevel, setCurrentLevel] = useState<LevelValue>("graduacao");

  // ==========================================
  // SYNC COM URL
  // ==========================================

  useEffect(() => {
    const nivelUrl = searchParams.get("nivel") as LevelValue | null;
    if (nivelUrl && LEVEL_OPTIONS.some((o) => o.value === nivelUrl)) {
      setCurrentLevel(nivelUrl);
    }

    const filtroUrl = searchParams.get("filtro");
    if (filtroUrl) {
      setSubFilter(filtroUrl);
    }
  }, [searchParams]);

  // ==========================================
  // ✅ CORREÇÃO AQUI: config DEFINIDA
  // ==========================================

  const config = useMemo(() => LEVEL_CONFIGS[currentLevel], [currentLevel]);

  const cursosDoNivel = useMemo(() => Cursos.filter(config.filterCursos), [config.filterCursos]);

  const cursosFiltrados = useMemo(() => {
    const filtroFn = config.filtrosMap[subFilter] || config.filtrosMap.todos;
    return cursosDoNivel.filter(filtroFn);
  }, [cursosDoNivel, subFilter, config.filtrosMap]);

  // ==========================================
  // HANDLERS
  // ==========================================

  const handleLevelChange = useCallback(
    (level: LevelValue) => {
      setIsLoading(true);
      setCurrentLevel(level);
      setSubFilter("todos");

      const params = new URLSearchParams(searchParams.toString());
      params.set("nivel", level);
      params.delete("filtro");

      const newUrl = `${window.location.pathname}?${params.toString()}`;
      router.replace(newUrl, { scroll: false });

      setTimeout(() => setIsLoading(false), 300);
    },
    [router, searchParams],
  );

  const handleFilterChange = useCallback(
    (value: FiltroValue) => {
      setIsLoading(true);
      setSubFilter(value);

      const params = new URLSearchParams(searchParams.toString());
      params.set("nivel", currentLevel);
      if (value === "todos") {
        params.delete("filtro");
      } else {
        params.set("filtro", value);
      }

      const newUrl = `${window.location.pathname}?${params.toString()}`;
      router.replace(newUrl, { scroll: false });

      setTimeout(() => setIsLoading(false), 300);
    },
    [router, searchParams, currentLevel],
  );

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <PageModel titulo1={config.title1} titulo2={config.title2} subTitulo={config.subTitle}>
      <div className="relative px-2">
        {/* Seletor de Nível */}
        <LevelSelector currentLevel={currentLevel} onChange={handleLevelChange} />

        {/* Filtros */}
        <Animated
          as="div"
          preset="fadeUp"
          className="flex flex-wrap justify-center gap-3 md:gap-4 mb-10 border-b border-gray-200 dark:border-gray-800 pb-6"
        >
          {config.filtrosMenu.map((item) => (
            <FilterButton
              key={item.value}
              label={item.label}
              value={item.value}
              isActive={subFilter === item.value}
              onClick={() => handleFilterChange(item.value)}
            />
          ))}
        </Animated>

        {/* Grid de Cursos */}
        <AnimatePresence mode="wait">
          <Animated key={`${currentLevel}-${subFilter}`} as="div" preset="fadeScale" className="overflow-hidden w-full">
            <CourseGrid
              cursos={cursosFiltrados}
              isLoading={isLoading}
              emptyMessage={`Nenhum curso de ${currentLevel === "graduacao" ? "graduação" : "pós-graduação"} encontrado.`}
            />
          </Animated>
        </AnimatePresence>

        {/* Contador */}
        {cursosFiltrados.length > 0 && !isLoading && (
          <Animated as="p" preset="fadeUp" delay={0.3} className="text-center text-sm text-gray-400 dark:text-gray-500 mt-6">
            {cursosFiltrados.length} curso{cursosFiltrados.length > 1 ? "s" : ""} encontrado
            {cursosFiltrados.length > 1 ? "s" : ""}
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
