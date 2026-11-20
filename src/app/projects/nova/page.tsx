import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { TerminalSection } from "@/components/terminal-section";

export const metadata: Metadata = {
  title: "Nova: Voice-First AI Student Assistant — Abi (Abishek)",
  description:
    "Nova, a voice-first AI assistant for college students built in 24 hours at SunHacks 2026. Abishek built the integration layer, the 31-tool MCP interface, and exam prep + long-term memory.",
};

const REPO_URL = "https://github.com/SD170/nova";
const VIDEO_URL = "https://www.youtube.com/watch?v=FwKEgtw3p_o";
const VIDEO_EMBED_URL = "https://www.youtube-nocookie.com/embed/FwKEgtw3p_o";
// Fill these in once the LinkedIn post and blog are published.
const LINKEDIN_POST_URL = "";
const BLOG_URL = "";

const builds = [
  {
    file: "canvas_agent.py",
    title: "Canvas Agent",
    points: [
      "Uses the student's own logged-in browser session, read-only (TinyFish browser profile driven by Playwright over CDP), and reads Canvas's JSON API instead of HTML. Full sync in ~7 seconds.",
      "Gemini classifies and prioritizes every item in one batched call (gemini-3.5-flash, falling back to flash-lite), then a deterministic rules layer guarantees anything submitted, excused or complete never shows up as a to-do.",
      "Daily brief, per-item detail, mark done with undo, stale-while-revalidate caching, and a course-materials pipeline (modules, syllabus, linked PDFs, prefetch) that feeds retrieval and the quiz.",
      "A mock backend so teammates could build in parallel without credentials.",
    ],
  },
  {
    file: "workspace_agent.py",
    title: "Google Workspace Agent",
    points: [
      "Gmail: classified inbox, search, short gists, and drafts only. It never sends.",
      "Calendar: events, free/busy, and Canvas deadlines synced to a separate \"Nova\" calendar, updating an event only when its title or time actually changed.",
      "Company research (TinyFish + Gemini), .docx generation, and minimal-permission OAuth 2.0 scopes.",
    ],
  },
  {
    file: "mcp_servers/",
    title: "MCP Tool Layer",
    points: [
      "Two key-protected MCP servers: Canvas (16 tools) + Workspace (15 tools) = 31 tools, exposed to the orchestrator through Cloudflare tunnels.",
      "Voice-first: every tool returns a one-line speak field plus compact data, keeping spoken replies at or under 240 characters, while the REST API stays unchanged for the UI.",
    ],
  },
  {
    file: "linkedin_copilot/",
    title: "LinkedIn Co-pilot",
    points: [
      "Chrome extension (Manifest V3), backend routes, 5 MCP tools, and a Nova side panel inside LinkedIn.",
      "Reads only the posts visible on screen and drafts replies. It never posts.",
    ],
  },
  {
    file: "exam_prep/",
    title: "Exam Prep + Long-Term Memory",
    points: [
      "Generates 6 multiple-choice questions grounded in the student's actual course material, asked one at a time by voice or in the panel, with a flashcard PDF export.",
      "Supermemory weak-topic loop: topics the student gets wrong are remembered and resurfaced in later sessions.",
      "A \"Nova Desk\" side panel (React + Electron) inside the team's desktop app.",
    ],
  },
];

const decisions = [
  {
    title: "Read the JSON API through a real user session",
    body: "Instead of scraping HTML, Nova reads Canvas's own JSON API through the student's logged-in session. Faster (~7 s full sync) and much sturdier.",
  },
  {
    title: "One batched LLM call with model fallback",
    body: "All items are classified in a single Gemini call, with a fallback model because newer Gemini models hung or weren't available.",
  },
  {
    title: "Deterministic guardrails on top of LLM output",
    body: "The model prioritizes; plain rules decide. Submitted, excused or completed work can never be shown as a to-do, whatever the model says.",
  },
  {
    title: "Tool outputs shaped for voice",
    body: "Every MCP tool returns a one-line speak field, so the API is designed around how answers sound, not just what they contain.",
  },
  {
    title: "Mock backends for parallel work",
    body: "Each service ships a mock mode, so 4 people could build at the same time within 24 hours.",
  },
];

