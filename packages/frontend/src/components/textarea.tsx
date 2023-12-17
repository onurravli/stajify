import React, { ChangeEventHandler, HTMLInputTypeAttribute } from "react";

export default function Textarea({
  placeholder,
  onChange,
  value,
  type,
  required,
  rows,
}: {
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  value?: any;
  type?: HTMLInputTypeAttribute;
  required?: boolean;
  rows?: number;
}) {
  return (
    <textarea
      className="w-full border text-base px-4 py-2 rounded-md transition-all duration-100 active:outline-none focus:outline-none focus:ring-1 focus:ring-blue-500"
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      required={required}
      rows={rows}
    />
  );
}
