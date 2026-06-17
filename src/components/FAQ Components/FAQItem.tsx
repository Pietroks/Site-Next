import { AnimatePresence, motion } from "framer-motion";
import { memo } from "react";
import { IconArrow } from "../IconsSvg";
import { Animated } from "../Animated";

interface FAQItemProps {
  pergunta: string;
  resposta: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItemComponent({ pergunta, resposta, isOpen, onToggle }: FAQItemProps) {
  return (
    <Animated
      as="div"
      preset="fadeUp"
      hover="lift"
      transition={{ duration: 0.5 }}
      className={`bg-white rounded-2xl shadow-xl p-2 md:p-4 flex flex-col gap-1 transition-all duration-500 border hover:border-gray-300 cursor-pointer ${
        isOpen ? "border-gray-300" : "border-gray-100/50"
      }`}
    >
      <button
        onClick={onToggle}
        className="flex justify-between items-center w-full gap-2 md:gap-4 text-left group cursor-pointer focus:outline-none"
      >
        <div className="flex items-center gap-2 md:gap-4">
          <motion.div
            animate={{
              rotate: isOpen ? 180 : 0,
              scale: isOpen ? 1.05 : 1,
            }}
            transition={{
              duration: 0.3,
            }}
            className={`w-8 md:w-10 h-8 md:h-10 flex items-center justify-center text-2xl font-bold rounded-full transition-all duration-500 shrink-0 ${
              isOpen
                ? "bg-linear-to-tr from-[#3935C3] to-[#B37FDF] text-white"
                : "bg-[#f1f0fb] text-primary group-hover:bg-linear-to-tr from-[#3935C3] to-[#B37FDF] group-hover:text-white"
            }`}
          >
            {isOpen ? "-" : "+"}
          </motion.div>

          <motion.p
            animate={{
              x: isOpen ? 4 : 0,
            }}
            transition={{
              duration: 0.25,
            }}
            className="md:text-lg text-sm font-semibold text-primary transition-colors duration-500 group-hover:text-purple-800"
          >
            {pergunta}
          </motion.p>
        </div>

        <motion.div
          animate={{
            rotate: isOpen ? 180 : 0,
          }}
          transition={{
            duration: 0.3,
          }}
        >
          <IconArrow className="w-7 h-7 text-primary transition-all duration-500 shrink-0 group-hover:text-purple-600" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: "auto", opacity: 1, marginTop: 12 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden pl-5 md:pl-14 pr-4"
          >
            <p className="text-gray-600 md:text-base text-sm leading-relaxed">{resposta}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </Animated>
  );
}

export default memo(FAQItemComponent);
