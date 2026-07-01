import { createCurso } from "../helpers";
import { Curso } from "../types";

export const CURSOS_POS: Curso[] = [
  createCurso({
    title: "Pós-graduação em Tradução, Interpretação e/ou Docência da Libras",
    category: "libras",
    nivel: "pos",
    grau: "Pós-Graduação",
    modalidade: "EAD",
    duracao: "12 meses",
    thumb: "/cursos/Pedagogia.png",
    alt: "Pos em Pedagogia",
    edital: "https://unintese.com.br/editais/pos-graduacao/edital-pos-libras-TIDL.html",
    tags: ["libras", "tradução", "interpretação", "docência"],
    destaque: true,
  }),

  createCurso({
    title: "Pós-graduação em Libras",
    category: "libras",
    nivel: "pos",
    grau: "Pós-Graduação",
    modalidade: "EAD",
    duracao: "12 meses",
    thumb: "/cursos/Pedagogia-bil.png",
    alt: "Pos em Libras",
    edital: "#",
    tags: ["libras", "pós-graduação"],
  }),

  createCurso({
    title: "Capacitação em LIBRAS",
    category: "libras",
    nivel: "pos",
    grau: "Capacitação",
    modalidade: "EAD",
    duracao: "64 meses",
    thumb: "/cursos/familia-desenvolvimento-infantil.jpg",
    alt: "familia-desenvolvimento-infantil",
    edital: "#",
    tags: ["libras", "capacitação"],
  }),

  createCurso({
    title: "Pós-Graduação em Educação Bilíngue",
    category: "libras especializado",
    nivel: "pos",
    grau: "Pós-Graduação",
    modalidade: "EAD",
    duracao: "64 meses",
    thumb: "/cursos/familia-desenvolvimento-infantil.jpg",
    alt: "familia-desenvolvimento-infantil",
    edital: "#",
    tags: ["bilíngue", "educação"],
  }),

  createCurso({
    title: "Pós-Graduação em Atendimento Educacional Especializado (AEE)",
    category: "especializado",
    nivel: "pos",
    grau: "Pós-Graduação",
    modalidade: "Online",
    duracao: "3 meses",
    thumb: "/cursos/pedagogia educação especial.png",
    alt: "AEE",
    edital: "#",
    tags: ["aee", "educação especial", "inclusão"],
  }),
];
