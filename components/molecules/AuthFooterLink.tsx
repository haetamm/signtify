import Link from "next/link";

interface AuthFooterLinkProps {
  label: string;
  linkText: string;
  href: string;
}

export default function AuthFooterLink({ label, linkText, href }: AuthFooterLinkProps) {
  return (
    <p className="text-center text-sm text-gray-400 mt-6">
      {label}{" "}
      <Link
        href={href}
        className="text-foreground text-xs font-semibold hover:text-primary transition"
      >
        {linkText}
      </Link>
    </p>
  );
}
