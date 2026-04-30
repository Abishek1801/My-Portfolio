import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export type ProjectTag = "Agentic AI" | "Computer Vision" | "Full-Stack";

export interface ProjectCardProps {
  title: string;
  description: string;
  tags: ProjectTag[];
  stack: string;
  impact: string;
  github?: string;
  demo?: string;
}

export function ProjectCard({
  title,
  description,
  tags,
  stack,
  impact,
  github,
  demo,
}: ProjectCardProps) {
  const [notice, setNotice] = useState<string | null>(null);
  const isUnavailable = (href?: string) => !href || href === "#";

  useEffect(() => {
    if (!notice) {
      return;
    }

    const timer = window.setTimeout(() => {
      setNotice(null);
    }, 2200);

    return () => window.clearTimeout(timer);
  }, [notice]);

  const showUnavailableNotice = () => {
    setNotice("Sorry, this link is not available right now due to API or deployment limitations.");
  };

  return (
    <Card className="project-terminal-card group flex h-full flex-col justify-between">
      <CardHeader className="space-y-4">
        <div className="flex items-start gap-3">
          <CardTitle className="font-hacker text-lg font-semibold uppercase tracking-[0.08em] text-primary">
            {title}
          </CardTitle>
        </div>
        <CardDescription className="text-sm leading-7 text-foreground/65">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="border-primary/20 bg-transparent font-hacker text-[10px] uppercase tracking-[0.22em] text-primary"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <div className="space-y-2 text-xs leading-6 text-foreground/62">
          <p>
            <span className="font-hacker uppercase tracking-[0.18em] text-primary">
              stack:
            </span>{" "}
            {stack}
          </p>
          <p>
            <span className="font-hacker uppercase tracking-[0.18em] text-primary">
              impact:
            </span>{" "}
            {impact}
          </p>
        </div>
      </CardContent>

      <CardFooter className="mt-auto flex flex-col items-start gap-3 pt-2">
        <div className="flex items-center gap-2">
        {github && (
          <a
            href={isUnavailable(github) ? undefined : github}
            target={isUnavailable(github) ? undefined : "_blank"}
            rel={isUnavailable(github) ? undefined : "noreferrer"}
            className="terminal-card-button"
            onClick={(event) => {
              if (isUnavailable(github)) {
                event.preventDefault();
                showUnavailableNotice();
              }
            }}
          >
            <Github className="h-3.5 w-3.5" />
            GitHub
          </a>
        )}
        {demo && (
          <a
            href={isUnavailable(demo) ? undefined : demo}
            target={isUnavailable(demo) ? undefined : "_blank"}
            rel={isUnavailable(demo) ? undefined : "noreferrer"}
            className="terminal-card-button"
            onClick={(event) => {
              if (isUnavailable(demo)) {
                event.preventDefault();
                showUnavailableNotice();
              }
            }}
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Demo
          </a>
        )}
        </div>
        <AnimatePresence mode="wait">
          {notice ? (
            <motion.p
              key={notice}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.2 }}
              className="text-xs leading-5 text-foreground/55"
            >
              {notice}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </CardFooter>
    </Card>
  );
}
