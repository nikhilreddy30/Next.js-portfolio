export const personalInfo = {
  name: "Yalaka Nikhil Reddy",
  role: "Full-Stack Web Developer & Computer Science Student",
  tagline: "Computer Science Engineering student with hands-on experience in web application development. Proficient in Java, Python, and modern web technologies, with practical exposure to MERN and PHP–MySQL applications. Eager to apply problem-solving skills and learn industry-level software development practices.",
  focus: "Open to full-stack development, web application, and software engineering roles where I can apply my MERN stack expertise and contribute to meaningful projects.",
  email: "yalakanikhil30@gmail.com",
  linkedin: "https://www.linkedin.com/in/yalaka-nikhil-reddy",
  github: "https://github.com/YNikhil188",
  resumeUrl: "/resume.pdf",
};

export const stats = [
  { value: 3, suffix: "+", label: "Major Projects" },
  { value: 4, suffix: "+", label: "Certifications" },
  { value: 8.5, suffix: "", label: "CGPA" },
  { value: 10, suffix: "/10", label: "GPA (SSC)" },
];

export const about = {
  summary: "I am a Computer Science Engineering student at SIMATS with a passion for building robust, full-stack web applications. My experience spans across MERN stack development, Java, Python, and database design. I combine hands-on technical skills with critical thinking to solve real-world problems. Currently focused on mastering modern web technologies and cloud practices while contributing to meaningful projects that have tangible impact.",
  highlights: [
    "Developed BugCrew, a MERN-based bug tracking system with role-based access control, authentication, and workflow management serving multiple users and admins.",
    "Built Xceltics, an interactive analytics platform with REST APIs, JWT authentication, and real-time data visualization using React, Node.js, and MongoDB.",
    "Created CarRento, a responsive car rental management system with vehicle listings, booking functionality, and secure backend integration using PHP and MySQL.",
    "Proficient in Java, Python, JavaScript, and HTML/CSS with expertise in MERN stack and relational databases.",
    "Completed Oracle Java Foundation, IBM SQL and Relational Databases, and Oracle Cloud Database Services certifications.",
    "Strong fundamentals in version control, critical thinking, and data-driven decision-making.",
  ],
};

export interface Experience {
  company: string;
  role: string;
  period: string;
  type: "work" | "education";
  summary: string;
  bullets: string[];
}

export const experiences: Experience[] = [
  {
    company: "SIMATS ENGINEERING",
    role: "Bachelor of Engineering in Computer Science",
    period: "Aug 2022 - Present",
    type: "education",
    summary: "Pursuing B.E in Computer Science with focus on full-stack development and modern web technologies.",
    bullets: [
      "CGPA: 8.5",
      "Coursework: Data Structures, Web Development, Database Management, Software Engineering",
      "Active in technical projects and hands-on learning of industry practices",
    ],
  },
  {
    company: "Narayana Junior College",
    role: "Intermediate in MPC",
    period: "May 2022",
    type: "education",
    summary: "Completed intermediate education with strong foundation in Mathematics, Physics, and Chemistry.",
    bullets: [
      "Marks: 874/1000 (87%)",
    ],
  },
  {
    company: "City Central School",
    role: "Secondary School Certificate",
    period: "May 2020",
    type: "education",
    summary: "Completed secondary education with excellent academic performance.",
    bullets: [
      "GPA: 10/10",
    ],
  },
];

export interface Project {
  slug: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  impact: string;
  role: string;
  timeline?: string;
  complexity: string;
  tech: string[];
  images: string[];
  github: string;
  live?: string;
}

