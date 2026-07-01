"use client";

import { Animated } from "@/components/Animated";
import { IconCheck, IconDownload, IconMapPin, MailIcon, WhatsAppIcon } from "@/components/IconsSvg";
import PageModel from "@/components/PageModel";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import { memo, useCallback, useState } from "react";

const CPA_TABS = [
  { id: "sobre", label: "O que é a CPA" },
  { id: "contato", label: "Contato" },
  { id: "sinaes", label: "SINAES" },
  { id: "atribuicoes", label: "Atribuições" },
  { id: "glossario", label: "Glossário" },
  { id: "membros", label: "Membros" },
  { id: "documentos", label: "Documentos e Relatórios" },
  { id: "autoavaliacao", label: "Autoavaliação Institucional" },
] as const;

type TabId = (typeof CPA_TABS)[number]["id"];

const MEMBROS = [
  { nome: "Carmem Regina dos Santos Ferreira", segmento: "Técnico-administrativo / Coordenadora" },
  { nome: "Dora Maria Dornelles", segmento: "Corpo Tutorial" },
  { nome: "Mônica Felipin Vincenzi", segmento: "Corpo Docente" },
  { nome: "Raziel Haas Willms", segmento: "Corpo Discente" },
  { nome: "Jussara Maria Jornada Fortes", segmento: "Sociedade Civil Organizada" },
] as const;

const DOCUMENTOS = [
  { nome: "Relatório de Autoavaliação Institucional Parcial - 2025", tamanho: "2.4 MB", url: "/docs/cpa-2025.pdf" },
  { nome: "Relatório Integral de Autoavaliação e Desempenho - 2024", tamanho: "4.1 MB", url: "/docs/cpa-2024.pdf" },
  { nome: "Projeto de Autoavaliação Institucional da CPA (Regulamento)", tamanho: "1.1 MB", url: "/docs/regulamento-cpa.pdf" },
  { nome: "Lei Federal Nº 10.861 - Diretrizes do SINAES", tamanho: "450 KB", url: "/docs/lei-10861.pdf" },
] as const;

interface ContatoItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
}

const CONTATOS: ContatoItem[] = [
  {
    icon: IconMapPin,
    label: "Endereço",
    value: "R. Duque de Caxias, 839 - Centro\nSanto Ângelo - RS, 98803-412",
  },
  {
    icon: MailIcon,
    label: "E-mail",
    value: "academico@unintese.com",
    href: "mailto:academico@unintese.com",
  },
  {
    icon: WhatsAppIcon,
    label: "Telefone",
    value: "(55) 3312-4002",
    href: "tel:555533124002",
  },
] as const;

const TERMOS_GLOSSARIO = [
  {
    termo: "Autoavaliação Institucional",
    definicao:
      "Tem como objetivos produzir conhecimentos, refletir sobre as atividades cumpridas pela instituição, identificar as causas dos seus problemas, aumentar a consciência pedagógica e capacidade profissional do corpo docente e técnico-administrativo, fortalecer as relações de cooperação entre os diversos atores institucionais, tornar mais efetiva a vinculação da instituição com a comunidade, julgar acerca da relevância científica e social de suas atividades e produtos, além de prestar contas à sociedade.",
  },
  {
    termo: "Avaliação Interna",
    definicao:
      "No âmbito do Sistema Nacional de Avaliação da Educação Superior (Sinaes), tem como objetivo de análise a própria instituição, observa as dez dimensões institucionais, envolve a participação de toda a comunidade acadêmica e a sociedade civil e, como insumo final, apresenta um relatório anual que subsidia a avaliação institucional externa.",
  },
  {
    termo: "Avaliação Externa",
    definicao:
      "Processo que avalia uma instituição, um programa ou um desempenho, utilizando critérios estabelecidos e coerentes com o objetivo da avaliação, conduzido por pessoal externo à Universidade, mais especificamente os avaliadores do INEP.",
  },
  {
    termo: "Comissão Própria de Avaliação (CPA)",
    definicao:
      "Comissão instituída no âmbito da IES, responsável pela condução dos processos de avaliação internos da Universidade, de sistematização e de prestação das informações solicitadas pelo INEP, cuja composição assegura a participação de todos os segmentos da comunidade universitária e da sociedade civil organizada.",
  },
  {
    termo: "IES",
    definicao: "Instituição de Ensino Superior.",
  },
  {
    termo: "INEP",
    definicao:
      "Instituto Nacional de Estudos e Pesquisas Educacionais Anísio Teixeira. Autarquia federal vinculada ao Ministério da Educação (MEC).",
  },
  {
    termo: "SINAES",
    definicao: "Sistema Nacional de Avaliação da Educação Superior. Criado pela Lei n° 10.861, de 14 de abril de 2004.",
  },
] as const;

