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
  {
    slug: "todo-assistant",
    title: "Todo Assistant",
    description:
      "A Python-based task management assistant, experimenting with backend logic, data handling, and practical full stack patterns for everyday productivity tools.",
    stack: ["Python", "Flask", "HTML", "JavaScript"],
    links: { github: "https://github.com/EmirKoroglu3/todo_assistantt" },
    highlights: [
      "Backend-focused Python application",
      "Practical CRUD and task management flows",
      "Foundation for API integrations and assistant-style features",
      "Hands-on experimentation with full stack structures",
    ],
  },
  {
    slug: "portfolio",
    title: "Developer Portfolio",
    description:
      "A premium, production-quality portfolio built with Next.js App Router, showcasing projects, experience, and GitHub activity with a SaaS-inspired design system.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    links: { github: "https://github.com/EmirKoroglu3" },
    highlights: [
      "Dark-first design system with glassmorphism and motion",
      "GitHub API integration with loading and error states",
      "Fully responsive across mobile, tablet, and desktop",
      "SEO, accessibility, and performance optimizations",
    ],
  },
];
