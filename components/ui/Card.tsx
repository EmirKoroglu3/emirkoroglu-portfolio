import { cn } from "@/lib/cn";

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("panel rounded-2xl shadow-glow transition-colors", className)}>{children}</div>
  );
}
