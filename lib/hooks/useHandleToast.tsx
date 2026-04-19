import { AxiosError } from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { FiAlertCircle, FiCheckCircle, FiX } from "react-icons/fi";
import { HiChevronRight } from "react-icons/hi";

interface ErrorResponse {
  status?: string;
  message?: string;
}

export const useHandleErrors = () => {
  const handleErrors = (error: unknown): void => {
    const axiosError = error as AxiosError<ErrorResponse>;

    const showErrorToast = (message: string) => {
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-[slide-down_0.3s]" : ""
          } max-w-md w-full bg-red-50 shadow-lg rounded-lg pointer-events-auto flex items-center border-l-4 border-red-500`}
          role="alert"
        >
          <div className="flex-shrink-0 p-3 pl-4 text-red-500">
            <FiAlertCircle className="w-5 h-5" />
          </div>
          <div className="flex-1 py-2 pr-3">
            <p className="text-sm font-medium text-red-800">Error</p>
            <p className="mt-1 text-sm text-red-700">{message}</p>
          </div>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="p-2 mr-2 text-red-500 rounded-md hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>
      ));
    };

    if (!axiosError?.response) {
      showErrorToast("Terjadi kesalahan jaringan. Silakan coba lagi nanti.");
      return;
    }

    const { status, data } = axiosError.response;
    const fallbackMessage = "Terjadi kesalahan. Silakan coba lagi.";

    switch (status) {
      case 401:
        showErrorToast(data.message || "Sesi berakhir, silakan login kembali.");
        break;
      case 403:
        showErrorToast(
          data.message || "Anda tidak memiliki izin untuk aksi ini.",
        );
        break;
      case 404:
        showErrorToast(data.message || "Data tidak ditemukan.");
        break;
      case 422:
        showErrorToast(data.message || "Data yang dikirim tidak valid.");
        break;
      default:
        if (status >= 500) {
          showErrorToast("Kesalahan server. Silakan coba lagi nanti.");
        } else {
          showErrorToast(data.message || fallbackMessage);
        }
        break;
    }
  };

  return { handleErrors };
};

export const showSuccessToast = (
  message: string,
  linkHref: string,
  linkLabel = "View",
) => {
  toast.custom(
    (t) => (
      <div
        className={`${
          t.visible
            ? "animate-in slide-in-from-right-2 fade-in duration-300"
            : "animate-out fade-out duration-200"
        } max-w-sm w-full bg-card border border-border rounded-xl shadow-lg pointer-events-auto relative overflow-hidden`}
        role="alert"
      >
        {/* Accent bar top */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-green-400" />

        <div className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-green-500/15 flex items-center justify-center">
                <FiCheckCircle className="w-4 h-4 text-green-600 dark:text-green-500" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">Success</p>
              <p className="text-sm text-muted-foreground mt-0.5 break-words">
                {message}
              </p>
              {linkHref && (
                <Link
                  onClick={() => toast.dismiss(t.id)}
                  href={linkHref}
                  className="inline-flex items-center gap-1 mt-2 text-xs font-medium text-green-600 dark:text-green-500 hover:text-green-700 transition-colors"
                >
                  {linkLabel}
                  <HiChevronRight className="w-3 h-3" />
                </Link>
              )}
            </div>

            <button
              onClick={() => toast.dismiss(t.id)}
              className="flex-shrink-0 -mt-1 -mr-1 p-1.5 text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent transition-colors"
            >
              <FiX className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    ),
    { duration: 10000 },
  );
};
