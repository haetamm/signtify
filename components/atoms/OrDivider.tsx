interface OrDividerProps {
  title: string;
}

export default function OrDivider({ title }: OrDividerProps) {
  return (
    <div className="flex items-center gap-3 my-5">
      <div className="flex-1 h-px bg-gray-200" />
      <span className="text-xs text-gray-400">{title}</span>
      <div className="flex-1 h-px bg-gray-200" />
    </div>
  );
}
