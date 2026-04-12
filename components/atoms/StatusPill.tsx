const STATUS_MAP: Record<string, { label: string; dot: string; text: string }> =
  {
    WAITING_SIGNATURE: {
      label: "Menunggu TTD",
      dot: "bg-amber-400",
      text: "text-amber-600",
    },
    SIGNED: {
      label: "Ditandatangani",
      dot: "bg-emerald-400",
      text: "text-emerald-600",
    },
    REJECTED: { label: "Ditolak", dot: "bg-red-400", text: "text-red-600" },
  };

export function StatusPill({ status }: { status: string }) {
  const s = STATUS_MAP[status] ?? {
    label: status,
    dot: "bg-slate-400",
    text: "text-slate-500",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-medium ${s.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}
