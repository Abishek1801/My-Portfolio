"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark" || theme === undefined;

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border/60 bg-background/40 p-0 backdrop-blur-md [&_svg]:size-4 [&_svg]:shrink-0"
    >
      <Sun className="rotate-0 scale-100 text-amber-300 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute rotate-90 scale-0 text-sky-300 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}

