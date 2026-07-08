import { cn } from "@/lib/cn";

const variantClasses = {
  primary:
    "border-glass bg-glass-strong text-foreground shadow-soft hover:bg-glass-hover hover:border-glass-strong",
  secondary:
    "border-glass bg-glass-subtle text-foreground hover:bg-glass-hover hover:border-glass-strong",
  ghost: "bg-transparent text-muted hover:text-foreground hover:bg-glass-subtle",
} as const;

const sizeClasses = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-[0.95rem]",
  lg: "h-12 px-5 text-[1rem]",
} as const;

export function Button({
  asChild,
  href,
  onClick,
  type,
  variant = "primary",
  size = "md",
  className,
  children,
  target,
  rel,
  "aria-label": ariaLabel,
}: {
  asChild?: boolean;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: keyof typeof variantClasses;
  size?: keyof typeof sizeClasses;
  className?: string;
  children: React.ReactNode;
  target?: string;
  rel?: string;
  "aria-label"?: string;
}) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-xl font-medium tracking-tightish transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
    "disabled:opacity-50 disabled:pointer-events-none",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if (href) {
    return (
      <a className={classes} href={href} target={target} rel={rel} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }

  if (asChild) {
    return <span className={classes}>{children}</span>;
  }

  return (
    <button className={classes} onClick={onClick} type={type ?? "button"} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
