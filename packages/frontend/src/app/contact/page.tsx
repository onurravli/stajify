"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Textares from "@/components/textarea";
import Textarea from "@/components/textarea";

export default function Contact() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {};
  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-8 py-24">
      <motion.form
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full md:max-w-md flex flex-col items-center align-middle justify-center gap-4"
        onSubmit={handleSubmit}
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
          autoComplete="username"
        />
        <Textarea
          placeholder="Mesajın"
          onChange={(event) => {
            setMessage(event.target.value);
          }}
          value={message}
          required
          rows={5}
        />
        <Button size="sm" variant="primary" className="w-full" type="submit">
          <span className="text-base">Gönder</span>
        </Button>
      </motion.form>
    </main>
  );
}
