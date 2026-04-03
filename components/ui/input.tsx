import * as React from "react";

import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  variant?: "default" | "error";
}

function Input({ className, type, variant = "default", ...props }: InputProps) {
  const variants = {
    default:
      "w-full rounded-full px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-yellow-100 transition",
    error:
      "w-full rounded-full px-5 py-3 text-sm outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition",
  };

  return (
    <input
      type={type}
      data-slot="input"
      className={cn(variants[variant], className)}
      {...props}
    />
  );
}

export { Input };
