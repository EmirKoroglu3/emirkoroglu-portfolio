export type CaseStudy = {
  slug: string;
  title: string;
  problem: string;
  solution: string;
  technologies: string[];
  results: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "fitlog-clean-architecture",
    title: "FitLog: Clean Architecture for a fitness product",
    problem:
      "Fitness tracking apps often start simple but become hard to maintain as features grow. Without clear layer separation, business logic, data access, and UI concerns get tangled, slowing development and increasing bugs.",
    solution:
      "FitLog was structured with Clean Architecture principles: distinct layers for domain logic, application services, infrastructure, and presentation. TypeScript handles the frontend experience while C# powers the backend with a scalable foundation.",
    technologies: ["TypeScript", "C#", ".NET", "Clean Architecture", "CSS"],
    results: [
      "Clear separation of concerns across application layers",
      "Easier to extend with new fitness tracking features",
      "More maintainable codebase aligned with enterprise patterns",
      "Open-source reference for layered architecture practice",
    ],
  },
  {
    slug: "enterprise-hospitality",
    title: "Enterprise development in hospitality & tourism",
    problem:
      "Large hospitality companies operate across multiple countries with complex business processes. Software must be reliable, secure, and aligned with real operational workflows, not just technically correct.",
    solution:
      "Working at ATG Hospitality and Anex Tour, I combine development skills with business process understanding. I focus on secure coding (OWASP), clean .NET patterns, and building solutions that support teams across international operations.",
    technologies: ["C#", ".NET", "SQL Server", "REST APIs", "OWASP"],
    results: [
      "Production experience in enterprise hospitality software",
      "Stronger bridge between business needs and technical execution",
      "Practical secure coding mindset from OWASP training",
      "Cross-functional collaboration in fast-paced environments",
    ],
  },
];
