import { useEffect, useMemo, useRef, useState } from "react";
import api from "../services/api";

/* Palette: bg #05060F · violet #8B5CF6 · cyan #22D3EE · pink #F472B6 */
const FONT_URL =
    "https://fonts.googleapis.com/css2?family=Sora:wght@500;700;800&family=Inter:wght@400;500;600&display=swap";
const display = { fontFamily: "'Sora', 'Inter', sans-serif" };
const grad = "bg-gradient-to-r from-[#8B5CF6] via-[#F472B6] to-[#22D3EE]";
const gradText = `${grad} bg-clip-text text-transparent`;
const section = "relative px-6 py-24 lg:px-8 lg:py-32";
const container = "mx-auto max-w-7xl";
const focus =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#22D3EE]";

/* Fade-up when scrolled into view */
function Reveal({ children, delay = 0, className = "" }) {
    const ref = useRef(null);
    const [shown, setShown] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el || !("IntersectionObserver" in window)) {
            setShown(true);
            return;
        }
        const io = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) {
                    setShown(true);
                    io.disconnect();
                }
            },
            { threshold: 0.12 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);
    return (
        <div
            ref={ref}
            style={{ transitionDelay: `${delay}ms` }}
            className={`reveal ${shown ? "reveal-in" : ""} ${className}`}
        >
            {children}
        </div>
    );
}

