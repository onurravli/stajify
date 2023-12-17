"use client";

import { MenuIcon } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./logo";
import Button from "./button";

const links = [
  {
    href: "/login",
    label: "Giriş Yap",
  },
  {
    href: "/register",
    label: "Kayıt Ol",
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
      className={`w-full h-20 fixed top-0 left-0 bg-white text-black transition-all duration-300 ${
        scrolled ? "shadow-lg" : ""
      }`}
    >
      <div className="w-full md:max-w-7xl h-full flex flex-row items-center align-middle justify-between mx-auto  transition-all duration-200 px-6">
        <Logo className="h-8 w-auto" />
        <nav>
          <ul className="flex items-center align-middle justify-center gap-4">
            {links.map((link) => {
              return (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
