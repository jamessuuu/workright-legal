import { useEffect, useRef } from "react";

interface WordSegment {
  text: string;
  className?: string;
  breakAfter?: boolean;
}

interface Props {
  segments: WordSegment[];
  subheading?: string;
}

export default function HeroTextReveal({ segments, subheading }: Props) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  // Build the full text for aria-label
  const fullText = segments.map((s) => s.text).join(" ");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Dynamically import GSAP to keep it in the same bundle chunk
    async function animate() {
      const { gsap } = await import("gsap");

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const words = container!.querySelectorAll<HTMLElement>(".hero-word");

      if (reduced) {
        words.forEach((w) => { w.style.opacity = "1"; w.style.transform = "none"; });
        if (subRef.current) { subRef.current.style.opacity = "1"; }
        return;
      }

      // Set initial state
      gsap.set(words, { opacity: 0, y: 20 });
      if (subRef.current) gsap.set(subRef.current, { opacity: 0 });

      // Animate words in
      gsap.to(words, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.04,
        ease: "power2.out",
        onComplete: () => {
          // Fade in subheading after h1 completes
          if (subRef.current) {
            gsap.to(subRef.current, { opacity: 1, duration: 0.4, delay: 0.2, ease: "power2.out" });
          }
        },
      });
    }

    animate();
  }, []);

  return (
    <>
      <h1
        ref={containerRef}
        aria-label={fullText}
        className="font-bold tracking-tight text-[clamp(2.25rem,5.5vw,4.25rem)] leading-[1.05]"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {segments.map((seg, i) => (
          <span key={i}>
            <span
              className={`hero-word inline-block ${seg.className || ""}`}
              aria-hidden="true"
              style={{ opacity: 0 }}
            >
              {seg.text}
            </span>
            {seg.breakAfter && <br className="hidden sm:block" />}
            {!seg.breakAfter && " "}
          </span>
        ))}
      </h1>

      {subheading && (
        <p
          ref={subRef}
          className="mt-5 text-base lg:text-lg text-[var(--color-accent-light)] max-w-2xl italic"
          style={{ fontFamily: "var(--font-heading)", opacity: 0 }}
        >
          {subheading}
        </p>
      )}
    </>
  );
}
