"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const doorTransition = {
  duration: 1.5,
  ease: [0.16, 1, 0.3, 1] as const,
};

export function HeroIntro({
  open,
  onDone,
}: {
  open: boolean;
  onDone: () => void;
}) {
  const [phase, setPhase] = useState<"doors" | "exiting">("doors");

  const handleDoorsComplete = () => {
    setTimeout(() => {
      setPhase("exiting");
      setTimeout(onDone, 500);
    }, 250);
  };

  return (
    <AnimatePresence mode="wait">
      {open ? (
        <motion.div
          key="intro"
          className="fixed inset-0 z-50 bg-[#0a0a0a]"
          initial={{ opacity: 1 }}
          animate={{
            opacity: phase === "exiting" ? 0 : 1,
            transition: { duration: 0.5 },
          }}
          exit={{ opacity: 0, transition: { duration: 0.35 } }}
        >
          {/* Door panels open, then the intro fades away */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            initial="closed"
            animate="open"
            variants={{
              closed: {},
              open: {
                transition: {
                  delay: 0.2,
                  staggerChildren: 0,
                  when: "afterChildren",
                },
              },
            }}
            onAnimationComplete={() => {
              if (phase === "doors") handleDoorsComplete();
            }}
          >
            <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-slate-200/20 to-transparent" />

            <motion.div
              className="absolute inset-y-0 left-0 w-1/2 bg-[#0a0a0a]"
              variants={{
                closed: { x: 0 },
                open: { x: "-100%", transition: doorTransition },
              }}
              style={{
                background:
                  "linear-gradient(90deg, rgba(10,10,10,1) 0%, rgba(17,24,39,0.9) 50%, rgba(10,10,10,1) 100%)",
                boxShadow:
                  "inset -1px 0 0 rgba(148,163,184,0.18), inset 0 0 0 1px rgba(51,65,85,0.35)",
              }}
            >
              <DoorDetails side="left" />
            </motion.div>

            <motion.div
              className="absolute inset-y-0 right-0 w-1/2 bg-[#0a0a0a]"
              variants={{
                closed: { x: 0 },
                open: { x: "100%", transition: doorTransition },
              }}
              style={{
                background:
                  "linear-gradient(270deg, rgba(10,10,10,1) 0%, rgba(17,24,39,0.9) 50%, rgba(10,10,10,1) 100%)",
                boxShadow:
                  "inset 1px 0 0 rgba(148,163,184,0.18), inset 0 0 0 1px rgba(51,65,85,0.35)",
              }}
            >
              <DoorDetails side="right" />
            </motion.div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function DoorDetails({ side }: { side: "left" | "right" }) {
  return (
    <div className="absolute inset-0">
      <div
        className="absolute top-10 h-24 w-[68%] rounded-2xl border border-slate-700/30 bg-slate-950/20"
        style={{
          left: side === "left" ? "14%" : undefined,
          right: side === "right" ? "14%" : undefined,
        }}
      />
      <div
        className="absolute bottom-24 h-36 w-[78%] rounded-2xl border border-slate-700/25 bg-slate-950/10"
        style={{
          left: side === "left" ? "10%" : undefined,
          right: side === "right" ? "10%" : undefined,
        }}
      />
      <div
        className="absolute top-1/2 h-2 w-[46%] -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-slate-200/25 to-transparent"
        style={{
          left: side === "left" ? "18%" : undefined,
          right: side === "right" ? "18%" : undefined,
        }}
      />
    </div>
  );
}