interface TabButtonProps {
  id: TabId;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const TabButton = memo(({ id, label, isActive, onClick }: TabButtonProps) => (
  <button
    key={id}
    onClick={onClick}
    className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-500 cursor-pointer ${
      isActive
        ? "bg-orange-600 text-white shadow-2xl scale-105"
        : "bg-gray-200 dark:bg-gray-800 text-primary dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-gray-700 hover:text-orange-600"
    }`}
    aria-pressed={isActive}
  >
    {label}
  </button>
));
TabButton.displayName = "TabButton";

const SobreCpa = memo(() => (
  <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
    <h3 className="text-2xl font-extrabold text-primary dark:text-gray-200 mb-2">Apresentação</h3>
    <p>
      A Comissão Própria de Avaliação (CPA) da Faculdade Uníntese é o órgão responsável pela coordenação, aplicação e consolidação da
      autoavaliação institucional. Instituída de acordo com a legislação federal do{" "}
      <strong>SINAES (Sistema Nacional de Avaliação da Educação Superior)</strong>, conforme a Lei nº 10.861/2004.
    </p>
    <p>
      Nosso papel fundamental é ouvir os acadêmicos, professores, tutores e colaboradores administrativos para identificar pontos fortes e
      oportunidades de evolução, transformando as respostas de questionários em melhorias práticas em infraestrutura, tecnologias e
      metodologias de ensino.
    </p>
    <p>
      A Comissão Própria de Avaliação (CPA) é um setor constituído em todas as Instituições de Ensino Superior (IES), em cumprimento à Lei
      nº 10.861/2004, que instituiu o Sistema Nacional de Avaliação do Ensino Superior (SINAES). A Comissão Própria de Avaliação (CPA) é
      formada por professores, alunos, técnicos-administrativos e representantes da sociedade civil organizada, com atribuições de
      coordenação dos processos de avaliação internos da instituição e sistematização dos dados solicitados pelo Instituto Nacional de
      Estudos e Pesquisas Educacionais Anísio Teixeira (INEP), órgão vínculado ao Ministério da Educação.
    </p>
    <p>
      A CPA realiza anualmente o levantamento de informações através da aplicação do instrumento (questionário) de Avaliaçãso Institucional
      através dos sistemas on-line SIG (SIGRH, SIPAC e SIGAA) com toda a comunidade acadêmica (docentes, discentes e
      técnicos-administrativos) no intuito de conhecer suas opiniões e demandas, tendo como objetivo melhorar o mérito e o valor da
      Universidade, os cursos e seus programas, as dimensões de ensino, pesquisa, extensão, gestão e formação, além de promover a melhoria
      da qualidade da educação superior e responsabilidade social da Instituição.
    </p>
    <p>
      Destaca-se que a Avaliação Institucional (Interna - questionários aplicados on-line) realizada pela CPA serve de subsídios para o
      reconhecimento, credenciamento e recredenciamento de cursos e Instituições de Ensino Superior (IES), ou seja, serve para a Avaliação
      de Cursos de Graduação (Externa - feita pelos avaliadores do Instituto Nacional de Estudos e Pesquisas Educacionais Anísio Teixeira -
      INEP), e que juntamente com o Exame Nacional de Avaliação dos Estudantes (ENADE) formam o Sistema Nacional de Avaliação da Educação
      Superior (SINAES), constituindo dentre outros o Índice de Curso de Graduação (IGC), conhecido como nota ou conceito do curso.
    </p>
  </div>
));
SobreCpa.displayName = "SobreCpa";

const AtribuicoesCpa = memo(() => {
  const itens = [
    "Promover o envolvimento permanente da comunidade acadêmica com o processo de avaliação interna da Faculdade Uníntese;",
    "Sistematizar e acompanhar o processo de avaliação interna institucional;",
    "Elaborar relatórios anuais com o resultado da avaliação interna;",
    "Divulgar para a comunidade acadêmica e sociedade os resultados alcançados;",
    "Acompanhar o processo externo de avaliação (avaliadores do INEP), prestando informações pertinentes a avaliação institucional e seus resultados.",
  ];
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-extrabold text-primary dark:text-gray-200 mb-2">Nossas Atribuições</h3>
      <ul className="space-y-3">
        {itens.map((item, i) => (
          <li key={i} className="flex items-center gap-3 text-gray-600 dark:text-gray-300 text-sm md:text-base">
            <IconCheck className="text-orange-600 shrink-0 mt-1" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
});
AtribuicoesCpa.displayName = "AtribuicoesCpa";

const MembrosCpa = memo(() => (
  <div className="space-y-6">
    <h3 className="text-2xl font-extrabold text-primary dark:text-gray-200 mb-2">Composição da Comissão</h3>
    <p className="text-sm text-gray-500 dark:text-gray-400">
      A CPA atua de forma autônoma e é constituída por representantes eleitos e indicados de todos os segmentos da instituição:
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {MEMBROS.map((m, i) => (
        <div key={i} className="p-4 bg-gray-50 dark:bg-gray-800/40 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800/60">
          <h4 className="font-bold text-orange-600 dark:text-orange-400 text-base">{m.segmento}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{m.nome}</p>
        </div>
      ))}
    </div>
  </div>
));
MembrosCpa.displayName = "MembrosCpa";

const DocumentosCpa = memo(() => {
  const handleDownload = useCallback((url: string, nome: string) => {
    window.open(url, "_blank");
  }, []);
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-extrabold text-primary dark:text-gray-200 mb-2">Central de Downloads</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Acesse as legislações oficiais e os resultados consolidados das últimas avaliações aplicadas:
      </p>
      <div className="space-y-3">
        {DOCUMENTOS.map((doc, i) => (
          <div
            key={i}
            className="flex flex-col sm:flex-row justify-between sm: items-center p-4 bg-gray-50 dark:bg-gray-800/40 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800/60 hover:border-orange-200 dark:hover:border-orange-950 transition-colors duration-500"
          >
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{doc.nome}</span>
              <span className="text-xl text-gray-400 mt-0.5">{doc.tamanho}</span>
            </div>
            <button
              onClick={() => handleDownload(doc.url, doc.nome)}
              className="mt-3 sm:mt-0 px-4 py-2 bg-primary hover:bg-orange-600 text-white dark:bg-gray-800 dark:hover:bg-orange-600 font-bold text-xs rounded-lg shadow-2xl transition-colors duration-500 cursor-pointer text-center"
            >
              <IconDownload className="w-5 h-5" />
              Baixar PDF
            </button>
          </div>
        ))}
      </div>
    </div>
  );
});
DocumentosCpa.displayName = "DocumentosCpa";

const ContatoCpa = memo(() => (
  <div className="space-y-6">
    <h3 className="text-2xl font-extrabold text-primary dark:text-gray-200 mb-2">Contatos da CPA</h3>
    <p className="text-sm text-gray-500 dark:text-gray-400">
      Tem alguma dúvida, sugestão ou feedback sobre a autoavaliação institucional? Entre em contato diretamente com a nossa comissão.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
      {CONTATOS.map((contato, i) => {
        const Icon = contato.icon;
        return (
          <div
            key={i}
            className="p-5 bg-gray-50 dark:bg-gray-800/40 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800/60 flex flex-col hover:border-orange-200 dark:hover:border-orange-800 transition-colors duration-300"
          >
            <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider flex items-center gap-2">
              <Icon className="w-4 h-4" />
              {contato.label}
            </span>
            {contato.href ? (
              <a
                href={contato.href}
                className="text-sm text-primary dark:text-gray-200 font-bold mt-2 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-300 break-all"
              >
                {contato.value}
              </a>
            ) : (
              <p className="text-sm text-gray-700 dark:text-gray-300 font-medium mt-2 leading-relaxed whitespace-pre-line">
                {contato.value}
              </p>
            )}
          </div>
        );
      })}
    </div>
  </div>
));
ContatoCpa.displayName = "ContatoCpa";

const SinaesCpa = memo(() => (
  <div className="flex flex-col gap-8 items-center w-full">
    <div className="lg:col-span-7 space-y-4 text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed">
      <h3 className="text-2xl font-extrabold text-primary dark:text-gray-200 mb-2">
        Sistema Nacional de Avaliação da Educação Superior (SINAES)
      </h3>
      <p>
        Criado pela Lei n° 10.861, de 14 de abril de 2004, o Sistema Nacional de Avaliação da Educação Superior (Sinaes) é formado por três
        componentes principais: a avaliação das instituições, dos cursos e do desempenho dos estudantes. O Sinaes avalia todos os aspectos
        que giram em torno desses três eixos, principalmente o ensino, a pesquisa, a extensão, a responsabilidade social, o desempenho dos
        alunos, a gestão da instituição, o corpo docente e as instalações.
      </p>

      <p>
        Os principais objetivos da avaliação envolvem melhorar o mérito e o valor das instituições, áreas, cursos e programas, nas dimensões
        de ensino, pesquisa, extensão, gestão e formação; melhorar a qualidade da educação superior e orientar a expansão da oferta, além de
        promover a responsabilidade social das IES, respeitando a identidade institucional e a autonomia de cada organização.
      </p>

      <p>
        O Sinaes possui uma série de instrumentos complementares: autoavaliação, avaliação externa, Exame Nacional de Desempenho de
        Estudantes - Enade, Avaliação dos cursos de graduação e instrumentos de informação como o censo e o cadastro. A integração dos
        instrumentos permite que sejam atribuídos alguns conceitos, ordenados numa escala com cinco níveis, a cada uma das dimensões e ao
        conjunto das dimensões avaliadas. O Ministério da Educação torna público e disponível o resultado da avaliação das instituições de
        ensino superior e de seus cursos.
      </p>

      <p>
        A divulgação abrange tanto instrumentos de informação (dados do censo, do cadastro, Conceito Preliminar de Curso - CPC e Índice
        Geral de Cursos - IGC) quanto os conceitos das avaliações para os atos de renovação, reconhecimento e recredenciamento (parte do
        ciclo trienal do Sinaes, com base nos cursos contemplados no Enade a cada ano).
      </p>
    </div>
    <div className="lg:col-span-5 w-full sticky top-6">
      <div className="relative w-full aspect-4/3 rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/40 flex items-center justify-center group">
        <Image
          src="/institucional/sinaes.jpg"
          alt="Infográfico explicativo do Sistema Nacional de Avaliação da Educação Superior (Sinaes)"
          fill
          className="object-contain p-2 transition-transform duration-500 group-hover:scale-105 rounded-2xl"
          sizes="(max-width: 1024px) 100vw, 40vw"
        />
      </div>
    </div>
  </div>
));
SinaesCpa.displayName = "SinaesCpa";

const GlossarioCpa = memo(() => (
  <div className="space-y-6">
    <div>
      <h3 className="text-2xl font-extrabold text-primary dark:text-gray-200 mb-2">Glossário</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Entenda as principais siglas, conceitos e nomenclaturas técnicas utilizadas nos processos de regulação e autoavaliação do Ensino
        Superior.
      </p>
    </div>
    <div className="space-y-4 pt-2">
      {TERMOS_GLOSSARIO.map((t, i) => (
        <div
          key={i}
          className="p-5 bg-gray-50/50 dark:bg-gray-800/20 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800/60 hover:border-gray-200 dark:hover:border-gray-700 transition-colors duration-500"
        >
          <h4 className="font-bold text-orange-600 dark:text-orange-400 text-base mb-1.5 uppercase tracking-wider">{t.termo}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{t.definicao}</p>
        </div>
      ))}
    </div>
  </div>
));
GlossarioCpa.displayName = "GlossarioCpa";

const AutoavaliacaoCpa = memo(() => (
  <div className="space-y-6 flex flex-col items-center text-center mx-auto w-full">
    <h3 className="text-2xl font-extrabold text-primary dark:text-gray-200 mb-2">Autoavaliação Institucional</h3>
    <div className="w-full max-w-3xl">
      <div className="relative w-full aspect-square rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/40 flex items-center justify-center group">
        <Image
          src="/institucional/Informativo-Acoes-Realizadas.jpg"
          alt="Relatório de Autoavaliação Institucional da CPA Uníntese"
          fill
          className="object-contain p-2 transition-transform duration-500 group-hover:scale-105 rounded-2xl"
          sizes="(max-width: 1024px) 100vw, 40vw"
          priority
        />
      </div>
    </div>
  </div>
));
AutoavaliacaoCpa.displayName = "AutoavaliacaoCpa";

const TAB_CONTENT: Record<TabId, React.ReactNode> = {
  sobre: <SobreCpa />,
  atribuicoes: <AtribuicoesCpa />,
  membros: <MembrosCpa />,
  documentos: <DocumentosCpa />,
  contato: <ContatoCpa />,
  sinaes: <SinaesCpa />,
  glossario: <GlossarioCpa />,
  autoavaliacao: <AutoavaliacaoCpa />,
};

export default function CpaPage() {
  const [activeTab, setActiveTab] = useState<TabId>("sobre");

  const handleTabChange = useCallback((TabId: TabId) => {
    setActiveTab(TabId);
  }, []);

  return (
    <PageModel
      titulo1="Comissão Própria de"
      titulo2="Avaliação (CPA)"
      subTitulo="O canal de autoavaliação da Faculdade Uníntese focado na melhoria contínua da nossa qualidade acadêmica e institucional."
    >
      <div className="max-w-5xl mx-auto px-2 py-16">
        <Animated
          as="div"
          preset="fadeUp"
          className="flex flex-wrap justify-center gap-3 mb-12 border-b border-gray-200 dark:border-gray-800 pb-6"
        >
          {CPA_TABS.map((tab) => (
            <TabButton key={tab.id} id={tab.id} label={tab.label} isActive={activeTab === tab.id} onClick={() => handleTabChange(tab.id)} />
          ))}
        </Animated>

        <AnimatePresence mode="wait">
          <Animated
            key={activeTab}
            as="div"
            preset="fadeScale"
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-10 border border-gray-100 dark:border-gray-800/60 min-h-75"
          >
            {TAB_CONTENT[activeTab]}
          </Animated>
        </AnimatePresence>
      </div>
    </PageModel>
  );
}
