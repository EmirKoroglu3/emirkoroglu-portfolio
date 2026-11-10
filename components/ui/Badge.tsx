import { cn } from "@/lib/cn";

/** Small mono tag for technologies. */
export function Badge({ className, children }: { className?: string; children: React.ReactNode }) {
  return <span className={cn("tag", className)}>{children}</span>;
}
