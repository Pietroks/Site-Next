"use client";

import { footerLinks, linksFinal, socials } from "@/utils/dataFooter";
import { AnimatedGradientBar } from "./AnimatedGradientBar";
import { IconArrow } from "./IconsSvg";
import PrimaryButton from "./PrimaryButton";
import { memo } from "react";
import { Animated } from "./Animated";
import MauticManualForm from "./Home/MauticManualForm";

const navigateToView = () => document.getElementById("header")?.scrollIntoView({ behavior: "smooth" });

function Footer() {
  return (
    <section className="pt-5 lg:pt-15 bg-linear-to-tr from-[#050C2D] to-[#161154]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12">
          <div className="col-span-1 md:col-span-6 lg:col-span-3 flex flex-row lg:flex-col gap-3 lg:gap-5 items-start p-4 lg:p-0">
            <div>
              <div className="relative">
                <Animated as="h2" preset="fadeLeft" delay={0.2} className="text-5xl font-bold text-white">
                  Uníntese
                </Animated>
                <AnimatedGradientBar className="top-15" width={"90%"} />
              </div>
              <div className="relative mt-10 lg:mt-5 mb-10">
                <Animated preset="fadeUp" as="p" delay={0.3} className="text-white">
                  Educação que transforma vidas.
                </Animated>
                <Animated preset="fadeUp" as="p" delay={0.4} className="text-gray-300 text-sm text-balance">
                  Mais de 120 mil alunos já construíram seu futuro com a gente.
                </Animated>
                <AnimatedGradientBar width={"20%"} className="top-36 md:top-20 lg:top-24" />
              </div>
            </div>
            <div className="flex items-center flex-col md:flex-row lg:flex-row gap-5">
              {socials.map((social, index) => {
                const Icon = social.icon;
                return (
                  <Animated
                    as="a"
                    preset="fadeScale"
                    index={index}
                    href={social.href}
                    key={social.name}
                    target="_blank"
                    aria-label={social.name}
                    rel="noopener noreferrer"
                  >
                    <Icon className="p-3 bg-[#10133F] rounded-full shadow-2xl h-12 w-12 text-gray-300 transition-colors duration-500 hover:text-[#7448F5]" />
                  </Animated>
                );
              })}
            </div>
          </div>

          <div className="col-span-1 md:col-span-3 lg:col-span-6 p-4 lg:p-0 flex items-start gap-12 lg:gap-10">
            {footerLinks.map((section) => (
              <nav key={section.title} className="flex flex-col gap-6">
                <Animated preset="fadeUp" delay={0.4} className="uppercase text-base text-nowrap lg:text-xl font-semibold text-[#7448f5]">
                  {section.title}
                </Animated>

                {section.links.map((link, index) => (
                  <Animated
                    as="a"
                    index={index}
                    preset="fadeUp"
                    delay={0.5}
                    key={link.label}
                    href={link.href}
                    className="text-sm lg:text-base text-gray-300 text-balance transition-colors duration-500 hover:text-[#7448f5]"
                  >
                    {link.label}
                  </Animated>
                ))}
              </nav>
            ))}
          </div>

          <div className="col-span-1 md:col-span-3 lg:col-span-3 p-4 lg:p-0">
            <div className="flex flex-col gap-5">
              <Animated as="h3" preset="fadeRight" delay={0.5} className="uppercase text-xl font-semibold text-[#7448f5]">
                receba novidades
              </Animated>
              <Animated preset="fadeRight" delay={0.6} as="p" className="text-gray-300 text-sm text-balance">
                Assine nossa newsletter e receba conteúdos, dicas e novidades.
              </Animated>
              <MauticManualForm
                formId={187}
                formName="testenewsletter"
                buttonText="Assinar newsletter"
                isNewsletter={true}
                inputRowClassname="m-0"
                submitRowClassname="mt-4 pt-0 lg:w-full"
              ></MauticManualForm>
            </div>
          </div>
        </div>
      </div>
      <div className="h-px bg-[linear-gradient(to_right,#5E21BB,#200F64,#1A1B53)] mt-10 lg:mt-20" />
      <div className="max-w-7xl flex lg:flex-row flex-col items-start gap-5 lg:gap-0 p-4 lg:p-0 lg:items-center justify-between mx-auto mt-4 lg:mt-8 mb-5">
        <Animated as="p" preset="fadeRight" delay={0.6} className="text-gray-300 text-sm text-left">
          2026 Uníntese. Todos os direitos reservados.
        </Animated>
        <div className="flex flex-wrap gap-10 my-5 lg:my-0">
          {linksFinal.map((link, index) => (
            <Animated
              key={link.label}
              index={index}
              as="a"
              preset="fadeRight"
              delay={0.7}
              className={`text-gray-300 text-sm transition-colors duration-500 hover:text-[#7448f5] ${
                index < linksFinal.length - 1 ? "pr-5 border-r-2 border-[#281B6B]" : ""
              }`}
              href={link.href}
            >
              {link.label}
            </Animated>
          ))}
        </div>
        <Animated as="div" preset="fadeRight" delay={0.9} className="ml-auto lg:ml-0">
          <PrimaryButton
            onClick={navigateToView}
            className="flex gap-3 items-center font-normal text-gray-300 px-4 py-2 bg-linear-to-tr from-[#050C2D] to-[#161154] border-2 border-[#281B6B] text-base hover:bg-[linear-gradient(to_right,#5E21BB,#200F64,#060C32)] hover:border-[#5E21BB]"
          >
            <IconArrow className="rotate-180 w-8 h-8 text-gray-300" /> Voltar ao topo
          </PrimaryButton>
        </Animated>
      </div>
    </section>
  );
}

export default memo(Footer);
