import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer" | "main" | "nav" | "article";
};

// Centered content column. One width, used everywhere, so the page reads
// like a single document rather than a stack of unrelated bands.
export function Container({
  children,
  className = "",
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag className={`mx-auto w-full max-w-5xl px-6 sm:px-8 ${className}`}>
      {children}
    </Tag>
  );
}
