const messages = {
  "os.heroSubtitle": "3D portfolio",
  "os.icons.myComputer": "My Computer",
  "os.icons.about": "About Owen",
  "os.icons.experience": "Experience",
  "os.icons.projects": "Projects",
  "os.icons.resume": "Resume.pdf",
  "os.icons.terminal": "MS-DOS Prompt",
  "os.icons.connect": "Connect",
  "os.icons.contactForm": "Contact Me",
  "os.icons.recycle": "Recycle Bin",

  "os.start.button": "Start",
  "os.start.about": "About Owen",
  "os.start.experience": "Experience",
  "os.start.projects": "Projects",
  "os.start.resume": "Resume",
  "os.start.terminal": "MS-DOS Prompt",
  "os.start.contact": "Contact",
  "os.start.contactForm": "Contact Me",
  "os.start.wallpaper": "Settings: Wallpaper",
  "os.start.shutdown": "Shut Down...",

  "os.titles.about": "About Owen.txt — Notepad",
  "os.titles.experience": "Experience.exe",
  "os.titles.projects": "Projects",
  "os.titles.resume": "Resume.pdf — Acrobat Reader 3.0",
  "os.titles.terminal": "MS-DOS Prompt",
  "os.titles.contact": "Connect — Outlook Express",
  "os.titles.contactForm": "Compose Mail — Outlook Express",
  "os.titles.myComputer": "My Computer",
  "os.titles.recycle": "Recycle Bin",

  "os.langSwitch.toEs": "ES",
  "os.langSwitch.toEn": "EN",

  "windows.about.heading": "About Owen",
  "windows.about.education": "Education",
  "windows.about.gpa": "GPA",
  "windows.contact.intro":
    "Have a project, a wild idea, or just want to talk shop?",
  "windows.contact.inbox": "Inbox",
  "windows.contact.open": "Open",
  "windows.contact.github": "GitHub",
  "windows.contact.linkedin": "LinkedIn",
  "windows.contact.website": "Website",
  "windows.contact.resume": "Resume",

  "windows.contactForm.heading": "Send a message",
  "windows.contactForm.subheading":
    "I'll reply within 24-48 hours. Fields marked * are required.",
  "windows.contactForm.name": "Name",
  "windows.contactForm.namePlaceholder": "Jane Doe",
  "windows.contactForm.email": "Email",
  "windows.contactForm.emailPlaceholder": "jane@example.com",
  "windows.contactForm.subject": "Subject",
  "windows.contactForm.subjectPlaceholder": "Let's build something",
  "windows.contactForm.message": "Message",
  "windows.contactForm.messagePlaceholder":
    "Tell me about your project, role, or wild idea...",
  "windows.contactForm.send": "Send",
  "windows.contactForm.sending": "Sending...",
  "windows.contactForm.success":
    "Message sent! Check your inbox for confirmation.",
  "windows.contactForm.error":
    "Something went wrong. Please try again or email me directly.",
  "windows.contactForm.required": "Required",
  "windows.contactForm.invalidEmail": "Please enter a valid email.",

  "windows.resume.download": "Download",
  "windows.resume.openTab": "Open in New Tab",
  "windows.resume.mobileBlockedTitle": "Resume preview unavailable on mobile",
  "windows.resume.mobileBlockedBody":
    "This embedded PDF viewer may not load reliably on mobile devices. Please open the resume in a new tab.",
  "windows.projects.techStack": "Tech Stack",
  "windows.projects.highlights": "Highlights",
  "windows.projects.openGithub": "Open on GitHub",
  "windows.projects.privateRepo":
    "This repo is private or owned by another organization. Reach out via Contact for a walkthrough.",

  "windows.myComputer.heading": "My Computer",
  "windows.myComputer.driveC": "Local Disk (C:)",
  "windows.myComputer.driveD": "Projects (D:)",
  "windows.myComputer.driveE": "Memories (E:)",

  "windows.recycle.empty": "Recycle Bin is empty.",

  "popups.welcome.title": "Welcome to Owen95",
  "popups.welcome.body":
    "Drag windows around. Click icons. Try the Start menu. This is a real OS… kinda.",

  "terminal.prompt": "C:\\OWEN>",

  "resetView.button": "Reset View",
  "boot.enter": "Boot?",
  "boot.exit": "Exit",
} as const;

export default messages;
export type MessageKey = keyof typeof messages;
