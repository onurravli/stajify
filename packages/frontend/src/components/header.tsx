import Logo from "./logo";

export default function Header() {
  return (
    <header className="w-full h-16 fixed top-0 left-0 bg-white text-black border-b">
      <div className="w-full md:max-w-6xl h-16 flex flex-row items-center align-middle justify-center mx-auto px-4">
        <Logo className="h-8 w-auto" />
      </div>
    </header>
  );
}
