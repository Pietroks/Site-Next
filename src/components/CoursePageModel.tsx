"use client";

import { useRouter } from "next/navigation";
import { useState, useMemo, useCallback, memo } from "react";
import Image from "next/image";
import { IconArrow } from "./IconsSvg";
import { Animated } from "./Animated";
import PrimaryButton from "./PrimaryButton";
import MauticManualForm from "./MauticManualForm";
import { Curso, ModuloGrade } from "@/utils/cursos";

// 1. CONFIGURAÇÕES TIPADAS E EXTRAS

interface PageConfig {
  badge: string;
  badgeClass: string;
  certification: (curso: Curso) => string;
  aboutTitle: string;
  aboutText: (curso: Curso) => string;
  diferencialTitle: string;
  diferenciais: string[];
}

const pageConfig: Record<"graduacao" | "pos" | "livres", PageConfig> = {
  graduacao: {
    badge: "Curso Superior Reconhecido pelo MEC",
    badgeClass: "bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300",
    certification: (curso) => curso.grau || curso.nivel,
    aboutTitle: "Sobre o Curso",
    aboutText: (curso) =>
      `O curso de ${curso.title} da Uníntese prepara você para os desafios reais do mercado de trabalho. Com uma metodologia focada na flexibilidade e no aprendizado prático, você estuda através de uma plataforma moderna.`,
    diferencialTitle: "Por que fazer este curso na Uníntese?",
    diferenciais: [
      "Diploma com a mesma validade do presencial.",
      "Material didático exclusivo e atualizado.",
      "Flexibilidade para estudar de onde e quando quiser.",
      "Plataforma de ensino intuitiva e interativa.",
    ],
  },
  pos: {
    badge: "Pós-Graduação Certificada e Reconhecida pelo MEC",
    badgeClass: "bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-400",
    certification: (curso) => (curso.grau === "Capacitação" ? "Capacitação" : "Especialização Lato Sensu"),
    aboutTitle: "Sobre a Especialização",
    aboutText: (curso) =>
      `A pós-graduação em ${curso.title} da Uníntese foi desenvolvida sob medida para profissionais que buscam alto desempenho e destaque no mercado. Com uma metodologia ativa e voltada à aplicação prática de conceitos.`,
    diferencialTitle: "Diferenciais da Pós-Graduação Uníntese",
    diferenciais: [
      "Certificado emitido de forma ágil e aceito em todo o Brasil.",
      "Corpo docente composto por mestres e especialistas atuantes.",
      "Ambiente Virtual de Aprendizagem (AVA) otimizado e responsivo.",
      "Networking qualificado e suporte pedagógico contínuo.",
    ],
  },
  livres: {
    badge: "Curso de Capacitação e Extensão Profissional",
    badgeClass: "bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300",
    certification: () => "Certificado de Curso Livre / Extensão",
    aboutTitle: "Sobre o Curso Livre",
    aboutText: (curso) =>
      `O curso livre de ${curso.title} da Uníntese foi desenhado para quem busca atualização rápida e conhecimentos práticos direto ao ponto, com total autonomia de estudos.`,
    diferencialTitle: "Diferenciais dos Cursos Livres Uníntese",
    diferenciais: [
      "Início imediato e aprendizado no seu próprio ritmo.",
      "Certificado válido para evolução funcional e horas complementares.",
      "Conteúdo 100% focado em demandas atuais do mercado.",
      "Acesso simplificado por qualquer dispositivo.",
    ],
  },
};

const NUMERO_GERAL = "555533124002";

// 2. TIPAGEM

interface CoursePageModelProps {
  curso: Curso;
  type: "graduacao" | "pos" | "livres";
  activeFilter?: string;
}

type GradeCurricular = ModuloGrade;

// 3. COMPONENTES FILHOS MEMOIZADOS

const BackButton = memo(({ onClick }: { onClick: () => void }) => (
  <button
    className="group flex items-center gap-2 mb-4 text-sm font-semibold text-orange-600 hover:text-orange-400 hover:underline cursor-pointer transition-all duration-500"
    onClick={onClick}
  >
    <IconArrow className="rotate-90 group-hover:-translate-x-1 transition-transform duration-300" />
    Voltar para listagem
  </button>
));
BackButton.displayName = "BackButton";