const stack = [
  "Python",
  "FastAPI / ASGI (uvicorn)",
  "Playwright (CDP)",
  "TinyFish",
  "Google Gemini",
  "MCP Python SDK",
  "Gmail API",
  "Google Calendar API",
  "OAuth 2.0",
  "Supermemory",
  "Chrome Extensions (MV3)",
  "React",
  "Electron",
  "Cloudflare Tunnel",
  "pytest",
];

const team = [
  { name: "Saswata", role: "Orchestrator, chat, voice (Vapi)" },
  { name: "Amrita", role: "Retrieval, quiz, news / ASU-events service" },
  { name: "Shruti", role: "UI (React / Electron desktop app)" },
  {
    name: "Abishek (me)",
    role: "Integrations and agents, the MCP tool layer, exam prep + memory",
  },
];

const links = [
  { key: "repo", label: "github.com/SD170/nova", href: REPO_URL },
  { key: "demo_video", label: "youtube.com/watch?v=FwKEgtw3p_o", href: VIDEO_URL },
  { key: "linkedin_post", label: "read the post", href: LINKEDIN_POST_URL },
  { key: "blog", label: "read the write-up", href: BLOG_URL },
].filter((link) => link.href);

function DiagramNode({
  title,
  detail,
  mine = false,
}: {
  title: string;
  detail: string;
  mine?: boolean;
}) {
  return (
    <div className={`nova-node ${mine ? "nova-node-mine" : "nova-node-team"}`}>
      <p className="nova-node-title">{title}</p>
      <p className="nova-node-detail">{detail}</p>
    </div>
  );
}

function DiagramArrow({ label }: { label: string }) {
  return (
    <div className="nova-arrow" aria-hidden>
      <span>↓</span>
      <span className="nova-arrow-label">{label}</span>
    </div>
  );
}

