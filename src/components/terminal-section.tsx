"use client";

import { motion } from "framer-motion";

const revealEase = [0.16, 1, 0.3, 1] as const;

export const revealUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay,
      ease: revealEase,
    },
  }),
};

export function TerminalSection({
  id,
  prompt,
  title,
  path = id,
  children,
}: {
  id: string;
  prompt: string;
  path?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={revealUp}
          className="terminal-shell overflow-hidden"
        >
          <div className="terminal-topbar">
            <div className="terminal-lights">
              <span />
              <span />
              <span />
            </div>
            <div className="terminal-path">
              <span className="text-primary">abi@portfolio</span>
              <span className="text-foreground/50">:</span>
              <span className="text-foreground/70">~/{path}</span>
            </div>
          </div>
          <div className="terminal-body">
            <p className="terminal-command">
              <span className="text-primary">abi@portfolio</span>
              <span className="text-foreground/50">:~$</span> {prompt}
            </p>
            <div className="mt-4">
              <p className="terminal-section-label">{title}</p>
              {children}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
