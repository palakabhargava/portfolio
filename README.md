# Palaka Bhargava — Java Backend Developer Portfolio

> **Building Scalable Backend Systems with Java**

A futuristic, single-page personal portfolio for **Palaka Bhargava Venkata Ramudu**, showcasing skills, projects, education, certifications, and blog posts — designed with a clean, glassmorphic, tech-focused aesthetic.


---

## ✨ Features

- 🎨 **Futuristic light theme** with subtle glassmorphism
- 🧭 **Smooth single-page navigation** across Home, About, Skills, Projects, Blog, Education, Certifications, and Contact
- 📜 **Resume download & view** directly from the hero section
- 🎓 **Verifiable certifications** — each card links to the original PDF (AWS, Java, Python, HTML/CSS/JS, AI)
- 📝 **Blog section** with expandable posts on backend & DSA topics
- 📱 **Fully responsive** across mobile, tablet, and desktop
- ⚡ **SEO-ready** with proper meta tags and Open Graph
- 🌐 **Languages:** English, Telugu

---

## 🛠 Tech Stack

| Layer | Tech |
|---|---|
| Framework | [TanStack Start](https://tanstack.com/start) (React 19 + Vite 7) |
| Styling | Tailwind CSS v4 + custom design tokens (`oklch`) |
| Routing | TanStack Router (file-based) |
| UI Primitives | Radix UI + shadcn/ui |
| Language | TypeScript |
| Deployment | Cloudflare Workers (via `@cloudflare/vite-plugin`) |

---

## 📁 Project Structure

```
.
├── public/
│   ├── resume.pdf              # Downloadable resume
│   └── certs/                  # Certification PDFs
│       ├── aws.pdf
│       ├── java.pdf
│       ├── python.pdf
│       ├── html-css-js.pdf
│       └── ai.pdf
├── src/
│   ├── routes/
│   │   ├── __root.tsx          # Root layout (HTML shell)
│   │   └── index.tsx           # Single-page portfolio
│   ├── components/ui/          # shadcn/ui primitives
│   ├── styles.css              # Design tokens & global styles
│   └── router.tsx              # Router configuration
├── package.json
└── vite.config.ts
```

---

## 🚀 Getting Started

### Prerequisites
- [Bun](https://bun.sh) (recommended) or Node.js 20+

### Install dependencies
```bash
bun install
```

### Run development server
```bash
bun run dev
```
The app will be available at `http://localhost:5173`.

### Build for production
```bash
bun run build
```

### Preview the production build
```bash
bun run preview
```

### Lint & format
```bash
bun run lint
bun run format
```

---

## 🧩 Sections

1. **Home** — Hero with name, role, tagline, and quick CTAs
2. **About** — Short intro, languages spoken, and quick facts
3. **Skills** — Categorized skill bars (Programming, Frontend, Core Concepts, Soft Skills)
4. **Projects** — Featured backend & web projects
5. **Blog** — Expandable articles on Java, REST APIs, and DSA fundamentals
6. **Education** — B.Tech in Computer Science, AKNU (Rajamahendravaram)
7. **Certifications** — Clickable cards linking to original certificate PDFs
8. **Contact** — Get-in-touch links

---

## 📜 Certifications Included

| # | Certificate | Issuer |
|---|---|---|
| 1 | AWS Academy Graduate | AWS Academy |
| 2 | Java | Infosys Springboard |
| 3 | Python | Infosys Springboard |
| 4 | HTML, CSS, JavaScript | Infosys Springboard |
| 5 | Building with AI | Sailor Academy |
| 6 | Fullstack GUI & Web Dev with Python | AIM Technologies *(coming soon)* |

---

## 🎨 Design System

- **Theme:** Light mode with glassmorphism
- **Colors:** Defined as semantic tokens in `src/styles.css` using `oklch`
- **Typography:** Distinctive display + clean body pairing
- **Accents:** Subtle backend-themed motifs (code snippets, terminal lines, data flow)

All colors and spacing pull from CSS custom properties — no hard-coded hex values in components.

---

## 📦 Updating Content

| Want to update… | Edit |
|---|---|
| Resume PDF | Replace `public/resume.pdf` |
| Certificate PDFs | Replace files in `public/certs/` |
| Skills, projects, blog, certs, education | `CERTS`, `SKILLS`, `BLOG_POSTS`, `EDUCATION` arrays in `src/routes/index.tsx` |
| Theme colors | `src/styles.css` |

---

## 📬 Contact

**Palaka Bhargava Venkata Ramudu**
Java Backend Developer
🌍 Languages: English · Telugu

---

© 2026 Palaka Bhargava Venkata Ramudu | Java Backend Developer
