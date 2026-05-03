# 📱 Yalaka Nikhil Reddy - Full-Stack Developer Portfolio

A production-grade Next.js portfolio showcasing full-stack web development expertise with modern technologies including MERN stack, PHP-MySQL, and cloud deployment.

Built with **Next.js 16**, this portfolio combines a polished interactive experience with a recruiter-friendly showcase of web development projects, technical skills, and professional journey.

---

## ✨ Portfolio Features

### 🎯 Hero Section
- **Personal Introduction**: Yalaka Nikhil Reddy - Full-Stack Web Developer & CSE Student
- **Live Stats**: 3+ Projects, 4+ Certifications, 8.5 CGPA, 10/10 GPA
- **Call-to-Actions**: View Projects, Resume Download, AI Twin Chat
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Professional Tagline**: "Computer Science Engineering student with hands-on experience in web application development"

### 👤 About Section
- **Professional Overview**: Full-stack developer profile with MERN stack expertise
- **Education**: B.E in Computer Science (SIMATS, 8.5 CGPA)
- **Achievements**: BugCrew, Xceltics, CarRento projects
- **Focus Areas**: Backend systems, full-stack applications, database design
- **Recognition**: Oracle Java, IBM SQL, Oracle Cloud certifications
- **Sticky Header**: Profile section stays visible while scrolling

### 💼 Experience Section
- **Education Timeline**:
  - Bachelor of Engineering in CS (SIMATS) - Aug 2022 to Present
  - Intermediate in MPC - May 2022 (87%)
  - Secondary School Certificate - May 2020 (10/10 GPA)
- **Interactive Timeline**: Animated progress bar that tracks scroll position
- **Experience Cards**: Each entry includes company, role, timeline, and key achievements
- **Visual Indicators**: Animated timeline circles and progress tracking

### 🛠️ Projects Section
- **Featured Projects**:
  1. **BugCrew** - MERN Bug Tracking System (Aug-Sep 2025)
     - Tech: MongoDB, Express.js, React, Node.js, JWT
     - Live: bugcrew.vercel.app
     - Features: Role-based access, CRUD operations, authentication
  
  2. **Xceltics** - Excel Analytics Platform (May-July 2025)
     - Tech: React, Node.js, Express.js, MongoDB, Chart.js, JWT
     - Live: xceltics.vercel.app
     - Features: Data visualization, API integration, secure file handling
  
  3. **CarRento** - Car Rental Management System (Nov 2024-Jan 2025)
     - Tech: HTML5, CSS3, JavaScript, PHP, MySQL
     - Features: Vehicle listings, booking, form validation, session management

- **Project Showcase**:
  - Image carousels with zoom capability
  - Technology tags
  - GitHub links
  - Live demo links (where available)
  - Category filtering (All, Full-Stack, Frontend, Backend)
  - Responsive layout with alternating left/right positioning

### 🎓 Skills Section
Organized into 6 comprehensive categories:

1. **Programming Languages**: Java, Python, JavaScript, PHP
2. **Frontend Technologies**: HTML5, CSS3, JavaScript, React, Tailwind CSS
3. **Backend & Frameworks**: Node.js, Express.js, PHP, REST APIs, JWT
4. **Databases & Storage**: MySQL, MongoDB, Database Design
5. **Developer Tools & Practices**: Git, GitHub, npm, Responsive Design, Session Management
6. **Soft Skills**: Critical Thinking, Problem Solving, Project Ownership, Team Collaboration

### 🤖 AI Twin Chat
- Context-aware chatbot integrated as floating widget
- Trained on your portfolio data
- Answers questions about projects, skills, and experience
- Seamless conversational interface

### 📨 Contact Section
- **Dual Panel Layout**:
  - Left: Social links (Email, LinkedIn, GitHub) + Resume download
  - Right: Contact form with validation
- **Form Fields**: Name, Email, Reason (dropdown), Message
- **Honeypot Protection**: Anti-spam field
- **Email Integration**: Powered by Resend API
- **Real-time Validation**: Client-side and server-side checks

### ✨ Special Effects
- **Fluid Cursor**: Custom animated cursor following mouse
- **Glassmorphism Design**: Translucent cards with backdrop blur
- **3D Card Tilt**: Hover effects on image cards
- **Scroll Animations**: Reveal animations on scroll
- **Dark/Light Theme**: Adaptive theming with `next-themes`
- **Performance**: Optimized animations with Framer Motion

---

## 🖥️ Technology Stack

### Frontend
- **Next.js 16** - App Router, hybrid rendering
- **React 18** - UI components
- **TypeScript** - Type safety & maintainability
- **Tailwind CSS v4** - Utility-first styling
- **Framer Motion** - Advanced animations
- **Radix UI / Shadcn UI** - Accessible components

### Backend & APIs
- **Node.js** - Runtime
- **Express.js** - Backend framework (in projects)
- **REST APIs** - API design

### Databases (Project Experience)
- **MongoDB** - NoSQL database
- **MySQL** - Relational database
- **PostgreSQL** - Advanced relational DB

