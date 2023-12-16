import React, { HTMLInputTypeAttribute } from "react";

export default function Input({
  placeholder,
  onChange,
  value,
  type,
  autoComplete,
}: {
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: any;
  type?: HTMLInputTypeAttribute;
  autoComplete?: string;
}) {
  return (
    <input
      className="w-full h-10 border text-base px-4 py-2 rounded-md transition-all duration-100 active:outline-none focus:outline-none focus:ring-1 focus:ring-blue-500"
      autoComplete={autoComplete}
      placeholder={placeholder}
      type={type}
    />
  );
}
