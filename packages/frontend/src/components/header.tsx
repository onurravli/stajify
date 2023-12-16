"use client";

import { MenuIcon } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./logo";
import Toggle from "./toggle";
import Button from "./button";

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
      className={`w-full h-20 fixed top-0 left-0 bg-white text-black transition-all duration-300 ${
        scrolled && "shadow-lg"
      }`}
    >
      <div className="w-full md:max-w-7xl h-full flex flex-row items-center align-middle justify-between mx-auto  transition-all duration-200 px-6">
        <Logo className="h-8 w-auto" />
        <nav>
          <ul className="flex items-center align-middle justify-center gap-2">
            {links.map((link) => {
              return (
                <li key={link.href}>
                  <Link className="text-lg transition-all duration-200 hover:text-blue-600" href={link.href}>
                    <Button size="sm" variant={link.href === "/register" ? "primary" : "secondary"}>
                      {link.label}
                    </Button>
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
