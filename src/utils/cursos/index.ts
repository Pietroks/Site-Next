import { CURSOS_GRADUACAO } from "./data/graduacao";
import { CURSOS_LIVRES } from "./data/livres";
import { CURSOS_POS } from "./data/pos";
import { Curso, NivelCurso } from "./types";

export * from "./types";

export const NIVEL_LABELS: Record<NivelCurso, string> = {
  graduacao: "Graduação",
  pos: "Pós-Graduação",
  livres: "Cursos Livres",
};

export const Cursos = [...CURSOS_GRADUACAO, ...CURSOS_POS, ...CURSOS_LIVRES];

export const CURSOS_POR_NIVEL = {
  graduacao: CURSOS_GRADUACAO,
  pos: CURSOS_POS,
  livres: CURSOS_LIVRES,
} as const;

export const CATEGORIAS_DISPONIVEIS = [...new Set(Cursos.map((curso) => curso.category))];
export const TAGS_DISPONIVEIS = [...new Set(Cursos.flatMap((curso) => curso.tags || []))];

export const getCursoById = (id: string): Curso | undefined => {
  return Cursos.find((curso) => curso.id === id);
};

export const getCursosByNivel = (nivel: NivelCurso): Curso[] => {
  return CURSOS_POR_NIVEL[nivel] || [];
};

export const getCursosByTag = (tag: string): Curso[] => {
  return Cursos.filter((curso) => curso.tags?.includes(tag));
};

export const getCursosDestaque = (): Curso[] => {
  return Cursos.filter((curso) => curso.destaque);
};

export const searchCursos = (term: string): Curso[] => {
  const searchTerm = term
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  return Cursos.filter((curso) => {
    const title = curso.title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const tags = curso.tags?.join("").toLowerCase() || "";
    const category = curso.category.toLowerCase();
    return title.includes(searchTerm) || tags.includes(searchTerm) || category.includes(searchTerm);
  });
};
