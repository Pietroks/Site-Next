import { Curso } from "./cursos";

interface LevelConfig {
  title1: string;
  title2: string;
  subTitle: string;
  filtrosMenu: readonly { label: string; value: string }[];
  filtrosMap: Record<string, (curso: Curso) => boolean>;
  nivel: "graduacao" | "pos" | "livres";
}

export const LEVEL_CONFIGS: Record<string, LevelConfig> = {
  graduacao: {
    nivel: "graduacao",
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
  },

  pos: {
    nivel: "pos",
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
  },

  livres: {
    nivel: "livres",
    title1: "Cursos",
    title2: "Livres",
    subTitle: "Cursos de curta duração para aprimorar suas habilidades e conhecimentos.",
    filtrosMenu: [
      { label: "Todos os cursos", value: "todos" },
      { label: "Libras", value: "libras" },
      { label: "Gestão", value: "gestao" },
    ] as const,
    filtrosMap: {
      todos: () => true,
      libras: (curso) => curso.title.toLowerCase().includes("libras"),
      gestao: (curso) => {
        const title = curso.title.toLowerCase();
        return title.includes("gestão") || title.includes("tegea");
      },
    },
  },
};
