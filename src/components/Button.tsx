import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

// The one button. Replaces ten hand-spelled class strings. Variants follow the
// DESIGN.md rule: one primary per local group, everything else is secondary or
// ghost. States (rest, hover, press, focus, disabled) live here, nowhere else.
// Focus ring comes from the global :focus-visible rule.
type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors";

const variants: Record<Variant, string> = {
  primary:
    "bg-brass text-on-brass hover:bg-brass-bright active:bg-brass-press",
  secondary:
    "border border-line text-text hover:border-brass hover:text-brass-bright active:border-brass-dim active:text-brass",
  ghost: "text-muted hover:text-text active:text-faint",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  sm: "px-4 py-2 text-sm",
};

type ButtonProps = Omit<ComponentProps<"a">, "href" | "className"> & {
  href: string;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
};

export function Button({
  href,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`.trim();
  const a11y = disabled ? { "aria-disabled": true, tabIndex: -1 } : {};

  // Internal routes use next/link; files, external URLs and mailto stay plain anchors.
  const internal = href.startsWith("/") && !("download" in rest);
  if (internal) {
    return (
      <Link href={href} className={cls} {...a11y} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={cls} {...a11y} {...rest}>
      {children}
    </a>
  );
}
