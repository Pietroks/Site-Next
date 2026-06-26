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

export interface Curso {
  id: string;
  title: string;
  category: string;
  nivel: "graduacao" | "pos" | "livres";
  grau: "Licenciatura" | "Bacharelado" | "Tecnólogo" | "Pós-Graduação" | "Capacitação" | "Curso Livre";
  modalidade: "EAD" | "Semi-Presencial" | "Online";
  duracao: string;
  thumb: string;
  alt: string;
  edital?: string;
  gradeCurricular?: ModuloGrade[];
  mauticFormId?: number;
  mauticFormName?: string;
  whatsappContact?: string;
  detalhesExtras?: SecaoDetalhe[];
}

export const Cursos: Curso[] = [
  // --- GRADUAÇÃO ---
  {
    id: "licenciatura-em-libras",
    title: "Licenciatura em Libras",
    category: "libras/pedagogia",
    nivel: "graduacao",
    grau: "Licenciatura",
    modalidade: "Semi-Presencial",
    duracao: "4 anos",
    thumb: "/cursos/bacharel-letras-libras.png",
    alt: "Licenciatura Letras Libras",
    mauticFormId: 111,
    mauticFormName: "interessadonoeditaldelicenciaturaletraslibras",
    whatsappContact: "555584029256",
    detalhesExtras: [
      {
        titulo: "Habilitações e Áreas de Atuação",
        conteudo: [
          "O concluinte deste curso recebe o título de Licenciado em Letras com dupla habilitação: Língua Brasileira de Sinais (Libras) e Língua Portuguesa e Literatura.",
          "Atuação como Professor: Escolas Municipais, Estaduais e Privadas no Ensino Fundamental (anos finais) e Ensino Médio, além de Ensino Superior (Graduação e Pós-Graduação).",
          "Atuação em Espaços Não Escolares: Comunicação institucional, mercados editoriais, consultorias linguísticas, plataformas virtuais, revisão textual e produção de material didático bilingue.",
        ],
      },
      {
        titulo: "O que você vai aprender?",
        conteudo:
          "Além dos conhecimentos gerais, o curso desenvolve competências específicas em Língua Portuguesa e Libras. O estudante mergulhará nos dois idiomas para compreender fenômenos linguísticos, gramaticais e literários sob uma perspectiva bilíngue e inclusiva.",
      },
      {
        titulo: "O curso vai ensinar Libras?",
        conteudo:
          "Sim! O estudante aprenderá a Língua Brasileira de Sinais para comunicação e docência. Como diferencial, terá acesso à Escola de Libras da Uníntese (eLibras), uma plataforma exclusiva com percurso formativo completo, do básico ao avançado, visando a fluência.",
      },
      {
        titulo: "Metodologia de Ensino (AprendoCOM)",
        conteudo:
          "O ensino utiliza a metodologia inovadora AprendoCOM (Aprendizagem para a Compreensão). Baseada na Sala de Aula Invertida, ela centra o processo no estudante, incentivando a autonomia através de conceitos antecipados, vídeos, textos e investigação ativa.",
      },
      {
        titulo: "Aulas e Interação ao Vivo",
        conteudo:
          "Os materiais ficam no AVA, mas a interação acontece em aulas ao vivo online semanais (ou quinzenais). O sistema próprio da Uníntese permite contato direto com professores e colegas para sanar dúvidas, debater e orientar trabalhos de forma colaborativa.",
      },
      {
        titulo: "Suporte e Tecnologia",
        conteudo:
          "Para superar dificuldades, oferecemos as Trilhas de Aprendizagem personalizadas, com rotas individuais e tarefas de reforço. Todo o percurso conta com mediação tecnológica e orientação contínua de professores, tutores e suporte técnico.",
      },
    ],
  },
  {
    id: "bacharelado-em-libras",
    title: "Bacharelado em Libras",
    category: "libras/pedagogia",
    nivel: "graduacao",
    grau: "Bacharelado",
    modalidade: "EAD",
    duracao: "4 anos",
    thumb: "/cursos/Comunicacao-assistiva.png",
    alt: "Bacharelado Letras Libras",
    edital: "https://unintese.com.br/editais/graduacao/bacharel-letras-libras.html",
  },
  {
    id: "pedagogia-bilingue",
    title: "Pedagogia Bilíngue",
    category: "libras/pedagogia",
    nivel: "graduacao",
    grau: "Licenciatura",
    modalidade: "EAD",
    duracao: "4 anos",
    thumb: "/cursos/licenciatura-letras-libras.jpg",
    alt: "Pedagogia Bilingue",
    edital: "#",
  },
  {
    id: "pedagogia-infantil",
    title: "Pedagogia Infantil",
    category: "libras/pedagogia",
    nivel: "graduacao",
    grau: "Licenciatura",
    modalidade: "EAD",
    duracao: "4 anos",
    thumb: "/cursos/licenciatura-letras-libras.jpg",
    alt: "Pedagogia Infantil",
    edital: "#",
  },
  {
    id: "pedagogia-educacao-especial",
    title: "Pedagogia Educação Especial",
    category: "libras/pedagogia",
    nivel: "graduacao",
    grau: "Licenciatura",
    modalidade: "EAD",
    duracao: "4 anos",
    thumb: "/cursos/licenciatura-letras-libras.jpg",
    alt: "Pedagogia Educação Especial",
    edital: "#",
  },

  // --- PÓS-GRADUAÇÃO ---
  {
    id: "pos-traducao-interpretacao-docencia-libras",
    title: "Pós-graduação em Tradução, Interpretação e/ou Docência da Libras",
    category: "libras",
    nivel: "pos",
    grau: "Pós-Graduação",
    modalidade: "EAD",
    duracao: "12 meses",
    thumb: "/cursos/Pedagogia.png",
    alt: "Pos em Pedagogia",
    edital: "https://unintese.com.br/editais/pos-graduacao/edital-pos-libras-TIDL.html",
  },
  {
    id: "pos-em-libras",
    title: "Pós-graduação em Libras",
    category: "libras",
    nivel: "pos",
    grau: "Pós-Graduação",
    modalidade: "EAD",
    duracao: "12 meses",
    thumb: "/cursos/Pedagogia-bil.png",
    alt: "Pos em Libras",
    edital: "#",
  },
  {
    id: "capacitacao-em-libras",
    title: "Capacitação em LIBRAS",
    category: "libras",
    nivel: "pos",
    grau: "Capacitação",
    modalidade: "EAD",
    duracao: "64 meses",
    thumb: "/cursos/familia-desenvolvimento-infantil.jpg",
    alt: "familia-desenvolvimento-infantil",
    edital: "#",
  },
  {
    id: "pos-educacao-bilingue",
    title: "Pós-Graduação em Educação Bilíngue",
    category: "libras especializado",
    nivel: "pos",
    grau: "Pós-Graduação",
    modalidade: "EAD",
    duracao: "64 meses",
    thumb: "/cursos/familia-desenvolvimento-infantil.jpg",
    alt: "familia-desenvolvimento-infantil",
    edital: "#",
  },
  {
    id: "pos-atendimento-educacional-especializado-aee",
    title: "Pós-Graduação em Atendimento Educacional Especializado (AEE)",
    category: "especializado",
    nivel: "pos",
    grau: "Pós-Graduação",
    modalidade: "Online",
    duracao: "3 meses",
    thumb: "/cursos/pedagogia educação especial.png",
    alt: "AEE",
    edital: "#",
  },

  // --- CURSOS LIVRES ---
  {
    id: "tegea",
    title: "TEGEA",
    category: "livres",
    nivel: "livres",
    grau: "Curso Livre",
    modalidade: "Online",
    duracao: "3 meses",
    thumb: "/cursos/Pedagogia gestão escolar.png",
    alt: "Pedagogia gestão escolar",
  },
  {
    id: "libras-meetings-2020",
    title: "Libras Meetings 2020",
    category: "livres",
    nivel: "livres",
    grau: "Curso Livre",
    modalidade: "Online",
    duracao: "3 meses",
    thumb: "/cursos/libras-meetings2020-02.jpg",
    alt: "Libras Meetings",
  },
  {
    id: "libras-premium",
    title: "Libras Premium",
    category: "livres",
    nivel: "livres",
    grau: "Curso Livre",
    modalidade: "Online",
    duracao: "5 meses",
    thumb: "/cursos/libras-premium.jpg",
    alt: "libras-premium",
  },

  // --- TECNÓLOGOS ---
  {
    id: "analise-e-desenvolvimento-de-sistemas",
    title: "Tecnologia em Análise e Desenvolvimento de Sistemas",
    category: "tecnologia",
    nivel: "graduacao",
    grau: "Tecnólogo",
    modalidade: "EAD",
    duracao: "2 anos e meio",
    thumb: "/cursos/libras-premium.jpg",
    alt: "Curso de ADS",
    edital: "/editais/ads-2026.pdf",
    gradeCurricular: [
      {
        modulo: "Conhecimento Específico I",
        materias: [
          { nome: "Fundamentos de Sistemas Operacionais", cargaHoraria: "50h" },
          { nome: "Pensamento Computacional", cargaHoraria: "50h" },
          { nome: "Ferramentas de Desenvolvimento Web", cargaHoraria: "60h" },
          { nome: "Arquitetura de Sistemas", cargaHoraria: "50h" },
          { nome: "Fundamentos de Big Data e IoT", cargaHoraria: "50h" },
          { nome: "Engenharia de Software", cargaHoraria: "50h" },
          { nome: "Segurança em Sistemas Computacionais", cargaHoraria: "50h" },
          { nome: "Banco de Dados Relacional", cargaHoraria: "50h" },
          { nome: "Algoritmos e Programação com Python", cargaHoraria: "50h" },
          { nome: "Programação Orientada a Objetos", cargaHoraria: "50h" },
          { nome: "Integração de Aplicações", cargaHoraria: "50h" },
        ],
      },
      {
        modulo: "Conhecimento Específico II",
        materias: [
          { nome: "Análise de Algoritmos", cargaHoraria: "50h" },
          { nome: "Paradigmas de Programação", cargaHoraria: "50h" },
          { nome: "Estrutura de Dados", cargaHoraria: "60h" },
          { nome: "Desenvolvimento de Software com Metodologias Ágeis", cargaHoraria: "50h" },
          { nome: "Teste de Software", cargaHoraria: "50h" },
          { nome: "Interface humano-computador", cargaHoraria: "50h" },
          { nome: "Gerenciamento de Projeto de Softwares", cargaHoraria: "50h" },
          { nome: "Inteligência Artificial", cargaHoraria: "50h" },
          { nome: "Desenvolvimento para Dispositivos Móveis", cargaHoraria: "50h" },
          { nome: "Direito e Ética na Computação", cargaHoraria: "50h" },
        ],
      },
      {
        modulo: "Criatividade & Inovação",
        materias: [
          { nome: "Pensamento Criativo e Inovação", cargaHoraria: "50h" },
          { nome: "Empreendedorismo e Mentalidade Empreendedora", cargaHoraria: "50h" },
          { nome: "Pensamento Disruptivo, Transformações Digitais e Organizações Inovadoras", cargaHoraria: "60h" },
          { nome: "Modelagem de Negócios", cargaHoraria: "50h" },
        ],
      },
      {
        modulo: "Gestão & Liderança",
        materias: [
          { nome: "Planejamento e Gestão Estratégica", cargaHoraria: "50h" },
          { nome: "Liderança e Gestão de Pessoas", cargaHoraria: "50h" },
          { nome: "Inteligência Emocional, Gestão de Conflitos e Trabalho em Equipe", cargaHoraria: "60h" },
          { nome: "Desenvolvimento Gerencial e de Equipes Híbridas", cargaHoraria: "50h" },
          { nome: "Gestão de Projetos", cargaHoraria: "50h" },
        ],
      },
      {
        modulo: "Carreira & Desenvolvimento Pessoal",
        materias: [
          { nome: "Sociedades Inclusivas, Valores e Direitos Humanos", cargaHoraria: "50h" },
          { nome: "Cultura e Comportamento Humano nas Organizações", cargaHoraria: "50h" },
          { nome: "Hard, Soft e Power Skills", cargaHoraria: "60h" },
          { nome: "Laboratório de Carreiras", cargaHoraria: "50h" },
          { nome: "Disciplina Optativa (Conforme oferta institucional)", cargaHoraria: "50h" },
        ],
      },
      {
        modulo: "Know-How",
        materias: [{ nome: "Práticas Transdisciplinares de Ensino, Pesquisa e Extensão", cargaHoraria: "210h" }],
      },
    ],
  },
  {
    id: "gestao-de-ti",
    title: "Gestão de T.I",
    category: "tecgea",
    nivel: "graduacao",
    grau: "Tecnólogo",
    duracao: "2 anos",
    modalidade: "EAD",
    thumb: "/cursos/LIBRAS-FLUENCY.png",
    alt: "Gestão de T.I",
    edital: "#",
  },
  {
    id: "marketing",
    title: "Marketing",
    category: "tecgea",
    nivel: "graduacao",
    grau: "Tecnólogo",
    duracao: "2 anos",
    modalidade: "EAD",
    thumb: "/cursos/libras@0.3x.png",
    alt: "Marketing",
    edital: "#",
  },
  {
    id: "gestao-comercial",
    title: "Gestão Comercial",
    category: "tecgea",
    nivel: "graduacao",
    grau: "Tecnólogo",
    duracao: "2 anos",
    modalidade: "EAD",
    thumb: "/cursos/libras@0.3x.png",
    alt: "Gestão Comercial",
    edital: "#",
  },
  {
    id: "gestao-financeira",
    title: "Gestão Financeira",
    category: "tecgea",
    nivel: "graduacao",
    grau: "Tecnólogo",
    duracao: "2 anos",
    modalidade: "EAD",
    thumb: "/cursos/libras@0.3x.png",
    alt: "Gestão Financeira",
    edital: "#",
  },
  {
    id: "processos-gerenciais",
    title: "Processos Gerenciais",
    category: "tecgea",
    nivel: "graduacao",
    grau: "Tecnólogo",
    duracao: "2 anos",
    modalidade: "EAD",
    thumb: "/cursos/libras@0.3x.png",
    alt: "Processos Gerenciais",
    edital: "#",
  },
];
