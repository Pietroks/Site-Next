"use client";

import { memo } from "react";
import { Animated } from "../Animated";
import { LEVEL_CONFIGS } from "@/utils/level_config";
import { NIVEL_LABELS } from "@/utils/cursos";

export const LEVEL_OPTIONS = Object.keys(LEVEL_CONFIGS).map((key) => ({
  label: NIVEL_LABELS[key as keyof typeof NIVEL_LABELS] || key,
  value: key,
}));

interface FilterButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export const FilterButton = memo(({ label, isActive, onClick }: FilterButtonProps) => (
  <button
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
  currentLevel: string;
  onChange: (level: string) => void;
}

export const LevelSelector = memo(({ currentLevel, onChange }: LevelSelectorProps) => (
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

export const EmptyState = memo(({ message }: { message?: string }) => (
  <Animated as="div" preset="fadeScale" className="text-center py-12 text-gray-500 dark:text-gray-400">
    <p className="text-lg font-medium">{message || "Nenhum curso encontrado nesta categoria."}</p>
    <p className="text-sm mt-2">Tente ajustar o filtro selecionado.</p>
  </Animated>
));
EmptyState.displayName = "EmptyState";

export const GridSkeleton = memo(() => (
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