interface CourseInfoCardProps {
  curso: Curso;
  config: PageConfig;
  urlFinal: string;
  hasMautic: boolean;
  hasEdital: boolean;
}

const CourseInfoCard = memo(({ curso, config, urlFinal, hasMautic, hasEdital }: CourseInfoCardProps) => (
  <aside className="md:col-span-1 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 p-4 sticky top-6 self-start">
    <div className="relative h-78 w-full rounded-xl overflow-hidden mb-4 bg-gray-100 dark:bg-gray-800">
      <Image
        src={curso.thumb}
        alt={curso.alt || curso.title}
        fill
        className="object-cover object-center"
        sizes="(max-width: 768px) 100vw, 33vw"
        priority
      />
    </div>

    <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300 mb-6">
      <InfoRow label="Modalidade:" value={curso.modalidade} />
      <InfoRow label="Duração:" value={curso.duracao} />
      <InfoRow label="Certificação:" value={config.certification(curso)} />
    </div>

    <div className="flex flex-col gap-3">
      <PrimaryButton className="w-full p-2" onClick={() => window.open(urlFinal, "_blank", "noopener, noreferrer")}>
        Saiba o valor promocional
      </PrimaryButton>

      {hasMautic ? (
        <div className="bg-gray-50/50 dark:bg-gray-800/30 rounded-2xl p-4 mt-4 border border-gray-100 dark:border-gray-800/50 transition-all duration-300 shadow-inner">
          <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2 px-1">
            Preencha para liberar o arquivo
          </p>
          <MauticManualForm
            formId={curso.mauticFormId || 0}
            formName={curso.mauticFormName || ""}
            buttonText="Acessar o Edital"
            showConsent={false}
            className="space-y-4"
            inputRowClassname="flex flex-col gap-3 mt-4 w-full"
            submitRowClassname="flex justify-center gap-3 w-full mt-2 pt-2"
            fieldsMapping={{
              nome: "primeiro_nome",
              email: "email_valido",
              whatsapp: "whatsapp_com_ddd",
              submit: "submit",
            }}
          />
        </div>
      ) : (
        hasEdital &&
        curso.edital && (
          <button
            className="w-full py-3 px-4 rounded-xl font-semibold border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white transition-all duration-500 cursor-pointer text-center text-sm shadow-sm"
            onClick={() => window.open(curso.edital, "_blank", "noopener, noreferrer")}
          >
            Acessar Edital do Curso
          </button>
        )
      )}
    </div>
  </aside>
));
CourseInfoCard.displayName = "CourseInfoCard";

