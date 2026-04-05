interface GuestLayoutProps {
  children: React.ReactNode;
  /** Extra classes applied to the inner card (e.g. min-height overrides) */
  cardClassName?: string;
}

export default function GuestLayout({
  children,
  cardClassName,
}: GuestLayoutProps) {
  return (
    <div className="min-h-screen flex items-start md:items-center justify-center bg-background px-3 py-6 sm:p-6">
      <div
        className={`flex w-full max-w-4xl rounded-3xl overflow-hidden md:shadow-2xl md:bg-secondary ${cardClassName ?? ""}`}
      >
        {children}
      </div>
    </div>
  );
}
