export default function Button({
  children,
  variant,
}: {
  children?: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  return (
    <button
      className={`w-full md:w-auto rounded-md py-2 md:px-12 px-6 text-xl border transition-all duration-200 ${
        variant == "primary"
          ? "border-transparent bg-blue-600 text-white hover:bg-blue-800"
          : variant == "secondary"
          ? "border-blue-600 bg-transparent text-blue-600 hover:bg-blue-600 hover:text-white"
          : ""
      }`}
    >
      {children}
    </button>
  );
}
