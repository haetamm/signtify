"use client";

import { FiAlertCircle } from "react-icons/fi";
import {
  IoCloudOfflineOutline,
  IoLockClosedOutline,
  IoRefreshOutline,
  IoSearchOutline,
  IoServerOutline,
} from "react-icons/io5";
import { Button } from "../ui/button";

interface ErrorViewProps {
  code?: number;
  status?: string;
  message?: string;
  onRetry?: () => void;
  isRetrying?: boolean;
}

const ERROR_CONFIG: Record<
  number,
  { title: string; description: (msg?: string) => string }
> = {
  401: {
    title: "Sesi Berakhir",
    description: () => "Login kembali untuk mengakses halaman ini",
  },
  403: {
    title: "Akses Ditolak",
    description: (msg) => msg ?? "Anda tidak memiliki izin yang diperlukan",
  },
  404: {
    title: "Halaman Tidak Ditemukan",
    description: (msg) =>
      msg ?? "Sepertinya halaman yang Anda cari telah berpindah",
  },
  500: {
    title: "Kesalahan Server",
    description: (msg) => msg ?? "Tim teknis sedang menangani masalah ini",
  },
  503: {
    title: "Layanan Terganggu",
    description: (msg) =>
      msg ?? "Sedang dalam pemeliharaan, akan segera kembali",
  },
};

const DEFAULT_CONFIG = {
  title: "Terjadi Kesalahan",
  description: (msg?: string) => msg ?? "Silakan coba beberapa saat lagi",
};

export default function ErrorView({
  code,
  status,
  message,
  onRetry,
  isRetrying,
}: ErrorViewProps) {
  const config = ERROR_CONFIG[code ?? -1] ?? DEFAULT_CONFIG;
  const title = config.title;
  const description = config.description(message);

  const getIcon = () => {
    const iconClass = "w-5 h-5";

    if (code === 401 || code === 403)
      return <IoLockClosedOutline className={iconClass} />;
    if (code === 404) return <IoSearchOutline className={iconClass} />;
    if (code === 500) return <IoServerOutline className={iconClass} />;
    if (code === 503) return <IoCloudOfflineOutline className={iconClass} />;
    return <FiAlertCircle className={iconClass} />;
  };

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Card with subtle glassmorphism */}
        <div className="relative overflow-hidden rounded-2xl border border-border/40 bg-card/50 backdrop-blur-sm shadow-lg">
          {/* Elegant accent line */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

          <div className="p-8 sm:p-10">
            {/* Icon section - refined */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-primary/5 blur-xl" />
                <div className="relative w-14 h-14 rounded-full border border-border/50 bg-background/80 flex items-center justify-center shadow-sm">
                  {getIcon()}
                </div>
              </div>
            </div>

            {/* Text content */}
            <div className="text-center space-y-2 mb-6">
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                {title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
                {description}
              </p>
            </div>

            {/* Error code divider */}
            {code && (
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border/50 to-transparent" />
                <div className="px-2 py-0.5 rounded-full bg-secondary/30 border border-border/30">
                  <code className="text-[11px] font-mono text-muted-foreground/70">
                    {code}
                    {status ? ` ${status}` : ""}
                  </code>
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border/50 to-transparent" />
              </div>
            )}

            {/* Action button */}
            <Button
              onClick={handleRetry}
              disabled={isRetrying}
              variant="default"
              size="sm"
              className="w-full h-10 gap-2 font-medium shadow-sm hover:shadow transition-all duration-200"
            >
              {isRetrying ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Memproses...</span>
                </>
              ) : (
                <>
                  <IoRefreshOutline className="w-3.5 h-3.5" />
                  <span>Coba Lagi</span>
                </>
              )}
            </Button>

            {/* Subtle hint */}
            {onRetry && (
              <p className="text-center text-[11px] text-muted-foreground/50 mt-4">
                Butuh bantuan? Hubungi dukungan
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
