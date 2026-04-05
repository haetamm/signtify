interface AuthHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export default function AuthHeading({ children, className }: AuthHeadingProps) {
  return (
    <h1 className={`text-2xl font-extrabold text-foreground mb-6 ${className ?? ""}`}>
      {children}
    </h1>
  );
}
