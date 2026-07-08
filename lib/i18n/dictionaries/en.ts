import type { Dictionary } from "../types";

export const en: Dictionary = {
  meta: {
    htmlLang: "en",
    localeName: "English",
    keywords: [
      "Emir Köroğlu",
      "Full Stack Developer",
      "React",
      "Next.js",
      "C#",
      ".NET",
      "portfolio",
      "web developer",
      "Antalya",
    ],
  },
  common: {
    contact: "Contact",
    scroll: "Scroll",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    backToTop: "Back to top",
    rights: "All rights reserved.",
    send: "Send",
    sending: "Sending…",
    successMessage: "Message sent. I'll get back to you soon.",
    github: "GitHub",
    linkedin: "LinkedIn",
    email: "Email",
    liveDemo: "Live Demo",
    closeProject: "Close project",
    openProject: "Open",
    cvEn: "CV (EN)",
    cvTr: "CV (TR)",
    downloadCvEn: "Download English CV",
    downloadCvTr: "Download Turkish CV",
    themeLight: "Light mode",
    themeDark: "Dark mode",
    language: "Language",
  },
  nav: {
    about: "About",
    stack: "Tech",
    experience: "Experience",
    certifications: "Certifications",
    projects: "Projects",
    "case-studies": "Case Studies",
    github: "GitHub",
    contact: "Contact",
  },
  hero: {
    badge: "Open to opportunities",
    viewProjects: "View Projects",
    contactMe: "Contact Me",
    productThinking: "PRODUCT THINKING",
    productText:
      "I build production-ready, scalable web applications. I ship with C#, .NET, TypeScript, and React, focusing on clean architecture and secure coding.",
    focus: "Focus",
    focusValue: "Scalable products",
    strength: "Strength",
    strengthValue: "Problem solving",
    style: "Style",
    styleValue: "Minimal, premium UI",
    stack: "Stack",
    stackValue: "Full Stack",
  },
  about: {
    eyebrow: "ABOUT",
    title: "Enterprise experience. Product-quality execution.",
    description:
      "Junior Software Developer at ATG Hospitality, building modern full stack products with an engineering-first mindset.",
    positioning: "POSITIONING",
    positioningText:
      "Akdeniz University graduate (Management Information Systems, 2025). I care about clean architecture, secure coding, and building software that solves real business problems.",
    highlights: [
      "Clean component architecture",
      "Premium micro-interactions",
      "Responsive by default",
      "SEO and performance focus",
    ],
    stats: [
      { label: "Experience", value: "2+ years" },
      { label: "Public projects", value: "3" },
      { label: "Education", value: "Akdeniz Uni." },
      { label: "Certifications", value: "10+" },
    ],
    paragraphs: [
      "I am a Full Stack Developer based in Antalya, currently working as a Junior Software Developer at ATG Hospitality and Anex Tour. I build web applications with a focus on clean architecture, maintainability, and real business value.",
      "My background combines enterprise software environments with hands-on development in C#, .NET, TypeScript, React, Next.js, and Python. I enjoy turning business requirements into reliable, user-focused digital products.",
      "I graduated from Akdeniz University (Management Information Systems, 2025) and continuously improve through production work and structured learning, including certifications in .NET, Clean Architecture, OWASP secure coding, and full stack web development.",
    ],
  },
  tech: {
    eyebrow: "TECH STACK",
    title: "Modern tooling, clean execution.",
    description:
      "An interactive snapshot of the technologies I use to ship scalable, production-ready web applications.",
    tabs: {
      frontend: "Frontend",
      backend: "Backend",
      database: "Database",
      tools: "Tools",
    },
    cardHint: "Hover for subtle glow, premium, not flashy.",
  },
  experience: {
    eyebrow: "EXPERIENCE",
    title: "Enterprise roles with real-world impact.",
    description:
      "Production experience in hospitality and tourism, building reliable software with clean architecture and secure coding practices.",
    items: [
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
    ],
  },
  certifications: {
    eyebrow: "CERTIFICATIONS",
    title: "Verified learning with real credentials.",
    description:
      "Selected Udemy certifications from my LinkedIn profile, focused on full stack development, architecture, and secure coding.",
    viewCertificate: "View certificate",
    items: [
      { slug: "owasp-secure-coding", title: "Secure Coding Based on OWASP" },
      { slug: "fullstack-web", title: "Full Stack Web Development from Scratch" },
      { slug: "csharp-oop-layers", title: "C# OOP Layered Architecture" },
      { slug: "frontend-web", title: "Frontend Web Development (Hands-on)" },
      { slug: "net8-clean-architecture", title: ".NET 8 API/Web | NLayer & Clean Architecture" },
      { slug: "sql-applications", title: "SQL with Practical Applications" },
      { slug: "python-bootcamp", title: "The Complete Python Bootcamp" },
      { slug: "csharp-fundamentals", title: "C# Fundamentals" },
    ],
  },
  projects: {
    eyebrow: "FEATURED PROJECTS",
    title: "Visually strong. Technically grounded.",
    description:
      "A premium grid with polished micro-interactions and a fast project preview experience.",
    items: [
      {
        slug: "fitlog",
        title: "FitLog",
        description:
          "A fitness tracking application built with Clean Architecture, separating concerns across layers for long-term maintainability and scalable feature growth.",
        stack: ["TypeScript", "C#", ".NET", "Clean Architecture", "CSS"],
        github: "https://github.com/EmirKoroglu3/FitLog",
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
        github: "https://github.com/EmirKoroglu3/todo_assistantt",
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
        github: "https://github.com/EmirKoroglu3",
        highlights: [
          "Dark-first design system with glassmorphism and motion",
          "GitHub API integration with loading and error states",
          "Fully responsive across mobile, tablet, and desktop",
          "SEO, accessibility, and performance optimizations",
        ],
      },
      {
        slug: "enterprise-operations-platform",
        title: "Enterprise Operations Platform",
        description:
          "An operations platform designed for maintainable, modular enterprise workflows and long-term iteration.",
        stack: ["C#", ".NET", "SQL", "Clean Architecture"],
        github: "https://github.com/EmirKoroglu3/enterprise-operations-platform",
        highlights: [
          "Modular structure with clear boundaries",
          "Production-friendly validation and error handling",
          "Architecture that scales with new features",
          "Readable, well-documented codebase",
        ],
      },
    ],
  },
  caseStudies: {
    eyebrow: "CASE STUDIES",
    title: "How I approach complex product problems.",
    description:
      "Selected deep-dives into architecture decisions, enterprise constraints, and measurable outcomes, beyond a simple project list.",
    problem: "PROBLEM",
    solution: "SOLUTION",
    items: [
      {
        slug: "fitlog-clean-architecture",
        title: "FitLog: A maintainable fitness platform built with Clean Architecture",
        problem:
          "Most fitness apps start with a few screens and grow organically. Over time, workout logic ends up inside UI components, database queries leak into controllers, and every new feature becomes harder to ship. The cost is rarely visible on day one, it compounds as the product scales, onboarding slows down, and regressions multiply.",
        solution:
          "I structured FitLog around Clean Architecture with explicit boundaries: a domain layer that owns business rules, application services that orchestrate use cases, infrastructure for persistence and external APIs, and a TypeScript presentation layer. The C#/.NET backend exposes a stable API surface while the frontend focuses on experience, so each layer can evolve independently without breaking the whole system.",
        technologies: ["TypeScript", "C#", ".NET", "Clean Architecture", "CSS"],
        results: [
          "Domain, application, infrastructure, and presentation layers with clear ownership",
          "New tracking features (meals, workouts, progress) without rewriting existing modules",
          "Testable business logic isolated from frameworks and UI concerns",
          "Open-source reference for enterprise-grade layering in a real product context",
        ],
      },
      {
        slug: "enterprise-hospitality",
        title: "Enterprise software for hospitality & tourism operations",
        problem:
          "International hotel and tour operators rely on mission-critical systems for reservations, operations, finance, and compliance. A single defect can disrupt daily workflows for hundreds of staff. Software in this environment must balance strict security, legacy integrations, and fast business change, while remaining understandable for non-technical stakeholders.",
        solution:
          "At ATG Hospitality and Anex Tour, I work on production .NET applications used in real operational environments. I translate business requirements into maintainable C# solutions, apply OWASP secure-coding practices, integrate with SQL Server and REST services, and collaborate with cross-functional teams across international offices to deliver reliable features on schedule.",
        technologies: ["C#", ".NET", "SQL Server", "REST APIs", "OWASP"],
        results: [
          "Hands-on production experience in enterprise hospitality and tourism systems",
          "Strong ability to connect business workflows with clean, secure implementation",
          "Applied OWASP principles to reduce common web application vulnerabilities",
          "Effective collaboration with product, QA, and operations in high-tempo delivery cycles",
        ],
      },
    ],
  },
  github: {
    eyebrow: "GITHUB",
    title: "Live stats with resilient states.",
    description:
      "GitHub API integration with loading, error handling, and a clean data mapping.",
    repositories: "REPOSITORIES",
    stars: "STARS",
    followers: "FOLLOWERS",
    following: "FOLLOWING",
    topLanguages: "TOP LANGUAGES",
    errorTitle: "GitHub data unavailable",
    errorHint: "You can set GITHUB_USERNAME in your environment.",
    languages: ["C#", ".NET", "React"],
  },
  contact: {
    eyebrow: "CONTACT",
    title: "A premium, simple contact flow.",
    description:
      "Send a message or reach out via social links. Built with proper states and accessible interactions.",
    name: "Name",
    namePlaceholder: "Your name",
    email: "Email",
    emailPlaceholder: "you@example.com",
    subject: "Subject",
    subjectPlaceholder: "What is this about?",
    message: "Message",
    messagePlaceholder: "Tell me what you're building…",
    sendAria: "Send message",
    errorGeneric: "Could not send your message. Please try again later.",
    errorNotConfigured: "Email service is not configured yet. Please contact me directly via email.",
    errorRateLimited: "Too many messages sent. Please wait a few minutes and try again.",
  },
  profile: {
    name: "Emir Köroğlu",
    role: "Full Stack Developer",
    tagline: "Building modern, scalable and user-focused web applications.",
    location: "Antalya, Turkey",
  },
};
