"use client";

import NavButton from "../atoms/NavButton";
import { navItems } from "./NavbarFallback";

export function NavbarClient() {
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
