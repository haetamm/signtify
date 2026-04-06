import StatCard from "@/components/atoms/StatCard";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiClock,
  FiFileText,
  FiUser,
  FiXCircle,
} from "react-icons/fi";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { MdOutlinePendingActions } from "react-icons/md";

interface Summary {
  totalMyDocuments: number;
  draft: number;
  inProgress: number;
  waitingSignature: number;
  needMySignature: number;
  completed: number;
  rejected: number;
  overdue: number;
}

export default function SummaryGrid({ summary }: { summary: Summary }) {
  const cards = [
    {
      title: "Total Dokumen",
      value: summary.totalMyDocuments,
      icon: <HiOutlineDocumentDuplicate />,
      color: "from-indigo-500 to-indigo-600",
      iconColor: "text-indigo-500",
    },
    {
      title: "Draft",
      value: summary.draft,
      icon: <FiFileText />,
      color: "from-slate-500 to-slate-600",
      iconColor: "text-slate-500",
    },
    {
      title: "Proses",
      value: summary.inProgress,
      icon: <FiClock />,
      color: "from-blue-500 to-blue-600",
      iconColor: "text-blue-500",
    },
    {
      title: "Menanti TTD",
      value: summary.waitingSignature,
      icon: <MdOutlinePendingActions />,
      color: "from-amber-500 to-amber-600",
      iconColor: "text-amber-500",
    },
    {
      title: "Perlu TTD Saya",
      value: summary.needMySignature,
      icon: <FiUser />,
      color: "from-purple-500 to-purple-600",
      iconColor: "text-purple-500",
    },
    {
      title: "Selesai",
      value: summary.completed,
      icon: <FiCheckCircle />,
      color: "from-emerald-500 to-emerald-600",
      iconColor: "text-emerald-500",
    },
    {
      title: "Ditolak",
      value: summary.rejected,
      icon: <FiXCircle />,
      color: "from-rose-500 to-rose-600",
      iconColor: "text-rose-500",
    },
    {
      title: "Terlambat",
      value: summary.overdue,
      icon: <FiAlertCircle />,
      color: "from-red-500 to-red-600",
      iconColor: "text-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 mb-8">
      {cards.map((card, idx) => (
        <StatCard key={idx} {...card} />
      ))}
    </div>
  );
}
