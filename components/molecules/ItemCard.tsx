import Image from "next/image";
import { HiDotsVertical } from "react-icons/hi";

type ItemCardProps = {
  title: string;
  variant: "folder" | "doc";
};

const ICON_MAP = {
  folder: "/img/folder-doc.png",
  doc: "/img/pdf.png",
};

export function ItemCard({ title, variant }: ItemCardProps) {
  return (
    <div className="flex justify-center">
      <div className="group relative flex flex-col items-center p-2 sm:p-3 sm:pt-4 pt-3 rounded-lg hover:bg-muted cursor-pointer transition-all select-none w-[100px] sm:w-[130px] md:w-[140px]">
        <button
          onClick={(e) => e.stopPropagation()}
          className="absolute top-1 right-0 p-0.5 rounded transition-all opacity-100 hover:bg-card"
        >
          <HiDotsVertical className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-card-text" />
        </button>

        <div className="relative mb-2 sm:mb-3">
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-14 sm:w-16 h-2 bg-slate-200/60 rounded-full blur-sm group-hover:bg-slate-300/60 transition-all" />
          <Image
            width={100}
            height={100}
            src={ICON_MAP[variant]}
            alt=""
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            className="select-none pointer-events-none w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 object-contain"
          />
        </div>

        <p className="text-[11px] sm:text-xs md:text-sm text-center font-medium leading-tight line-clamp-2 px-1 break-words mt-1">
          {title}
        </p>
      </div>
    </div>
  );
}
