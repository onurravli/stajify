"use client";

import { useState } from "react";
import Logo from "./logo";
import { MenuIcon } from "lucide-react";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <header className="w-full h-16 fixed top-0 left-0 bg-white text-black border-b">
      <div className="w-full h-16 flex flex-row items-center align-middle justify-center mx-auto px-4">
        <Logo className="h-8 w-auto" />
        <button
          className="h-16 w-16 fixed right-0 flex flex-row items-center align-middle justify-center"
          onClick={() => {
            setShowMenu(!showMenu);
          }}
        >
          <MenuIcon className="h-8 w-auto text-blue-600" />
        </button>
        <span
          onClick={() => {
            setShowMenu(false);
          }}
          className={`w-full h-full fixed top-0 left-0 bg-black transition-all duration-200 ${
            showMenu ? "opacity-40" : "opacity-0 pointer-events-none"
          }`}
        />
        <nav
          className={`w-full max-w-xs h-full bg-white fixed top-0 transition-all duration-200 ${
            showMenu ? "opacity-100 right-0" : "opacity-0 pointer-events-none -right-full transition-all duration-200"
          }`}
        ></nav>
      </div>
    </header>
  );
}
