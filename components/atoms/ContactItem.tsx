import { IconType } from "react-icons";

interface ContactItemProps {
  icon: IconType;
  text: string;
  isMultiline?: boolean;
}

const ContactItem: React.FC<ContactItemProps> = ({
  icon: Icon,
  text,
  isMultiline = false,
}) => (
  <div className="flex gap-2.5 text-xs">
    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
      <Icon className="w-3.5 h-3.5" />
    </div>
    {isMultiline ? (
      <span className="line-clamp-2 leading-relaxed">{text}</span>
    ) : (
      <span className="truncate">{text}</span>
    )}
  </div>
);

export default ContactItem;
