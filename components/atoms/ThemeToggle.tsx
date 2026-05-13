import { useTheme } from "@/lib/hooks/useTheme";
import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";

export default function ThemeToggle() {
  const { toggleTheme, isDark } = useTheme();
  return (
    <Button
      onClick={toggleTheme}
      variant="ghost"
      className="p-2 rounded-lg hover:bg-accent cursor-pointer"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </Button>
  );
}
