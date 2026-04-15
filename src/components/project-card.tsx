import { Github, ExternalLink, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
    <Card className="group flex h-full flex-col justify-between border-border/70 bg-card/80 transition hover:-translate-y-1 hover:border-primary/70 hover:shadow-lg">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="hover-text-lift text-lg font-semibold tracking-tight">
            {title}
          </CardTitle>
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-primary">
            <Sparkles className="h-3 w-3" />
            Agentic
          </span>
        </div>
        <CardDescription className="hover-text-lift text-sm text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="border-primary/30 bg-primary/5 text-[11px] uppercase tracking-wide text-primary"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <div className="space-y-1 text-xs text-muted-foreground">
          <p>
            <span className="font-semibold text-foreground">Stack:</span>{" "}
            {stack}
          </p>
          <p>
            <span className="font-semibold text-foreground">Impact:</span>{" "}
            {impact}
          </p>
        </div>
      </CardContent>

      <CardFooter className="mt-auto flex items-center justify-between gap-2 pt-2">
        <div className="flex gap-2">
          {github && (
            <Button
              asChild
              variant="outline"
              size="sm"
              className="h-8 gap-1 text-xs"
            >
              <a href={github} target="_blank" rel="noreferrer">
                <Github className="h-3.5 w-3.5" />
                View on GitHub
              </a>
            </Button>
          )}
          {demo && (
            <Button
              asChild
              size="sm"
              className="h-8 gap-1 text-xs"
            >
              <a href={demo} target="_blank" rel="noreferrer">
                <ExternalLink className="h-3.5 w-3.5" />
                Live Demo
              </a>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