### DevOps & Deployment
- **Vercel** - Hosting & deployment
- **Git/GitHub** - Version control
- **Docker** - Containerization (knowledge)

### Additional Libraries
- **Embla Carousel** - Image carousels
- **Recharts** - Data visualization
- **Lucide React** - Icons
- **Zod** - Form validation
- **Sonner** - Toast notifications

---

## 🚀 Getting Started

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Visit: http://localhost:3000

### Build for Production
```bash
npm run build
npm start
```

### Linting & Testing
```bash
npm run lint
npm test
```

---

## 🔐 Environment Variables

Create a `.env.local` file in the root:

```bash
# Contact Form (Resend)
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL_FROM="Yalaka Nikhil Reddy <contact@yalakanikhilreddy.dev>"
CONTACT_EMAIL_TO=yalakanikhilreddy@gmail.com

# AI Twin Chat
LLM_API_KEY=your_llm_api_key
LLM_BASE_URL=https://api.provider.com/v1/chat/completions
AI_MODEL=model_name
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   └── page.tsx            # Home page (all sections)
├── components/
│   ├── Navbar.tsx          # Navigation header
│   ├── HeroSection.tsx      # Welcome section with stats
│   ├── AboutSection.tsx     # About & achievements
│   ├── ExperienceSection.tsx # Timeline of education
│   ├── ProjectsSection.tsx  # Featured projects showcase
│   ├── SkillsSection.tsx    # Technical skills grid
│   ├── AITwinSection.tsx    # AI chat section
│   ├── ContactSection.tsx   # Contact form & social links
│   ├── Footer.tsx           # Footer
│   ├── FluidCursor.tsx      # Animated cursor effect
│   ├── Card3D.tsx           # 3D card tilt effect
│   └── ui/                  # Reusable UI components
├── data/
│   └── portfolio.ts         # All portfolio content
├── lib/
│   ├── seo/
│   │   └── site.ts          # SEO metadata
│   ├── ai-twin.ts           # AI chat config
│   └── contact.ts           # Form validation
├── hooks/
│   └── useFluidCursor.ts    # Custom hooks
└── assets/
    ├── card.png             # Profile card image
    └── logo.png             # Logo
```

---

## 📊 Your Portfolio Stats

- **Name**: Yalaka Nikhil Reddy
- **Email**: yalakanikhil30@gmail.com
- **Location**: Kodad, Telangana, India
- **GitHub**: https://github.com/YNikhil188
- **LinkedIn**: https://www.linkedin.com/in/yalaka-nikhil-reddy

### Education
- **B.E in Computer Science**: SIMATS (Aug 2022 - Present) - CGPA: 8.5
- **Intermediate (MPC)**: Narayana Junior College - Marks: 874/1000
- **SSC**: City Central School - GPA: 10/10

### Certifications
- Oracle Certified in Java Foundation
- IBM Certified in SQL and Relational Databases 101
- Oracle Cloud Database Services 2025 Certified Professional

### Key Projects
| Project | Category | Tech Stack | Status |
|---------|----------|-----------|--------|
| BugCrew | MERN Stack | React, Node.js, MongoDB, JWT | Live |
| Xceltics | Analytics | React, Express.js, Chart.js | Live |
| CarRento | Web App | PHP, MySQL, JavaScript | Complete |

---

## 🎨 Customization

### Update Portfolio Content
Edit `src/data/portfolio.ts`:
- Personal info (name, email, links)
- Stats, about section, highlights
- Education & work experience
- Projects with descriptions & images
- Skills categorized by expertise

### Update SEO
Edit `src/lib/seo/site.ts`:
- Site metadata
- Keywords
- Geographic location
- Social profiles

### Update Contact Info
Edit `src/components/ContactSection.tsx`:
- Social links
- Contact email recipients
- Form submission behavior

