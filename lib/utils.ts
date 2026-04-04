import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const urlPage = {
  LOGIN: "/",
  DASHBOARD: "/dashboard",
  DOCUMENT: "/document",
  SETTING: "/setting",
  NOTIFICATION: "/notification",
  FORGOT_PASSWORD: "/forgot-password",
};

export const isActivePath = (pathname: string, href: string) =>
  pathname.startsWith(href);
