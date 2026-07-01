"use client";

import React, { memo, useState } from "react";
import { IconArrow } from "../IconsSvg";
import { Curso } from "@/utils/cursos";

export type SortOption = "title" | "title-desc" | "duracao" | "duracao-desc" | "destaque" | "modalidade";

interface SortConfig {
  label: string;
  value: SortOption;
  icon?: React.ReactNode;
}

export const SORT_OPTIONS: SortConfig[] = [
  { label: "Nome (A-Z)", value: "title" },
  { label: "Nome (Z-A)", value: "title-desc" },
  { label: "Duração (curta → longa)", value: "duracao" },
  { label: "Duração (longa → curta)", value: "duracao-desc" },
  { label: "Destaque primeiro", value: "destaque" },
  { label: "Modalidade", value: "modalidade" },
] as const;

export const sortCursos = (cursos: Curso[], sortBy: SortOption): Curso[] => {
  const sorted = [...cursos];
  const getDurationNumber = (duracao: string): number => {
    const match = duracao.match(/(\d+)/);
    return match ? parseInt(match[0]) : 0;
  };

  switch (sortBy) {
    case "title":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case "title-desc":
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    case "duracao":
      return sorted.sort((a, b) => getDurationNumber(a.duracao) - getDurationNumber(b.duracao));
    case "duracao-desc":
      return sorted.sort((a, b) => getDurationNumber(b.duracao) - getDurationNumber(a.duracao));
    case "destaque":
      return sorted.sort((a, b) => {
        if (a.destaque && !b.destaque) return -1;
        if (!a.destaque && b.destaque) return 1;
        return a.title.localeCompare(b.title);
      });
    case "modalidade":
      return sorted.sort((a, b) => a.modalidade.localeCompare(b.modalidade));
    default:
      return sorted;
  }
};

interface SortSelectorProps {
  currentSort: SortOption;
  onChange: (value: SortOption) => void;
}

export const SortSelector = memo(({ currentSort, onChange }: SortSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const getCurrentLabel = () => {
    const option = SORT_OPTIONS.find((opt) => opt.value === currentSort);
    return option?.label || "Ordenar por";
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex cursor-pointer items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-500"
      >
        <span>{getCurrentLabel()}</span>
        <IconArrow className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-7 mt-2 w-64 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-800 py-2 z-50">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm transition-colors duration-500 flex items-center cursor-pointer gap-2 ${
                currentSort === option.value
                  ? "bg-orange-50 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400 font-semibold"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:hover:text-gray-800"
              }`}
            >
              {currentSort === option.value && (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              <span className={currentSort === option.value ? "ml-0" : "ml-6"}>{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
});

SortSelector.displayName = "SortSelector";
