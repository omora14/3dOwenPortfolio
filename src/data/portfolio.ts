export type ExperienceItem = {
  title: string;
  company: string;
  period: string;
  tags: string[];
  bullets: string[];
};

export type ProjectItem = {
  id: string;
  title: string;
  subtitle: string;
  tags: string[];
  github: string;
  date: string;
  highlight: boolean;
  description: string;
  longDescription: string;
  metrics: string[];
};

export type EducationItem = {
  degree: string;
  school: string;
  period: string;
  gpa: string;
};

export const profile = {
  name: "Owen Morales",
  handle: "owen95",
  roles: ["Software Engineer", "Data Scientist", "ML Engineer"],
  tagline:
    "Software Engineer & Data Scientist from Costa Rica. Building products that matter.",
  storyTitle: "From the shores of Costa Rica to the frontier of software.",
  origin: "Costa Rica",
  photo: "/pp2.jpeg",
  wallpaper: "/costarica-beach.webp",
  resume: "/Owen%20Morales%20-%20Private%20Resume.pdf",
};

export const links = {
  github: "https://github.com/omora14",
  linkedin: "https://linkedin.com/in/moralow",
  website: "https://owmora.com",
  resume: "/Owen%20Morales%20-%20Private%20Resume.pdf",
};

export const aboutParagraphs: string[] = [
  "I grew up on the Pacific coast of Costa Rica, a place that shaped my roots and gave me a deep love for this world. From early on, technology fascinated me. Before coming to the US, I dedicated two years of my life serving a mission, helping people, learning to listen, and growing in ways I never expected. My family has been the foundation of everything: they've supported, pushed, and believed in me to become not just what I want to be, but what I've always dreamed of.",
  "That journey brought me to the United States, where I'm pursuing Computer Science at BYU-Idaho while I earned an Associate's in Business Statistics at BYU. I've maintained a 3.98 GPA not because I'm chasing numbers, but because I genuinely love learning.",
  "Over the past few years I've gone from writing automation scripts at Verizon, to engineering integrations at BYU that save over $110K annually, to helping millions of FamilySearch users with reliable software, and co-founding Daily Disciple, a platform that scaled to tens of thousands of users. Data science and AI are woven into everything I build: I believe the best engineers understand both the system and the story behind the data.",
  "When I'm not writing code, you'll find me on Rainbow Six, or spending time with the people I love most. I believe in shipping fast, learning faster, and never losing sight of what matters.",
];

export const experience: ExperienceItem[] = [
  {
    title: "Software Developer",
    company: "BYU",
    period: "May 2024 - Present",
    tags: ["Python", "TypeScript", "Power BI", "Genesys", "React", "Presidio"],
    bullets: [
      "Architected a scalable data-patching workflow integrating Genesys, iPaaS, and JavaScript appending vital metadata to 2,000+ daily tickets, executing complex Python analysis enabling advanced linear regression modeling.",
      "Delivered 350+ system integrations updating 30+ Power BI dashboards across 15+ departments, assisting 100,000+ users driving data-informed strategic decisions saving $110K+ in annual operational expenditures.",
      "Formulated a secure PII-cleaning model applying Python, Microsoft Presidio, and Ollama validation, reliably sanitizing Genesys transcripts feeding Copilot auto-ticketing automated pipelines within TeamDynamix.",
      "Constructed a serverless React and TypeScript knowledge base utilizing GitHub Pages and Octokit APIs, centralizing critical internal technical documentation circumventing external database architectural dependencies.",
      "Accelerated survey delivery speeds by 93%, re-engineering 21 disparate backend workflows using TypeScript.",
    ],
  },
  {
    title: "Co-Founder",
    company: "Daily Disciple",
    period: "May 2025 - Present",
    tags: ["React", "Expo", "Node.js"],
    bullets: [
      "Spearheaded a comprehensive productivity platform reaching 18,000+ active users, securing strategic business partnerships with Fortune 500 companies modernizing widespread enterprise procedural workflows.",
      "Pitched comprehensive business models securing capital funding, subsequently hiring a dedicated engineering team driving rapid Spanish-market expansion accelerating global application user acquisition.",
      "Engineered the foundational core infrastructure utilizing React, Expo, and Node.js, establishing robust real-time tracking features surging task completion rates 76% and mitigating overall user churn 32%.",
    ],
  },
  {
    title: "CS Teaching Assistant",
    company: "Brigham Young University - Idaho",
    period: "May 2026 - Present",
    tags: ["AWS", "Docker", "Kubernetes", "HTML/CSS/JS", "CI/CD"],
    bullets: [
      "Validated cloud-native AWS, Docker, and Kubernetes architectures, enforcing strict serverless scaling compliance, optimizing computational resource allocation, and establishing industry-standard deployment practices.",
      "Mentored 100+ students navigating Cloud Development and WDD 131 Dynamic Web Fundamentals, leveraging interactive multi-level teaching strategies maximizing overall frontend coding proficiency and core understanding.",
      "Facilitated modern CI/CD best practices, streamlining submission workflows across 1,000+ automated assignments.",
    ],
  },
  {
    title: "Software Engineer",
    company: "FamilySearch",
    period: "Apr 2025 - Oct 2025",
    tags: ["C#", "Azure", "Java", "Python", "NUnit"],
    bullets: [
      "Orchestrated 100+ automated releases via C# and Azure Functions ensuring rigorous platform reliability, mitigating severe deployment risks and consistently achieving zero critical downtime for 13.7M global end-users.",
      "Transitioned outdated manual testing protocols to automated continuous integration pipelines across C#, Java, and Python architectures, successfully expanding test coverage 97% eliminating operational bottlenecks.",
      "Refactored 10,000+ lines of critical legacy code, boosting system performance 36% via optimized Azure test suites.",
    ],
  },
  {
    title: "Researcher",
    company: "CCS Global Tech",
    period: "Sep 2023 - May 2024",
    tags: ["R", "SQL", "Snowflake", "Python", "Zoho CRM"],
    bullets: [
      "Optimized complex enterprise data pipelines utilizing R, SQL, Snowflake, and Python, effectively integrating 87% of required predictive analytics models driving data-informed corporate decision-making.",
      "Overhauled Zoho CRM UI/UX architectures elevating internal staff productivity 34% across 5,000+ client records through heavily enhanced data accessibility, intuitive dashboard visualizations, and streamlined navigation.",
    ],
  },
  {
    title: "IT Tier 3 Technician",
    company: "Verizon",
    period: "Feb 2022 - Sep 2023",
    tags: ["C#", "ASP.NET", "Salesforce", "MTAS/MSAT"],
    bullets: [
      "Directed Tier 3 IT operations managing a dedicated cross-functional technical team simplifying internal operational delivery and substantially elevating baseline consumer trouble ticket resolution metrics.",
      "Programmed a custom C#/ASP.NET integration tool amplifying internal team developmental output 78% drastically reducing overall project turnaround times 34% across massive regional telecommunication deployments.",
      "Fortified core enterprise security architectures linking MTAS/MSAT with Salesforce, generating $148K in savings.",
    ],
  },
];

