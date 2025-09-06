"use client";

import { CircleAnimated } from "@/components/circle-animated";
import { MenuIcon, SearchIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { HomeNavbarLogo } from "./home-navbar-logo";

import { cn } from "@/lib/utils";

import { AnimatePresence, motion } from "motion/react";

import { Button } from "@/components/ui/button";

const navbarItems = [
  {
    label: "Createurs",
    href: "/creators",
  },
  {
    label: "Events",
    href: "/events",
  },
  {
    label: "Projets",
    href: "/projects",
  },
];

const menuItems = [
  {
    label: "Créateurs",
    href: "/creators",
  },
  {
    label: "Events",
    href: "/events",
  },
  {
    label: "Projects",
    href: "/projects",
  },
  {
    label: "Catalogues",
    href: "/catalogues",
  },
  {
    label: "S'inscrire",
    href: "/signup",
  },
  {
    label: "Se connecter",
    href: "/login",
  },
];
export const HomeNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between w-full bg-black py-3 px-3 sm:py-4 sm:px-4 md:py-6 md:px-6">
      <div
        className={cn(
          "flex items-center z-50 transition-all duration-200",
          isMenuOpen && "invert"
        )}
      >
        <HomeNavbarLogo />
      </div>

      <div className="flex items-center gap-3 sm:gap-4 md:gap-6 group">
        <Link href="/search" className="text-white">
          <SearchIcon className="size-5 sm:size-6 text-white cursor-pointer" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-4">
          {navbarItems.map((item) => (
            <Link
              href={item.href}
              key={item.label}
              className="border-2 border-white py-1.5 px-4 sm:py-2 sm:px-6 rounded-full text-white text-base sm:text-lg font-medium hover:bg-white hover:text-black transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Menu Button - Mobile & Desktop */}
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="flex items-center gap-2 bg-white rounded-full z-50 cursor-pointer"
        >
          {/* Mobile version - Icon only */}
          <div className="md:hidden p-1.5 sm:p-2">
            {isMenuOpen ? (
              <XIcon className="size-5 sm:size-6" />
            ) : (
              <MenuIcon className="size-5 sm:size-6" />
            )}
          </div>

          {/* Desktop version - With text and animation */}
          <div className="hidden md:flex items-center gap-2 py-1.5 sm:py-2 px-4 sm:px-6 text-base sm:text-xl font-medium">
            {isMenuOpen ? (
              <XIcon className="size-5 sm:size-6" />
            ) : (
              <CircleAnimated />
            )}
            Menu
          </div>
        </button>
      </div>
      
      <AnimatePresence initial={false}>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-blue-300 z-40 overflow-y-auto md:h-2/3"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.2 }}
          >
            <div className="container mx-auto pt-20 sm:pt-28 md:pt-32 px-4">
              <nav className="mb-8 sm:mb-12">
                <ul className="flex flex-col md:flex-row flex-wrap justify-center gap-3 sm:gap-4 md:gap-6">
                  {menuItems.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="inline-flex items-center gap-2 border-2 border-black rounded-full font-medium px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 text-sm sm:text-base transition cursor-pointer hover:invert"
                      >
                        <CircleAnimated />
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <p className="font-serif text-base sm:text-xl md:text-3xl text-center max-w-4xl mx-auto">
                Paye moi un verre est une plateforme de financement participatif
                adaptée à l'Afrique, permettant aux créateurs, entrepreneurs et
                particuliers de recevoir un soutien financier direct.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
