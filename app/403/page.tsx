import Link from "next/link";
import { FiLock } from "react-icons/fi";

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <FiLock size={48} className="text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">Akses Ditolak</h1>
        <p className="text-muted-foreground">
          Anda tidak memiliki izin untuk mengakses halaman ini.
        </p>
        <Link
          href="/dashboard"
          className="inline-block mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm"
        >
          Kembali ke Dashboard
        </Link>
      </div>
    </div>
  );
}
