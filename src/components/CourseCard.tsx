"use client";

import { Animated } from "./Animated";
import { IconCalendarFill, IconCheck } from "./IconsSvg";
import PrimaryButton from "./PrimaryButton";

interface CourseCardProps {
  curso: {
    thumb: string;
    alt: string;
    title: string;
    modalidade: string;
    duracao: string;
  };
  index: number;
}

export default function CourseCard({ curso, index }: CourseCardProps) {
  return (
    <Animated
      key={index}
      as="div"
      preset="fadeUpScale"
      index={index}
      hover="lift"
      className="group bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col w-full overflow-hidden h-full"
    >
      <div className="h-40 bg-gray-200 dark:bg-gray-900 overflow-hidden">
        <img
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          src={curso.thumb}
          alt={curso.alt}
        />
      </div>

      <div className="p-6 flex flex-col grow">
        <div>
          <h3
            title={curso.title}
            className="font-extrabold mb-4 text-indigo-950 dark:text-gray-200 text-xl overflow-hidden line-clamp-2 min-h-14"
          >
            {curso.title}
          </h3>

          <div className="flex flex-col gap-3 text-sm mb-2">
            <span className="text-indigo-950 dark:text-gray-200 px-3 rounded-full text-base flex items-center gap-3">
              <IconCheck /> Modalidade: {curso.modalidade}
            </span>
            <span className="text-indigo-950 dark:text-gray-200 px-3 rounded-full text-base flex items-center gap-3">
              <IconCalendarFill /> Duração: {curso.duracao}
            </span>
          </div>
        </div>

        <PrimaryButton className="mt-4 p-3 w-full cursor-pointer" onClick={() => console.log(`Abriu: ${curso.title}`)}>
          Saiba mais
        </PrimaryButton>
      </div>
    </Animated>
  );
}
