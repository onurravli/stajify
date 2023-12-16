export default function Toggle({ active, onClick }: { active: boolean; onClick?: () => void }) {
  return (
    <div onClick={onClick} className="w-8 h-8 flex flex-col items-end align-middle justify-center gap-[4px]">
      <span
        className={`transition-all duration-200 h-[3px] bg-blue-600 ${
          active ? "transform rotate-45 translate-y-[7px] w-7" : "w-7"
        }`}
      />
      <span
        className={`transition-all duration-200 h-[3px] w-5 bg-blue-600 ${
          active ? "transform bg-transparent w-0" : "opacity-100"
        }`}
      />
      <span
        className={`transition-all duration-200 h-[3px] bg-blue-600 ${
          active ? "transform -rotate-45 -translate-y-[7px] w-7" : "w-3"
        }`}
      ></span>
    </div>
  );
}
