import { formatShortDate } from "@/lib/util/helper";
import { documentData } from "@/lib/util/resource";
import { FaFolderOpen } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { HiOutlineGlobeAlt, HiOutlineLockClosed } from "react-icons/hi2";
import AvatarStack from "./AvatarStack";

export function FolderRowList({
  folder,
}: {
  folder: (typeof documentData.folders)[0];
}) {
  return (
    <div className="group flex items-center gap-3 px-3 py-1.5 hover:bg-muted cursor-pointer transition-colors select-none">
      <div className="w-8 h-8 bg-muted rounded-md flex items-center justify-center shrink-0 group-hover:bg-amber-200 transition-colors">
        <FaFolderOpen className="w-4.5 h-4.5 text-amber-500" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{folder.name}</p>
      </div>
      <div className="hidden sm:flex items-center gap-4 shrink-0">
        <AvatarStack contributors={folder.contributors} />
        <span className="flex items-center gap-1 text-xs text-card-text">
          {folder.isPublic ? (
            <HiOutlineGlobeAlt className="w-3.5 h-3.5" />
          ) : (
            <HiOutlineLockClosed className="w-3.5 h-3.5" />
          )}
        </span>
        <span className="text-xs text-card-text w-24 text-right">
          {formatShortDate(folder.updatedAt)}
        </span>
      </div>
      <HiDotsVertical className="w-4 h-4 text-slate-300 group-hover:text-card-text shrink-0" />
    </div>
  );
}
