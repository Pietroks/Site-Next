"use client";

import { motion } from "framer-motion";
import PrimaryButton from "./PrimaryButton";
import { headerLinks } from "@/utils/headerLinks";
import { Animated } from "./Animated";
import { useEffect, useState } from "react";
import { X, Menu } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { IconMoon, IconSun } from "./IconsSvg";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  if (!mounted) return null;

  const linkStyle =
    "block cursor-pointer transition-all duration-300 ease-in-out hover:text-orange-600 hover:underline hover:underline-offset-4 hover:decoration-2";

  const menuItems = headerLinks;

  const ThemeToggleButton = () => (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Alterar tema"
      className="p-2 rounded-3xl shadow-2xl bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:scale-105 transition-all duration-500 font-medium cursor-pointer"
    >
      {theme === "dark" ? (
        <IconSun className="transition-colors duration-300 hover:text-amber-500" />
      ) : (
        <IconMoon className="transition-colors duration-300 hover:text-gray-400" />
      )}
    </button>
  );

  return (
    <header
      id="header"
      className="w-full px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between bg-white dark:bg-gray-800 shadow-sm relative z-50 min-h-18"
    >
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-black/30 backdrop-blur-sm">
          <Animated
            as="div"
            preset="fadeRight"
            className="absolute top-0 right-0 w-4/5 sm:w-2/3 h-fit rounded-b-2xl bg-white dark:bg-gray-800 shadow-2xl p-6 flex flex-col gap-6"
          >
            <div className="flex justify-end">
              <button onClick={() => setMobileOpen(false)} className="text-purple-800 dark:text-purple-500">
                <X size={30} />
              </button>
            </div>

            <nav className="flex flex-col gap-4 overflow-y-auto">
              {menuItems.map((item, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <Link
                    href={item.href}
                    className="text-purple-800 dark:text-purple-500 font-semibold text-lg"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>

                  {item.dropdown && (
                    <div className="flex flex-col pl-4 gap-2 border-l border-purple-200">
                      {item.dropdown.map((dropItem, dropI) => (
                        <Link
                          key={dropI}
                          href={dropItem.href}
                          className="text-gray-500 text-sm hover:text-orange-600 dark:hover:text-orange-500"
                          onClick={() => setMobileOpen(false)}
                        >
                          {dropItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="mt-2 flex justify-start">
                <ThemeToggleButton />
              </div>

              <PrimaryButton className="w-4/5 mt-4">Matricule-se</PrimaryButton>
            </nav>
          </Animated>
        </div>
      )}

      <motion.a whileHover={{ scale: 1.02 }} href="/" className="cursor-pointer">
        <Animated as="div" preset="fadeDown">
          <img src="/colorido.png" alt="Logo Uníntese" className="w-52 sm:w-40 lg:w-56" />
        </Animated>
      </motion.a>

      <nav className="hidden lg:flex items-center gap-6 xl:gap-10 text-purple-800 dark:text-purple-500 font-medium relative z-50">
        {menuItems.map((item, i) => {
          if (item.dropdown) {
            return (
              <Animated key={i} as="div" preset="fadeDown" delay={item.delay} className="relative group">
                <motion.a href={item.href} className={linkStyle} whileHover={{ y: -2 }}>
                  {item.label}
                </motion.a>

                <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-gray-800 shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500">
                  {item.dropdown.map((dropItem, dropI) => (
                    <Link
                      key={dropI}
                      href={dropItem.href}
                      className="block px-4 py-2 hover:bg-gray-200 transition-colors duration-500 first:rounded-t-lg last:rounded-b-lg"
                    >
                      {dropItem.label}
                    </Link>
                  ))}
                </div>
              </Animated>
            );
          }

          return (
            <Animated key={i} as="div" preset="fadeDown" delay={item.delay}>
              <motion.a href={item.href} className={linkStyle} whileHover={{ y: -2 }}>
                {item.label}
              </motion.a>
            </Animated>
          );
        })}
      </nav>

      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden text-purple-800 transition-colors duration-500 hover:text-purple-600"
      >
        <Menu size={30} />
      </button>

      <div className="hidden lg:flex items-center gap-4">
        <ThemeToggleButton />
        <Animated as="div" preset="fadeRight" delay={0.4} className="hidden lg:block">
          <PrimaryButton className="px-6 py-2 text-xl" onClick={() => console.log("Babriuu!")}>
            Matricule-se
          </PrimaryButton>
        </Animated>
      </div>
    </header>
  );
}
