"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { IconArrow } from "./IconsSvg";
import { Animated } from "./Animated";
import PrimaryButton from "./PrimaryButton";

const pageConfig = {
  graduacao: {
    backUrl: "/graduacao",
    badge: "Curso Superior Reconhecido pelo MEC",
    badgeClass: "bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300",
    certification: (curso: any) => curso.grau || curso.nivel,
    aboutTitle: "Sobre o Curso",
    aboutText: (curso: any) =>
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
    backUrl: "/pos-graduacao",
    badge: "Pós-Graduação Certificada e Reconhecida pelo MEC",
    badgeClass: "bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-400",
    certification: (curso: any) => (curso.grau === "Capacitação" ? "Capacitação" : "Especialização Lato Sensu"),
    aboutTitle: "Sobre a Especialização",
    aboutText: (curso: any) =>
      `A pós-graduação em ${curso.title} da Uníntese foi desenvolvida sob medida para profissionais que buscam alto desempenho e destaque no mercado. Com uma metodologia ativa e voltada à aplicação prática de conceitos.`,
    diferencialTitle: "Diferenciais da Pós-Graduação Uníntese",
    diferenciais: [
      "Certificado emitido de forma ágil e aceito em todo o Brasil.",
      "Corpo docente composto por mestres e especialistas atuantes.",
      "Ambiente Virtual de Aprendizagem (AVA) otimizado e responsivo.",
      "Networking qualificado e suporte pedagógico contínuo.",
    ],
  },
};

interface CoursePageModelProps {
  curso: any;
  type: "graduacao" | "pos";
}

export default function CoursePageModel({ curso, type }: CoursePageModelProps) {
  const router = useRouter();
  const config = pageConfig[type];
  const [gradeAberta, setGradeAberta] = useState<number>(0);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <button
          className="group flex items-center gap-2 mb-4 text-sm font-semibold text-orange-600 hover:text-orange-400 hover:underline cursor-pointer transition-all duration-500"
          onClick={() => router.push(config.backUrl)}
        >
          <IconArrow className="rotate-90 group-hover:-translate-x-1 transition-transform duration-300" /> Voltar para listagem
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <Animated
            preset="fadeScale"
            className="md:col-span-1 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 p-4"
          >
            <div className="h-78 w-full rounded-xl overflow-hidden mb-4 bg-gray-100 dark:bg-gray-800">
              <img src={curso.thumb} alt={curso.alt} className="w-full h-full object-cover object-center" />
            </div>

            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300 mb-6">
              <div className="flex justify-between border-b dark:border-gray-800 border-gray-300 pb-2">
                <span className="font-medium">Modalidade:</span>
                <span className="text-primary dark:text-gray-200 font-bold">{curso.modalidade}</span>
              </div>
              <div className="flex justify-between border-b dark:border-gray-800 border-gray-300 pb-2">
                <span className="font-medium">Duração:</span>
                <span className="text-primary dark:text-gray-200 font-bold">{curso.duracao}</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="font-medium">Certificação:</span>
                <span className="text-primary dark:text-gray-200 font-bold">{config.certification(curso)}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <PrimaryButton className="w-full p-2" onClick={() => console.log(`matricula: ${curso.title}`)}>
                Fazer matrícula
              </PrimaryButton>
              {curso.edital && (
                <button
                  className="w-full py-3 px-4 rounded-xl font-semibold border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white transition-all duration-500 cursor-pointer text-center text-sm"
                  onClick={() => window.open(curso.edital, "_blank", "noopener,noreferrer")}
                >
                  Acessar Edital do Curso
                </button>
              )}
            </div>
          </Animated>

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

              <h2 className="text-xl font-bold text-primary dark:text-gray-200 pt-4">{config.diferencialTitle}</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-600 md:text-gray-400">
                {config.diferenciais.map((diferencial, index) => (
                  <li key={index}>{diferencial}</li>
                ))}
              </ul>
            </Animated>

            {curso.gradeCurricular && curso.gradeCurricular.length > 0 && (
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
                  {curso.gradeCurricular.map((bloco: any, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setGradeAberta(idx)}
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
                  {(curso.gradeCurricular[gradeAberta] || curso.gradeCurricular[0])?.materias?.map((materia: any, index: number) => (
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
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
