export default function Button({
  children,
  variant,
  size,
}: {
  children?: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
}) {
  return (
    <button
      className={`w-full md:w-auto rounded-md border transition-all duration-200 ${
        variant == "primary"
          ? "border-transparent bg-blue-600 text-white hover:bg-blue-800"
          : variant == "secondary"
          ? "border-blue-600 bg-transparent text-blue-600 hover:bg-blue-50"
          : ""
      } ${
        size == "sm"
          ? "px-4 py-2 text-sm"
          : size == "md"
          ? "px-6 py-3 text-lg"
          : size == "lg"
          ? "px-10 py-3 text-xl"
          : ""
      }
      `}
    >
      {children}
    </button>
  );
}