export const projects: Project[] = [
  {
    slug: "bugcrew",
    title: "BugCrew - Bug Tracking System",
    category: "Full-Stack Web Application",
    summary: "A web-based bug tracking system supporting role-based access for users and admins with CRUD operations and workflow management.",
    description: "Developed a comprehensive bug tracking system using the MERN stack with role-based access control for users and administrators. Implemented full CRUD operations, user authentication, and basic workflow management to efficiently track and resolve issues. Worked on API integration, debugging, and performance optimization.",
    impact: "Demonstrates full-stack proficiency with practical implementation of authentication, database design, and user role management in a production-like application.",
    role: "Full-Stack Developer",
    timeline: "Aug 2025 - Sep 2025",
    complexity: "Role-based access control, authentication, CRUD operations, API integration, and performance optimization",
    images: [],
    tech: ["MongoDB", "Express.js", "React", "Node.js", "JWT", "REST APIs"],
    github: "https://github.com/YNikhil188/bugcrew",
    live: "https://bugcrew.vercel.app",
  },
  {
    slug: "xceltics",
    title: "Xceltics - Excel Analytics Platform",
    category: "Full-Stack Analytics Application",
    summary: "Interactive dashboards and charts for structured data visualization with secure file handling and user authentication.",
    description: "Built an interactive analytics platform that visualizes structured data and generates actionable insights. Implemented user authentication using JWT, secure file handling, and comprehensive data processing through backend APIs. Created interactive dashboards and charts using Chart.js for effective data representation.",
    impact: "Shows proficiency in end-to-end application flow, REST API development, database handling, and interactive UI design for data visualization.",
    role: "Full-Stack Developer",
    timeline: "May 2025 - July 2025",
    complexity: "JWT authentication, file handling, data processing, interactive dashboards, and API integration",
    images: [],
    tech: ["React", "Node.js", "Express.js", "MongoDB", "Chart.js", "JWT"],
    github: "https://github.com/YNikhil188/xceltics",
    live: "https://xceltics.vercel.app",
  },
  {
    slug: "carrento",
    title: "CarRento - Car Rental Website",
    category: "Full-Stack Web Application",
    summary: "A responsive car rental management system with vehicle listings, booking functionality, and user authentication.",
    description: "Built a complete car rental management platform featuring vehicle listings, booking functionality, and secure user authentication. Performed comprehensive form validation, session handling, and CRUD operations to ensure secure and reliable data flow. Focused on clean UI design, efficient database design, and seamless backend integration.",
    impact: "Demonstrates proficiency in full-stack web development with PHP and MySQL, including form validation, session management, and responsive UI design.",
    role: "Full-Stack Developer",
    timeline: "Nov 2024 - Jan 2025",
    complexity: "Form validation, session handling, CRUD operations, database design, and responsive UI",
    images: [],
    tech: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"],
    github: "https://github.com/YNikhil188/carrento",
  },
];

export const skillCategories = [
  {
    title: "Programming Languages",
    description: "Core programming languages for backend and general-purpose development.",
    skills: ["Java", "Python", "JavaScript", "PHP"],
  },
  {
    title: "Frontend Technologies",
    description: "Web technologies and frameworks for building responsive user interfaces.",
    skills: ["HTML5", "CSS3", "JavaScript", "React", "Tailwind CSS"],
  },
  {
    title: "Backend & Frameworks",
    description: "Server-side technologies and frameworks for API development and backend systems.",
    skills: ["Node.js", "Express.js", "PHP", "REST APIs", "JWT"],
  },
  {
    title: "Databases & Storage",
    description: "Database technologies for data management and persistence.",
    skills: ["MySQL", "MongoDB", "Database Design"],
  },
  {
    title: "Developer Tools & Practices",
    description: "Version control, tools, and best practices for professional development.",
    skills: ["Git", "GitHub", "npm", "ESLint", "Responsive Design", "Form Validation", "Session Management"],
  },
  {
    title: "Soft Skills",
    description: "Professional competencies and approach to problem-solving.",
    skills: ["Critical Thinking", "Data-Driven Decision Making", "Project Ownership", "Problem Solving", "Team Collaboration"],
  },
];

export const chatSuggestions = [
  "Tell me about BugCrew - your bug tracking system",
  "What technologies did you use in Xceltics?",
  "How did you build the CarRento platform?",
  "What certifications do you have?",
  "What are your key skills as a developer?",
];
