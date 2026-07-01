"use client";

import React, { memo } from "react";
import { Animated } from "../Animated";
import CourseCard from "../CourseCard";
import { Curso } from "@/utils/cursos";
import { EmptyState, GridSkeleton } from "./FilterWidgets";

interface CourseGridProps {
  cursos: Curso[];
  isLoading?: boolean;
  emptyMessage?: string;
}

export const CourseGrid = memo(({ cursos, isLoading = false, emptyMessage }: CourseGridProps) => {
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
