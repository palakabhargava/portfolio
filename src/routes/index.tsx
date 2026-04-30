import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Palaka Bhargava — Java Backend Developer Portfolio" },
      {
        name: "description",
        content:
          "Portfolio of Palaka Bhargava Venkata Ramudu — Java Backend Developer building scalable backend systems with Java, Python and modern web tech.",
      },
      { property: "og:title", content: "Palaka Bhargava — Java Backend Developer" },
      {
        property: "og:description",
        content: "Building Scalable Backend Systems with Java.",
      },
    ],
  }),
  component: Portfolio,
});

const SECTIONS = ["home", "about", "skills", "projects", "blog", "education", "certs", "contact"];

const SKILLS = {
  Programming: [
    { name: "Java", level: 80 },
    { name: "Python", level: 70 },
  ],
  Frontend: [
    { name: "HTML", level: 88 },
    { name: "CSS", level: 82 },
    { name: "JavaScript", level: 75 },
  ],
  "Core Concepts": [
    { name: "Data Structures", level: 60 },
    { name: "OOP", level: 80 },
    { name: "AI / ML / DL", level: 50 },
  ],
  "Soft Skills": [
    { name: "Communication", level: 85 },
    { name: "Teaching", level: 80 },
  ],
};

const BLOG_POSTS = [
  {
    title: "Getting Started with Java Backend Development",
    desc: "A roadmap from JVM fundamentals to building your first Spring Boot service that ships.",
    body: "Java backend development starts with understanding the JVM, then progresses through core APIs, concurrency, and frameworks like Spring Boot. Build small services first — REST endpoints with persistence — and gradually layer in caching, messaging, and observability. The goal isn't to learn every framework, but to internalize patterns: clean separation, testability, and graceful failure.",
    tag: "Backend",
  },
  {
    title: "Understanding REST APIs",
    desc: "Resources, verbs, status codes — the contract that powers nearly every modern web app.",
    body: "REST is less a protocol and more a discipline: model your domain as resources, use HTTP verbs predictably, and let status codes carry meaning. A great API is one a new developer can read and immediately reason about. Pair it with versioning, idempotency, and clear error envelopes.",
    tag: "API",
  },
  {
    title: "Basics of Data Structures for Beginners",
    desc: "Arrays, lists, maps and trees — the toolkit every backend engineer leans on daily.",
    body: "Data structures decide how fast and memory-efficient your code is. Start with arrays and hash maps — they cover 80% of real problems. Then layer in stacks, queues, trees, and graphs as the problem demands. Practice by re-implementing them in Java; it makes the standard library feel like home.",
    tag: "DSA",
  },
];

const CERTS = [
  { name: "AWS Academy Graduate", issuer: "AWS Academy", file: "/certs/aws.pdf" },
  { name: "Java", issuer: "Infosys Springboard", file: "/certs/java.pdf" },
  { name: "Python", issuer: "Infosys Springboard", file: "/certs/python.pdf" },
  { name: "HTML, CSS, JavaScript", issuer: "Infosys Springboard", file: "/certs/html-css-js.pdf" },
  { name: "Building with AI", issuer: "Sailor Academy", file: "/certs/ai.pdf" },
  { name: "Fullstack GUI & Web Dev with Python", issuer: "AIM Technologies", file: null as string | null },
];

const EDUCATION = [
  {
    title: "B.Tech — Computer Science",
    school: "Adikavi Nannaya University (AKNU)",
    place: "Rajamahendravaram",
    period: "2024 – 2027",
    detail: "CGPA: 8.5 (3-1) · 8.0 (2nd Year)",
  },
  {
    title: "Diploma — Computer Science",
    school: "Kakinada Institute of Engineering Technology (KIET)",
    place: "Korangi, Kakinada",
    period: "2021 – 2024",
    detail: "Percentage: 85.45%",
  },
  {
    title: "SSC",
    school: "DAV Public School, Mothugudem",
    place: "",
    period: "2020 – 2021",
    detail: "CGPA: 9.7",
  },
];

const TYPING_PHRASES = [
  "Java Backend Developer",
  "Problem Solver",
  "Tech Enthusiast",
];

