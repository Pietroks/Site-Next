"use client";

import { AnimatedGradientBar } from "../AnimatedGradientBar";
import { IconArrow, IconComputer, IconGraduationCap, IconHeart, IconPerson, IconShield } from "../IconsSvg";
import PrimaryButton from "../PrimaryButton";
import { Animated } from "../Animated";

const benefits = [
  { icon: IconGraduationCap, title: "Ensino de qualidade" },
  { icon: IconHeart, title: "Reconhecido pelo MEC" },
  { icon: IconComputer, title: "100% online e flexível" },
  { icon: IconPerson, title: "Mais de 120 mil alunos formados" },
];

const blobStyle =
  "absolute top-7/12 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-linear-to-b from-[#C6B5FF] via-[#6B7BF0] to-[#D6B3F8] rounded-[50%_50%_45%_45%/60%_60%_40%_40%] shadow-[0_30px_60px_rgba(107,123,240,0.35)]";

export default function CtaComponent() {
  return (
    <section className="py-5 lg:py-15 bg-[linear-gradient(to_bottom_left,#E4DFFB,#EEEBFC,#E1EFFD,#E9E6FD)] overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-10 gap-8 w-full bg-[#F2F1FD] rounded-2xl shadow-2xl relative">
        <div className="col-span-1 lg:col-span-5 p-5 lg:p-16">
          <div className="relative overflow-hidden">
            <Animated as="h2" preset="fadeUp" delay={0.2} className="text-5xl lg:text-6xl font-bold mb-5 text-black">
              Seu futuro começa <strong className="bg-unintese-grad bg-clip-text text-transparent">agora.</strong>
            </Animated>

            <AnimatedGradientBar width={"15%"} />
          </div>

          <Animated as="p" preset="fadeUp" delay={0.3} className="my-5 text-gray-500 text-xl">
            Mais de 120 mil alunos já transformaram suas vidas com a Uníntese.{" "}
            <strong className="text-purple-800">O próximo sucesso</strong> pode ser seu.
          </Animated>

          <Animated as="div" preset="fadeUp" delay={0.4}>
            <PrimaryButton className="flex gap-4 p-4 items-center my-10 text-base lg:text-2xl group rounded-2xl shadow-xl">
              Quero me matricular{" "}
              <IconArrow className="rotate-270 w-8 lg:w-10 h-8 lg:h-10 text-purple-800 bg-white rounded-2xl group-hover:bg-orange-600 transition-colors duration-500 group-hover:text-white" />
            </PrimaryButton>
          </Animated>

          <div className="grid grid-cols-4 gap-4 lg:gap-10 mb-0 lg:mb-10">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;

              return (
                <Animated key={benefit.title} as="div" preset="fadeRight" index={index} className="flex flex-col items-center gap-4">
                  <Animated as="div" whileHover="hoverScale">
                    <Icon className="text-[#3E10B4] w-18 h-18 bg-[#E4E3FB] p-2 rounded-2xl shadow-2xl" />
                  </Animated>

                  <p className="text-sm font-semibold text-center text-black">{benefit.title}</p>
                </Animated>
              );
            })}
          </div>
        </div>

        <div className="col-span-1 lg:col-span-5 flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg flex items-center justify-center group">
            <Animated as="div" preset="fadeScale" delay={0.6} className={blobStyle} />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-[#7C6CF4]/30 blur-3xl rounded-full" />

            <Animated as="img" preset="fadeUp" delay={0.7} src="/img1.png" alt="Apresentação" className="relative z-10 w-full" />
          </div>
        </div>

        <div className="bg-white col-span-1 lg:col-span-10 w-full flex-col lg:flex-row py-4 pl-4 pr-4 lg:pl-10 lg:pr-36 rounded-2xl shadow-2xl flex items-center justify-between absolute z-20 -bottom-4 lg:-bottom-16">
          <div className="flex items-center gap-4 lg:gap-6 w-full">
            <Animated whileHover="hoverScale">
              <IconShield className="text-[#3D11B4] p-3 rounded-full bg-[#E8E1FD] w-14 lg:w-20 h-14 lg:h-20" />
            </Animated>

            <Animated as="p" preset="fadeUp" delay={0.5} className="w-full lg:w-3/5 text-sm lg:text-base text-primary">
              Aqui você encontra o apoio que precisa para evoluir, aprender e conquistar seus objetivos.
            </Animated>
          </div>

          <div className="relative mt-4 lg:mt-0">
            <Animated as="p" preset="fadeUp" delay={0.6} className="font-dancing text-[#3D11B4] text-3xl lg:text-4xl text-nowrap">
              Educação que transforma.
            </Animated>

            <AnimatedGradientBar width={"50%"} className="rounded-full left-1/4 top-12" />
          </div>
        </div>
      </div>
    </section>
  );
}
