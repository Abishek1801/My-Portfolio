"use client";

import { motion, useAnimationControls } from "framer-motion";
import { Github, Linkedin } from "lucide-react";
import { useEffect, useState } from "react";
import { useIntro } from "@/contexts/intro-context";
import { ThemeToggle } from "@/components/theme-toggle";

const NAV_LINKS = [
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#research", label: "Research" },
  { href: "#contact", label: "Contact" },
] as const;

const NAME_SLIDE_DURATION = 0.65;
const REST_FLOAT_DURATION = 0.5;
const REST_FLOAT_DELAY = 0.1;

export function Header() {
  const { introClosed } = useIntro();
  const [phase, setPhase] = useState<"wait" | "name-slide" | "rest-visible">(
    "wait"
  );
  const nameControls = useAnimationControls();

  useEffect(() => {
    if (!introClosed) return;
    setPhase("name-slide");
  }, [introClosed]);

  useEffect(() => {
    if (phase !== "name-slide") return;
    nameControls
      .start({
        x: 0,
        transition: {
          duration: NAME_SLIDE_DURATION,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      })
      .then(() => setPhase("rest-visible"));
  }, [phase, nameControls]);

  return (
    <header className="fixed left-0 right-0 top-0 z-40 bg-transparent">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Left: logo + name block */}
        <div className="flex min-h-[2.5rem] items-center gap-3">
          {/* Stylized blue logo — hidden until name has landed */}
          <motion.div
            className="hover-text-lift h-9 w-9 shrink-0 rounded-xl bg-gradient-to-br from-blue-500 via-sky-500 to-blue-600 shadow-lg shadow-blue-500/20"
            initial={{ opacity: 0, y: 12 }}
            animate={
              phase === "rest-visible"
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 12 }
            }
            transition={{
              duration: REST_FLOAT_DURATION,
              delay: REST_FLOAT_DELAY,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          />
          {/* Name text — only visible element initially; slides in from left */}
          <motion.div
            className="flex flex-col"
            initial={{ x: -200 }}
            animate={nameControls}
          >
            <span className="hover-text-lift cursor-default text-base font-semibold tracking-tight text-slate-100 sm:text-lg">
              Abishek · ML & Agentic AI Developer
            </span>
            <span className="hover-text-lift cursor-default text-xs text-slate-400">
              ASU MSCS
            </span>
          </motion.div>
        </div>

        {/* Center: nav links — hidden until name has landed */}
        <nav className="hidden items-center gap-6 sm:flex" aria-label="Main">
          {NAV_LINKS.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              className="hover-text-lift text-xs font-medium text-slate-400 transition-colors hover:text-slate-100"
              initial={{ opacity: 0, y: 12 }}
              animate={
                phase === "rest-visible"
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 12 }
              }
              transition={{
                duration: REST_FLOAT_DURATION,
                delay: REST_FLOAT_DELAY,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {link.label}
            </motion.a>
          ))}
        </nav>

        {/* Right: icons + theme toggle — hidden until name has landed */}
        <div className="flex items-center gap-2">
          <motion.a
            href="https://github.com/Abishek1801"
            target="_blank"
            rel="noreferrer"
            className="hover-text-lift hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-700/60 text-slate-400 transition-colors hover:text-slate-100 sm:flex"
            aria-label="GitHub"
            initial={{ opacity: 0, y: 12 }}
            animate={
              phase === "rest-visible"
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 12 }
            }
            transition={{
              duration: REST_FLOAT_DURATION,
              delay: REST_FLOAT_DELAY,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <span className="flex h-full w-full items-center justify-center [&>svg]:block [&>svg]:size-4 [&>svg]:shrink-0">
              <Github aria-hidden />
            </span>
          </motion.a>
          <motion.a
            href="https://linkedin.com/in/abishek-prakash-nagaram"
            target="_blank"
            rel="noreferrer"
            className="hover-text-lift hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-700/60 text-slate-400 transition-colors hover:text-slate-100 sm:flex"
            aria-label="LinkedIn"
            initial={{ opacity: 0, y: 12 }}
            animate={
              phase === "rest-visible"
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 12 }
            }
            transition={{
              duration: REST_FLOAT_DURATION,
              delay: REST_FLOAT_DELAY,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <span className="flex h-full w-full items-center justify-center [&>svg]:block [&>svg]:size-4 [&>svg]:shrink-0">
              <Linkedin aria-hidden />
            </span>
          </motion.a>
          <motion.div
            className="hover-text-lift flex h-9 w-9 shrink-0 items-center justify-center"
            initial={{ opacity: 0, y: 12 }}
            animate={
              phase === "rest-visible"
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 12 }
            }
            transition={{
              duration: REST_FLOAT_DURATION,
              delay: REST_FLOAT_DELAY,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <ThemeToggle />
          </motion.div>
        </div>
      </div>
    </header>
  );
}
