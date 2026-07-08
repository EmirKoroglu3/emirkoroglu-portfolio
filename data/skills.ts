import {
  Boxes,
  Braces,
  Database,
  GitBranch,
  FolderGit2,
  LayoutGrid,
  Server,
  Wrench,
} from "lucide-react";

export const skills = {
  frontend: [
    { name: "React", icon: LayoutGrid },
    { name: "Next.js", icon: Boxes },
    { name: "TypeScript", icon: Braces },
    { name: "JavaScript", icon: Braces },
    { name: "Tailwind CSS", icon: LayoutGrid },
    { name: "HTML & CSS", icon: LayoutGrid },
  ],
  backend: [
    { name: "C#", icon: Braces },
    { name: ".NET", icon: Server },
    { name: "Node.js", icon: Server },
    { name: "Python", icon: Server },
    { name: "Flask", icon: Server },
    { name: "REST APIs", icon: Server },
  ],
  database: [
    { name: "SQL Server", icon: Database },
    { name: "MySQL", icon: Database },
    { name: "PostgreSQL", icon: Database },
  ],
  tools: [
    { name: "Git", icon: GitBranch },
    { name: "GitHub", icon: FolderGit2 },
    { name: "Docker", icon: Wrench },
    { name: "Postman", icon: Wrench },
  ],
} as const;
