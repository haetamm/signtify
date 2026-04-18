type Props = {
  message?: string | null;
};

export default function ErrorAllert({ message }: Props) {
  return (
    <p className="mt-3 text-[13px] font-bold text-destructive text-center px-3 rounded-lg bg-error">
      {message}
    </p>
  );
}
