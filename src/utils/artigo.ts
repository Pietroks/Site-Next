export interface Artigo {
  id: number;
  categoria: string;
  titulo: string;
  descricao: string;
  data: string;
  tempoLeitura: string;
  imagem: string;
  link: string;
}

export const Artigos: Artigo[] = [
  {
    id: 1,
    categoria: "Graduação",
    titulo: "Como escolher a graduação ideal para acelerar sua carreira em 2026",
    descricao:
      "Descubra os principais critérios para escolher um curso alinhado com seus objetivos profissionais e se destacar no mercado.",
    data: "02 jun 2026",
    tempoLeitura: "5 min de leitura",
    imagem: "/mulher-de-tiro-medio.avif",
    link: "/blog/como-escolher-a-graduacao-ideal",
  },
  {
    id: 2,
    categoria: "Mercado de trabalho",
    titulo: "5 Habilidades mais valorizadas pelas empresas em 2026",
    descricao: "Fique por dentro das competências comportamentais e técnicas que estão ditando as contratações este ano.",
    data: "28 mai 2026",
    tempoLeitura: "5 min de leitura",
    imagem: "/o-brasil-esta-lendo-menos-blog.jpg",
    link: "/blog/habilidades-mais-valorizadas-2026",
  },
  {
    id: 3,
    categoria: "Dicas de estudo",
    titulo: "Como criar uma rotina de estudos e ser mais produtivo",
    descricao: "Métodos práticos de organização e blocos de tempo para otimizar seu aprendizado no ensino superior.",
    data: "15 mai 2026",
    tempoLeitura: "7 min de leitura",
    imagem: "/o-fim-da-licenciatura-no-ead-thumb.jpg",
    link: "/blog/como-criar-rotina-de-estudos",
  },
  {
    id: 4,
    categoria: "Vida acadêmica",
    titulo: "Bolsas de estudo: como conseguir e quais são as opções",
    descricao: "Guia definitivo sobre programas de desconto, financiamentos e incentivos para iniciar seus estudos.",
    data: "10 mai 2026",
    tempoLeitura: "6 min de leitura",
    imagem: "/alfabetizacao-foi-criada.jpg",
    link: "/blog/bolsas-de-estudo-guia",
  },
];
