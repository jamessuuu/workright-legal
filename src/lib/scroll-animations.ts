import { gsap, ScrollTrigger, prefersReducedMotion } from "./gsap-init";

/** Animate all `.reveal` variant elements into view */
export function initReveals(): (() => void) {
  const reduced = prefersReducedMotion();
  const triggers: ScrollTrigger[] = [];

  // Standard reveal-up
  document.querySelectorAll<HTMLElement>(".reveal, .reveal-delay-1, .reveal-delay-2").forEach((el) => {
    const delay = el.classList.contains("reveal-delay-1") ? 0.1 : el.classList.contains("reveal-delay-2") ? 0.2 : 0;

    if (reduced) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(el, { opacity: 0, y: 20 });
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      once: true,
      onEnter: () => {
        gsap.to(el, { opacity: 1, y: 0, duration: 0.6, delay, ease: "power2.out" });
      },
    });
    triggers.push(st);
  });

  // Fade only
  document.querySelectorAll<HTMLElement>(".reveal-fade").forEach((el) => {
    if (reduced) { gsap.set(el, { opacity: 1 }); return; }
    gsap.set(el, { opacity: 0 });
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      once: true,
      onEnter: () => { gsap.to(el, { opacity: 1, duration: 0.6, ease: "power2.out" }); },
    });
    triggers.push(st);
  });

  // Scale
  document.querySelectorAll<HTMLElement>(".reveal-scale").forEach((el) => {
    if (reduced) { gsap.set(el, { opacity: 1, scale: 1 }); return; }
    gsap.set(el, { opacity: 0, scale: 0.97 });
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      once: true,
      onEnter: () => { gsap.to(el, { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }); },
    });
    triggers.push(st);
  });

  // Slide from left
  document.querySelectorAll<HTMLElement>(".reveal-left").forEach((el) => {
    if (reduced) { gsap.set(el, { opacity: 1, x: 0 }); return; }
    gsap.set(el, { opacity: 0, x: -20 });
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      once: true,
      onEnter: () => { gsap.to(el, { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }); },
    });
    triggers.push(st);
  });

  // Slide from right
  document.querySelectorAll<HTMLElement>(".reveal-right").forEach((el) => {
    if (reduced) { gsap.set(el, { opacity: 1, x: 0 }); return; }
    gsap.set(el, { opacity: 0, x: 20 });
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      once: true,
      onEnter: () => { gsap.to(el, { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }); },
    });
    triggers.push(st);
  });

  // Reveal line (width animation)
  document.querySelectorAll<HTMLElement>(".reveal-line").forEach((el) => {
    if (reduced) { gsap.set(el, { width: "100%" }); return; }
    gsap.set(el, { width: 0 });
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      once: true,
      onEnter: () => { gsap.to(el, { width: "100%", duration: 0.8, ease: "power2.out" }); },
    });
    triggers.push(st);
  });

  // Journey stages
  document.querySelectorAll<HTMLElement>(".journey-stage").forEach((el) => {
    if (reduced) {
      gsap.set(el, { opacity: 1, y: 0 });
      const visual = el.querySelector(".journey-visual");
      if (visual) gsap.set(visual, { opacity: 1, x: 0 });
      return;
    }
    gsap.set(el, { opacity: 0, y: 20 });
    const visual = el.querySelector<HTMLElement>(".journey-visual");
    if (visual) {
      const isOdd = Array.from(el.parentElement?.children ?? []).indexOf(el) % 2 === 0;
      gsap.set(visual, { opacity: 0, x: isOdd ? 20 : -20 });
    }
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(el, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
        if (visual) {
          gsap.to(visual, { opacity: 1, x: 0, duration: 0.6, delay: 0.15, ease: "power2.out" });
        }
      },
    });
    triggers.push(st);
  });

  return () => { triggers.forEach((st) => st.kill()); };
}

