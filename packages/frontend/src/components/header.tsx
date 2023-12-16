"use client";

import { MenuIcon } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./logo";
import Toggle from "./toggle";

const links = [
  {
    href: "/login",
    label: "giriş yap",
  },
  {
    href: "/register",
    label: "kayıt ol",
  },
];

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header
      className={`w-full fixed top-0 left-0 bg-white text-black transition-all duration-300 ${
        scrolled ? "h-16 shadow-lg" : "h-20"
      }`}
    >
      <div
        className={`w-full md:max-w-7xl h-full flex flex-row items-center align-middle justify-between mx-auto  transition-all duration-200 ${
          scrolled ? "px-4" : "px-6"
        }`}
      >
        <Logo className="h-8 w-auto" />
        <nav>
          <ul className="flex items-center align-middle justify-center gap-4">
            {links.map((link) => {
              return (
                <li key={link.href}>
                  <Link className="text-lg transition-all duration-200 hover:text-blue-600" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
