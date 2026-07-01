export interface Materia {
  nome: string;
  cargaHoraria: string;
}

export interface ModuloGrade {
  modulo: string;
  materias: Materia[];
}

export interface SecaoDetalhe {
  titulo: string;
  conteudo: string | string[];
}

export type NivelCurso = "graduacao" | "pos" | "livres";
export type GrauCurso = "Licenciatura" | "Bacharelado" | "Tecnólogo" | "Pós-Graduação" | "Capacitação" | "Curso Livre";
export type ModalidadeCurso = "EAD" | "Semi-Presencial" | "Online";

export interface Curso {
  id: string;
  title: string;
  category: string;
  nivel: NivelCurso;
  grau: GrauCurso;
  modalidade: ModalidadeCurso;
  duracao: string;
  thumb: string;
  alt: string;
  edital?: string;
  gradeCurricular?: ModuloGrade[];
  mauticFormId?: number;
  mauticFormName?: string;
  whatsappContact?: string;
  detalhesExtras?: SecaoDetalhe[];
  tags?: string[];
  destaque?: boolean;
  slug?: string;
}
