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
    label: "Shows",
    href: "/shows",
  },
  {
    label: "Artists",
    href: "/artists",
  },
  {
    label: "News",
    href: "/news",
  },
  {
    label: "Shop",
    href: "/shop",
  },
];

const menuItems = [
  {
    label: "Radio",
    href: "/radio",
  },
  {
    label: "Shows",
    href: "/shows",
  },
  {
    label: "News",
    href: "/news",
  },
  {
    label: "Shop",
    href: "/shop",
  },
  {
    label: "Support",
    href: "/support",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Newsletter",
    href: "/newsletter",
  },
  {
    label: "Apply",
    href: "/apply",
  },
  {
    label: "Partners",
    href: "/partners",
  },
];
export const HomeNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between w-full bg-black py-4 px-4 sm:py-6">
      <div
        className={cn(
          "flex items-center z-50 transition-all duration-200",
          isMenuOpen && "invert"
        )}
      >
        <HomeNavbarLogo />
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        <SearchIcon className="size-5 sm:size-6 text-white cursor-pointer" />

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-4">
          {navbarItems.map((item) => (
            <Link
              href={item.href}
              key={item.label}
              className="border-2 border-white py-2 px-6 rounded-full text-white text-lg font-medium hover:bg-white hover:text-black transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Menu Button - Mobile & Desktop */}
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="flex items-center gap-2 bg-white rounded-full z-50"
        >
          {/* Mobile version - Icon only */}
          <div className="md:hidden p-2">
            {isMenuOpen ? (
              <XIcon className="size-6" />
            ) : (
              <MenuIcon className="size-6" />
            )}
          </div>

          {/* Desktop version - With text and animation */}
          <div className="hidden md:flex items-center gap-2 py-2 px-6 text-xl font-medium">
            {isMenuOpen ? <XIcon className="size-6" /> : <CircleAnimated />}
            Menu
          </div>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-yellow-300 z-40 md:h-1/2"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.2 }}
          >
            <div className="container mx-auto pt-32 px-4">
              <nav className="mb-12">
                <ul className="flex flex-col md:flex-row flex-wrap justify-center gap-4 md:gap-6">
                  {menuItems.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="inline-flex items-center gap-2 border-2 border-black rounded-full font-medium px-4 py-2 md:px-6 hover:bg-black hover:text-white transition-colors"
                      >
                        <CircleAnimated />
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <p className="font-serif text-xl md:text-3xl text-center max-w-4xl mx-auto">
                Oroko is a not-for-profit independent internet radio station
                based in Accra, Ghana. We aim to connect, inspire and empower
                through conversation, collaboration and community.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
