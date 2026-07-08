import { cn } from "@/lib/cn";

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow ? (
        <div className="text-xs font-medium tracking-[0.2em] text-faint">{eyebrow}</div>
      ) : null}
      <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tightish text-foreground md:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-pretty text-[1.05rem] text-muted">{description}</p>
      ) : null}
    </div>
  );
}
