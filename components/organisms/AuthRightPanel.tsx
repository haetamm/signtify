import Logo from "@/components/atoms/Logo";
import AuthHeading from "../atoms/AuthHeading";

interface AuthRightPanelProps {
  heading: string;
  headingClassName?: string;
  children: React.ReactNode;
  /** Wraps children in a vertically centered flex container (useful for shorter forms) */
  centeredContent?: boolean;
}

export default function AuthRightPanel({
  heading,
  headingClassName,
  children,
  centeredContent = false,
}: AuthRightPanelProps) {
  return (
    <div className="flex-1 flex flex-col justify-start px-2 md:px-10 py-10">
      <Logo />
      <AuthHeading className={`mt-6 ${headingClassName ?? ""}`}>
        {heading}
      </AuthHeading>
      {centeredContent ? (
        <div className="flex-1 flex flex-col justify-center">{children}</div>
      ) : (
        children
      )}
    </div>
  );
}