function useCountUp(target) {
    const [n, setN] = useState(0);
    useEffect(() => {
        let raf;
        const start = performance.now();
        const tick = (t) => {
            const p = Math.min((t - start) / 1200, 1);
            setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
            if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [target]);
    return n;
}

function useTyping(words) {
    const [text, setText] = useState("");
    const [i, setI] = useState(0);
    const [del, setDel] = useState(false);
    useEffect(() => {
        const word = words[i % words.length];
        let pause;
        const t = setTimeout(
            () => {
                if (!del) {
                    const next = word.slice(0, text.length + 1);
                    setText(next);
                    if (next.length === word.length) pause = setTimeout(() => setDel(true), 1400);
                } else {
                    const next = word.slice(0, text.length - 1);
                    setText(next);
                    if (next.length === 0) {
                        setDel(false);
                        setI((v) => v + 1);
                    }
                }
            },
            del ? 40 : 80
        );
        return () => {
            clearTimeout(t);
            clearTimeout(pause);
        };
    }, [text, del, i, words]);
    return text;
}

function Heading({ tag, title, description, center = false }) {
    return (
        <Reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
            <span className="inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-[#22D3EE] backdrop-blur">
                {tag}
            </span>
            <h2 style={display} className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                {title}
            </h2>
            {description && <p className="mt-4 text-lg leading-8 text-slate-400">{description}</p>}
        </Reveal>
    );
}

/* Glass card with gradient border that lights up on hover */
function Card({ children, className = "" }) {
    return (
        <div className={`group relative rounded-2xl p-px transition duration-300 hover:-translate-y-1.5 ${className}`}>
            <div className={`absolute inset-0 rounded-2xl opacity-40 transition duration-300 group-hover:opacity-100 ${grad}`} />
            <div className="relative h-full overflow-hidden rounded-2xl bg-[#0B0D1C] ring-1 ring-white/5">{children}</div>
        </div>
    );
}

function Chip({ children }) {
    return (
        <span className="rounded-full border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 px-3 py-1 text-xs font-medium text-violet-200">
            {children}
        </span>
    );
}

function EmptyState({ text }) {
    return (
        <div className="mt-12 rounded-2xl border border-dashed border-white/15 bg-white/5 p-10 text-center text-sm text-slate-400">
            {text}
        </div>
    );
}

function Field({ id, name, label, type = "text", placeholder, value, onChange, className = "" }) {
    return (
        <div className={className}>
            <label htmlFor={id} className="text-sm font-medium text-slate-300">{label}</label>
            <input
                id={id} name={name} type={type} placeholder={placeholder} value={value} onChange={onChange} required
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-[#8B5CF6] focus:ring-4 focus:ring-[#8B5CF6]/20"
            />
        </div>
    );
}

function Stat({ value, label }) {
    const n = useCountUp(value);
    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur">
            <p style={display} className={`text-3xl font-extrabold ${gradText}`}>{n}+</p>
            <p className="mt-1 text-xs text-slate-400">{label}</p>
        </div>
    );
}

function MarqueeRow({ items, hidden = false }) {
    return (
        <div className="marquee flex shrink-0 gap-12 pr-12" aria-hidden={hidden || undefined}>
            {items.map((m, i) => (
                <span key={i} style={display} className="whitespace-nowrap text-lg font-bold text-slate-500">
                    <span className="mr-12 text-[#8B5CF6]">✦</span>{m}
                </span>
            ))}
        </div>
    );
}

function Home() {
    const [about, setAbout] = useState(null);
    const [skills, setSkills] = useState([]);
    const [projects, setProjects] = useState([]);
    const [services, setServices] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [contactSending, setContactSending] = useState(false);
    const [contactSuccess, setContactSuccess] = useState("");
    const [contactError, setContactError] = useState("");

    useEffect(() => {
        if (!document.getElementById("portfolio-fonts")) {
            const link = document.createElement("link");
            link.id = "portfolio-fonts";
            link.rel = "stylesheet";
            link.href = FONT_URL;
            document.head.appendChild(link);
        }
        const onScroll = () => {
            const h = document.documentElement;
            setProgress((h.scrollTop / (h.scrollHeight - h.clientHeight || 1)) * 100);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        let mounted = true;
        const keys = ["about", "skills", "projects", "services", "experiences", "testimonials", "blogs"];
        Promise.allSettled(keys.map((k) => api.get(`/${k}`)))
            .then((results) => {
                if (!mounted) return;
                const d = {};
                results.forEach((r, i) => { d[keys[i]] = r.status === "fulfilled" ? r.value.data : null; });
                const list = (v) => (Array.isArray(v) ? v : []);
                setAbout(Array.isArray(d.about) ? d.about[0] || null : d.about || null);
                setSkills(list(d.skills));
                setProjects(list(d.projects));
                setServices(list(d.services));
                setExperiences(list(d.experiences));
                setTestimonials(list(d.testimonials));
                setBlogs(list(d.blogs));
                setLoading(false);
            })
            .catch((error) => {
                console.error("Portfolio API error:", error);
                if (mounted) setLoading(false);
            });
        return () => { mounted = false; };
    }, []);

    const name = about?.name || "Barath Raj";
    const title = about?.title || "AI & Data Science Engineer";
    const description =
        about?.description ||
        "Aspiring software engineer focused on Java, Spring Boot, AI and modern full-stack development.";

    const roles = useMemo(() => [title, "Java Developer", "Spring Boot Engineer", "Full Stack Builder"], [title]);
    const typed = useTyping(roles);

    const initials = useMemo(
        () => name.split(" ").filter(Boolean).map((w) => w[0]).join("").slice(0, 2).toUpperCase(),
        [name]
    );

    const skillGroups = useMemo(() => {
        const g = {};
        skills.forEach((s) => {
            const key = s.category || "Other";
            (g[key] = g[key] || []).push(s);
        });
        return Object.entries(g);
    }, [skills]);

    const marquee = useMemo(() => {
        const base = skills.length
            ? skills.map((s) => s.name)
            : ["Java", "Spring Boot", "React", "SQL", "Python", "Machine Learning", "REST APIs", "Tailwind CSS"];
        return [...base, ...base];
    }, [skills]);

    const handleContactChange = (e) => {
        const { name: f, value } = e.target;
        setContactForm((c) => ({ ...c, [f]: value }));
        setContactSuccess("");
        setContactError("");
    };

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        if (Object.values(contactForm).some((v) => !v.trim())) {
            setContactError("Fill in all four fields to send your message.");
            return;
        }
        setContactSending(true);
        setContactSuccess("");
        setContactError("");
        try {
            await api.post("/contact", contactForm);
            setContactSuccess("Message sent. I'll reply as soon as I can.");
            setContactForm({ name: "", email: "", subject: "", message: "" });
        } catch (error) {
            console.error("Contact form error:", error);
            setContactError("Your message didn't send. Check your connection and try again.");
        } finally {
            setContactSending(false);
        }
    };

    if (loading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#05060F]">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/10 border-t-[#8B5CF6]" />
            </main>
        );
    }

    return (
        <main className="overflow-hidden bg-[#05060F] text-white antialiased" style={{ fontFamily: "'Inter', sans-serif" }}>
            <style>{`
                html { scroll-behavior: smooth; }
                .reveal { opacity: 0; transform: translateY(28px); transition: opacity .8s ease, transform .8s ease; }
                .reveal-in { opacity: 1; transform: none; }
                @keyframes float { 50% { transform: translateY(-14px); } }
                .float { animation: float 6s ease-in-out infinite; }
                .float-2 { animation-delay: -3s; }
                @keyframes spin360 { to { transform: rotate(360deg); } }
                .ring-spin { animation: spin360 8s linear infinite; }
                @keyframes marquee { to { transform: translateX(-100%); } }
                .marquee { animation: marquee 30s linear infinite; }
                @keyframes blink { 50% { opacity: 0; } }
                .caret { animation: blink 1s step-end infinite; }
                @keyframes aurora { 50% { transform: translate(40px, -30px) scale(1.15); } }
                .aurora { animation: aurora 14s ease-in-out infinite; }
                @media (prefers-reduced-motion: reduce) {
                    *, .reveal { animation: none !important; transition: none !important; }
                    .reveal { opacity: 1; transform: none; }
                    html { scroll-behavior: auto; }
                }
            `}</style>

            {/* Scroll progress bar */}
            <div className="fixed left-0 top-0 z-[60] h-1 w-full">
                <div className={`h-full ${grad}`} style={{ width: `${progress}%` }} />
            </div>

            {/* HERO */}
            <section id="home" className="relative min-h-screen px-6 pt-32 lg:px-8">
                <div className="aurora pointer-events-none absolute -left-32 top-0 h-[32rem] w-[32rem] rounded-full bg-[#8B5CF6]/30 blur-[120px]" />
                <div className="aurora pointer-events-none absolute -right-32 top-40 h-[28rem] w-[28rem] rounded-full bg-[#22D3EE]/20 blur-[120px]" style={{ animationDelay: "-7s" }} />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(#ffffff08_1px,transparent_1px),linear-gradient(90deg,#ffffff08_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />

                <div className="relative mx-auto grid max-w-7xl items-center gap-16 pb-20 lg:min-h-[calc(100vh-8rem)] lg:grid-cols-[1.1fr_0.9fr]">
                    <div>
                        <Reveal>
                            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 backdrop-blur">
                                <span className="relative flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                                </span>
                                Available for internships and freelance work
                            </p>
                        </Reveal>

                        <Reveal delay={100}>
                            <h1 style={display} className="mt-7 text-5xl font-extrabold leading-[1.05] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
                                Hi, I'm <span className={gradText}>{name}</span>
                            </h1>
                            <p style={display} className="mt-5 h-10 text-2xl font-bold text-slate-200 sm:text-3xl">
                                {typed}
                                <span className="caret ml-1 inline-block h-7 w-[3px] translate-y-1 bg-[#22D3EE]" />
                            </p>
                        </Reveal>

                        <Reveal delay={200}>
                            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">{description}</p>
                            <div className="mt-9 flex flex-wrap gap-4">
                                <a href="#projects" className={`rounded-full ${grad} px-8 py-3.5 text-sm font-bold text-white shadow-[0_0_40px_-5px_#8B5CF6] transition hover:scale-105 ${focus}`}>
                                    View my work
                                </a>
                                <a href="#contact" className={`rounded-full border border-white/15 bg-white/5 px-8 py-3.5 text-sm font-bold backdrop-blur transition hover:border-[#22D3EE] hover:text-[#22D3EE] ${focus}`}>
                                    Get in touch
                                </a>
                            </div>
                        </Reveal>

                        <Reveal delay={300}>
                            <div className="mt-12 grid max-w-md grid-cols-3 gap-3">
                                <Stat value={projects.length} label="Projects" />
                                <Stat value={skills.length} label="Skills" />
                                <Stat value={blogs.length} label="Articles" />
                            </div>
                        </Reveal>
                    </div>

                    <Reveal delay={200} className="relative mx-auto w-full max-w-md">
                        <div className="relative mx-auto aspect-square w-full max-w-sm">
                            <div className={`ring-spin absolute inset-0 rounded-full ${grad} opacity-80 blur-[2px]`} />
                            <div className="absolute inset-[5px] rounded-full bg-[#05060F]" />
                            <div className="absolute inset-4 overflow-hidden rounded-full bg-gradient-to-br from-[#8B5CF6]/40 to-[#22D3EE]/30">
                                {about?.profileImage ? (
                                    <img src={about.profileImage} alt={name} className="h-full w-full object-cover" />
                                ) : (
                                    <div style={display} className="flex h-full items-center justify-center text-8xl font-extrabold text-white/90">
                                        {initials}
                                    </div>
                                )}
                            </div>

                            <div className="float absolute -left-6 top-10 rounded-2xl border border-white/10 bg-[#0B0D1C]/80 px-4 py-3 shadow-xl backdrop-blur">
                                <p className="text-xs text-slate-400">Building with</p>
                                <p className="text-sm font-bold">Java + Spring Boot</p>
                            </div>
                            <div className="float float-2 absolute -right-6 bottom-12 rounded-2xl border border-white/10 bg-[#0B0D1C]/80 px-4 py-3 shadow-xl backdrop-blur">
                                <p className="text-xs text-slate-400">Exploring</p>
                                <p className="text-sm font-bold">AI and Machine Learning</p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* MARQUEE */}
            <div className="relative border-y border-white/10 bg-white/[0.03] py-5">
                <div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
                    <MarqueeRow items={marquee} />
                    <MarqueeRow items={marquee} hidden />
                </div>
            </div>

            {/* ABOUT */}
            <section id="about" className={section}>
                <div className={`${container} grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center`}>
                    <div>
                        <Heading
                            tag="About me"
                            title="Curious mind, practical builder."
                            description={about?.description || "I enjoy turning ideas into practical software and continuously learning modern technologies."}
                        />
                        <Reveal delay={150}>
                            <a href="#contact" className={`mt-8 inline-flex rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-bold transition hover:border-[#8B5CF6] hover:bg-[#8B5CF6]/10 ${focus}`}>
                                Let's connect
                            </a>
                        </Reveal>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                        {[
                            ["🧩", "Problem solving", "Breaking complex problems into clear, practical solutions."],
                            ["⚙️", "Backend development", "Building REST APIs and systems with Java and Spring Boot."],
                            ["🤖", "AI and data science", "Exploring machine learning, data and intelligent apps."],
                            ["🚀", "Full-stack mindset", "Connecting frontend experiences with reliable backends."]
                        ].map(([icon, h, t], i) => (
                            <Reveal key={h} delay={i * 100}>
                                <Card className="h-full">
                                    <div className="p-6">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-2xl">{icon}</div>
                                        <h3 style={display} className="mt-5 text-lg font-bold">{h}</h3>
                                        <p className="mt-2 text-sm leading-7 text-slate-400">{t}</p>
                                    </div>
                                </Card>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* SKILLS */}
            <section id="skills" className={`${section} bg-white/[0.02]`}>
                <div className={container}>
                    <Heading tag="Skills" title="My tech toolbox." description="The languages, frameworks and tools I use to build." />
                    {skills.length === 0 ? (
                        <EmptyState text="No skills yet. Add some in the admin panel." />
                    ) : (
                        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {skillGroups.map(([category, items], i) => (
                                <Reveal key={category} delay={i * 80}>
                                    <Card className="h-full">
                                        <div className="p-7">
                                            <h3 style={display} className={`text-xl font-bold ${gradText}`}>{category}</h3>
                                            <div className="mt-5 flex flex-wrap gap-2.5">
                                                {items.map((s) => (
                                                    <span key={s.id} className="rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-sm font-medium text-slate-200 transition hover:border-[#22D3EE]/60 hover:text-[#22D3EE]">
                                                        {s.name}
                                                        {s.level && <span className="ml-2 text-xs text-slate-500">{s.level}</span>}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </Card>
                                </Reveal>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* PROJECTS */}
            <section id="projects" className={section}>
                <div className={container}>
                    <Heading tag="Projects" title="Things I've built." description="Selected work from my journey in software engineering, backend and AI." />
                    {projects.length === 0 ? (
                        <EmptyState text="No projects yet. Add one in the admin panel." />
                    ) : (
                        <div className="mt-14 grid gap-8 lg:grid-cols-2">
                            {projects.map((p, i) => (
                                <Reveal key={p.id} delay={(i % 2) * 120}>
                                    <Card className="h-full">
                                        <div className="relative h-64 overflow-hidden bg-gradient-to-br from-[#8B5CF6]/30 via-[#0B0D1C] to-[#22D3EE]/20">
                                            {p.image ? (
                                                <img src={p.image} alt={p.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                                            ) : (
                                                <div style={display} className="flex h-full items-center justify-center text-8xl font-extrabold text-white/10">
                                                    {String(i + 1).padStart(2, "0")}
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D1C] via-transparent to-transparent" />
                                        </div>
                                        <div className="p-7">
                                            <h3 style={display} className="text-2xl font-bold">{p.title}</h3>
                                            <p className="mt-3 leading-7 text-slate-400">{p.description}</p>
                                            <div className="mt-5 flex flex-wrap gap-2">
                                                {p.techStack?.split(",").map((t) => t.trim()).filter(Boolean).map((t) => <Chip key={t}>{t}</Chip>)}
                                            </div>
                                            {(p.githubUrl || p.liveUrl) && (
                                                <div className="mt-6 flex gap-3">
                                                    {p.githubUrl && (
                                                        <a href={p.githubUrl} target="_blank" rel="noreferrer" className={`rounded-full border border-white/15 px-5 py-2 text-sm font-semibold transition hover:border-[#22D3EE] hover:text-[#22D3EE] ${focus}`}>
                                                            View code
                                                        </a>
                                                    )}
                                                    {p.liveUrl && (
                                                        <a href={p.liveUrl} target="_blank" rel="noreferrer" className={`rounded-full ${grad} px-5 py-2 text-sm font-semibold text-white transition hover:scale-105 ${focus}`}>
                                                            Open live demo
                                                        </a>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </Card>
                                </Reveal>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* SERVICES */}
            <section id="services" className={`${section} bg-white/[0.02]`}>
                <div className={container}>
                    <Heading tag="Services" title="How I can help." description="Practical development for websites, applications and backend systems." />
                    {services.length === 0 ? (
                        <EmptyState text="No services yet. Add one in the admin panel." />
                    ) : (
                        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {services.map((s, i) => (
                                <Reveal key={s.id} delay={(i % 3) * 100}>
                                    <Card className="h-full">
                                        <div className="p-8">
                                            <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${grad} text-2xl shadow-lg shadow-[#8B5CF6]/30`}>
                                                {s.icon || "✦"}
                                            </div>
                                            <h3 style={display} className="mt-6 text-xl font-bold">{s.title}</h3>
                                            <p className="mt-3 leading-7 text-slate-400">{s.description}</p>
                                        </div>
                                    </Card>
                                </Reveal>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* EXPERIENCE */}
            <section id="experience" className={section}>
                <div className="mx-auto max-w-4xl">
                    <Heading tag="Experience" title="My journey so far." description="Roles, internships and milestones." center />
                    {experiences.length === 0 ? (
                        <EmptyState text="No experience yet. Add some in the admin panel." />
                    ) : (
                        <ol className="relative mt-16 border-l border-white/15 pl-8 sm:pl-10">
                            {experiences.map((e, i) => (
                                <li key={e.id} className="relative mb-10 last:mb-0">
                                    <span className={`absolute -left-[41px] top-6 h-4 w-4 rounded-full ${grad} shadow-[0_0_20px_#8B5CF6] sm:-left-[49px]`} />
                                    <Reveal delay={i * 80}>
                                        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-[#8B5CF6]/50 sm:p-7">
                                            <p className="text-sm font-semibold text-[#22D3EE]">
                                                {e.startDate || ""}{e.startDate || e.endDate ? " to " : ""}{e.endDate || "Present"}
                                            </p>
                                            <h3 style={display} className="mt-2 text-2xl font-bold">{e.role}</h3>
                                            <p className="mt-1 font-medium text-slate-300">
                                                {e.company}{e.location && <span className="font-normal text-slate-500">, {e.location}</span>}
                                            </p>
                                            {e.description && <p className="mt-4 leading-8 text-slate-400">{e.description}</p>}
                                        </div>
                                    </Reveal>
                                </li>
                            ))}
                        </ol>
                    )}
                </div>
            </section>

            {/* TESTIMONIALS */}
            <section id="testimonials" className={`${section} bg-white/[0.02]`}>
                <div className={container}>
                    <Heading tag="Testimonials" title="Kind words." description="Feedback from teammates, mentors and clients." />
                    {testimonials.length === 0 ? (
                        <EmptyState text="No testimonials yet. Add one in the admin panel." />
                    ) : (
                        <div className="mt-14 grid gap-6 md:grid-cols-2">
                            {testimonials.map((t, i) => (
                                <Reveal key={t.id} delay={(i % 2) * 100}>
                                    <Card className="h-full">
                                        <figure className="flex h-full flex-col p-8">
                                            <span style={display} className={`text-6xl font-extrabold leading-none ${gradText}`}>“</span>
                                            <blockquote className="mt-2 flex-1 text-lg leading-8 text-slate-300">{t.message}</blockquote>
                                            <figcaption className="mt-7 flex items-center gap-4 border-t border-white/10 pt-6">
                                                {t.image ? (
                                                    <img src={t.image} alt={t.name} className="h-12 w-12 rounded-full object-cover ring-2 ring-[#8B5CF6]/50" />
                                                ) : (
                                                    <div className={`flex h-12 w-12 items-center justify-center rounded-full ${grad} font-bold`}>
                                                        {t.name?.charAt(0)?.toUpperCase()}
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="font-bold">{t.name}</p>
                                                    {t.role && <p className="text-sm text-slate-500">{t.role}</p>}
                                                </div>
                                            </figcaption>
                                        </figure>
                                    </Card>
                                </Reveal>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* BLOGS */}
            <section id="blogs" className={section}>
                <div className={container}>
                    <Heading tag="Blog" title="Notes on what I'm learning." description="Short articles on Java, AI and building software." />
                    {blogs.length === 0 ? (
                        <EmptyState text="No posts yet. Publish one in the admin panel." />
                    ) : (
                        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {blogs.map((b, i) => (
                                <Reveal key={b.id} delay={(i % 3) * 100}>
                                    <Card className="h-full">
                                        <div className="h-44 overflow-hidden bg-gradient-to-br from-[#8B5CF6]/30 to-[#22D3EE]/20">
                                            {b.image ? (
                                                <img src={b.image} alt={b.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                                            ) : (
                                                <div className="flex h-full items-center justify-center text-5xl text-white/20">✦</div>
                                            )}
                                        </div>
                                        <div className="p-7">
                                            <div className="flex items-center justify-between gap-3">
                                                <Chip>{b.category || "General"}</Chip>
                                                {b.publishedDate && <span className="text-xs text-slate-500">{b.publishedDate}</span>}
                                            </div>
                                            <h3 style={display} className="mt-4 text-xl font-bold leading-7">{b.title}</h3>
                                            <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-400">{b.content}</p>
                                        </div>
                                    </Card>
                                </Reveal>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* CONTACT */}
            <section id="contact" className={section}>
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8B5CF6]/20 blur-[140px]" />
                <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
                    <div>
                        <Heading tag="Contact" title="Let's build something great together." description="Have a project, internship or idea? Send a message and I'll reply soon." />
                        <Reveal delay={150}>
                            <div className="mt-9 space-y-4">
                                {about?.email && (
                                    <a href={`mailto:${about.email}`} className={`flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-[#22D3EE]/60 ${focus}`}>
                                        <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${grad}`}>✉</span>
                                        <span><span className="block text-xs text-slate-500">Email</span><span className="font-medium">{about.email}</span></span>
                                    </a>
                                )}
                                {about?.location && (
                                    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                                        <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${grad}`}>⌖</span>
                                        <span><span className="block text-xs text-slate-500">Location</span><span className="font-medium">{about.location}</span></span>
                                    </div>
                                )}
                            </div>
                        </Reveal>
                    </div>

                    <Reveal delay={100}>
                        <form onSubmit={handleContactSubmit} className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 shadow-2xl backdrop-blur-xl sm:p-8">
                            <div className="grid gap-5 sm:grid-cols-2">
                                <Field id="contact-name" name="name" label="Name" placeholder="Your name" value={contactForm.name} onChange={handleContactChange} />
                                <Field id="contact-email" name="email" label="Email" type="email" placeholder="you@example.com" value={contactForm.email} onChange={handleContactChange} />
                            </div>
                            <Field id="contact-subject" name="subject" label="Subject" placeholder="What is this about?" value={contactForm.subject} onChange={handleContactChange} className="mt-5" />
                            <div className="mt-5">
                                <label htmlFor="contact-message" className="text-sm font-medium text-slate-300">Message</label>
                                <textarea
                                    id="contact-message" name="message" rows={6} required
                                    placeholder="Tell me about your project or idea"
                                    value={contactForm.message} onChange={handleContactChange}
                                    className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm leading-7 text-white outline-none transition placeholder:text-slate-600 focus:border-[#8B5CF6] focus:ring-4 focus:ring-[#8B5CF6]/20"
                                />
                            </div>
                            <div aria-live="polite">
                                {contactSuccess && <p className="mt-5 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300">{contactSuccess}</p>}
                                {contactError && <p className="mt-5 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">{contactError}</p>}
                            </div>
                            <button
                                type="submit" disabled={contactSending}
                                className={`mt-6 w-full rounded-xl ${grad} px-6 py-4 text-sm font-bold text-white shadow-[0_0_40px_-8px_#8B5CF6] transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 ${focus}`}
                            >
                                {contactSending ? "Sending..." : "Send message"}
                            </button>
                        </form>
                    </Reveal>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="border-t border-white/10 px-6 py-10 lg:px-8">
                <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <p style={display} className="text-xl font-extrabold">
                        <span className={gradText}>{name}</span>
                    </p>
                    <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-400">
                        {["Home", "About", "Skills", "Projects", "Services", "Experience", "Testimonials", "Blogs", "Contact"].map((l) => (
                            <a key={l} href={`#${l.toLowerCase()}`} className={`transition hover:text-white ${focus}`}>{l}</a>
                        ))}
                    </nav>
                    <p className="text-sm text-slate-500">© {new Date().getFullYear()} {name}</p>
                </div>
            </footer>
        </main>
    );
}

export default Home;