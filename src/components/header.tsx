"use client";

import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";

const NAV_LINKS = [
  { href: "#projects", label: "projects" },
  { href: "#experience", label: "experience" },
  { href: "#skills", label: "skills" },
  { href: "#research", label: "notes" },
  { href: "#contact", label: "contact" },
] as const;

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 terminal-header">
        <div className="flex min-w-0 items-center gap-3">
          <div className="terminal-led" />
          <div className="min-w-0">
            <p className="font-hacker text-sm uppercase tracking-[0.18em] text-primary sm:text-base">
              ABISHEK PORTFOLIO
            </p>
            <p className="truncate text-[10px] uppercase tracking-[0.18em] text-foreground/50 sm:text-[11px]">
              EXPERTISE IN AI AND ML
            </p>
          </div>
        </div>

        <nav className="hidden items-center gap-4 lg:flex" aria-label="Main">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-hacker text-xs uppercase tracking-[0.22em] text-foreground/55 transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/Abishek1801"
            target="_blank"
            rel="noreferrer"
            className="terminal-icon-button"
            aria-label="GitHub"
          >
            <Github aria-hidden className="h-4 w-4" />
          </a>
          <a
            href="https://linkedin.com/in/abishek-prakash-nagaram"
            target="_blank"
            rel="noreferrer"
            className="terminal-icon-button"
            aria-label="LinkedIn"
          >
            <Linkedin aria-hidden className="h-4 w-4" />
          </a>
        </div>
      </div>
    </motion.header>
  );
}