### Theming
- Update Tailwind config for colors
- Modify CSS variables in globals
- Adjust animation timings in components

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
# One-click deployment
# Connect GitHub repo to Vercel at vercel.com
# Set environment variables in project settings
# Auto-deploys on push to main
```

### Docker
```bash
docker build -t portfolio .
docker run -p 3000:3000 portfolio
```

### Other Platforms
- **Netlify**: Connect GitHub repo
- **GitHub Pages**: Requires static export
- **AWS**: Use EC2 or Lambda with custom setup

---

## 📝 License

MIT License - Feel free to use this portfolio template

---

## 🎯 Next Steps

1. ✅ Update portfolio data with your information
2. ✅ Add project screenshots/images to `/public/images/projects`
3. ✅ Configure Resend API for contact form
4. ✅ Set up AI Twin with your LLM provider
5. ✅ Deploy to Vercel
6. ✅ Configure custom domain
7. ✅ Set up analytics (Google Analytics, Vercel Analytics)

---

<div align="center">
  Made with passion, TypeScript & Next.js ⚡
  <br>
  <br>
  <a href="https://yalakanikhilreddy.dev">Visit Portfolio</a> • 
  <a href="https://github.com/YNikhil188">GitHub</a> • 
  <a href="https://linkedin.com/in/yalaka-nikhil-reddy">LinkedIn</a>
</div>xt-awaret-aware responses regarding professional background, skills, and projects.
- Provides a seamless, immediate conversational experience for visitors.

### 2. 🖱️ Fluid Cursor & Canvas Effects
- Custom fluid cursor (`src/components/FluidCursor.tsx`) tracking mouse movement.
- Trailing canvas effect for an engaging interactive micro-interaction.
- Handled via custom hooks (`src/hooks/useFluidCursor`) ensuring highly optimized rendering.

### 3. 🧊 Consistent Glassmorphism & Translucent Design
- Site-wide glassmorphism aesthetic tailored for both light and dark modes.
- Refined warm beige hue for neutral color variables in light mode, complementing brand colors and logos.
- Translucent panels, subtle borders, and backdrop blurs on cards and sidebars.

### 4. 🎬 Advanced Cross-Device Animations
Leveraging **Framer Motion** for highly performant animations:
- 3D Card tilt effects on hover (`src/components/Card3D.tsx`)
- Scroll-triggered reveal animations optimized across mobile, tablet, laptop, and PC hardware.
- Smooth page structure with micro-interaction refinements on project cards and contact sections.

### 5. 🎨 Theming & Refined Colors
- Adaptive Dark / Light themes via `next-themes`.
- Carefully harmonized palettes aligned with personal branding aesthetics.
- Tailwind CSS (v4) for utility-first styling with high performance and Radix UI primitives.

### 6. 💼 Modular Section Architecture
- Reusable modular components: Hero, About, Experience, Projects, Skills, Contact.
- Built via React Server / Client Components, prioritizing maintainability and separation of logic.
- Contact form now posts to a live Next.js API route with server-side validation and Resend-backed inbox delivery.

---

## 🖥️ Technology Stack

- **Next.js (v16)** – App Router, hybrid rendering
- **TypeScript** – Strong type safety & maintainability
- **Tailwind CSS (v4)** – Future-ready, highly optimized utility styling
- **Framer Motion** – Declarative React animations
- **Radix UI components / Shadcn UI** – Accessible unstyled UI primitives
- **Lucide React** – Consistent iconography
- **Zod** – Runtime validation for chat and contact flows
- **Embla Carousel / Recharts** – Specialized UI elements

---

## 🔐 Environment Variables
Create a `.env.local` to securely store keys for the AI Chatbot and Resend-backed contact form.

```bash
# Example environment variables 
# -----------------------------
# Contact / Resend
RESEND_API_KEY=re_your_resend_api_key
CONTACT_EMAIL_FROM="Nikunj Portfolio <contact@portfolio.codenex.dev>"
CONTACT_EMAIL_TO=njkhitha2003@gmail.com,info.portfolio.nikunj@gmail.com

# -----------------------------
# LLM / AI Provider
LLM_API_KEY=your-llm-api-key
LLM_BASE_URL=https://integrate.api.nvidia.com/v1/chat/completions
AI_MODEL=openai/gpt-oss-20b
```

> Never commit real credentials. Configure them in your hosting provider's dashboard (e.g. Vercel) for production.

`CONTACT_EMAIL_TO` supports a comma-separated list if you want contact form emails delivered to multiple inboxes.

To send from a custom address like `contact@portfolio.codenex.dev`, verify that domain/subdomain inside Resend and add the SPF/DKIM DNS records Resend provides.

---

## 🛠️ Development Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Dev Server
```bash
npm run dev
```
Visit: http://localhost:3000

---

## 🧪 Testing & Linting
```bash
# Run the linter
npm run lint

# Run the unit tests
npm test

# Build for production
npm run build
```

---

## 🤖 Codex Job Hunt Toolkit

This repo includes Codex skills and subagents for resume and job-search workflows:

- `$portfolio-resume-refresh with subagents` refreshes the base one-page ATS LaTeX resume from the latest portfolio facts.
- `$jd-tailored-resume with subagents` rewrites the resume for a specific job description using portfolio facts, JD keywords, company research, and ATS best practices.
- `$resume-scorecard with subagents` scores the resume against a JD without editing.
- `$application-packet with subagents` creates cover letters, recruiter messages, LinkedIn notes, referral asks, and follow-ups.
- `$interview-story-bank with subagents` builds STAR interview stories from verified portfolio and resume facts.
- `$portfolio-fact-gap-audit with subagents` finds missing metrics, links, dates, and evidence that would improve applications.

Detailed instructions live in `.codex/job-hunt/INSTRUCTIONS.md`.

---

## 🧱 Project Structure (Excerpt)
```
src/
	app/            # App Router pages, global layouts, styles
	components/     # Modular UI segments (Hero, Skills, Projects, AITwinChat, etc.)
		ui/           # Reusable atomic base UI components (Shadcn/Radix based)
	hooks/          # Custom hooks (e.g., useFluidCursor)
```

---

## 📄 License
See LICENSE for details.

---

<div align="center">Made with passion & TypeScript ⚡</div>
