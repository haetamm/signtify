"use client";

import { navItems } from "@/lib/utils/link";
import NavButton from "../atoms/NavButton";

export function Navbar() {
  return (
    <>
      <div className="flex items-end gap-1 md:gap-3">
        {navItems.left.map((item) => (
          <NavButton key={item.label} {...item} />
        ))}
      </div>
      <div className="flex items-end gap-1 md:gap-2">
        {navItems.right.map((item) => (
          <NavButton key={item.label} {...item} />
        ))}
      </div>
    </>
  );
}
