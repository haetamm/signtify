import { formatBytes, formatShortDate } from "@/lib/utils/helper";
import { documentData } from "@/lib/utils/resource";
import { FaFilePdf } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import {
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineUser,
} from "react-icons/hi2";
import { StatusPill } from "../atoms/StatusPill";
import AvatarStack from "./AvatarStack";

export function DocRowList({
  doc,
}: {
  doc: (typeof documentData.documents)[0];
}) {
  return (
    <div className="group flex items-center gap-3 px-3 py-1.5 hover:bg-muted cursor-pointer transition-colors select-none">
      <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center shrink-0 group-hover:bg-amber-200 transition-colors">
        <FaFilePdf className="w-4.5 h-4.5 text-red-500" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{doc.title}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <StatusPill status={doc.status} />
        </div>
      </div>
      <div className="hidden sm:flex items-center gap-4 shrink-0 text-xs text-card-text">
        <AvatarStack contributors={doc.contributors} />
        <span className="flex items-center gap-1">
          <HiOutlineUser className="w-3.5 h-3.5" />
          {doc.ownerUsername}
        </span>
        <span className="flex items-center gap-1">
          <HiOutlineCalendar className="w-3.5 h-3.5" />
          {formatShortDate(doc.deadline)}
        </span>
        <span className="w-16 text-right">{formatBytes(doc.fileSize)}</span>
        <span className="flex items-center gap-1 w-24 text-right">
          <HiOutlineClock className="w-3.5 h-3.5" />
          {formatShortDate(doc.updatedAt)}
        </span>
      </div>
      <HiDotsVertical className="w-4 h-4 text-slate-300 group-hover:text-card-text shrink-0" />
    </div>
  );
}
