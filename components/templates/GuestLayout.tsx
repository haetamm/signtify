import { Toaster } from "react-hot-toast";
interface GuestLayoutProps {
  children: React.ReactNode;
  cardClassName?: string;
}

export default function GuestLayout({
  children,
  cardClassName,
}: GuestLayoutProps) {
  return (
    <>
      <div className="min-h-screen flex items-start md:items-center justify-center bg-background px-3 py-6 sm:p-6 dark">
        <div
          className={`flex w-full max-w-4xl rounded-3xl overflow-hidden md:shadow-2xl md:bg-secondary ${cardClassName ?? ""}`}
        >
          {children}
        </div>
      </div>
      <Toaster position="bottom-right" reverseOrder={false} />
    </>
  );
}
