export type Project = {
  slug: string;
  title: string;
  description: string;
  stack: string[];
  links?: { github?: string; demo?: string };
  highlights: string[];
};

export const projects: Project[] = [
  {
    slug: "fitlog",
    title: "FitLog",
    description:
      "A fitness tracking application built with Clean Architecture, separating concerns across layers for long-term maintainability and scalable feature growth.",
    stack: ["TypeScript", "C#", ".NET", "Clean Architecture", "CSS"],
    links: { github: "https://github.com/EmirKoroglu3/FitLog" },
    highlights: [
      "Layered architecture with clear domain boundaries",
      "TypeScript frontend paired with C# backend",
      "Designed for maintainability and future feature expansion",
      "MIT licensed open-source project",
    ],
  },
];
