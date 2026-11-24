import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import {
  DiagramArrow,
  DiagramLegend,
  DiagramNode,
} from "@/components/case-study";
import { TerminalSection } from "@/components/terminal-section";

export const metadata: Metadata = {
  title: "Verity Care: Following the Money in Nursing Homes — Abi (Abishek)",
  description:
    "Verity Care, a fraud-detection and proof-of-care layer for nursing-home Medicaid spending, built in one day at VillageHacks '26 Lite, ASU. Abishek built the SPEND fraud engine and the guardian and staff apps.",
};

const REPO_URL = "https://github.com/Cerluain/Verity-Care";
const VIDEO_URL = "https://youtu.be/1mmR9n13i_k";
const VIDEO_EMBED_URL = "https://www.youtube-nocookie.com/embed/1mmR9n13i_k";

const problemNumbers = [
  {
    value: "~$64B",
    body: "Medicaid spending on nursing facilities + CCRCs in 2023 ($64.2B of $211.3B, 30.4%).",
    source: "CMS National Health Expenditures via MACPAC",
  },
  {
    value: "$11.23B",
    body: "US nursing-home payments to related parties in 2019: 9.54% of net revenue, reported by 76.6% of homes.",
    source: "Harrington et al. 2023",
  },
  {
    value: "~$2B",
    body: "Medicaid Fraud Control Unit recoveries in FY2025, $4.64 returned for every $1 spent.",
    source: "HHS-OIG MFCU Annual Report FY2025",
  },
];

const builds = [
  {
    file: "apps/phantom-spend/",
    title: "SPEND Fraud-Detection Service",
    points: [
      "A FastAPI service that scores each facility on three explainable, rule-based signals: invoice price vs. the CMS NADAC reference (red above 3×), a breadth-first search for suppliers sharing an owner within 3 hops, and units bought vs. expected need from estimated resident-days (red above 1.5×).",
      "A spend_overall roll-up that turns a facility red only when all three signals agree.",
      "3 endpoints (/health, /spend, /spend/{facility_id}) returning schema-validated signal cards, each with a headline, severity, evidence, a data-provenance label and a citation. 18 automated tests pass.",
    ],
  },
  {
    file: "scripts/pull_prices.py",
    title: "Public-Data Pipeline + Demo Generator",
    points: [
      "Pulls 20 common nursing-home drugs from the CMS NADAC 2026 dataset (data.medicaid.gov API), takes the median price per unit across NDCs, and normalizes units to how drugs are actually invoiced.",
      "A deterministic generator builds 6 facilities × 12 invoices, ownership graphs and census from a few settings, so changing a story means editing a setting, never hand-typing numbers.",
    ],
  },
  {
    file: "dashboard/spending",
    title: "Investigator Spending Tab",
    points: [
      "First version of the investigator view: a verdict banner and signal cards, an ownership graph in vis-network with the related-party path drawn in red, and an invoice table with paid vs. fair price, markup and quantity-vs-need badges.",
    ],
  },
  {
    file: "/guardian",
    title: "Guardian View for Families",
    points: [
      "A live daily timeline for a synthetic resident (meds, meals, therapy, activities, vitals), showing who verified each item, its photo, its hash and the on-chain transaction.",
      "\"Verify proof\": the browser re-fetches the IPFS metadata and recomputes the SHA-256 itself, so it doesn't have to trust our server.",
      "\"This didn't happen\" files a dispute, routed by rules: facility first, then the State Long-Term Care Ombudsman, and the state investigator only if the item was billed or disputes repeat.",
    ],
  },
  {
    file: "/staff + care.py",
    title: "Staff Check-In App + Care Backend",
    points: [
      "A phone app where staff see only their own tasks, take a photo and confirm. Integrated with Saswata's Proof-of-Service backend, so each photo is pinned to IPFS and its hash committed on the Base Sepolia testnet, with a graceful fallback if the chain is down.",
      "14 /care/* REST endpoints over a SQLite store seeded with synthetic residents and staff. The guardian page follows the staff member's open resident across devices within ~3 seconds.",
    ],
  },
  {
    file: "/pitch",
    title: "Sourced Pitch + Research",
    points: [
      "A scrolling pitch page where every number on screen has its primary source printed under it, plus a seed script that re-times every demo task around \"now\" so a live demo always works.",
      "While tracing every headline number to its source, I found and retired three wrong stats the team had been using.",
    ],
  },
];

const decisions = [
  {
    title: "Fuse three signals; never flag on price alone",
    body: "Price alone misses the real fraud, because a related-party vendor shows a real signed invoice, and it falsely flags rural homes. Ownership + volume + price together are both defensible and fair.",
  },
  {
    title: "NADAC over CMS ASP for reference prices",
    body: "ASP covers only Part B injectables; NADAC covered all 20 drugs. NADAC is a pharmacy acquisition cost, not a facility price, so it's presented as a reference, not proof.",
  },
  {
    title: "Follow the cost report, not claims",
    body: "Medicare Part A pays a bundled daily rate, so there's no drug line item to check. The markup lives in supplier → facility invoices that feed the cost report, which in states like Arizona sets the Medicaid rate. The data model follows that.",
  },
  {
    title: "Only hashes go on-chain",
    body: "Resident data never touches the chain. Investigators see a normal web dashboard; the chain is invisible tamper-evidence plumbing.",
  },
];

