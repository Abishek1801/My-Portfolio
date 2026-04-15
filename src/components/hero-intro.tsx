"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Bot } from "lucide-react";

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
  const [phase, setPhase] = useState<"doors" | "ask" | "granted" | "exiting">(
    "doors"
  );
  const [answer, setAnswer] = useState("");

  const handleDoorsComplete = () => {
    setPhase("ask");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPhase("granted");
    setTimeout(() => {
      setPhase("exiting");
      setTimeout(onDone, 500);
    }, 2200);
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
          {/* Door panels — open first, then question appears */}
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

          {/* Robot + question (after doors open) and Access Granted */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
            <AnimatePresence mode="wait">
              {phase === "ask" && (
                <motion.div
                  key="ask"
                  className="flex w-full max-w-md flex-col items-center text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.div
                    className="mb-8"
                    animate={{
                      y: [0, -6, 0],
                      rotate: [0, 1, -1, 0],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Bot
                      className="h-24 w-24 text-slate-400"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                  </motion.div>

                  <motion.p
                    className="mb-6 font-mono text-lg tracking-wide text-slate-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    Who are you?
                  </motion.p>

                  <form onSubmit={handleSubmit} className="w-full">
                    <input
                      type="text"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      placeholder="Type anything..."
                      className="w-full rounded-lg border border-slate-600 bg-slate-900/80 px-4 py-3 font-mono text-sm text-slate-200 placeholder:text-slate-500 focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                      autoFocus
                      autoComplete="off"
                    />
                    <motion.button
                      type="submit"
                      className="mt-4 w-full rounded-lg bg-slate-700/60 py-3 font-mono text-sm font-medium text-slate-200 transition-colors hover:bg-slate-600/60"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Submit
                    </motion.button>
                  </form>
                </motion.div>
              )}

              {phase === "granted" && (
                <motion.div
                  key="granted"
                  className="flex flex-col items-center justify-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: {
                      type: "spring",
                      damping: 18,
                      stiffness: 120,
                    },
                  }}
                >
                  <motion.p
                    className="font-hacker text-4xl font-bold tracking-[0.35em] text-green-400 sm:text-5xl md:text-7xl"
                    style={{
                      textShadow:
                        "0 0 20px rgba(74, 222, 128, 0.6), 0 0 40px rgba(74, 222, 128, 0.3)",
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    ACCESS GRANTED
                  </motion.p>
                  <motion.div
                    className="mt-4 h-1 w-32 rounded-full bg-green-400/60"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    style={{ transformOrigin: "center" }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
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
