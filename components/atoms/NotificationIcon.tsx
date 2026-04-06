import {
  IoCheckmarkDoneCircle,
  IoCloseCircle,
  IoDocumentText,
  IoTime,
} from "react-icons/io5";

interface NotificationIconProps {
  title: string;
}

export default function NotificationIcon({ title }: NotificationIconProps) {
  const t = title.toLowerCase();

  const getIconColor = (baseColor: string) => {
    return `text-${baseColor}-500`;
  };

  switch (true) {
    case t.includes("permintaan"):
      return <IoDocumentText className={`w-6 h-6 ${getIconColor("blue")}`} />;
    case t.includes("ditandatangani"):
      return (
        <IoCheckmarkDoneCircle
          className={`w-6 h-6 ${getIconColor("emerald")}`}
        />
      );
    case t.includes("ditolak"):
      return <IoCloseCircle className={`w-6 h-6 ${getIconColor("red")}`} />;
    case t.includes("pengingat"):
      return <IoTime className={`w-6 h-6 ${getIconColor("amber")}`} />;
    default:
      return <IoDocumentText className={`w-6 h-6 ${getIconColor("gray")}`} />;
  }
}
