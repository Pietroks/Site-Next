import PrimaryButton from "../PrimaryButton";
import { ReactNode } from "react";
import { Animated } from "../Animated";

interface HeartBannerProps {
  icon: ReactNode;
  text: ReactNode;
  textButton: string;
  onClick?: () => void;
}

export function HeartBanner({ icon, text, textButton, onClick }: HeartBannerProps) {
  return (
    <Animated preset="fadeUpScale" className="max-w-5xl mx-auto mt-15" whileHover={{ y: -4 }} transition={{ duration: 0.8 }}>
      <div className="grid grid-cols-1 md:grid-cols-5 items-center rounded-4xl shadow-xl bg-linear-to-r from-[#F8F8FD] to-[#F7F7FD] dark:bg-linear-to-r dark:from-[#181630] dark:to-[#141d34] dark:border dark:border-white/10 gap-6 overflow-hidden relative">
        <Animated
          preset="fadeLeft"
          index={0}
          hover="icon"
          className="col-span-2 md:col-span-1 bg-unintese-grad flex items-center justify-center w-full rounded-3xl shadow-xl py-6 mx-auto md:mx-0"
        >
          <Animated as="div" animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
            {icon}
          </Animated>
        </Animated>

        <Animated preset="fadeUp" index={1} className="col-span-2 text-center md:text-left">
          <div className="text-base md:text-lg text-primary-light dark:text-gray-200 font-base leading-relaxed">{text}</div>
        </Animated>

        <Animated preset="fadeRight" index={2} className="col-span-2 flex justify-center w-full">
          <div className="w-5/6 lg:w-4/6">
            <PrimaryButton className="w-full p-3 md:text-base" onClick={onClick}>
              {textButton}
            </PrimaryButton>
          </div>
        </Animated>

        <Animated
          as="div"
          animate={{
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.12),transparent_40%)]"
        />
      </div>
    </Animated>
  );
}
