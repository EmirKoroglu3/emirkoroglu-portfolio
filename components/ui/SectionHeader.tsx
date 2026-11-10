import { cn } from "@/lib/cn";

/**
 * Editorial section header shared by every section below the hero:
 * a register line (`02 / PROJECTS ··· projects.ts`), then the heading with its lede.
 */
export function SectionHeader({
  index,
  eyebrow,
  file,
  title,
  description,
  className,
}: {
  index: string;
  eyebrow: string;
  file: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="section-register">
        <span>
          {index} / {eyebrow}
        </span>
        <span>{file}</span>
      </div>
      <div className={cn("section-heading", !description && "section-heading--single")}>
        <h2 className="editorial-heading text-balance">{title}</h2>
        {description ? <p className="section-lede text-pretty">{description}</p> : null}
      </div>
    </div>
  );
}