const InfoRow = memo(({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between border-b dark:border-gray-800 border-gray-300 pb-2">
    <span className="font-medium">{label}</span>
    <span className="text-primary dark:text-gray-200 font-bold">{value}</span>
  </div>
));
InfoRow.displayName = "InfoRow";

// 4. COMPONENTE PRINCIPAL

export default function CoursePageModel({ curso, type, activeFilter }: CoursePageModelProps) {
  const router = useRouter();
  const config = pageConfig[type];
  const [gradeAberta, setGradeAberta] = useState(0);

  const numeroDestino = useMemo(() => curso.whatsappContact || NUMERO_GERAL, [curso.whatsappContact]);

  const urlFinal = useMemo(() => {
    const textMessage = `Olá! Gostaria de saber o valor promocional para o curso de ${curso.title}.`;
    return `https://wa.me/${numeroDestino}?text=${encodeURIComponent(textMessage)}`;
  }, [numeroDestino, curso.title]);

  const hasMautic = useMemo(() => !!(curso.mauticFormId && curso.mauticFormName), [curso.mauticFormId, curso.mauticFormName]);

  const hasEdital = useMemo(() => !!(curso.edital && curso.edital !== "#"), [curso.edital]);

  const handleBack = useCallback(() => {
    let urlRetorno = `/cursos?nivel=${type}`;

    if (activeFilter) {
      urlRetorno += `&filtro=${activeFilter}`;
    }

    router.push(urlRetorno);
  }, [router, type, activeFilter]);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <BackButton onClick={handleBack} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <CourseInfoCard curso={curso} config={config} urlFinal={urlFinal} hasMautic={hasMautic} hasEdital={hasEdital} />

          <div className="md:col-span-2 space-y-6">
            <Animated preset="fadeLeft">
              <span className={`text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full ${config.badgeClass}`}>
                {config.badge}
              </span>
              <h1 className="text-4xl font-black md:text-5xl text-primary dark:text-gray-200 mt-3 mb-4 leading-tight">{curso.title}</h1>
            </Animated>

            <Animated
              preset="fadeUp"
              delay={0.1}
              className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-xl shadow-2xl space-y-4 border border-gray-100 dark:border-gray-800"
            >
              <h2 className="text-xl font-bold text-primary dark:text-gray-200">{config.aboutTitle}</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{config.aboutText(curso)}</p>

              {curso.detalhesExtras && curso.detalhesExtras.length > 0 && (
                <div className="space-y-6">
                  {curso.detalhesExtras.map((secao, i) => (
                    <Animated
                      key={i}
                      preset="fadeUp"
                      delay={0.15 + i * 0.05}
                      className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 space-y-3"
                    >
                      <h3 className="text-lg font-bold text-orange-600 dark:text-orange-400">{secao.titulo}</h3>

                      {Array.isArray(secao.conteudo) ? (
                        <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                          {secao.conteudo.map((topico, idx) => (
                            <li key={idx}>{topico}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{secao.conteudo}</p>
                      )}
                    </Animated>
                  ))}
                </div>
              )}

              <h2 className="text-xl font-bold text-primary dark:text-gray-200 pt-4">{config.diferencialTitle}</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-600 md:text-gray-400">
                {config.diferenciais.map((diferencial, index) => (
                  <li key={index}>{diferencial}</li>
                ))}
              </ul>
            </Animated>

            {curso.gradeCurricular && curso.gradeCurricular.length > 0 && (
              <GradeCurricularSection gradeCurricular={curso.gradeCurricular} gradeAberta={gradeAberta} onGradeChange={setGradeAberta} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

const GradeCurricularSection = memo(
  ({
    gradeCurricular,
    gradeAberta,
    onGradeChange,
  }: {
    gradeCurricular: GradeCurricular[];
    gradeAberta: number;
    onGradeChange: (index: number) => void;
  }) => {
    const gradeAtual = gradeCurricular[gradeAberta] || gradeCurricular[0];

    return (
      <Animated
        className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800"
        preset="fadeUp"
        delay={0.2}
      >
        <div className="flex flex-col justify-between gap-4 mb-6">
          <h2 className="text-xl font-bold text-primary dark:text-gray-200">Matrizes e Grade Curricular</h2>
          <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-500 px-3 py-1 rounded-md font-medium">
            Selecione o módulo para ver as disciplinas
          </span>
        </div>

        <div className="flex flex-wrap justify-center gap-4 border-b border-gray-100 dark:border-gray-800 pb-px mb-6">
          {gradeCurricular.map((bloco, idx) => (
            <button
              key={idx}
              onClick={() => onGradeChange(idx)}
              className={`px-4 py-2.5 font-bold text-sm rounded-t-xl border-b-2 whitespace-nowrap transition-all duration-300 cursor-pointer ${
                gradeAberta === idx
                  ? "border-orange-600 text-orange-600 bg-orange-50/50 dark:bg-orange-950/10"
                  : "border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 hover:border-gray-300"
              }`}
            >
              {bloco.modulo}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 min-h-30">
          {gradeAtual?.materias?.map((materia, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-gray-100 dark:border-gray-800/60 hover:border-gray-200 dark:hover:border-gray-700 transition-colors duration-300"
            >
              <span className="text-sm text-gray-700 dark:text-gray-300 font-semibold leading-snug">{materia.nome}</span>
              <span className="text-xs font-bold bg-orange-100 dark:bg-orange-950/50 text-orange-700 dark:text-orange-400 px-2.5 py-1 rounded-lg shrink-0 ml-3">
                {materia.cargaHoraria}
              </span>
            </div>
          ))}
        </div>
      </Animated>
    );
  },
);
GradeCurricularSection.displayName = "GradeCurricularSection";
