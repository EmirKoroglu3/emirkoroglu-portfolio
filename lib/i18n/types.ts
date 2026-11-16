export const locales = ["en", "tr", "de", "ru"] as const;
export type Locale = (typeof locales)[number];

export type NavId =
  | "about"
  | "stack"
  | "experience"
  | "certifications"
  | "projects"
  | "github"
  | "contact";

export type ProjectItem = {
  slug: string;
  title: string;
  description: string;
  stack: string[];
  highlights: string[];
  github?: string;
  demo?: string;
};

export type ExperienceItem = {
  company: string;
  org?: string;
  role: string;
  location: string;
  start: string;
  end: string;
  bullets: string[];
};

export type CaseStudyItem = {
  slug: string;
  /** Slug of the project this deep-dive belongs to. */
  project: string;
  title: string;
  problem: string;
  solution: string;
  technologies: string[];
  results: string[];
};

export type CertificationItem = {
  slug: string;
  title: string;
};

export type Dictionary = {
  meta: {
    htmlLang: string;
    localeName: string;
    /** Home page <title> (search result headline), in this language. */
    title: string;
    /** Home page meta description, in this language. */
    description: string;
    keywords: string[];
  };
  common: {
    contact: string;
    scroll: string;
    openMenu: string;
    closeMenu: string;
    backToTop: string;
    rights: string;
    send: string;
    sending: string;
    successMessage: string;
    github: string;
    linkedin: string;
    email: string;
    liveDemo: string;
    closeProject: string;
    openProject: string;
    cvEn: string;
    cvTr: string;
    downloadCvEn: string;
    downloadCvTr: string;
    themeLight: string;
    themeDark: string;
    language: string;
    notFoundTitle: string;
    notFoundText: string;
    backHome: string;
  };
  nav: Record<NavId, string>;
  hero: {
    badge: string;
    viewProjects: string;
    contactMe: string;
    productThinking: string;
    productText: string;
    focus: string;
    focusValue: string;
    strength: string;
    strengthValue: string;
    style: string;
    styleValue: string;
    stack: string;
    stackValue: string;
  };
  about: {
    eyebrow: string;
    title: string;
    description: string;
    positioning: string;
    positioningText: string;
    highlights: string[];
    stats: Array<{ label: string; value: string }>;
    paragraphs: string[];
  };
  tech: {
    eyebrow: string;
    title: string;
    description: string;
    tabs: { frontend: string; backend: string; database: string; tools: string };
    cardHint: string;
  };
  experience: {
    eyebrow: string;
    title: string;
    description: string;
    items: ExperienceItem[];
  };
  certifications: {
    eyebrow: string;
    title: string;
    description: string;
    viewCertificate: string;
    items: CertificationItem[];
  };
  projects: {
    eyebrow: string;
    title: string;
    description: string;
    viewDetails: string;
    backToProjects: string;
    highlights: string;
    results: string;
    techStack: string;
    sourceCode: string;
    items: ProjectItem[];
  };
  /** Deep-dive content shown on a project's detail page (matched by `project`). */
  caseStudies: {
    problem: string;
    solution: string;
    items: CaseStudyItem[];
  };
  github: {
    eyebrow: string;
    title: string;
    description: string;
    repositories: string;
    stars: string;
    updated: string;
    viewProfile: string;
    noDescription: string;
    errorTitle: string;
    errorHint: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    subject: string;
    subjectPlaceholder: string;
    message: string;
    messagePlaceholder: string;
    sendAria: string;
    errorGeneric: string;
    errorNotConfigured: string;
    errorRateLimited: string;
  };
  profile: {
    name: string;
    role: string;
    tagline: string;
    location: string;
  };
};
