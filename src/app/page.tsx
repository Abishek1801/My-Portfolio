"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ProjectCard, ProjectTag } from "@/components/project-card";
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

type Project = {
  title: string;
  description: string;
  tags: ProjectTag[];
  stack: string;
  impact: string;
  github?: string;
  demo?: string;
};

const projects: Project[] = [
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
    demo: "#",
  },
];

const notes = [
  {
    label: "agent-logs.md",
    title: "Exploring the TAU Benchmark",
    body: "I researched the TAU Benchmark to better understand how modern agents are evaluated, and it pushed me to think more deeply about reliability, reasoning, and real-world performance.",
  },
  {
    label: "retrieval.txt",
    title: "Building Better Mobile Agents",
    body: "I worked on mobile agent benchmarks and built an improved agent, which strengthened my interest in making agents more capable, adaptive, and effective in dynamic environments.",
  },
  {
    label: "cluster-handbook.sh",
    title: "Researching World Models",
    body: "I am actively exploring world models and how they can help agents plan, predict, and interact more intelligently, a direction that excites me as a student researcher.",
  },
];

const skills = [
  {
    name: "languages",
    value: "Python, C/C++, Java, SQL, Bash, React.js",
  },
  {
    name: "ml_stack",
    value: "PyTorch, TensorFlow, Hugging Face Transformers, LLM Fine-tuning, RAG Pipelines, Agentic AI, Computer Vision",
  },
  {
    name: "systems",
    value: "Docker, Linux CLI, Git/GitHub, CUDA, Slurm, HPC Clusters, Vector Databases, API Integration",
  },
];

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
                    ML and agentic AI developer building search systems, NLP
                    pipelines, automation workflows, and research-grade training
                    setups. I like clean interfaces, observable systems, and code
                    that survives real-world constraints.
                  </p>
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
                    <p>mode</p>
                    <strong>building</strong>
                  </div>
                  <div className="terminal-stat">
                    <p>location</p>
                    <strong>asu / us</strong>
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
                      <span className="text-primary">role</span>: ml_agentic_ai_dev
                    </p>
                    <p>
                      <span className="text-primary">focus</span>: search / nlp / systems
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
          Selected builds across retrieval, modeling, and infrastructure.
        </p>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={revealUp}
              custom={0.06 * index}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </div>
      </TerminalSection>

      <TerminalSection
        id="experience"
        prompt="cat ./experience.log"
        title="[ EXECUTION HISTORY ]"
      >
        <div className="mt-6 space-y-4">
          {[
            {
              time: "2025.02 -> 2025.05",
              role: "Python Developer Intern / Jireh Software Solutions",
              body:
                "Built an AI-based work tracking summarizer using OCR and image similarity detection, with Django features and deployment automation.",
            },
            {
              time: "2025.08 -> present",
              role: "M.S. Computer Science / Arizona State University",
              body:
                "Working across machine learning, deep learning, algorithms, systems, and research workflows.",
            },
            {
              time: "2025.08 -> present",
              role: "AI Society Member / Tempe",
              body:
                "Staying active in practical AI discussions, events, and modern agentic-system thinking.",
            },
          ].map((item, index) => (
            <motion.div
              key={item.role}
              variants={revealUp}
              custom={0.05 * index}
              className="terminal-log-row"
            >
              <p className="terminal-log-time">{item.time}</p>
              <h3 className="terminal-log-role">{item.role}</h3>
              <p className="terminal-log-body">{item.body}</p>
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
              If you&apos;re building in ML, agentic systems, automation, or
              research-heavy product spaces, send a message and let&apos;s talk.
            </p>
            <div className="terminal-contact-meta">
              <p>response_window=24_48_hours</p>
              <p>preferred_topics=ml,nlp,systems,agents</p>
              <p>signal_quality=high</p>
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
