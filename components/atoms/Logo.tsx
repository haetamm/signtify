import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image
        height="28"
        width="28"
        src="/img/logo.svg"
        alt="Signtify logo"
        className="rounded-md flex items-center justify-center font-black text-white text-sm"
      />
      <span className="text-foreground font-bold text-2xl tracking-tight">
        Signtify
      </span>
    </div>
  );
}
