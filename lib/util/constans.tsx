export const GENDER_OPTIONS = [
  { value: "", label: "Semua" },
  { value: "Laki-laki", label: "Pria" },
  { value: "Perempuan", label: "Wanita" },
];

export const STATUS_OPTIONS = [
  { value: "", label: "Semua" },
  { value: "true", label: "Aktif" },
  { value: "false", label: "Nonaktif" },
];

export const PERMISSION_COLOR: Record<string, string> = {
  MANAGE:
    "bg-gradient-to-br from-violet-400 to-violet-500 text-white shadow-sm",
  UPLOAD: "bg-gradient-to-br from-blue-400 to-blue-500 text-white shadow-sm",
  VIEW: "bg-gradient-to-br from-slate-400 to-slate-500 text-white shadow-sm",
};

// Warna berdasarkan status kontributor (document contributors)
export const CONTRIBUTOR_STATUS_COLOR: Record<string, string> = {
  SIGNED:
    "bg-gradient-to-br from-emerald-400 to-emerald-500 text-white shadow-sm",
  PENDING: "bg-gradient-to-br from-amber-400 to-amber-500 text-white shadow-sm",
  REJECTED: "bg-gradient-to-br from-red-400 to-red-500 text-white shadow-sm",
};

export const FALLBACK_COLOR =
  "bg-gradient-to-br from-teal-400 to-teal-500 text-white shadow-sm";
