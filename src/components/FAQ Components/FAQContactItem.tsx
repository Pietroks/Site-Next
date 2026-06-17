import { ReactNode } from "react";
import { IconArrow } from "../IconsSvg";
import { Animated } from "../Animated";

interface FAQContACTItemProps {
  icon: ReactNode;
  title: string;
  value: string;
  href?: string;
}

export default function FAQContactItem({ icon, title, value, href }: FAQContACTItemProps) {
  const content = (
    <>
      <div className="flex items-center gap-5">
        <Animated
          preset="fadeLeft"
          delay={0.3}
          hover="icon"
          transition={{ duration: 0.2 }}
          className="p-1 md:p-3 rounded-2xl shadow-2xl bg-[#F2F2FC]"
        >
          {icon}
        </Animated>

        <div className="flex flex-col gap-1 items-start justify-center">
          <Animated preset="fadeUp" delay={0.3} as="p" className="text-primary font-semibold text-sm md:text-base">
            {title}
          </Animated>

          <Animated
            preset="fadeUp"
            delay={0.3}
            as="p"
            className="text-[#3C13D3] font-semibold text-sm md:text-base transition-all duration-500 hover:text-purple-800"
          >
            {value}
          </Animated>
        </div>
      </div>

      <Animated as="div" className="hidden md:flex" hover="arrow" transition={{ duration: 0.2 }}>
        <IconArrow className="w-8 h-8 rotate-270 text-[#3C13D3] transition-all duration-500 hover:text-purple-800" />
      </Animated>
    </>
  );

  if (!href) {
    return <div className="flex items-center justify-between">{content}</div>;
  }

  return (
    <Animated
      as="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      preset="fadeLeft"
      hover="link"
      transition={{ duration: 0.4 }}
      className="flex items-center justify-between"
    >
      {content}
    </Animated>
  );
}
