"use client";

import React, { useState } from "react";
import axios, { Axios, AxiosError } from "axios";
import Input from "@/components/input";
import Button from "@/components/button";
import { useRouter } from "next/navigation";

export default function Register() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (RegExp.prototype.test.call(/^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\.)+edu\.tr$/, email) === false) {
      alert("Lütfen geçerli bir e-mail adresi giriniz! Yalnızca edu.tr uzantılı e-mail adresleri kabul edilmektedir.");
      return;
    }
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/`, {
        name,
        surname,
        phone,
        email,
        password,
      });
      alert(res.data["messagePrintable"]);
      router.push("/login");
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        alert(err.response?.data["errorPrintable"]);
      }
    }
  };
  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-8 py-24 mt-10">
      <form
        className="w-full md:max-w-md flex flex-col items-center align-middle justify-center gap-4"
        onSubmit={handleRegister}
      >
        <div className="w-full flex flex-row gap-4">
          <Input
            placeholder="Adın"
            onChange={(event) => {
              setName(event.target.value);
            }}
            value={name}
            type="name"
            required
            autoComplete="name"
          />
          <Input
            placeholder="Soyadın"
            onChange={(event) => {
              setSurname(event.target.value);
            }}
            value={surname}
            type="surname"
            required
            autoComplete="surname"
          />
        </div>
        <Input
          placeholder="E-Mail Adresin"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          value={email}
          type="email"
          required
          autoComplete="email"
        />
        <Input
          placeholder="Telefon Numaran"
          onChange={(event) => {
            setPhone(event.target.value);
          }}
          value={phone}
          type="tel"
          required
          autoComplete="off"
        />
        <Input
          placeholder="Şifren"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          value={password}
          autoComplete="new-password"
          type="password"
          required
        />
        <Button size="sm" variant="primary" className="w-full" type="submit">
          <span className="text-base">Kayıt Ol</span>
        </Button>
        <span>
          Zaten üye misin? <a href="/login">Giriş Yap</a>
        </span>
      </form>
    </main>
  );
}
