import { Button } from "@/components/ui/button";

interface QuickActionCardProps {
  needMySignature: number;
}

export default function QuickActionCard({ needMySignature }: QuickActionCardProps) {
  return (
    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-5 text-white shadow-sm">
      <h3 className="font-semibold mb-2">Aksi Cepat</h3>
      <p className="text-sm opacity-90 mb-4">
        {needMySignature} dokumen perlu tanda tangan Anda
      </p>
      <Button
        variant="ghost"
        className="bg-white/20 hover:bg-white/30 text-white hover:text-white transition-colors rounded-lg px-4 py-2 text-sm font-medium backdrop-blur-sm h-auto"
      >
        Tandatangani Sekarang →
      </Button>
    </div>
  );
}
