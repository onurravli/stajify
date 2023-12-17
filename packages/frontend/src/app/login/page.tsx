"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
        email,
        password,
      });
      router.push("/");
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        alert(err.response?.data["errorPrintable"]);
      }
    }
  };
  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-8 py-24 mt-16">
      <motion.form
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full md:max-w-md flex flex-col items-center align-middle justify-center gap-4"
        onSubmit={handleLogin}
      >
        <Input
          placeholder="E-Mail Adresin"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          value={email}
          type="email"
          required
          autoComplete="username"
        />
        <Input
          placeholder="Şifren"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          value={password}
          type="password"
          required
          autoComplete="current-password"
        />
        <span className="w-full text-right">
          <Link href="#reset-password">Şifremi unuttum!</Link>
        </span>
        <Button size="sm" variant="primary" className="w-full" type="submit">
          <span className="text-base">Giriş Yap</span>
        </Button>
        <span>
          Üye değil misin? <Link href="/register">Kayıt ol!</Link>
        </span>
      </motion.form>
    </main>
  );
}