export const projects: ProjectItem[] = [
  {
    id: "phronesis",
    title: "Phronesis",
    subtitle: "Mobile App & AI/ML",
    tags: ["React Native", "Expo", "Node.js", "Firebase", "AssemblyAI", "TypeScript"],
    github: "https://github.com/omora14/phronesis",
    date: "Oct 2025",
    highlight: true,
    description:
      "From feeling to meaning. An AI-powered reflection app that processes real-time sentiment and delivers daily personal insights.",
    longDescription:
      "Built during BYU Hackathon, Phronesis is an Expo/React Native mobile app backed by Node.js and Firebase that processes over 1,000 user reflections. The app uses AssemblyAI for real-time sentiment analysis, delivering insights in under 5 seconds, and achieved a 41% correlation in its AI dashboards for 100+ active users.",
    metrics: [
      "100+ active users",
      "41% correlation in AI insights",
      "<5s sentiment processing",
      "1,000+ reflections processed",
    ],
  },
  {
    id: "secure-file-sync",
    title: "Secure File Sync",
    subtitle: "Systems Programming & Security",
    tags: ["Rust", "AES-256-GCM", "CLI", "Systems Programming", "Cryptography"],
    github: "https://github.com/omora14/secureFileSync",
    date: "Nov 2025",
    highlight: true,
    description:
      "Military-grade AES-256-GCM encryption for 6,000+ files with automated folder monitoring and CLI management tools.",
    longDescription:
      "A Rust-based CLI application that watches directories for changes and automatically encrypts/decrypts files using AES-256-GCM. Features robust key management, background processing, and configurable sync via API or local LAN. Decreased manual input by 87% while securing thousands of files.",
    metrics: [
      "6,000+ files secured",
      "87% reduction in manual input",
      "AES-256-GCM encryption",
      "Background sync processing",
    ],
  },
  {
    id: "centurion",
    title: "Centurion",
    subtitle: "Data Analytics & AI/ML",
    tags: ["Python", "R", "Tableau", "Power BI", "ML", "Predictive Modeling"],
    github: "",
    date: "Apr 2024",
    highlight: false,
    description:
      "Led 7 workshops on Python, R, Tableau, and Power BI for 80+ participants, uncovering $11K in annual inefficiencies.",
    longDescription:
      "A comprehensive data analytics initiative where AI/ML optimization models and reports were used to uncover operational inefficiencies worth $11,000 annually. Applied predictive modeling to drive data-informed decisions, and conducted workshops for 80+ participants on dashboard design and data pipelines.",
    metrics: [
      "$11K in savings identified",
      "80+ workshop participants",
      "7 workshops led",
      "Predictive modeling applied",
    ],
  },
  {
    id: "roomies-chore",
    title: "Roomies Chore",
    subtitle: "Mobile App & Collaboration",
    tags: ["React Native", "Expo", "TypeScript", "Firebase", "Firestore", "Expo Router"],
    github: "https://github.com/omora14/roomiesChore",
    date: "2025",
    highlight: false,
    description:
      "A collaborative roommate chore tracker built with Expo and Firebase for shared task ownership.",
    longDescription:
      "RoomiesChore is a collaborative mobile app built with React Native, Expo, and TypeScript that helps roommates create groups, assign chores, and track shared responsibilities. It includes Firebase authentication, Firestore real-time sync, due dates, priorities, and a cross-platform dashboard for iOS, Android, and web.",
    metrics: [
      "105+ commits",
      "Real-time Firestore sync",
      "Cross-platform mobile/web",
      "Group task assignment",
    ],
  },
  {
    id: "emotisphere",
    title: "Emotisphere",
    subtitle: "Data Visualization & Go",
    tags: ["Go", "Data Visualization", "NLP", "Real-time", "Maps API"],
    github: "https://github.com/omora14/emotisphere",
    date: "2025",
    highlight: false,
    description:
      "An interactive global map that visualizes emotions from social posts and text messages in real time.",
    longDescription:
      "A real-time data visualization platform built in Go that aggregates emotional sentiment from social posts and text messages and renders them on a live, interactive global map. Emotisphere transforms raw text data into geographic emotional insights, providing a unique lens on the world's collective mood.",
    metrics: [
      "Real-time sentiment mapping",
      "Global geographic visualization",
      "Social data aggregation",
      "Go backend",
    ],
  },
  {
    id: "kb-connector",
    title: "KB Connector Tool",
    subtitle: "Data Manipulation & Integration",
    tags: ["TypeScript", "Node.js", "TDX API", "Genesys", "Integration", "Automation"],
    github: "",
    date: "Feb 2025",
    highlight: false,
    description:
      "TypeScript/Node.js integration layer syncing JSON through TDX API, cutting manual processing by 88%.",
    longDescription:
      "An automated TypeScript/Node.js application that syncs knowledge base articles through the TDX API, doubling data precision. Orchestrated an automated scraper and integration layer for Genesys, and engineered a module for position-based prompt activation from real-time schedules, transforming operational flow.",
    metrics: [
      "88% reduction in manual processing",
      "Double data precision",
      "5,000+ monthly AI interactions",
      "Real-time schedule activation",
    ],
  },
  {
    id: "stardew-like",
    title: "Stardew Like",
    subtitle: "Game Development & Godot",
    tags: ["Godot", "GDScript", "2D Platformer", "Game Design", "Pixel Art"],
    github: "https://github.com/omora14/stardewLike",
    date: "2025",
    highlight: false,
    description:
      "A 2D Godot game focused on movement, coins, platforms, and clean gameplay loops.",
    longDescription:
      "Stardew Like is a 2D platformer built in Godot where players move through levels, collect coins, avoid killzones, and use moving platforms to complete objectives. The project includes pixel-art visuals, sound effects, and a clear gameplay loop, and serves as a focused game development project in GDScript.",
    metrics: [
      "Godot 4.5+",
      "GDScript gameplay systems",
      "Pixel-art platformer",
      "Level mechanics + hazards",
    ],
  },
  {
    id: "crypto-reality",
    title: "CryptoRealityCheck",
    subtitle: "Data Science & Sentiment Analysis",
    tags: ["Python", "NLP", "Sentiment Analysis", "Data Science", "Finance", "Pandas"],
    github: "https://github.com/omora14/cryptoRealityCheck",
    date: "2024",
    highlight: false,
    description:
      "Do sentiments matter in the current financial world? A Python-powered analysis of crypto market sentiment vs. price.",
    longDescription:
      "A data science project exploring the relationship between social sentiment and cryptocurrency market performance. Using Python and NLP techniques, the project analyzes whether public sentiment on social media platforms has a statistically significant correlation with price movements in crypto markets.",
    metrics: [
      "Sentiment vs. price correlation",
      "Python NLP pipeline",
      "Market data analysis",
      "Statistical modeling",
    ],
  },
  {
    id: "analysis-portfolio",
    title: "Analysis Portfolio",
    subtitle: "Data Science Collection & R",
    tags: ["R", "Data Visualization", "Exploratory Analysis", "Spatial Analysis", "Text Analysis", "Data Wrangling"],
    github: "https://omora14.github.io/analysis-portfolio/projects.html",
    date: "2024–2026",
    highlight: true,
    description:
      "A curated collection of data science projects spanning visualization, exploratory analysis, wrangling, maps, and text — mostly in R.",
    longDescription:
      "An online portfolio of selected data analysis and visualization work, grouped by theme: visualization critiques and redesigns, exploratory studies (flight delays, gun deaths, baseball programs), data wrangling pipelines, spatial maps (Costa Rica species, Idaho dams, US footprints), and text analysis. Built primarily in R as a living collection of applied data science projects.",
    metrics: [
      "20+ analyses across 5 themes",
      "Primarily R-based workflows",
      "Viz, EDA, wrangling, maps, NLP",
      "Published project gallery",
    ],
  },
];

export const education: EducationItem[] = [
  {
    degree: "B.S. in Computer Science",
    school: "Brigham Young University - Idaho",
    period: "Apr 2027 (Expected)",
    gpa: "3.98",
  },
  {
    degree: "Associate in Business Statistics",
    school: "Brigham Young University",
    period: "Apr 2024",
    gpa: "4.0",
  },
];
