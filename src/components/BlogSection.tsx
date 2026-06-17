"use client";

import { IconArrow, IconCalendar, IconClock, IconNewspapper } from "./IconsSvg";
import PageModel from "./PageModel";
import PrimaryButton from "./PrimaryButton";
import { Artigos } from "@/utils/artigo";
import Link from "next/link";
import { AnimatedGradientBar } from "./AnimatedGradientBar";
import Image from "next/image";
import { HeartBanner } from "./HeartBanner";
import { Animated } from "./Animated";

export default function BlogSection() {
  const artigoDestaque = Artigos[0];
  const artigosLista = Artigos.slice(1, 4);

  return (
    <PageModel
      titulo1="Conteúdos para impulsionar sua"
      titulo2="carreira"
      subTitulo="Artigos, dicas e novidades para ajudar você a evoluir profissionalmente."
      quebrarTitulo
    >
      <div className="grid grid-cols-1 md:grid-cols-10 gap-6 w-full">
        {artigoDestaque && (
          <Animated
            preset="fadeUp"
            className="col-span-1 md:col-span-5 flex h-fit flex-col rounded-2xl shadow-2xl bg-white relative overflow-hidden group border border-gray-100"
          >
            <AnimatedGradientBar />
            <div className="relative overflow-hidden h-80 w-full">
              <p className="absolute z-10 px-3 py-0.5 bg-[#3C23C9] rounded-full uppercase text-sm text-amber-50 top-8 left-8 shadow-2xl">
                Destaque
              </p>
              <Image
                src={artigoDestaque.imagem}
                alt={artigoDestaque.titulo}
                fill
                priority
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col p-6 gap-5">
              <p className="px-3 text-left w-fit py-0.5 text-[#3C23C9] font-semibold rounded-full uppercase text-sm bg-gray-300 top-8 left-8 shadow-2xl">
                {artigoDestaque.categoria}
              </p>
              <p className="text-2xl text-left w-fit font-bold text-primary">{artigoDestaque.titulo}</p>
              <p className="text-sm text-left w-fit text-gray-700">{artigoDestaque.descricao}</p>
              <div className="flex gap-3 md:gap-6 items-center justify-between mt-3">
                <div className="flex lg:flex-row lg:gap-6 flex-col gap-2">
                  <div className="flex gap-1 items-center">
                    <IconCalendar className="text-purple-600" strokeWidth="2" />
                    <p className="text-sm font-semibold text-[#3C23C9]">{artigoDestaque.data}</p>
                  </div>
                  <div className="flex gap-1 items-center">
                    <IconClock className="w-6 h-6 text-purple-600" strokeWidth="2" />
                    <p className="text-sm font-semibold text-[#3C23C9]">{artigoDestaque.tempoLeitura}</p>
                  </div>
                </div>
                <Link href={artigoDestaque.link}>
                  <PrimaryButton className="px-3 lg:px-6 py-3 flex items-center gap-3 justify-center w-fit font-semibold text-sm lg:text-base">
                    Ler artigo <IconArrow className="rotate-270" />
                  </PrimaryButton>
                </Link>
              </div>
            </div>
          </Animated>
        )}

        <div className="col-span-1 md:col-span-5 w-ful flex flex-col gap-5">
          {artigosLista.map((artigo, i) => (
            <Animated
              key={artigo.id}
              preset="fadeRight"
              index={i}
              hover="lift"
              className="px-5 py-6 bg-white rounded-2xl shadow-xl relative overflow-hidden flex items-center gap-5 group border border-gray-100/50 cursor-pointer transition-all duration-500 hover:shadow-2xl"
            >
              <AnimatedGradientBar />

              <div className="w-40 h-36 relative rounded-xl overflow-hidden shadow-md shrink-0 hidden lg:block">
                <Image
                  src={artigo.imagem}
                  alt={artigo.titulo}
                  sizes="160px"
                  fill
                  priority
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col items-start gap-2">
                <p className="px-3 text-left w-fit py-0.5 text-[#3C23C9] rounded-full font-semibold uppercase text-sm bg-gray-300 top-8 left-8 shadow-2xl">
                  {artigo.categoria}
                </p>
                <p className="text-base md:text-lg text-left font-semibold text-primary transition-colors duration-500 hover:text-purple-600">
                  {artigo.titulo}
                </p>
                <div className="flex gap-1 items-center mt-2">
                  <IconClock className="w-6 h-6 text-gray-600 transition-colors duration-500 hover:text-purple-600" strokeWidth="2" />
                  <p className="text-sm font-semibold text-gray-600 transition-colors duration-500 hover:text-[#3C23C9]">
                    {artigo.tempoLeitura}
                  </p>
                </div>
              </div>
              <Link href={artigo.link}>
                <IconArrow className="w-10 h-10 text-[#3C23C9] rotate-270 transition-colors duration-500 hover:text-purple-600" />
              </Link>
            </Animated>
          ))}
        </div>
      </div>

      <HeartBanner
        icon={<IconNewspapper />}
        text={
          <>
            Mais de <strong className="text-purple-800 font-bold text-xl">500 conteúdos</strong> publicados para apoiar sua jornada
            acadêmica e profissional.
          </>
        }
        textButton="Explorar Blog"
      />
    </PageModel>
  );
}
