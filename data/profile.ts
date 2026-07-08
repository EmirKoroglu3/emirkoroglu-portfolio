export const profile = {
  name: "Emir Köroğlu",
  role: "Full Stack Developer",
  location: "Antalya, Turkey",
  tagline: "Building modern, scalable and user-focused web applications.",
  avatar: {
    src: "/images/profile.png",
    alt: "Emir Köroğlu",
  },
  about: [
    "I am a Full Stack Developer based in Antalya, currently working as a Junior Software Developer at ATG Hospitality and Anex Tour. I build web applications with a focus on clean architecture, maintainability, and real business value.",
    "My background combines enterprise software environments with hands-on development in C#, .NET, TypeScript, React, Next.js, and Python. I enjoy turning business requirements into reliable, user-focused digital products.",
    "I graduated from Akdeniz University (Management Information Systems, 2025) and continuously improve through production work and structured learning, including certifications in .NET, Clean Architecture, OWASP secure coding, and full stack web development.",
  ],
  links: {
    github: "https://github.com/EmirKoroglu3",
    linkedin: "https://www.linkedin.com/in/emir-koroglu/",
    email: "mailto:korogluemir32@gmail.com",
    emailDisplay: "korogluemir32@gmail.com",
  },
  education: {
    school: "Akdeniz University",
    degree: "Management Information Systems",
    period: "2021 - 2025",
    location: "Antalya, Turkey",
  },
  cv: {
    en: {
      label: "CV (EN)",
      href: "/cv/emir-koroglu-cv-en.pdf",
    },
    tr: {
      label: "CV (TR)",
      href: "/cv/emir-koroglu-cv-tr.pdf",
    },
  },
} as const;
