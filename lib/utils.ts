import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const urlPage = {
  DASHBOARD: "/dashboard",
  DOCUMENT: "/document",
  SETTING: "/setting",
  NOTIFICATION: "/notification",
};

export const isActivePath = (pathname: string, href: string) =>
  pathname.startsWith(href);
