import SectionCard from "@/components/molecules/SectionCard";
import UrgentDocumentItem from "@/components/molecules/UrgentDocumentItem";
import { FiAlertCircle } from "react-icons/fi";

interface UrgentDoc {
  id: string | number;
  title: string;
  fileName: string;
  ownerName: string;
  deadline: string;
  isOverdue: boolean;
  pendingContributors: number | null;
  urgentType: string;
}

export default function UrgentDocumentsPanel({ docs }: { docs: UrgentDoc[] }) {
  return (
    <SectionCard
      icon={<FiAlertCircle />}
      iconBg="bg-red-50"
      iconColor="text-red-500"
      title="Perlu Perhatian Segera"
      countLabel={`${docs.length} dokumen`}
      countColor="bg-red-50 text-red-600"
      headerGradient="from-red-50 to-white"
      isEmpty={docs.length === 0}
      emptyMessage="Tidak ada dokumen urgent"
      contentClassName="lg:overflow-y-auto lg:max-h-90"
    >
      {docs.map((doc) => (
        <UrgentDocumentItem key={doc.id} doc={doc} />
      ))}
    </SectionCard>
  );
}
