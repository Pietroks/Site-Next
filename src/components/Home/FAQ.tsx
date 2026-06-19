"use client";

import { useState } from "react";
import { IconArrow, IconGraduationCap, IconHeadset, IconShield, MailIcon, WhatsAppIcon } from "../IconsSvg";
import PrimaryButton from "../PrimaryButton";
import { normalizedFaqs } from "@/utils/normalizedFaqs";
import FAQContactItem from "./FAQ Components/FAQContactItem";
import FAQItem from "./FAQ Components/FAQItem";
import PageModel from "@/components/PageModel";
import { Animated } from "../Animated";

export default function FAQ() {
  const [faqAberto, setFaqAberto] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setFaqAberto((prev) => (prev === index ? null : index));
  };

  const scrollToCursos = () => {
    document.getElementById("cursos")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <PageModel
      titulo1="Perguntas"
      titulo2="Frequentes"
      subTitulo="Tire suas dúvidas e conheça mais sobre a Uníntese, nossos cursos, metodologia e formas de ingresso."
    >
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 w-full">
        <Animated as="div" preset="fadeLeft" delay={0.4} className="col-span-1 lg:col-span-4 flex flex-col gap-5">
          <div className="flex flex-col gap-5 p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl h-fit">
            <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start gap-6">
              <Animated
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative flex items-center justify-center w-24 h-24 rounded-full bg-linear-to-br from-[#3C13D3] to-purple-800 shadow-2xl shrink-0"
              >
                <span className="text-white text-4xl font-bold">?</span>
                <div className="absolute bottom-1 right-1 w-0 h-0 border-l-8 border-r-8 border-t-12 border-l-transparent border-r-transparent border-t-purple-800 -rotate-42" />
              </Animated>
              <div className="flex flex-col gap-3 text-center lg:text-left">
                <Animated
                  as="p"
                  preset="fadeUp"
                  delay={0.5}
                  className="text-3xl font-bold leading-tight text-primary dark:text-gray-200 text-balance"
                >
                  Ainda tem alguma <strong className="text-purple-800">dúvida?</strong>
                </Animated>
                <Animated as="p" preset="fadeUp" delay={0.6} className="text-base text-primary dark:text-gray-400">
                  Nossa equipe está pronta para te ajudar a escolher o melhor caminho para o seu futuro.
                </Animated>
              </div>
            </div>

            <div className="border-t-2 border-gray-200 dark:border-gray-950 my-6"></div>

            <FAQContactItem
              href="https://wa.me/555533124003"
              title="Fala no WhatsApp"
              value="(55) 3312-4003"
              icon={<WhatsAppIcon className="w-10 h-10 text-[#3c13d3] transition-all duration-500 hover:text-green-600" />}
            />
            <FAQContactItem
              href="mailto:atendimento@unintese.com"
              title="Envie um e-mail"
              value="atendimento@unintese.com"
              icon={<MailIcon className="w-10 h-10 text-[#3c13d3] transition-all duration-500 hover:text-blue-600" />}
            />
            <FAQContactItem
              title="Atendimento"
              value="Seg a Sex, das 8h às 22h"
              icon={<IconHeadset className="w-10 h-10 text-[#3c13d3]" strokeWidth="2" />}
            />
          </div>

          <div className="p-8 rounded-2xl gap-5 flex-col lg:flex-row shadow-2xl flex items-center bg-linear-to-tr from-[#3935C3] to-[#B37FDF] dark:bg-linear-to-r dark:from-[#181630] dark:to-[#141d34] border-white border-2">
            <Animated as="div" preset="fadeUp" delay={0.8} className="p-3 bg-white rounded-3xl shadow-2xl">
              <IconGraduationCap className="w-15 h-15 text-[#3C13D3] fill-[#220392]" />
            </Animated>
            <div className="flex flex-col gap-2">
              <Animated
                as="p"
                preset="fadeUp"
                delay={0.9}
                className="text-white font-semibold text-balance text-center lg:text-left text-lg"
              >
                Transforme seu futuro com a Uníntese e conquiste novos caminhos.
              </Animated>
              <Animated as="div" className="mx-auto" preset="fadeUp" delay={1.0}>
                <PrimaryButton
                  onClick={scrollToCursos}
                  className="flex justify-between text-sm lg:text-base items-center py-2 px-4 lg:px-5 bg-linear-to-r from-amber-50 to-gray-200 text-primary rounded-full"
                >
                  Conheça nossos cursos <IconArrow className="rotate-270 w-5 h-5" />
                </PrimaryButton>
              </Animated>
            </div>
          </div>
        </Animated>

        <Animated
          as="div"
          preset="fadeRight"
          delay={0.4}
          className="col-span-1 lg:col-span-6 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl flex flex-col gap-4 h-fit"
        >
          {normalizedFaqs.map((faq, i) => (
            <FAQItem
              key={faq.pergunta}
              pergunta={faq.pergunta}
              resposta={faq.resposta}
              isOpen={faqAberto === i}
              onToggle={() => toggleItem(i)}
            />
          ))}
        </Animated>
      </div>

      <Animated
        as="div"
        preset="fadeUpScale"
        delay={0.5}
        className="flex mt-10 justify-center items-center gap-4 bg-linear-to-tl from-[#E4DFFB] to-[#EEEBFC] dark:bg-linear-to-r dark:from-[#181630] dark:to-[#141d34] dark:border dark:border-white/10 p-4 lg:p-8 rounded-full shadow-2xl border border-[#3935c3] w-full lg:w-fit mx-auto"
      >
        <IconShield className="w-20 h-20 text-[#3935C3]" />
        <div className="flex flex-col items-start">
          <p className="text-balance text-sm lg:text-base text-gray-800 dark:text-gray-300">
            Compromisso com a qualidade e a sua jornada de sucesso.
          </p>
          <p className="text-sm lg:text-lg text-purple-800 dark:text-purple-500 font-semibold">Uníntese: educação que transforma.</p>
        </div>
      </Animated>
    </PageModel>
  );
}
