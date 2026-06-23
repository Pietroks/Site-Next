"use client";

import { Animated } from "@/components/Animated";
import { IconArrow } from "@/components/IconsSvg";
import PrimaryButton from "@/components/PrimaryButton";
import { Cursos } from "@/utils/cursos";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function PosCourseInternalPage() {
  const params = useParams();
  const router = useRouter();

  const cursoId = params.id as string;

  const curso = Cursos.find((c) => c.id === cursoId);

  if (!curso) {
    return (
      <Animated
        as="div"
        preset="fadeUp"
        className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4"
      >
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Pós-Graduação não encontrada</h1>
        <PrimaryButton className="p-3" onClick={() => router.push("/pos-graduacao")}>
          Voltar para Pós-Graduação
        </PrimaryButton>
      </Animated>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <button
          className="group flex items-center gap-2 mb-4 text-sm font-semibold text-orange-600 hover:underline cursor-pointer transition-all duration-500"
          onClick={() => router.push("/pos-graduacao")}
        >
          <IconArrow className="rotate-90 group-hover:-translate-x-1 transition-transform duration-300" /> Voltar para listagem
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <Animated
            preset="fadeScale"
            className="md:col-span-1 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 p-4"
          >
            <div className="h-56 w-full rounded-xl overflow-hidden mb-4 bg-gray-100 dark:bg-gray-800">
              <img src={curso.thumb} alt={curso.alt} className="w-full h-full object-cover object-center" />
            </div>

            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300 mb-6">
              <div className="flex justify-between border-b dark:border-gray-800 pb-2">
                <span className="font-medium">Modalidade:</span>
                <span className="text-primary dark:text-gray-200 font-bold">{curso.modalidade}</span>
              </div>

              <div className="flex justify-between border-b dark:border-gray-800 pb-2">
                <span className="font-medium">Duração:</span>
                <span className="text-primary dark:text-gray-200 font-bold">{curso.duracao}</span>
              </div>

              <div className="flex justify-between pb-2">
                <span className="font-medium">Certificação:</span>
                <span className="text-primary dark:text-gray-200 font-bold">Especialização Lato Sensu</span>
              </div>
            </div>

            <PrimaryButton className="w-full py-3 cursor-pointer" onClick={() => console.log(`Inscrição para Pós: ${curso.title}`)}>
              Fazer Matrícula
            </PrimaryButton>
          </Animated>

          <div className="md:col-span-2 space-y-6">
            <Animated preset="fadeLeft">
              <span className="text-xs font-bold tracking-wider uppercase px-3 py-1 bg-orange-100 dark:bg-orange-950/40 text-orange-700 dark:text-orange-400 rounded-full">
                Pós-Graduação Certificada e Reconhecida pelo MEC
              </span>
              <h1 className="text-4xl font-black md:text-5xl text-primary dark:text-gray-200 mt-3 mb-4 leading-tight">{curso.title}</h1>
            </Animated>

            <Animated
              preset="fadeUp"
              delay={0.1}
              className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-2xl shadow-2xl space-y-4 border border-gray-100 dark:border-gray-800"
            >
              <h2 className="text-xl font-bold text-primary dark:text-gray-200">Sobre a Especialização</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                A pós-graduação em {curso.title} da Uníntese foi desenvolvida sob medida para profissionais que buscam alto desempenho e
                destaque no mercado. Com uma metodologia ativa e voltada à aplicação prática de conceitos, você adquire competências de
                forma flexível através de uma plataforma moderna.
              </p>

              <h2 className="text-xl font-bold text-primary dark:text-gray-200 pt-4">Diferenciais da Pós-Graduação Uníntese</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-600 md:text-gray-400">
                <li>Certificado emitido de forma ágil e aceito em todo o Brasil.</li>
                <li>Corpo docente composto por mestres e especialistas atuantes.</li>
                <li>Ambiente Virtual de Aprendizagem (AVA) otimizado e responsivo.</li>
                <li>Networking qualificado e suporte pedagógico contínuo.</li>
              </ul>
            </Animated>
          </div>
        </div>
      </div>
    </main>
  );
}
