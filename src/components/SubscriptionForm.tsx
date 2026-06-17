"use client";

import { Cursos } from "@/utils/cursos";
import { HeroWaveBackgrounds, IconClock, IconGraduationCap, IconHeadset, IconPapper, IconPen } from "./IconsSvg";

import { Animated } from "./Animated";
import MauticManualForm, { INPUT_STYLE, LABEL_STYLE } from "./MauticManualForm";

export function SubscriptionForm() {
  const infoBenefits = [
    {
      icon: <IconGraduationCap />,
      text: "Cursos reconhecidos pelo MEC",
      bgStyle: "bg-[#4741bf] rounded-2xl p-3 shadow-xl relative z-50 text-white",
    },
    {
      icon: <IconClock />,
      text: "Estude com flexibilidade",
      bgStyle: "bg-[#664bd8] rounded-2xl p-3 shadow-xl relative z-50 text-white",
    },
    {
      icon: <IconHeadset />,
      text: "Suporte próximo e especializado",
      bgStyle: "bg-[#6c60d7] rounded-2xl p-3 shadow-xl relative z-50 text-white",
    },
  ];

  return (
    <section className="bg-gray-100 py-12 relative">
      <HeroWaveBackgrounds />

      <Animated
        as="div"
        preset="fadeUp"
        delay={0.1}
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-10 p-8 rounded-2xl bg-hero-grad"
      >
        <div className="col-span-1 lg:col-span-5">
          <Animated
            as="div"
            preset="fadeLeft"
            delay={0.2}
            className="w-fit py-1 px-3 my-10 flex items-center gap-2 bg-linear-to-r from-[#6E4CD6] to-[#463CBD] rounded-full shadow-xl"
          >
            <IconPen className="text-white" />
            <p className="uppercase text-gray-100">faça sua inscrição</p>
          </Animated>

          <Animated as="h2" preset="fadeUp" delay={0.25} className="text-4xl lg:text-6xl font-bold text-white mb-4">
            Dê o primeiro passo para o seu <strong className="text-orange-500 font-bold">futuro</strong>
          </Animated>

          <Animated as="p" preset="fadeUp" delay={0.3} className="text-base lg:text-lg text-gray-200 my-8 font-light">
            Preencha o formulário e receba todas as informações sobre nossos cursos e condições especiais para você.
          </Animated>

          <div className="flex gap-8 lg:gap-10 my-10 lg:my-20">
            {infoBenefits.map((benefit, i) => (
              <Animated
                key={i}
                as="div"
                preset="fadeUp"
                index={i}
                className="flex flex-col items-start gap-5 w-full"
                whileHover={{ y: -5 }}
              >
                <div className={benefit.bgStyle}>{benefit.icon}</div>
                <p className="text-sm text-white font-light">{benefit.text}</p>
              </Animated>
            ))}
          </div>
        </div>

        <Animated as="div" preset="fadeRight" delay={0.2} className="col-span-1 lg:col-span-5 bg-gray-100 rounded-2xl shadow-lg p-6">
          <Animated as="div" preset="fadeUp" delay={0.3} className="flex items-start gap-5">
            <Animated as="div" hover="icon" className="rounded-full p-3 bg-[#753FEA] shadow-xl">
              <IconPapper className="text-white" />
            </Animated>

            <div className="flex flex-col">
              <p className="text-xl lg:text-2xl text-primary font-bold">Inscreva-se agora</p>
              <p className="text-gray-500">É rápido, fácil e gratuito!</p>
            </div>
          </Animated>

          <div className="border-t-2 border-gray-200 mt-8" />

          <MauticManualForm formId={186} formName="formulariomainpagereactunintese">
            <Animated as="div" preset="fadeUp" delay={0.6} className="flex flex-col lg:flex-row gap-6 lg:gap-8">
              <div className="flex flex-col items-start gap-2 w-full mauticform-required">
                <label className={LABEL_STYLE}>Curso de interesse</label>
                <select className={`${INPUT_STYLE} cursor-pointer`} defaultValue="">
                  <option value="" disabled hidden>
                    Selecione seu curso
                  </option>

                  {Cursos.map((curso, i) => (
                    <option key={i} value={curso.title}>
                      {curso.title}
                    </option>
                  ))}
                </select>
              </div>
            </Animated>

            <Animated as="div" preset="fadeUp" delay={0.7} className="flex flex-col lg:flex-row gap-6 lg:gap-8 my-5">
              <div className="flex flex-col items-start gap-2 w-full">
                <label className={LABEL_STYLE}>Como podemos te ajudar?</label>
                <textarea placeholder="Conte-nos um pouco sobre seus objetivos..." className={INPUT_STYLE} />
              </div>
            </Animated>
          </MauticManualForm>
        </Animated>
      </Animated>
    </section>
  );
}
