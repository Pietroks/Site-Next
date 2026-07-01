import { createCurso } from "../helpers";
import { Curso } from "../types";

export const CURSOS_LIVRES: Curso[] = [
  createCurso({
    title: "TEGEA",
    category: "livres",
    nivel: "livres",
    grau: "Curso Livre",
    modalidade: "Online",
    duracao: "3 meses",
    thumb: "/cursos/Pedagogia gestão escolar.png",
    alt: "Pedagogia gestão escolar",
    tags: ["gestão", "educação"],
  }),

  createCurso({
    title: "Libras Meetings 2020",
    category: "livres",
    nivel: "livres",
    grau: "Curso Livre",
    modalidade: "Online",
    duracao: "3 meses",
    thumb: "/cursos/libras-meetings2020-02.jpg",
    alt: "Libras Meetings",
    tags: ["libras", "eventos"],
  }),

  createCurso({
    title: "Libras Premium",
    category: "livres",
    nivel: "livres",
    grau: "Curso Livre",
    modalidade: "Online",
    duracao: "5 meses",
    thumb: "/cursos/libras-premium.jpg",
    alt: "libras-premium",
    tags: ["libras", "premium"],
    destaque: true,
  }),
];
