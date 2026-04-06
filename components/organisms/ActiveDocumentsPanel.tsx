import ActiveDocumentItem from "@/components/molecules/ActiveDocumentItem";
import SectionCard from "@/components/molecules/SectionCard";
import { FiTrendingUp } from "react-icons/fi";

interface ActiveDoc {
  id: string | number;
  title: string;
  fileName: string;
  fileSize: number;
  folderName?: string | null;
  status: string;
  isOverdue: boolean;
  signedContributors: number;
  totalContributors: number;
  pendingContributors: number;
  deadline: string;
  updatedAt: string;
}

export default function ActiveDocumentsPanel({ docs }: { docs: ActiveDoc[] }) {
  return (
    <SectionCard
      icon={<FiTrendingUp />}
      iconBg="bg-blue-50"
      iconColor="text-blue-500"
      title="Dokumen Aktif Saya"
      countLabel={`${docs.length} aktif`}
      countColor="bg-blue-50 text-blue-600"
      headerGradient="from-blue-50 to-white"
      isEmpty={docs.length === 0}
      emptyMessage="Tidak ada dokumen aktif"
      contentClassName="lg:overflow-y-auto lg:max-h-96"
    >
      {docs.map((doc) => (
        <ActiveDocumentItem key={doc.id} doc={doc} />
      ))}
    </SectionCard>
  );
}
