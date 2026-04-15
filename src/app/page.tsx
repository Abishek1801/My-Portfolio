"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ProjectCard, ProjectTag } from "@/components/project-card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { HeroIntro } from "@/components/hero-intro";
import { useIntro } from "@/contexts/intro-context";

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const popIn = {
  hidden: { opacity: 0, scale: 0.9, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const sectionTitleClasses =
  "hover-text-lift text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground";

const sectionHeadingClasses =
  "hover-text-lift text-2xl font-semibold tracking-tight sm:text-3xl";

interface Project {
  title: string;
  description: string;
  tags: ProjectTag[];
  stack: string;
  impact: string;
  github?: string;
  demo?: string;
}

const projects: Project[] = [
  {
    title: "Elasticsearch + Flask Search Pipeline",
    description:
      "Full-text search pipeline with indexing, query tuning, and low-latency retrieval for real product discovery.",
    tags: ["Full-Stack"],
    stack: "Elasticsearch, Flask, Python, Docker, Kibana",
    impact:
      "Designed for scalable indexing + fast search with relevance-focused iteration.",
    github: "#",
    demo: "#",
  },
  {
    title: "Stance Detection (NLP Model)",
    description:
      "Stance detection model for classifying perspective and intent across claims, topics, and short-form text.",
    tags: ["Full-Stack"],
    stack: "Python, PyTorch/TensorFlow, Transformers, Scikit-learn",
    impact:
      "Built training + evaluation loop with clean metrics and error analysis for iteration.",
    github: "#",
    demo: "#",
  },
  {
    title: "ASU Sol HPC Cluster Workflows",
    description:
      "Cluster-scale ML experimentation: training, evaluation, and job orchestration designed for reproducibility and throughput.",
    tags: ["Agentic AI", "Computer Vision"],
    stack: "Slurm, PyTorch, CUDA, Singularity, Bash, tmux",
    impact:
      "Built reliable training/eval workflows on shared HPC infrastructure with checkpointing and cluster-aware debugging.",
    github: "#",
    demo: "#",
  },
];

export default function Home() {
  const [introOpen, setIntroOpen] = useState(true);
  const [contentReady, setContentReady] = useState(false);
  const { setIntroClosed } = useIntro();

  useEffect(() => {
    // Ensures a blank initial screen on load.
    setIntroOpen(true);
    setContentReady(false);
  }, []);

  const handleContactSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (typeof window !== "undefined") {
      window.alert("Thanks for reaching out. I’ll get back to you shortly.");
    }
  };

  return (
    <div className="relative space-y-20 pb-4 sm:space-y-24">
      <HeroIntro
        open={introOpen}
        onDone={() => {
          setIntroOpen(false);
          setContentReady(true);
          setIntroClosed();
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={contentReady ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="space-y-20 sm:space-y-24"
      >
      {/* Hero — Wall of Portfolios–style: headline left, profile card right */}
      <section className="grid min-h-[78vh] grid-cols-1 items-center gap-12 md:grid-cols-[1fr_minmax(320px,0.9fr)]">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="space-y-6"
        >
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={popIn}
            className="text-5xl font-black leading-[0.95] tracking-tight text-slate-100 sm:text-6xl md:text-7xl"
          >
            <span className="hover-text-lift inline-block bg-gradient-to-b from-slate-50 to-slate-400/70 bg-clip-text text-transparent">
              Hey, I&apos;m Abishek.
            </span>
          </motion.h1>
          <p className="hover-text-lift max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base">
            ML & Agentic AI developer focused on building intelligent systems—from
            search pipelines and NLP models to HPC-scale experimentation at ASU.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              asChild
              size="md"
              className="hover-text-lift rounded-full px-5 text-sm"
            >
              <a href="#projects">View portfolio</a>
            </Button>
            <Button
              asChild
              size="md"
              variant="outline"
              className="hover-text-lift rounded-full border-slate-600 px-5 text-sm text-slate-300 hover:bg-slate-800/60"
            >
              <a href="#contact">Message</a>
            </Button>
          </div>
        </motion.div>

        {/* Profile card — reference: Edin Le profile block */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={0.15}
          variants={fadeInUp}
          className="flex justify-center md:justify-end"
        >
          <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900/50 shadow-xl">
            <div className="flex items-center gap-4 border-b border-slate-700/60 p-5">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-slate-600/60 bg-slate-800">
                <Image
                  src="/abi_profile.jpg"
                  alt="Abishek"
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="hover-text-lift truncate text-lg font-semibold tracking-tight text-slate-100">
                  Abishek Prakash Nagaram
                </h2>
                <p className="hover-text-lift text-xs text-slate-400">@ Abi</p>
                <p className="hover-text-lift mt-0.5 text-xs text-slate-500">United States</p>
              </div>
            </div>
            <div className="space-y-4 p-5">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  Role
                </p>
                <p className="hover-text-lift mt-1 text-sm font-medium text-slate-200">
                  ML & Agentic AI Developer · M.S. Student
                </p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  About
                </p>
                <p className="hover-text-lift mt-1 text-xs leading-relaxed text-slate-400">
                  Master&apos;s in Computer Science at ASU. Experience in ML, system
                  architecture, and full-stack development—Computer Vision,
                  automation, and scalable pipelines.
                </p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  Experience includes
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <span className="rounded-md bg-slate-800/80 px-2 py-1 text-[11px] text-slate-300">
                    Python · ML
                  </span>
                  <span className="rounded-md bg-slate-800/80 px-2 py-1 text-[11px] text-slate-300">
                    Agentic AI
                  </span>
                  <span className="rounded-md bg-slate-800/80 px-2 py-1 text-[11px] text-slate-300">
                    Full-Stack
                  </span>
                  <span className="rounded-md bg-slate-800/80 px-2 py-1 text-[11px] text-slate-300">
                    ASU Sol HPC
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Portfolio — reference: Wall of Portfolios case studies */}
      <motion.section
        id="projects"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        className="space-y-6"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className={sectionTitleClasses}>Portfolio</p>
            <h2 className={sectionHeadingClasses}>
              Projects & case studies
            </h2>
          </div>
          <p className="max-w-md text-xs text-muted-foreground sm:text-sm">
            End-to-end work in search, NLP, and ML systems—from pipelines to
            HPC workflows.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0.05 * index}
              variants={fadeInUp}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Experience */}
      <motion.section
        id="experience"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        className="space-y-6"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className={sectionTitleClasses}>Experience</p>
            <h2 className={sectionHeadingClasses}>
              Internship + research-driven building.
            </h2>
          </div>
        </div>
        <ol className="relative space-y-8 border-l border-border/60 pl-4 text-sm sm:pl-6">
          <li className="space-y-1">
            <div className="absolute -left-[7px] mt-1 h-3 w-3 rounded-full border border-background bg-emerald-400 shadow-[0_0_0_4px_rgba(52,211,153,0.3)]" />
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="font-medium">
                Python Developer Intern · Jireh Software Solutions (Bangalore)
              </span>
              <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] text-secondary-foreground">
                Python · CV · Automation
              </span>
              <span className="text-xs text-muted-foreground">
                Feb 2025 – May 2025
              </span>
            </div>
            <p className="text-xs text-muted-foreground sm:text-sm">
              Built an AI-driven work tracking summarizer using OCR + image
              similarity detection; developed full-stack features (Django) and
              automated deployment workflows with Linux + Bash.
            </p>
          </li>
          <li className="space-y-1">
            <div className="absolute -left-[7px] mt-1.5 h-3 w-3 rounded-full border border-background bg-sky-400/90" />
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="font-medium">M.S. Computer Science · ASU</span>
              <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] text-secondary-foreground">
                Expected May 2027
              </span>
              <span className="text-xs text-muted-foreground">
                Aug 2025 – Present
              </span>
            </div>
            <p className="text-xs text-muted-foreground sm:text-sm">
              Relevant coursework: Data Structures, Design & Analysis of
              Algorithms, Machine Learning, Deep Learning, Computer Networks,
              Sequence Networks & GANs.
            </p>
          </li>
          <li className="space-y-1">
            <div className="absolute -left-[7px] mt-1.5 h-3 w-3 rounded-full border border-background bg-indigo-400/90" />
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="font-medium">AI Society · Member (Tempe)</span>
              <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] text-secondary-foreground">
                Community
              </span>
              <span className="text-xs text-muted-foreground">
                Aug 2025 – Present
              </span>
            </div>
            <p className="text-xs text-muted-foreground sm:text-sm">
              Participating in ML/AI events and discussions, staying current on
              agentic systems and modern ML practice.
            </p>
          </li>
        </ol>
      </motion.section>

      {/* Skills */}
      <motion.section
        id="skills"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        className="space-y-6"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className={sectionTitleClasses}>Skills</p>
            <h2 className={sectionHeadingClasses}>
              Tools I use to ship ML systems.
            </h2>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-border/70 bg-card/80 p-5">
            <p className="text-xs font-semibold text-foreground">Programming</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Python, C/C++, Java, SQL, Bash, React.js
            </p>
          </div>
          <div className="rounded-2xl border border-border/70 bg-card/80 p-5">
            <p className="text-xs font-semibold text-foreground">
              ML / CV / GenAI
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              PyTorch, TensorFlow, CNNs, OpenCV, YOLO, GPT, Scikit-learn
            </p>
          </div>
          <div className="rounded-2xl border border-border/70 bg-card/80 p-5">
            <p className="text-xs font-semibold text-foreground">DevOps</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Docker, Linux CLI, Git/GitHub, Postman, PostgreSQL/MySQL
            </p>
          </div>
        </div>
      </motion.section>

      {/* Research / Blog */}
      <motion.section
        id="research"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        className="space-y-6"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className={sectionTitleClasses}>Research & Notes</p>
            <h2 className={sectionHeadingClasses}>
              From papers to practical patterns.
            </h2>
          </div>
          <p className="max-w-md text-xs text-muted-foreground sm:text-sm">
            Short, implementation-minded notes on AI and systems papers—focused
            on what you’d actually build with the ideas.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          <div className="space-y-2 rounded-xl border border-border/70 bg-card/80 p-4">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Tool use & planning
            </p>
            <h3 className="hover-text-lift text-sm font-semibold">
              ReAct, Toolformer, and practical tool-using agents
            </h3>
            <p className="text-xs text-muted-foreground">
              Why reasoning + acting loops matter more than raw model size, and
              how to structure tools and logs for debuggability.
            </p>
          </div>
          <div className="space-y-2 rounded-xl border border-border/70 bg-card/80 p-4">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Retrieval & evaluation
            </p>
            <h3 className="hover-text-lift text-sm font-semibold">
              RAG triage: when BM25 beats embeddings
            </h3>
            <p className="text-xs text-muted-foreground">
              A pragmatic framework for mixing lexical + dense retrieval, with
              query-aware routing and offline evaluation loops.
            </p>
          </div>
          <div className="space-y-2 rounded-xl border border-border/70 bg-card/80 p-4">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Systems & infra
            </p>
            <h3 className="hover-text-lift text-sm font-semibold">
              Running LLM workloads on shared clusters
            </h3>
            <p className="text-xs text-muted-foreground">
              Lessons from fitting agent workloads onto HPC schedulers without
              sacrificing observability or iteration speed.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Contact — Message CTA like Wall of Portfolios */}
      <motion.section
        id="contact"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        className="space-y-6 rounded-2xl border border-slate-700/60 bg-slate-900/40 p-5 sm:p-6 lg:p-7"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className={sectionTitleClasses}>Get in touch</p>
            <h2 className={sectionHeadingClasses}>
              Message
            </h2>
            <p className="mt-2 max-w-xl text-xs text-muted-foreground sm:text-sm">
              Interested in ML, agentic systems, or research-driven product
              work? Share what you're building.
            </p>
          </div>
        </div>
        <form
          onSubmit={handleContactSubmit}
          className="grid gap-4 sm:grid-cols-2 sm:gap-5"
        >
          <div className="space-y-1.5">
            <label
              htmlFor="name"
              className="text-xs font-medium text-foreground"
            >
              Name
            </label>
            <Input
              id="name"
              name="name"
              placeholder="Ada Lovelace"
              autoComplete="name"
              required
            />
          </div>
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="text-xs font-medium text-foreground"
            >
              Email
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
          <div className="space-y-1.5 sm:col-span-2">
            <label
              htmlFor="context"
              className="text-xs font-medium text-foreground"
            >
              What would you like to build?
            </label>
            <Textarea
              id="context"
              name="context"
              placeholder="Share your current stack, problem, or research question. Links welcome."
              required
            />
          </div>
          <div className="flex flex-col items-start justify-between gap-3 sm:col-span-2 sm:flex-row sm:items-center">
            <p className="text-[11px] text-muted-foreground">
              I usually respond within 24–48 hours. No recruiters for purely
              non-technical roles, please.
            </p>
            <Button
              type="submit"
              size="md"
              className="hover-text-lift h-9 rounded-full px-5 text-sm"
            >
              Send message
            </Button>
          </div>
        </form>
      </motion.section>
      </motion.div>
    </div>
  );
}
