"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ProjectCardProps } from "@/components/project-card";
import { ProjectCarousel } from "@/components/project-carousel";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const revealEase = [0.16, 1, 0.3, 1] as const;

const revealUp = {
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

const projects: ProjectCardProps[] = [
  {
    title: "Tau-Bench Multi-Agent Tool-Use Agent",
    description:
      "Built a planner, executor, and validator multi-agent system for Tau-Bench, where an agent chats with a simulated customer and makes irreversible database changes under airline policy.",
    tags: ["Agentic AI"],
    stack: "Python / vLLM / Qwen3 / SLURM / Intel Gaudi",
    impact:
      "Raised pass^1 from 28% to 36% and pass^3 from 14% to 26% over the same Qwen3-Coder-30B tool-calling baseline, with a deterministic validator that blocks hallucinated IDs at zero extra LLM calls.",
  },
  {
    title: "Chest X-ray Foundation Models",
    description:
      "ASU research pretraining and benchmarking medical imaging foundation models: Ark+ (Swin-B, teacher-student distillation) on 112K ChestX-ray14 images and Foundation X+ for pneumothorax.",
    tags: ["Computer Vision"],
    stack: "PyTorch / Swin / ViT / DINO + UperNet / SLURM / A100 + Intel Gaudi",
    impact:
      "Beat published MedMNIST v2 baselines on VesselMNIST3D (0.937 vs 0.907 AUC) and NoduleMNIST3D (0.872 vs 0.828), and reached 87.6 Dice on CANDID-PTX with a single multi-task model.",
  },
  {
    title: "NavigateASU",
    description:
      "Designed an AI academic advisor for ASU students, especially FSGs, to support academic decision-making and connect them with mentors and alumni in their field.",
    tags: ["Full-Stack"],
    stack: "RAG / AI / LLMs",
    impact:
      "Turned a campus-focused idea into a live, accessible project with both source code and deployed demo.",
    github: "https://github.com/hackathon-asu/FG-Hackathon.git",
    demo: "https://navigateasu.vercel.app/",
  },
  {
    title: "AutoResearch Multi-Agent System",
    description:
      "Built a multi-agent research pipeline that turns a plain-English question into a structured Markdown report through planning, retrieval, summarization, critique, and final synthesis.",
    tags: ["Agentic AI"],
    stack: "Python / OpenAI API / Multi-Agent Orchestration / JSON Pipelines / Wikipedia API",
    impact:
      "Designed a clean, inspectable workflow with structured agent handoffs, reproducible traces, and a critic loop for stronger coverage and more reliable outputs.",
    github: "https://github.com/Abishek1801/AutoResearch-Multi-Agent-System-",
    demo: "https://autoresearcher-mas.vercel.app/",
  },
  {
    title: "Supermarket Navigator",
    description:
      "Designed a navigation-focused project to help users move through supermarket spaces more efficiently with a smoother, more guided shopping experience.",
    tags: ["Full-Stack"],
    stack: "Navigation Systems / Full-Stack Development / User Experience Design",
    impact:
      "Built the project around practical usability and real-world movement challenges, with the project link to be added soon.",
    github: "https://github.com/Abishek1801/supermarket-navigator.git",
  },
];

const experience = [
  {
    time: "2026.06 -> 2026.08",
    role: "AI Engineering Intern / Selfmadee.ai",
    points: [
      "Audited all 43 AI features across 9 product modules of a multi-tenant SaaS platform and recommended keeping 32, merging 4, deprecating 3, and removing 4.",
      "Proposed a 3-phase switch from GPT to AWS Bedrock Llama models, projected to cut monthly AI cost 64% ($329 to $119 at 1,000 chats a day).",
      "Shipped an Instagram and Facebook analytics dashboard to production (React, TypeScript, Supabase, Meta Graph API) and a scheduled posting engine on pg_cron and Deno edge functions.",
      "Found a data-isolation flaw that could expose one customer's records to another, wrote the fix plan, and built features with Claude Code backed by a knowledge graph of the 200+ function codebase.",
    ],
  },
  {
    time: "2025.08 -> 2027.05",
    role: "M.S. Computer Science / Arizona State University",
    points: [
      "GPA 3.72/4.0. Coursework in Foundation Models & Medical Imaging, Agentic AI, and Statistical ML.",
      "Training medical imaging models on ASU's Sol cluster (A100 GPUs and Intel Gaudi accelerators).",
    ],
  },
  {
    time: "2025.02 -> 2025.05",
    role: "Python Developer Intern / Jireh Software Solutions",
    points: [
      "Built an employee activity analyzer solo in ~6 weeks that read ~320 screenshots a day across 8 employees and sorted time into 9 activity types (EasyOCR + GPT-4 API).",
      "Cut my manager's daily review time from ~1.5 hours to ~10 minutes; the tool fed his reports to the CTO and stayed in daily use after handoff.",
      "Compared open-source chat LLMs for a client's art e-commerce marketplace and deployed Qwen2.5-7B with vLLM.",
    ],
  },
  {
    time: "graduated 2025.06",
    role: "Bachelor's in Computer Science / Dayananda Sagar University",
    points: ["Bangalore, India."],
  },
  {
    time: "2025.08 -> present",
    role: "AI Society Member / Tempe",
    points: [
      "Staying active in practical AI discussions, events, and modern agentic-system thinking.",
    ],
  },
];

const notes = [
  {
    label: "ark-plus.log",
    title: "Chest X-ray Foundation Models",
    body: "Pretrained Ark+ on 112K ChestX-ray14 images and replicated 3 CycliST experiments on Intel Gaudi2, showing joint per-site training beats isolated specialists by +4.5 AUC, and traced a 7 to 8 point gap to a likely learning-rate scheduler bug.",
  },
  {
    label: "medmnist.md",
    title: "Beating MedMNIST v2 Baselines",
    body: "Reproduced MedMNIST v2 with 2D/3D ResNet-50 over 5 runs per dataset: matched OrganMNIST3D (0.993 AUC) and beat the published baselines on NoduleMNIST3D (0.872 vs 0.828) and VesselMNIST3D (0.937 vs 0.907).",
  },
  {
    label: "tau-bench-failures.md",
    title: "Why Tool-Use Agents Fail",
    body: "Benchmarked Act, ReAct, and function-calling agents across Qwen3 4B to 32B and built an error taxonomy from 150+ failures (hallucinated IDs, scope drift, policy violations, wrong tool for an order's state) that shaped my multi-agent design.",
  },
];

const skills = [
  {
    name: "languages",
    value: "Python, C++, Java, JavaScript, TypeScript, SQL",
  },
  {
    name: "ml_vision",
    value: "PyTorch, TensorFlow, Vision Transformers (ViT, Swin), CNNs, Model Training & Evaluation",
  },
  {
    name: "genai_agents",
    value: "Agentic AI, Multi-Agent Systems, LLM APIs (OpenAI, Claude, Gemini), RAG, Embeddings, pgvector, LangChain, vLLM, Hugging Face, Prompt Engineering",
  },
  {
    name: "backend_web",
    value: "FastAPI, Django, Node.js, React, REST APIs, Supabase (Postgres, Edge Functions, Row-Level Security), Streamlit, JWT Auth",
  },
  {
    name: "data_infra",
    value: "PostgreSQL, MongoDB, pandas, Docker, AWS Bedrock, Linux, Git, pg_cron, SLURM (A100 and Intel Gaudi clusters)",
  },
];

const RESUME_URL = "/Abishek-Nagaram-AI-ML-Engineer.pdf";

function TerminalSection({
  id,
  prompt,
  title,
  children,
}: {
  id: string;
  prompt: string;
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
              <span className="text-foreground/70">~/{id}</span>
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

export default function Home() {
  const [contactStatus, setContactStatus] = useState<{
    state: "idle" | "sending" | "success" | "error";
    message: string;
  }>({
    state: "idle",
    message: "",
  });

  const handleContactSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const context = String(formData.get("context") ?? "").trim();

    try {
      setContactStatus({
        state: "sending",
        message: "Transmitting message...",
      });

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message: context,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      form.reset();
      setContactStatus({
        state: "success",
        message: "Transmission complete. Your message has been sent directly.",
      });
    } catch {
      setContactStatus({
        state: "error",
        message:
          "Transmission failed. Please try again in a moment or contact me directly.",
      });
    }
  };

  return (
    <div className="relative pb-12">
      <section className="px-4 pb-8 pt-28 sm:px-6 lg:px-8 lg:pt-32">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={revealUp}
            className="terminal-shell hero-shell overflow-hidden"
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
                <span className="text-foreground/70">~/boot</span>
              </div>
            </div>

            <div className="terminal-body grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
              <div className="space-y-6">
                <motion.p variants={revealUp} custom={0.04} className="terminal-command">
                  <span className="text-primary">abi@portfolio</span>
                  <span className="text-foreground/50">:~$</span> ./launch_profile.sh
                </motion.p>

                <motion.div variants={revealUp} custom={0.1} className="space-y-4">
                  <p className="font-hacker text-sm uppercase tracking-[0.4em] text-primary/70">
                    System Online
                  </p>
                  <h1 className="font-hacker text-5xl font-bold uppercase leading-[0.92] tracking-[-0.04em] text-primary sm:text-7xl lg:text-[6.5rem]">
                    Hey, I&apos;m
                    <br />
                    Abishek
                  </h1>
                  <p className="max-w-2xl text-sm leading-8 text-foreground/72 sm:text-base">
                    AI engineer and M.S. Computer Science student at Arizona State
                    University (GPA 3.72) who builds production AI features,
                    multi-agent systems, and trains computer vision models on A100
                    and Intel Gaudi clusters. Most recently I shipped LLM and full
                    stack features at Selfmadee.ai and beat published MedMNIST v2
                    baselines in my ASU research.
                  </p>
                  <a
                    href={RESUME_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="terminal-card-button w-fit"
                  >
                    <FileDown className="h-3.5 w-3.5" />
                    Download AI/ML Resume
                  </a>
                </motion.div>

                <motion.div
                  variants={revealUp}
                  custom={0.16}
                  className="grid gap-4 sm:grid-cols-3"
                >
                  <div className="terminal-stat">
                    <p>status</p>
                    <strong>available</strong>
                  </div>
                  <div className="terminal-stat">
                    <p>graduating</p>
                    <strong>may 2027</strong>
                  </div>
                  <div className="terminal-stat">
                    <p>location</p>
                    <strong>tempe, az</strong>
                  </div>
                </motion.div>
              </div>

              <motion.div
                variants={revealUp}
                custom={0.2}
                className="terminal-ascii-panel"
              >
                <div className="terminal-ascii-header">
                  <span>identity.map</span>
                  <span>secure-session</span>
                </div>
                <div className="terminal-identity-scene">
                  <div className="terminal-figure" aria-hidden>
                    <div className="terminal-figure-head" />
                    <div className="terminal-figure-body" />
                    <div className="terminal-figure-arm terminal-figure-arm-left" />
                    <div className="terminal-figure-arm terminal-figure-arm-right" />
                    <div className="terminal-figure-laptop">
                      <div className="terminal-figure-screen">
                        <div className="terminal-code-line terminal-code-line-1" />
                        <div className="terminal-code-line terminal-code-line-2" />
                        <div className="terminal-code-line terminal-code-line-3" />
                        <div className="terminal-code-line terminal-code-line-4" />
                      </div>
                      <div className="terminal-figure-base" />
                    </div>
                  </div>
                  <div className="terminal-identity-meta">
                    <p>
                      <span className="text-primary">user</span>: abi
                    </p>
                    <p>
                      <span className="text-primary">role</span>: ai_engineer
                    </p>
                    <p>
                      <span className="text-primary">focus</span>: agents / vision / full_stack
                    </p>
                    <p>
                      <span className="text-primary">status</span>: actively_coding
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <TerminalSection
        id="projects"
        prompt="ls ./projects --highlight"
        title="[ PROJECT INDEX ]"
      >
        <p className="mt-3 max-w-2xl text-sm leading-7 text-foreground/68">
          Selected builds across agents, medical imaging, and full-stack products.
        </p>
        <ProjectCarousel projects={projects} />
      </TerminalSection>

      <TerminalSection
        id="experience"
        prompt="cat ./experience.log"
        title="[ EXECUTION HISTORY ]"
      >
        <div className="mt-6 space-y-4">
          {experience.map((item, index) => (
            <motion.div
              key={item.role}
              variants={revealUp}
              custom={0.05 * index}
              className="terminal-log-row"
            >
              <p className="terminal-log-time">{item.time}</p>
              <h3 className="terminal-log-role">{item.role}</h3>
              <ul className="terminal-log-body space-y-1.5">
                {item.points.map((point) => (
                  <li key={point}>
                    <span className="text-primary/60">&gt; </span>
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </TerminalSection>

      <TerminalSection
        id="skills"
        prompt="printenv CORE_SKILLS"
        title="[ STACK VARIABLES ]"
      >
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              variants={revealUp}
              custom={0.05 * index}
              className="terminal-env-card"
            >
              <p className="terminal-env-key">{skill.name}=</p>
              <p className="terminal-env-value">{skill.value}</p>
            </motion.div>
          ))}
        </div>
      </TerminalSection>

      <TerminalSection
        id="research"
        prompt="tail -n 3 ./notes/*.md"
        title="[ RECENT NOTES ]"
      >
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {notes.map((note, index) => (
            <motion.article
              key={note.label}
              variants={revealUp}
              custom={0.05 * index}
              className="terminal-note-card"
            >
              <p className="terminal-note-label">{note.label}</p>
              <h3 className="terminal-note-title">{note.title}</h3>
              <p className="terminal-note-body">{note.body}</p>
            </motion.article>
          ))}
        </div>
      </TerminalSection>

      <TerminalSection
        id="contact"
        prompt="send_message --secure"
        title="[ OPEN CHANNEL ]"
      >
        <div className="mt-6 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="space-y-4">
            <p className="text-sm leading-7 text-foreground/68">
              If you&apos;re building in AI, agentic systems, computer vision,
              or full-stack products, send a message and let&apos;s talk.
            </p>
            <div className="terminal-contact-meta">
              <p>response_window=24_48_hours</p>
              <p>preferred_topics=agents,cv,llms,full_stack</p>
              <p>signal_quality=high</p>
              <p>
                email=
                <a
                  href="mailto:anagaram@asu.edu"
                  className="text-primary/70 hover:text-primary transition-colors"
                >
                  anagaram@asu.edu
                </a>
              </p>
              <p>
                linkedin=
                <a
                  href="https://www.linkedin.com/in/abishek-prakash-nagaram"
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary/70 hover:text-primary transition-colors"
                >
                  abishek-prakash-nagaram
                </a>
              </p>
              <p>
                resume=
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary/70 hover:text-primary transition-colors"
                >
                  ai_ml_engineer.pdf
                </a>
              </p>
            </div>
          </div>

          <motion.form
            onSubmit={handleContactSubmit}
            variants={revealUp}
            custom={0.08}
            className="terminal-form grid gap-4 sm:grid-cols-2"
          >
            <div className="space-y-2">
              <label htmlFor="name" className="terminal-label">
                name
              </label>
              <Input
                id="name"
                name="name"
                placeholder="ada_lovelace"
                autoComplete="name"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="terminal-label">
                email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@company.com"
                autoComplete="email"
                required
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <label htmlFor="context" className="terminal-label">
                message
              </label>
              <Textarea
                id="context"
                name="context"
                placeholder="describe your build, system, or research problem..."
                required
              />
            </div>
            <div className="sm:col-span-2 flex justify-end">
              <div className="flex max-w-md flex-col items-end gap-2">
                <Button
                  type="submit"
                  size="md"
                  className="terminal-submit"
                  disabled={contactStatus.state === "sending"}
                >
                  {contactStatus.state === "sending"
                    ? "Transmitting..."
                    : "Execute Transmission"}
                </Button>
                {contactStatus.message ? (
                  <p
                    className={`text-right text-xs leading-5 ${
                      contactStatus.state === "error"
                        ? "text-red-400"
                        : "text-foreground/62"
                    }`}
                  >
                    {contactStatus.message}
                  </p>
                ) : null}
              </div>
            </div>
          </motion.form>
        </div>
      </TerminalSection>
    </div>
  );
}
