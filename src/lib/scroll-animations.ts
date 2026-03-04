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

/** ClientJourney pinned scroll — cross-fade stages on desktop */
export function initJourneyPinned(): (() => void) {
  const reduced = prefersReducedMotion();
  const triggers: ScrollTrigger[] = [];
  const pinnedEl = document.getElementById("journey-pinned");

  if (!pinnedEl || reduced || window.innerWidth < 1024) {
    return () => {};
  }

  const cards = pinnedEl.querySelectorAll<HTMLElement>(".journey-card");
  const progressBar = pinnedEl.querySelector<HTMLElement>(".journey-progress-bar");
  const stageCount = cards.length;

  if (stageCount < 2) return () => {};

  const st = ScrollTrigger.create({
    trigger: pinnedEl,
    start: "top top",
    end: `+=${stageCount * 100}vh`,
    pin: true,
    scrub: 0.8,
    onUpdate: (self) => {
      const progress = self.progress; // 0 → 1
      const activeIndex = Math.min(
        Math.floor(progress * stageCount),
        stageCount - 1
      );

      // Update progress bar
      if (progressBar) {
        progressBar.style.height = `${progress * 100}%`;
      }

      // Cross-fade cards
      cards.forEach((card, i) => {
        if (i === activeIndex) {
          gsap.set(card, { opacity: 1 });
        } else {
          gsap.set(card, { opacity: 0 });
        }
      });
    },
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
