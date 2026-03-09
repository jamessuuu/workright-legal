import { tv } from "tailwind-variants";

export const button = tv({
  base: [
    "inline-flex items-center justify-center gap-2.5",
    "font-semibold text-[0.9375rem] leading-none tracking-[0.01em]",
    "rounded-full border-[1.5px] border-transparent",
    "cursor-pointer no-underline",
    "relative overflow-hidden",
    "transition-all duration-[var(--duration-normal)] ease-[var(--ease-out-expo)]",
    "active:translate-y-[-1px] active:scale-[0.98]",
  ],
  variants: {
    variant: {
      primary: [
        "bg-[var(--color-accent)] text-white border-[var(--color-accent)]",
        "shadow-[0_2px_8px_var(--color-accent-glow)]",
        "btn-sweep",
        "hover:bg-transparent hover:border-[var(--color-primary)] hover:text-white",
        "hover:translate-y-[-3px] hover:shadow-[var(--shadow-xl)]",
      ],
      primaryDark: [
        "bg-[var(--color-accent)] text-white border-[var(--color-accent)]",
        "shadow-[0_4px_16px_var(--color-accent-glow)]",
        "hover:bg-[var(--color-accent-light)] hover:border-[var(--color-accent-light)]",
        "hover:translate-y-[-3px] hover:shadow-[0_8px_32px_var(--color-accent-glow)]",
      ],
      outline: [
        "bg-transparent text-[var(--color-text)] border-[var(--color-border)]",
        "hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]",
        "hover:bg-[var(--color-accent-subtle)] hover:translate-y-[-3px]",
      ],
      outlineDark: [
        "bg-transparent text-[var(--color-text-on-dark)] border-white/20",
        "hover:border-[var(--color-accent)] hover:text-[var(--color-accent-light)]",
        "hover:translate-y-[-3px]",
      ],
      ghost: [
        "bg-transparent text-[var(--color-text-secondary)] border-transparent",
        "!px-5 !py-2",
        "hover:text-[var(--color-accent)]",
      ],
    },
    size: {
      default: "px-9 py-4",
      sm: "px-6 py-3 text-sm",
      xs: "px-3 py-2 text-xs",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
  },
});

export type ButtonVariant = "primary" | "primaryDark" | "outline" | "outlineDark" | "ghost";
export type ButtonSize = "default" | "sm" | "xs";