const myStack = [
  "Python",
  "FastAPI",
  "Pydantic",
  "JSON Schema",
  "pytest",
  "httpx",
  "SQLite",
  "Alpine.js",
  "Tailwind",
  "vis-network",
  "Graph search (BFS)",
  "CMS NADAC API",
  "Mobile camera capture",
  "Bash",
  "AI coding agents (AGENTS.md workflow)",
];

const teamStack = [
  "Solidity + Foundry",
  "Base Sepolia testnet",
  "Pinata / IPFS",
  "Neon Postgres",
  "ed25519 signing",
  "PDF evidence packs",
];

const team = [
  {
    name: "Abishek (me)",
    role: "SPEND fraud engine, guardian & staff apps, pitch research.",
  },
  {
    name: "Saswata",
    role: "Smart contract, on-chain proof-of-service, dashboard, case file.",
  },
];

export default function VerityCarePage() {
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
        id="verity-care"
        path="projects/verity-care"
        prompt="./verity --follow-the-money"
        title="[ VILLAGEHACKS '26 LITE / BUILT IN ONE DAY ]"
      >
        <div className="mt-4 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="space-y-5">
            <h1 className="font-hacker text-4xl font-bold uppercase leading-[0.95] tracking-[-0.03em] text-primary sm:text-6xl">
              Verity Care
            </h1>
            <p className="font-hacker text-sm uppercase tracking-[0.2em] text-foreground/60">
              Fraud detection + proof of care for nursing-home Medicaid spending
            </p>
            <p className="text-sm leading-8 text-foreground/72 sm:text-base">
              Verity Care follows the money in US nursing homes. It flags homes
              that overpay suppliers secretly owned by the same people, and it
              lets families see photo-verified, tamper-evident proof that care
              was actually delivered. Built for state Medicaid Fraud Control
              Units by 2 engineers in one day at VillageHacks &apos;26 Lite,
              Arizona State University.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Backend", "Full-Stack"].map((tag) => (
                <span key={tag} className="case-chip">
                  {tag}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="terminal-stat">
                <p>signals</p>
                <strong>3</strong>
              </div>
              <div className="terminal-stat">
                <p>tests</p>
                <strong>18</strong>
              </div>
              <div className="terminal-stat">
                <p>care_api</p>
                <strong>14</strong>
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
          <div className="case-video">
            <iframe
              src={VIDEO_EMBED_URL}
              title="Verity Care demo video"
              loading="lazy"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </TerminalSection>

      <TerminalSection
        id="verity-problem"
        path="projects/verity-care/problem"
        prompt="cat ./problem.md"
        title="[ THE PROBLEM ]"
      >
        <p className="mt-6 max-w-3xl text-sm leading-7 text-foreground/68">
          A nursing home buys drugs, rent or management from an LLC its owners
          secretly control, at inflated prices. Those costs go on its cost
          report, and in cost-based states the Medicaid rate rises for every
          resident-day while the profit lands in the sister company. The
          federal related-party cost rule meant to stop this is rarely checked.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {problemNumbers.map((item) => (
            <div key={item.value} className="terminal-note-card">
              <p className="terminal-note-title">{item.value}</p>
              <p className="terminal-note-body">{item.body}</p>
              <p className="terminal-note-label mt-3">source: {item.source}</p>
            </div>
          ))}
        </div>
      </TerminalSection>

      <TerminalSection
        id="verity-architecture"
        path="projects/verity-care/architecture"
        prompt="tree ./verity --depth 5"
        title="[ ARCHITECTURE ]"
      >
        <div className="case-diagram mt-6">
          <DiagramLegend />

          <div className="case-row case-row-2">
            <DiagramNode
              title="CMS NADAC API"
              detail="real drug reference prices from data.medicaid.gov"
            />
            <DiagramNode
              mine
              title="Demo data generator"
              detail="6 facilities × 12 invoices, ownership graphs, census"
            />
          </div>
          <DiagramArrow label="pull_prices.py · data/spend/*.json" />
          <div className="case-row case-row-1">
            <DiagramNode
              mine
              title="SPEND service (FastAPI)"
              detail="price Δ · ownership BFS · volume → schema-valid signal cards"
            />
          </div>
          <DiagramArrow label="signal cards" />
          <div className="case-row case-row-3">
            <DiagramNode
              mine
              title="Staff phone app"
              detail="/staff photo check-in for assigned tasks"
            />
            <DiagramNode
              title="Dashboard shell"
              detail="FastAPI + Alpine (Saswata), hosting my care.py + SQLite backend"
            />
            <DiagramNode
              mine
              title="Investigator Spending tab"
              detail="verdict banner, ownership graph, invoice table"
            />
          </div>
          <DiagramArrow label="photo → proof-of-service" />
          <div className="case-row case-row-2">
            <DiagramNode
              title="On-chain service"
              detail="signer, IPFS pinning, staff wallet (Saswata)"
            />
            <DiagramNode
              title="IPFS (Pinata) + Base Sepolia testnet"
              detail="photo pinned, only its hash committed on-chain"
            />
          </div>
          <DiagramArrow label="re-fetch + recompute SHA-256" />
          <div className="case-row case-row-1">
            <DiagramNode
              mine
              title="Guardian view (family)"
              detail={'live timeline, verify proof, "This didn\'t happen" disputes'}
            />
          </div>
        </div>
      </TerminalSection>

      <TerminalSection
        id="verity-built"
        path="projects/verity-care/src"
        prompt="git log --author=abishek --stat"
        title="[ WHAT I BUILT ]"
      >
        <p className="mt-3 max-w-3xl text-sm leading-7 text-foreground/68">
          I owned the procurement-fraud engine end to end, from pulling real CMS
          drug prices to a tested API that returns explainable fraud signals,
          plus the family and staff experience that turns &ldquo;care was
          delivered&rdquo; into a verifiable, disputable record.
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
        id="verity-decisions"
        path="projects/verity-care/decisions"
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
        id="verity-story"
        path="projects/verity-care/incidents"
        prompt="cat ./incidents/rural-home.log"
        title="[ THE RURAL HOME THAT TURNED RED ]"
      >
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="terminal-note-card">
            <p className="terminal-note-label">symptom</p>
            <p className="terminal-note-body">
              In our demo data, a rural Wyoming home had high drug prices, which
              is normal in thin frontier markets, but no ownership link and
              normal volume. It should have been yellow. The dashboard showed it
              red, the same as the fraud case.
            </p>
          </div>
          <div className="terminal-note-card">
            <p className="terminal-note-label">root cause</p>
            <p className="terminal-note-body">
              The roll-up rule was &ldquo;red if any signal is red,&rdquo; so
              price alone condemned the home: exactly the false positive that
              gets price-only fraud tools ignored.
            </p>
          </div>
          <div className="terminal-note-card">
            <p className="terminal-note-label">fix</p>
            <p className="terminal-note-body">
              I added a spend_overall card that is red only when all three
              signals agree, switched the dashboard to use it, and locked it in
              with tests. The rural home stays yellow; the related-party cases
              stay red.
            </p>
          </div>
        </div>
        <p className="font-hacker mt-5 text-sm uppercase tracking-[0.16em] text-primary">
          &gt; lesson: a roll-up rule is a policy decision, not plumbing.
          corroborate before you accuse.
        </p>
      </TerminalSection>

      <TerminalSection
        id="verity-stack"
        path="projects/verity-care/stack"
        prompt="cat requirements.txt"
        title="[ TECH STACK ]"
      >
        <div className="mt-6 flex flex-wrap gap-2">
          {myStack.map((item) => (
            <span key={item} className="case-chip">
              {item}
            </span>
          ))}
          {teamStack.map((item) => (
            <span key={item} className="case-chip case-chip-team">
              {item} · team
            </span>
          ))}
        </div>
        <p className="mt-4 text-xs leading-6 text-foreground/55">
          Safe by default: synthetic residents and staff only, only hashes
          on-chain, provenance labels on every card (real reference prices vs.
          demo_grounded invoices), and no secrets in git. Known limitation: demo
          photos were pinned to public IPFS; real use would encrypt them first.
        </p>
      </TerminalSection>

      <TerminalSection
        id="verity-team"
        path="projects/verity-care/team"
        prompt="git shortlog -s --group=owner"
        title="[ TEAM ]"
      >
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {team.map((member) => (
            <div key={member.name} className="terminal-env-card">
              <p className="terminal-env-key">{member.name}</p>
              <p className="terminal-env-value">{member.role}</p>
            </div>
          ))}
        </div>
      </TerminalSection>

      <TerminalSection
        id="verity-links"
        path="projects/verity-care/links"
        prompt="cat ./links.env"
        title="[ LINKS ]"
      >
        <div className="terminal-contact-meta mt-6">
          <p>
            repo=
            <a
              href={REPO_URL}
              target="_blank"
              rel="noreferrer"
              className="text-primary/70 transition-colors hover:text-primary"
            >
              github.com/Cerluain/Verity-Care
            </a>
          </p>
          <p>
            demo_video=
            <a
              href={VIDEO_URL}
              target="_blank"
              rel="noreferrer"
              className="text-primary/70 transition-colors hover:text-primary"
            >
              youtu.be/1mmR9n13i_k
            </a>
          </p>
        </div>
      </TerminalSection>

      <p className="mx-auto max-w-6xl px-4 text-xs leading-6 text-foreground/50 sm:px-6 lg:px-8">
        Leo: staffing research &amp; planning, business planning and
        go-to-market.
      </p>
    </div>
  );
}
