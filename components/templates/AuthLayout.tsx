import Navbar from "../organisms/Navbar";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background p-2 md:p-3">
      <div className="w-full h-full min-h-[calc(100vh-16px)] md:min-h-[calc(100vh-24px)] rounded-[20px] md:rounded-[28px] border-[6px] md:border-[8px] border-primary overflow-hidden bg-background">
        <Navbar />
        <div className="bg-primary">
          <div className="p-4 md:p-6 bg-background text-foreground rounded-t-lg">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
