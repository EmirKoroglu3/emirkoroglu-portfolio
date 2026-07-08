import { cn } from "@/lib/cn";

export function Badge({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border-glass bg-glass-subtle px-3 py-1 text-xs text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
