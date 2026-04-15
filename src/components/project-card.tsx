import { Github, ExternalLink, Sparkles } from "lucide-react";
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
  return (
    <Card className="project-terminal-card group flex h-full flex-col justify-between">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="font-hacker text-lg font-semibold uppercase tracking-[0.08em] text-primary">
            {title}
          </CardTitle>
          <span className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/10 px-2 py-1 text-[10px] uppercase tracking-[0.22em] text-primary">
            <Sparkles className="h-3 w-3" />
            live
          </span>
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

      <CardFooter className="mt-auto flex items-center gap-2 pt-2">
        {github && (
          <a href={github} target="_blank" rel="noreferrer" className="terminal-card-button">
            <Github className="h-3.5 w-3.5" />
            GitHub
          </a>
        )}
        {demo && (
          <a href={demo} target="_blank" rel="noreferrer" className="terminal-card-button">
            <ExternalLink className="h-3.5 w-3.5" />
            Demo
          </a>
        )}
      </CardFooter>
    </Card>
  );
}