/** ClientJourney SVG path map — scroll-driven path draw + card highlights */
export function initJourneyMap(): (() => void) {
  const reduced = prefersReducedMotion();
  const triggers: ScrollTrigger[] = [];
  const mapEl = document.getElementById("journey-map");

  if (!mapEl || window.innerWidth < 1024) {
    return () => {};
  }

  const activePath = mapEl.querySelector<SVGPathElement>(".journey-path-active");
  const stops = mapEl.querySelectorAll<SVGGElement>(".journey-stop");
  const cards = mapEl.querySelectorAll<HTMLElement>(".journey-map-card");
  const stageCount = stops.length;

  if (!activePath || stageCount < 2) return () => {};

  // Measure path length for stroke-dashoffset animation
  const pathLength = activePath.getTotalLength();

  if (reduced) {
    // Show everything immediately
    gsap.set(activePath, { strokeDasharray: pathLength, strokeDashoffset: 0 });
    stops.forEach((stop) => {
      const circle = stop.querySelector(".journey-stop-circle") as SVGCircleElement;
      const glow = stop.querySelector(".journey-stop-glow") as SVGCircleElement;
      const num = stop.querySelector(".journey-stop-number") as SVGTextElement;
      if (circle) { circle.setAttribute("fill", "var(--color-accent)"); circle.setAttribute("stroke", "var(--color-accent)"); }
      if (glow) gsap.set(glow, { opacity: 0.15 });
      if (num) num.setAttribute("fill", "white");
    });
    cards.forEach((card) => gsap.set(card, { opacity: 1 }));
    return () => {};
  }

  // Initial state: path hidden, cards ready for animation
  gsap.set(activePath, { strokeDasharray: pathLength, strokeDashoffset: pathLength });
  cards.forEach((card) => {
    gsap.set(card, { scale: 0.97, y: 4 });
  });

  // Build scroll-driven timeline
  const tl = gsap.timeline();

  // Each stage gets equal portion of timeline
  const segmentDuration = 1 / stageCount;

  for (let i = 0; i < stageCount; i++) {
    const stop = stops[i];
    const card = cards[i];
    const circle = stop.querySelector(".journey-stop-circle") as SVGCircleElement;
    const glow = stop.querySelector(".journey-stop-glow") as SVGCircleElement;
    const num = stop.querySelector(".journey-stop-number") as SVGTextElement;
    const cardNumber = card?.querySelector(".journey-card-number") as HTMLElement | null;

    // Draw path to this stop
    const targetOffset = pathLength * (1 - (i + 1) / stageCount);
    tl.to(activePath, {
      strokeDashoffset: targetOffset,
      duration: segmentDuration * 0.5,
      ease: "none",
    });

    // Light up stop circle with scale pop
    if (circle) {
      tl.to(circle, {
        attr: { fill: "var(--color-accent)", stroke: "var(--color-accent)", r: 10 },
        duration: segmentDuration * 0.15,
        ease: "back.out(2)",
      }, "<0.02");
    }
    // Glow ring expands and fades in
    if (glow) {
      tl.to(glow, {
        opacity: 0.2,
        attr: { r: 22 },
        duration: segmentDuration * 0.2,
        ease: "power2.out",
      }, "<");
    }
    if (num) {
      tl.to(num, { attr: { fill: "white" }, duration: segmentDuration * 0.1 }, "<");
    }

    // Highlight active card — lift, scale, glow, background tint
    if (card) {
      tl.to(card, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: segmentDuration * 0.2,
        ease: "power2.out",
      }, "<");
      tl.to(card, {
        borderColor: "var(--color-accent)",
        boxShadow: "0 0 0 1px rgba(184,134,11,0.12), 0 8px 24px rgba(184,134,11,0.10), 0 2px 8px rgba(0,0,0,0.06)",
        backgroundColor: "var(--color-accent-subtle)",
        duration: segmentDuration * 0.2,
        ease: "power2.out",
      }, "<");
      // Card number brightens
      if (cardNumber) {
        tl.to(cardNumber, { opacity: 0.5, duration: segmentDuration * 0.15, ease: "power2.out" }, "<");
      }
    }

    // Dim previous card
    if (i > 0 && cards[i - 1]) {
      const prevNumber = cards[i - 1].querySelector(".journey-card-number") as HTMLElement | null;
      tl.to(cards[i - 1], {
        opacity: 0.3,
        scale: 0.97,
        y: 4,
        duration: segmentDuration * 0.15,
        ease: "power2.out",
      }, "<");
      tl.to(cards[i - 1], {
        borderColor: "var(--color-border)",
        boxShadow: "none",
        backgroundColor: "transparent",
        duration: segmentDuration * 0.15,
      }, "<");
      if (prevNumber) {
        tl.to(prevNumber, { opacity: 0.25, duration: segmentDuration * 0.1 }, "<");
      }
      // Shrink previous stop back to default size
      const prevCircle = stops[i - 1]?.querySelector(".journey-stop-circle") as SVGCircleElement;
      if (prevCircle) {
        tl.to(prevCircle, { attr: { r: 8 }, duration: segmentDuration * 0.1, ease: "power2.out" }, "<");
      }
      const prevGlow = stops[i - 1]?.querySelector(".journey-stop-glow") as SVGCircleElement;
      if (prevGlow) {
        tl.to(prevGlow, { attr: { r: 16 }, opacity: 0.1, duration: segmentDuration * 0.1 }, "<");
      }
    }

    // Hold at this stage
    tl.to({}, { duration: segmentDuration * 0.25 });
  }

  const st = ScrollTrigger.create({
    trigger: mapEl,
    start: "top 60%",
    end: "bottom 50%",
    scrub: 0.6,
    animation: tl,
  });
  triggers.push(st);

  return () => { triggers.forEach((st) => st.kill()); };
}

/** Stagger children of `.stagger-children` containers */
export function initStaggerReveals(): (() => void) {
  const reduced = prefersReducedMotion();
  const triggers: ScrollTrigger[] = [];

  document.querySelectorAll<HTMLElement>(".stagger-children").forEach((container) => {
    const children = Array.from(container.children) as HTMLElement[];
    if (!children.length) return;

    if (reduced) {
      children.forEach((c) => gsap.set(c, { opacity: 1, y: 0 }));
      return;
    }

    children.forEach((c) => gsap.set(c, { opacity: 0, y: 16 }));

    const st = ScrollTrigger.create({
      trigger: container,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(children, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: "power2.out",
        });
      },
    });
    triggers.push(st);
  });

  return () => { triggers.forEach((st) => st.kill()); };
}

/** Replace vanilla parallax with ScrollTrigger scrub */
export function initParallax(): (() => void) {
  const reduced = prefersReducedMotion();
  const triggers: ScrollTrigger[] = [];

  if (reduced || window.innerWidth < 768) {
    return () => {};
  }

  document.querySelectorAll<HTMLElement>(".parallax-image").forEach((img) => {
    const container = img.closest(".parallax-container");
    if (!container) return;

    gsap.set(img, { y: -30, scale: 1.1 });

    const st = ScrollTrigger.create({
      trigger: container,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress; // 0 → 1
        const y = -30 + 60 * progress; // -30 → 30
        const scale = 1.1 - 0.05 * progress; // 1.1 → 1.05
        gsap.set(img, { y, scale });
      },
    });
    triggers.push(st);
  });

  return () => { triggers.forEach((st) => st.kill()); };
}