function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [showTop, setShowTop] = useState(false);
  const [openPost, setOpenPost] = useState<number | null>(null);
  const [formStatus, setFormStatus] = useState<string>("");
  const typingRef = useRef<HTMLSpanElement>(null);

  // Typing animation
  useEffect(() => {
    let phraseIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let timeout: number;
    const tick = () => {
      const el = typingRef.current;
      if (!el) return;
      const phrase = TYPING_PHRASES[phraseIdx];
      if (!deleting) {
        charIdx++;
        el.textContent = phrase.slice(0, charIdx);
        if (charIdx === phrase.length) {
          deleting = true;
          timeout = window.setTimeout(tick, 1600);
          return;
        }
      } else {
        charIdx--;
        el.textContent = phrase.slice(0, charIdx);
        if (charIdx === 0) {
          deleting = false;
          phraseIdx = (phraseIdx + 1) % TYPING_PHRASES.length;
        }
      }
      timeout = window.setTimeout(tick, deleting ? 50 : 90);
    };
    timeout = window.setTimeout(tick, 400);
    return () => window.clearTimeout(timeout);
  }, []);

  // Scroll reveal + active section + back-to-top
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            // animate skill bars when skills section reveals
            if (e.target.id === "skills") {
              document.querySelectorAll<HTMLElement>(".skill-fill").forEach((el) => {
                const w = el.dataset.width || "0";
                el.style.width = w + "%";
              });
            }
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((r) => io.observe(r));

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) sectionObserver.observe(el);
    });

    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);

    return () => {
      io.disconnect();
      sectionObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("Message sent — I'll get back to you soon.");
    (e.target as HTMLFormElement).reset();
    setTimeout(() => setFormStatus(""), 4000);
  };

  return (
    <div className="relative min-h-screen">
      {/* Floating particles */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="particle"
            style={{
              left: `${(i * 7.3) % 100}%`,
              bottom: `-10px`,
              animationDuration: `${10 + (i % 6) * 3}s`,
              animationDelay: `${i * 1.2}s`,
              background: i % 2 ? "#007396" : "#F89820",
            }}
          />
        ))}
      </div>

      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-40">
        <nav className="mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-full glass px-6 py-3">
          <a href="#home" className="flex items-center gap-2 font-display font-bold">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground font-mono text-sm">
              {"{}"}
            </span>
            <span className="text-grad">PB</span>
          </a>
          <div className="hidden gap-1 md:flex">
            {[
              ["home", "Home"],
              ["about", "About"],
              ["skills", "Skills"],
              ["projects", "Projects"],
              ["blog", "Blog"],
              ["education", "Education"],
              ["certs", "Certs"],
              ["contact", "Contact"],
            ].map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                className={`nav-link ${activeSection === id ? "active" : ""}`}
              >
                {label}
              </a>
            ))}
          </div>
          <a href="#contact" className="btn-primary !py-2 !px-4 text-sm hidden sm:inline-flex">
            Hire me
          </a>
        </nav>
      </header>

      <main className="relative z-10">
        {/* HERO */}
        <section
          id="home"
          className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 pt-32 pb-16 md:flex-row md:gap-12"
        >
          {/* Code snippet background */}
          <pre className="code-bg absolute left-4 top-28 hidden w-1/2 lg:block">
{`@RestController
public class ApiController {
  @GetMapping("/health")
  public ResponseEntity<Map<String,Object>> health() {
    return ResponseEntity.ok(Map.of(
      "status", "UP",
      "service", "portfolio-api",
      "version", "1.0.0"
    ));
  }
}`}
          </pre>
          <pre className="code-bg absolute right-4 bottom-10 hidden w-1/3 text-right lg:block">
{`{
  "name": "Palaka Bhargava",
  "role": "Java Backend Dev",
  "stack": ["Java","Python"],
  "open_to_work": true
}`}
          </pre>

          <div className="flex-1">
            <p className="eyebrow reveal">// hello, world</p>
            <h1 className="mt-3 font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl reveal">
              <span className="text-grad">Palaka Bhargava</span>
              <br />
              <span className="text-foreground">Venkata Ramudu</span>
            </h1>
            <p className="mt-6 font-mono text-lg md:text-xl reveal">
              <span className="text-[color:var(--muted-foreground)]">&gt; </span>
              <span ref={typingRef} className="cursor-blink text-foreground" />
            </p>
            <p className="mt-6 max-w-xl text-[color:var(--muted-foreground)] leading-relaxed reveal">
              Aspiring backend developer passionate about building scalable systems and
              continuously improving technical skills. Currently focused on Java, clean
              architecture, and the craft of writing code that survives production.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 reveal">
              <a href="#projects" className="btn-primary">View Projects</a>
              <a href="/resume.pdf" download className="btn-ghost">
                ⬇ Download Resume
              </a>
              <a href="#contact" className="btn-ghost">Contact Me</a>
            </div>
            <div className="mt-6 flex gap-4 text-sm text-[color:var(--muted-foreground)] reveal">
              <span>🌐 English · తెలుగు</span>
              <span>📍 India</span>
            </div>
          </div>

          <div className="mt-16 flex flex-1 justify-center md:mt-0 reveal">
            <div className="avatar-orb glow-pulse float">
              <div className="text-center">
                <div className="font-mono text-xs text-[color:var(--muted-foreground)]">
                  ~/dev
                </div>
                <div className="text-grad font-display text-7xl font-bold">PB</div>
                <div className="mt-1 font-mono text-[10px] tracking-widest text-primary">
                  JAVA · BACKEND
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <Section id="about" eyebrow="01 / about" title="A backend mind in training">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="glass tilt-card md:col-span-2 rounded-2xl p-8">
              <p className="text-lg leading-relaxed text-foreground">
                Aspiring <span className="text-primary font-semibold">Backend developer</span>{" "}
                with knowledge of Java and Python, seeking a virtual internship to build
                strong skills in Data Structures and Machine Learning, gain real-world
                project experience, and contribute effectively in a professional environment.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  ["⚙️", "Backend Systems", "APIs, services, data layers"],
                  ["🌱", "Learning Mindset", "Always shipping, always reading"],
                  ["✨", "Clean Code", "Readable, tested, intentional"],
                ].map(([emoji, t, d]) => (
                  <div key={t} className="rounded-xl border border-[color:var(--border)] p-4">
                    <div className="text-2xl">{emoji}</div>
                    <div className="mt-2 font-display font-semibold">{t}</div>
                    <div className="text-sm text-[color:var(--muted-foreground)]">{d}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass tilt-card rounded-2xl p-8">
              <div className="font-mono text-xs text-[color:var(--muted-foreground)]">
                ~ whoami
              </div>
              <div className="mt-3 space-y-3 font-mono text-sm">
                <Row k="role" v="Backend Dev" />
                <Row k="stack" v="Java · Python" />
                <Row k="focus" v="DSA · ML" />
                <Row k="status" v="Open to intern" highlight />
                <Row k="languages" v="EN · తెలుగు" />
              </div>
            </div>
          </div>
        </Section>

        {/* SKILLS */}
        <Section id="skills" eyebrow="02 / skills" title="Tools of the trade">
          <div className="grid gap-6 md:grid-cols-2">
            {Object.entries(SKILLS).map(([cat, items]) => (
              <div key={cat} className="glass tilt-card rounded-2xl p-6">
                <h3 className="font-display text-xl font-semibold">
                  <span className="text-primary">#</span> {cat}
                </h3>
                <div className="mt-5 space-y-4">
                  {items.map((s) => (
                    <div key={s.name}>
                      <div className="mb-1 flex justify-between text-sm">
                        <span className="font-medium">{s.name}</span>
                        <span className="font-mono text-[color:var(--muted-foreground)]">
                          {s.level}%
                        </span>
                      </div>
                      <div className="skill-bar">
                        <div className="skill-fill" data-width={String(s.level)} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* PROJECTS */}
        <Section id="projects" eyebrow="03 / projects" title="Things I've built">
          <div className="grid gap-6 md:grid-cols-2">
            <article className="glass tilt-card rounded-2xl p-7">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-primary">// featured</span>
                <span className="font-mono text-xs text-[color:var(--muted-foreground)]">
                  v1.0
                </span>
              </div>
              <h3 className="mt-3 font-display text-2xl font-bold">Basic Web Login Page</h3>
              <p className="mt-2 text-[color:var(--muted-foreground)]">
                Interactive login UI with smooth animations, fully responsive, built with
                vanilla web tech and Bootstrap 5. Clean, user-friendly design focused on
                accessibility and feel.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["HTML", "CSS", "JavaScript", "Bootstrap 5"].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-[color:var(--border)] px-3 py-1 text-xs font-mono"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex gap-3">
                <a
                  href="https://palakabhargava.github.io/basicwebapp/"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary !py-2 !px-4 text-sm"
                >
                  ↗ Live Demo
                </a>
                <a
                  href="https://github.com/palakabhargava"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost !py-2 !px-4 text-sm"
                >
                  GitHub
                </a>
              </div>
            </article>

            <article className="glass tilt-card rounded-2xl p-7 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-[color:var(--accent)]">// next up</span>
                <h3 className="mt-3 font-display text-2xl font-bold">More on the way</h3>
                <p className="mt-2 text-[color:var(--muted-foreground)]">
                  Currently working on backend services with Java, REST APIs, and
                  database-backed apps. New projects landing here soon.
                </p>
              </div>
              <pre className="mt-6 rounded-xl bg-black/30 p-4 font-mono text-xs text-[color:var(--muted-foreground)] overflow-x-auto">
{`$ git status
On branch main
Your branch is ahead by ∞ commits.
Changes to be made:
  new file:  spring-boot-api/
  new file:  jwt-auth-service/
  new file:  data-structures-lab/`}
              </pre>
            </article>
          </div>
        </Section>

        {/* BLOG */}
        <Section id="blog" eyebrow="04 / blog" title="Notes & writing">
          <div className="grid gap-6 md:grid-cols-3">
            {BLOG_POSTS.map((p, i) => (
              <article key={p.title} className="glass tilt-card rounded-2xl p-6 flex flex-col">
                <span className="font-mono text-xs text-primary">{p.tag}</span>
                <h3 className="mt-2 font-display text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm text-[color:var(--muted-foreground)]">
                  {p.desc}
                </p>
                <button onClick={() => setOpenPost(i)} className="mt-4 self-start link-blue text-sm font-medium">
                  Read more →
                </button>
              </article>
            ))}
          </div>
        </Section>

        {/* EDUCATION */}
        <Section id="education" eyebrow="05 / education" title="Academic timeline">
          <div className="glass rounded-2xl p-8">
            <ol className="timeline space-y-8">
              {EDUCATION.map((e) => (
                <li key={e.title} className="relative">
                  <span className="timeline-dot" />
                  <div>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-display text-lg font-semibold">{e.title}</h3>
                      <span className="font-mono text-xs text-primary">{e.period}</span>
                    </div>
                    <p className="text-[color:var(--accent)] text-sm mt-0.5" style={{ color: "#4cb0d4" }}>
                      {e.school}
                      {e.place ? ` · ${e.place}` : ""}
                    </p>
                    <p className="mt-1 text-sm text-[color:var(--muted-foreground)]">
                      {e.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Section>

        {/* CERTIFICATIONS */}
        <Section id="certs" eyebrow="06 / certifications" title="Credentials">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CERTS.map((c) => {
              const Wrapper: any = c.file ? "a" : "div";
              const wrapperProps = c.file
                ? { href: c.file, target: "_blank", rel: "noopener noreferrer" }
                : {};
              return (
                <Wrapper
                  key={c.name}
                  {...wrapperProps}
                  className={`glass tilt-card rounded-2xl p-5 flex items-start gap-4 transition ${
                    c.file ? "hover:border-primary/40 cursor-pointer" : ""
                  }`}
                >
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary text-lg">
                    ✦
                  </div>
                  <div className="flex-1">
                    <div className="font-display font-semibold leading-tight">{c.name}</div>
                    <div className="mt-1 text-xs font-mono text-[color:var(--muted-foreground)]">
                      {c.issuer}
                    </div>
                    {c.file ? (
                      <div className="mt-2 text-[11px] font-mono text-primary">
                        view proof →
                      </div>
                    ) : (
                      <div className="mt-2 text-[11px] font-mono text-[color:var(--muted-foreground)]/70">
                        proof coming soon
                      </div>
                    )}
                  </div>
                </Wrapper>
              );
            })}
          </div>
        </Section>

        {/* CONTACT + SOCIAL */}
        <Section id="contact" eyebrow="07 / contact" title="Let's build something">
          <div className="grid gap-6 md:grid-cols-5">
            <div className="glass rounded-2xl p-7 md:col-span-2">
              <h3 className="font-display text-xl font-semibold">Find me online</h3>
              <p className="mt-2 text-sm text-[color:var(--muted-foreground)]">
                Open to internships, collaborations, and a good conversation about backend
                systems.
              </p>
              <div className="mt-6 space-y-3">
                <SocialLink
                  href="https://github.com/palakabhargava"
                  label="GitHub"
                  handle="@palakabhargava"
                  icon="⌥"
                />
                <SocialLink
                  href="https://www.linkedin.com/in/palaka-bhargava-venkata-ramudu-51a7023b2"
                  label="LinkedIn"
                  handle="Palaka Bhargava V R"
                  icon="in"
                />
                <SocialLink
                  href="/resume.pdf"
                  label="Resume"
                  handle="View / Download PDF"
                  icon="📄"
                />
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="glass rounded-2xl p-7 md:col-span-3 space-y-4"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <input required name="name" placeholder="Your name" className="field" />
                <input required type="email" name="email" placeholder="your@email.com" className="field" />
              </div>
              <textarea
                required
                name="message"
                rows={5}
                placeholder="Tell me about your project, role, or idea..."
                className="field resize-none"
              />
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-[color:var(--muted-foreground)]">
                  {formStatus || "I usually reply within a day."}
                </span>
                <button type="submit" className="btn-primary">
                  Send Message →
                </button>
              </div>
            </form>
          </div>
        </Section>

        <footer className="relative z-10 border-t border-[color:var(--border)] py-8 text-center text-sm text-[color:var(--muted-foreground)]">
          <p>
            © 2026 <span className="text-foreground">Palaka Bhargava Venkata Ramudu</span> · Java Backend Developer
          </p>
          <p className="mt-1 font-mono text-xs opacity-70">crafted with care, deployed with caffeine ☕</p>
        </footer>
      </main>

      {/* Back to top */}
      <button
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`back-top ${showTop ? "visible" : ""}`}
      >
        ↑
      </button>

      {/* Blog modal */}
      {openPost !== null && (
        <div className="modal-backdrop open" onClick={() => setOpenPost(null)}>
          <div className="modal-card glass" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="font-mono text-xs text-primary">{BLOG_POSTS[openPost].tag}</span>
                <h3 className="mt-1 font-display text-2xl font-bold">{BLOG_POSTS[openPost].title}</h3>
              </div>
              <button onClick={() => setOpenPost(null)} className="text-[color:var(--muted-foreground)] text-2xl leading-none">
                ×
              </button>
            </div>
            <p className="mt-4 leading-relaxed text-[color:var(--muted-foreground)]">
              {BLOG_POSTS[openPost].body}
            </p>
            <button onClick={() => setOpenPost(null)} className="btn-primary mt-6 !py-2 !px-4 text-sm">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-6 py-24">
      <div className="reveal mb-10">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="section-title mt-2">
          <span className="text-grad">{title}</span>
        </h2>
      </div>
      <div className="reveal">{children}</div>
    </section>
  );
}

function Row({ k, v, highlight }: { k: string; v: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between gap-4 border-b border-dashed border-[color:var(--border)] pb-2 last:border-0">
      <span className="text-[color:var(--muted-foreground)]">{k}</span>
      <span className={highlight ? "text-primary" : "text-foreground"}>{v}</span>
    </div>
  );
}

function SocialLink({
  href,
  label,
  handle,
  icon,
}: {
  href: string;
  label: string;
  handle: string;
  icon: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center gap-3 rounded-xl border border-[color:var(--border)] p-3 transition-all hover:border-primary hover:shadow-[0_0_20px_rgba(248,152,32,0.25)]"
    >
      <div className="grid h-10 w-10 place-items-center rounded-lg bg-[color:var(--accent)]/20 font-display font-bold text-[color:var(--foreground)] group-hover:bg-primary group-hover:text-primary-foreground transition">
        {icon}
      </div>
      <div className="flex-1">
        <div className="font-display font-semibold">{label}</div>
        <div className="text-xs text-[color:var(--muted-foreground)]">{handle}</div>
      </div>
      <span className="text-[color:var(--muted-foreground)] group-hover:text-primary">↗</span>
    </a>
  );
}
