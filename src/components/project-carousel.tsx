"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProjectCard, type ProjectCardProps } from "@/components/project-card";

const slideInFromLeft = {
  hidden: { opacity: 0, x: -120 },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      delay: 0.15 + index * 0.12,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export function ProjectCarousel({ projects }: { projects: ProjectCardProps[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef({
    active: false,
    moved: false,
    startX: 0,
    startScroll: 0,
    startIndex: 0,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const getCards = () =>
    Array.from(trackRef.current?.children ?? []) as HTMLElement[];

  const updateState = useCallback(() => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    const cards = Array.from(track.children) as HTMLElement[];
    const scrollLeft = track.scrollLeft;
    let closest = 0;
    cards.forEach((card, index) => {
      if (
        Math.abs(card.offsetLeft - track.offsetLeft - scrollLeft) <
        Math.abs(cards[closest].offsetLeft - track.offsetLeft - scrollLeft)
      ) {
        closest = index;
      }
    });

    const atEnd = scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    setActiveIndex(atEnd ? cards.length - 1 : closest);
    setCanPrev(scrollLeft > 4);
    setCanNext(!atEnd);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", updateState);
    return () => window.removeEventListener("resize", updateState);
  }, [updateState]);

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    const cards = getCards();
    const target = cards[Math.max(0, Math.min(index, cards.length - 1))];
    if (!track || !target) {
      return;
    }
    track.scrollTo({
      left: target.offsetLeft - track.offsetLeft,
      behavior: "smooth",
    });
  };

  // Mouse drag-to-swipe; touch and trackpads use native scrolling.
  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || !trackRef.current) {
      return;
    }
    drag.current = {
      active: true,
      moved: false,
      startX: event.clientX,
      startScroll: trackRef.current.scrollLeft,
      startIndex: activeIndex,
    };
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!drag.current.active || !track) {
      return;
    }
    const delta = event.clientX - drag.current.startX;
    if (!drag.current.moved && Math.abs(delta) > 5) {
      drag.current.moved = true;
      setIsDragging(true);
      track.setPointerCapture(event.pointerId);
    }
    if (drag.current.moved) {
      track.scrollLeft = drag.current.startScroll - delta;
    }
  };

  const endDrag = () => {
    if (!drag.current.active) {
      return;
    }
    const moved = drag.current.moved;
    drag.current.active = false;
    setIsDragging(false);
    if (moved) {
      const delta = (trackRef.current?.scrollLeft ?? 0) - drag.current.startScroll;
      scrollToIndex(drag.current.startIndex + (delta > 40 ? 1 : delta < -40 ? -1 : 0));
    }
  };

  return (
    <div className="mt-8">
      <div
        ref={trackRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Projects"
        tabIndex={0}
        onScroll={updateState}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={(event) => {
          if (drag.current.moved) {
            event.preventDefault();
            event.stopPropagation();
            drag.current.moved = false;
          }
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            scrollToIndex(activeIndex + 1);
          } else if (event.key === "ArrowLeft") {
            event.preventDefault();
            scrollToIndex(activeIndex - 1);
          }
        }}
        className={`project-carousel-track ${isDragging ? "is-dragging" : ""}`}
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            variants={slideInFromLeft}
            custom={index}
            className="project-carousel-slide"
            aria-label={`${index + 1} of ${projects.length}`}
          >
            <ProjectCard {...project} />
          </motion.div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <p className="font-hacker text-xs uppercase tracking-[0.22em] text-foreground/55">
          [{String(activeIndex + 1).padStart(2, "0")}/
          {String(projects.length).padStart(2, "0")}]{" "}
          <span className="hidden sm:inline">swipe or drag to browse</span>
        </p>
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-1.5 sm:flex" aria-hidden>
            {projects.map((project, index) => (
              <span
                key={project.title}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "w-6 bg-primary" : "w-1.5 bg-foreground/25"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => scrollToIndex(activeIndex - 1)}
            disabled={!canPrev}
            className="terminal-icon-button disabled:opacity-30"
            aria-label="Previous project"
          >
            <ChevronLeft aria-hidden className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollToIndex(activeIndex + 1)}
            disabled={!canNext}
            className="terminal-icon-button disabled:opacity-30"
            aria-label="Next project"
          >
            <ChevronRight aria-hidden className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
