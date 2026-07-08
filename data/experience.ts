export type ExperienceItem = {
  company: string;
  org?: string;
  role: string;
  location?: string;
  start: string;
  end: string;
  bullets: string[];
};

export const experience: ExperienceItem[] = [
  {
    company: "ATG Hospitality",
    org: "Anex Tour",
    role: "Junior Software Developer",
    location: "Antalya, Turkey",
    start: "May 2025",
    end: "Present",
    bullets: [
      "Developing and maintaining enterprise web applications in a hospitality and tourism environment",
      "Collaborating with cross-functional teams on business-driven software solutions",
      "Applying clean architecture and secure coding practices in production workflows",
      "Supporting digital systems used across international operations",
    ],
  },
  {
    company: "ATG Hospitality",
    org: "Anex Tour",
    role: "Software Developer Intern",
    location: "Antalya, Turkey",
    start: "Feb 2025",
    end: "May 2025",
    bullets: [
      "Gained hands-on experience in .NET and full stack development within enterprise teams",
      "Contributed to internal tools and application support processes",
      "Participated in code reviews, troubleshooting, and business process analysis",
      "Built foundational skills in scalable backend and frontend development",
    ],
  },
];
