export default function Button({
  children,
  variant,
  size,
  onClick,
  className,
}: {
  children?: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg" | "icon";
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      className={`w-full rounded-md border transition-all duration-200 text-sm 
      ${
        variant == "primary"
          ? "border-transparent bg-blue-600 text-white hover:bg-blue-800"
          : variant == "secondary"
          ? "border-blue-600 bg-transparent text-blue-600 hover:bg-blue-50"
          : ""
      } ${
        // size == "sm"
        //   ? "px-4 py-2 text-sm"
        //   : size == "md"
        //   ? "px-6 py-3 text-lg"
        //   : size == "lg"
        //   ? "px-10 py-3 text-xl"
        //   : ""
        size == "sm"
          ? "h-10 text-base px-4 py-2"
          : size == "md"
          ? "h-12 text-lg px-6 py-3"
          : size == "lg"
          ? "h-14 text-xl px-10 py-3"
          : size == "icon"
          ? "h-10 w-10 flex flex-row items-center justify-center align-middle bg-blue-600 text-white border-blue-600"
          : ""
      } ${className}
      `}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
