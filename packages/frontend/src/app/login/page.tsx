"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-8 py-24 mt-10">
      <form className="w-full md:max-w-md flex flex-col items-center align-middle justify-center gap-4">
        <Input
          placeholder="E-Mail Adresin"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          value={email}
          autoComplete="email"
        />
        <Input
          placeholder="Şifren"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          value={email}
          type="password"
          autoComplete="current-password"
        />
        <span className="w-full text-right">
          <a href="#">Şifremi unuttum!</a>
        </span>
        <Button size="sm" variant="primary" className="w-full">
          <span className="text-base">Giriş Yap</span>
        </Button>
        <span>
          Üye değil misin? <a href="/register">Kayıt ol!</a>
        </span>
      </form>
    </main>
  );
}