export default function NovaPage() {
  return (
    <div className="relative pb-12 pt-24 lg:pt-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/#projects"
          className="font-hacker inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-foreground/55 transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          cd ../projects
        </Link>
      </div>

      <TerminalSection
        id="nova"
        path="projects/nova"
        prompt="./nova --demo"
        title="[ SUNHACKS 2026 / BUILT IN 24 HOURS ]"
      >
        <div className="mt-4 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="space-y-5">
            <h1 className="font-hacker text-4xl font-bold uppercase leading-[0.95] tracking-[-0.03em] text-primary sm:text-6xl">
              Nova
            </h1>
            <p className="font-hacker text-sm uppercase tracking-[0.2em] text-foreground/60">
              Voice-first AI assistant for college students
            </p>
            <p className="text-sm leading-8 text-foreground/72 sm:text-base">
              Nova pulls together Canvas, Gmail, Google Calendar, LinkedIn and
              campus news, so a student can ask{" "}
              <span className="text-primary">
                &ldquo;what do I need to do today?&rdquo;
              </span>{" "}
              and get one spoken, prioritized answer. Built end to end on real
              data by a team of 4 in 24 hours at SunHacks 2026, Arizona State
              University.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Agentic AI", "Backend"].map((tag) => (
                <span key={tag} className="nova-chip">
                  {tag}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="terminal-stat">
                <p>mcp_tools</p>
                <strong>31</strong>
              </div>
              <div className="terminal-stat">
                <p>canvas_sync</p>
                <strong>~7 s</strong>
              </div>
              <div className="terminal-stat">
                <p>tests</p>
                <strong>~170</strong>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href={REPO_URL}
                target="_blank"
                rel="noreferrer"
                className="terminal-card-button"
              >
                <Github className="h-3.5 w-3.5" />
                GitHub
              </a>
              <a
                href={VIDEO_URL}
                target="_blank"
                rel="noreferrer"
                className="terminal-card-button"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Watch on YouTube
              </a>
            </div>
          </div>
          <div className="nova-video">
            <iframe
              src={VIDEO_EMBED_URL}
              title="Nova demo video"
              loading="lazy"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </TerminalSection>

      <TerminalSection
        id="nova-problem"
        path="projects/nova/problem"
        prompt="cat ./problem.md"
        title="[ THE PROBLEM ]"
      >
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <p className="terminal-log-body">
            A college student&apos;s day is spread across Canvas assignments,
            Gmail, a calendar, LinkedIn and campus news. Each lives in its own
            app, and none of them answer the one question that matters in the
            morning: what do I actually need to do today?
          </p>
          <p className="terminal-log-body">
            Nova connects to all of them through the student&apos;s own accounts
            and answers by voice, in one prioritized reply, without ever
            submitting, sending or posting anything on the student&apos;s behalf.
          </p>
        </div>
      </TerminalSection>

      <TerminalSection
        id="nova-architecture"
        path="projects/nova/architecture"
        prompt="tree ./nova --depth 4"
        title="[ ARCHITECTURE ]"
      >
        <div className="nova-diagram mt-6">
          <div className="nova-legend">
            <span>
              <i className="nova-swatch nova-swatch-mine" /> built by me
            </span>
            <span>
              <i className="nova-swatch nova-swatch-team" /> built by teammates
            </span>
          </div>

          <div className="nova-row nova-row-2">
            <DiagramNode
              title="Student"
              detail="speaks to Nova, or uses the desktop app and LinkedIn side panel"
            />
            <DiagramNode
              title="Desktop app"
              detail="React + Electron UI (Shruti) with my Nova Desk exam-prep panel"
            />
          </div>
          <DiagramArrow label="voice / chat" />
          <div className="nova-row nova-row-1">
            <DiagramNode
              title="Orchestrator + Voice"
              detail="chat orchestration and Vapi voice (Saswata)"
            />
          </div>
          <DiagramArrow label="MCP over Cloudflare tunnels, key-protected" />
          <div className="nova-row nova-row-2">
            <DiagramNode
              mine
              title="Canvas MCP server"
              detail="16 tools, one-line speak field per result"
            />
            <DiagramNode
              mine
              title="Workspace MCP server"
              detail="15 tools, replies kept ≤ 240 characters"
            />
          </div>
          <DiagramArrow label="service calls" />
          <div className="nova-row nova-row-5">
            <DiagramNode
              mine
              title="Canvas agent"
              detail="brief, priorities, materials pipeline"
            />
            <DiagramNode
              mine
              title="Workspace agent"
              detail="Gmail drafts, Calendar sync, research"
            />
            <DiagramNode
              mine
              title="LinkedIn co-pilot"
              detail="MV3 extension, drafts only"
            />
            <DiagramNode
              mine
              title="Exam prep + memory"
              detail="grounded quiz, weak-topic loop"
            />
            <DiagramNode
              title="Retrieval / quiz / news"
              detail="Amrita's services; news / ASU events proxied by my Workspace agent"
            />
          </div>
          <DiagramArrow label="read-only access" />
          <div className="nova-row nova-row-5">
            <DiagramNode
              title="Canvas JSON API"
              detail="student's own session via TinyFish + Playwright (CDP)"
            />
            <DiagramNode
              title="Gmail + Calendar"
              detail="minimal OAuth 2.0 scopes"
            />
            <DiagramNode title="LinkedIn" detail="visible posts only" />
            <DiagramNode title="Supermemory" detail="long-term memory" />
            <DiagramNode title="Google Gemini" detail="batched classification" />
          </div>
        </div>
      </TerminalSection>

      <TerminalSection
        id="nova-built"
        path="projects/nova/src"
        prompt="git log --author=abishek --stat"
        title="[ WHAT I BUILT ]"
      >
        <p className="mt-3 max-w-3xl text-sm leading-7 text-foreground/68">
          I owned the integration layer (every service that connects Nova to a
          student&apos;s real data), the MCP tool interface the voice agent
          calls, and the exam-prep + memory features, backed by ~170 automated
          pytest tests across my services.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {builds.map((build) => (
            <article key={build.file} className="terminal-log-row">
              <p className="terminal-log-time">{build.file}</p>
              <h3 className="terminal-log-role">{build.title}</h3>
              <ul className="terminal-log-body space-y-1.5">
                {build.points.map((point) => (
                  <li key={point}>
                    <span className="text-primary/60">&gt; </span>
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </TerminalSection>

      <TerminalSection
        id="nova-decisions"
        path="projects/nova/decisions"
        prompt="cat ./decisions.md"
        title="[ KEY DESIGN DECISIONS ]"
      >
        <div className="mt-6 space-y-3">
          {decisions.map((decision, index) => (
            <div key={decision.title} className="terminal-log-row">
              <p className="terminal-log-time">
                decision_{String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="terminal-log-role">{decision.title}</h3>
              <p className="terminal-log-body">{decision.body}</p>
            </div>
          ))}
        </div>
      </TerminalSection>

      <TerminalSection
        id="nova-incident"
        path="projects/nova/incidents"
        prompt="cat ./incidents/demo-morning.log"
        title="[ INCIDENT: OUR AI READ EMAILS THAT DIDN'T EXIST ]"
      >
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="terminal-note-card">
            <p className="terminal-note-label">symptom</p>
            <p className="terminal-note-body">
              On demo morning, Nova started reading out emails that didn&apos;t
              exist. We assumed the model was hallucinating.
            </p>
          </div>
          <div className="terminal-note-card">
            <p className="terminal-note-label">root cause</p>
            <p className="terminal-note-body">
              It wasn&apos;t. One service had restarted in mock mode, and a shared
              config pointed at a teammate&apos;s mock Gmail service. The model
              faithfully read fake data.
            </p>
          </div>
          <div className="terminal-note-card">
            <p className="terminal-note-label">fix</p>
            <p className="terminal-note-body">
              Restored the real backend, pointed the config at the real service,
              and made a rule: check /health for which backend is live before
              trusting answers.
            </p>
          </div>
        </div>
        <p className="font-hacker mt-5 text-sm uppercase tracking-[0.16em] text-primary">
          &gt; lesson: in agent systems, many &ldquo;hallucinations&rdquo; are
          really plumbing bugs.
        </p>
      </TerminalSection>

      <TerminalSection
        id="nova-stack"
        path="projects/nova/stack"
        prompt="cat requirements.txt package.json"
        title="[ TECH STACK ]"
      >
        <div className="mt-6 flex flex-wrap gap-2">
          {stack.map((item) => (
            <span key={item} className="nova-chip">
              {item}
            </span>
          ))}
        </div>
        <p className="mt-4 text-xs leading-6 text-foreground/55">
          Safe by default: read-only Canvas, email drafts never sent, LinkedIn
          never posts, minimal OAuth scopes, secrets kept out of the repo, and
          one narrow file-save tool instead of general file access.
        </p>
      </TerminalSection>

      <TerminalSection
        id="nova-team"
        path="projects/nova/team"
        prompt="git shortlog -s --group=owner"
        title="[ TEAM ]"
      >
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <div key={member.name} className="terminal-env-card">
              <p className="terminal-env-key">{member.name}</p>
              <p className="terminal-env-value">{member.role}</p>
            </div>
          ))}
        </div>
      </TerminalSection>

      <TerminalSection
        id="nova-links"
        path="projects/nova/links"
        prompt="cat ./links.env"
        title="[ LINKS ]"
      >
        <div className="terminal-contact-meta mt-6">
          {links.map((link) => (
            <p key={link.key}>
              {link.key}=
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="text-primary/70 transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            </p>
          ))}
        </div>
      </TerminalSection>
    </div>
  );
}
