import {
  siDocker,
  siDotnet,
  siFlask,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPostman,
  siPython,
  siReact,
  siTailwindcss,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";

/**
 * `icon` is a simple-icons brand mark. C#, SQL Server and REST have no brand
 * icon there, so they render a generic glyph (`fallback`).
 */
export type Skill = { name: string; icon?: SimpleIcon; fallback?: "code" | "database" | "api" };

export const skills = {
  frontend: [
    { name: "React", icon: siReact },
    { name: "Next.js", icon: siNextdotjs },
    { name: "TypeScript", icon: siTypescript },
    { name: "JavaScript", icon: siJavascript },
    { name: "Tailwind CSS", icon: siTailwindcss },
    { name: "HTML & CSS", icon: siHtml5 },
  ],
  backend: [
    { name: "C#", fallback: "code" },
    { name: ".NET", icon: siDotnet },
    { name: "Node.js", icon: siNodedotjs },
    { name: "Python", icon: siPython },
    { name: "Flask", icon: siFlask },
    { name: "REST APIs", fallback: "api" },
  ],
  database: [
    { name: "SQL Server", fallback: "database" },
    { name: "MySQL", icon: siMysql },
    { name: "PostgreSQL", icon: siPostgresql },
  ],
  tools: [
    { name: "Git", icon: siGit },
    { name: "GitHub", icon: siGithub },
    { name: "Docker", icon: siDocker },
    { name: "Postman", icon: siPostman },
  ],
} satisfies Record<string, Skill[]>;
