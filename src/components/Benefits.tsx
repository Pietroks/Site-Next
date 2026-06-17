"use client";

import { IconHistoryClock, IconPlaySupport, IconShieldMec } from "./IconsSvg";
import { Animated } from "./Animated";

export default function Benefits() {
  const benefits = [
    {
      icon: <IconShieldMec />,
      title: "Reconhecimento do MEC",
      description: "Nossos cursos são reconhecidos pelo Ministério da Educação (MEC), garantindo qualidade e credibilidade.",
    },
    {
      icon: <IconHistoryClock />,
      title: "Flexibilidade Total",
      description: "Estude no seu ritmo, com acesso 24/7 a todo o conteúdo, para aprender onde e quando quiser.",
    },
    {
      icon: <IconPlaySupport />,
      title: "Suporte ao Aluno",
      description: "Nossa equipe de suporte está disponível para ajudar você a cada passo da sua jornada educacional.",
    },
  ];

  return (
    <section className="bg-[#EDF4FB] relative -mt-16 lg:-mt-50 [clip-path:none] lg:[clip-path:url(#curvaInvertida)]">
      <svg width="0" height="0" aria-hidden="true">
        <defs>
          <clipPath id="curvaInvertida" clipPathUnits="objectBoundingBox">
            <path d="M0 0C.2.5.8.5 1 0L1 1H0Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="max-w-7xl mx-auto py-3 lg:py-10 px-8 flex flex-col lg:flex-row items-center gap-10 lg:gap-0 mt-0 lg:mt-35 mb-0 lg:mb-5 [clip-path:none] lg:[clip-path:ellipse(90%_100%_at_50%_0%)]">
        {benefits.map((benefit, index) => (
          <Animated
            key={index}
            as="div"
            preset="fadeUp"
            delay={index * 0.15}
            className={`relative flex flex-col items-center gap-3 px-10 w-full transition-all duration-500 ${
              index < benefits.length - 1 ? "border-b-2 pb-8 md:pb-0 md:border-b-0 md:border-r-2 border-gray-200" : ""
            }`}
            whileHover={{
              y: -10,
              scale: 1.03,
            }}
          >
            <Animated
              as="div"
              preset="fadeUp"
              delay={index * 0.15 + 0.05}
              whileHover={{
                rotate: 8,
                scale: 1.1,
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {benefit.icon}
            </Animated>

            <h2 className="font-bold text-center text-primary text-xl">{benefit.title}</h2>

            <p className="text-primary-light text-center leading-relaxed">{benefit.description}</p>
          </Animated>
        ))}
      </div>
    </section>
  );
}
