import { Curso } from "./types";

export const createSlug = (title: string): string => {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
};

export const generateId = (title: string): string => createSlug(title);

export const createCurso = <T extends Partial<Curso>>(input: T): T & { id: string } => ({
  ...input,
  id: generateId(input.title || ""),
});
