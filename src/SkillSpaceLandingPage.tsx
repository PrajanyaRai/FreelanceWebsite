import { useEffect, useMemo, useState } from "react";

// SkillSpace - Full Fiverr-style landing (React + Tailwind)
// Includes: sticky navbar with brand logo + search, hero with large copy + search + trending chips,
// auto-scrolling marquee, animated promo banner (moving UI cards), Popular Services carousel,
// Sign in / Join modals (two-column design), trusted logos, footer. Mobile-friendly.
import programmingTechIcon from "./assets/Images/programming-tech-thin.56382a2.svg";
import graphicsDesignIcon from "./assets/Images/graphics-design-thin.ff38893.svg";
import digitalMarketingIcon from "./assets/Images/digital-marketing-thin.68edb44.svg";
import writingTranslationIcon from "./assets/Images/writing-translation-thin.fd3699b.svg";
import videoAnimationIcon from "./assets/Images/video-animation-thin.9d3f24d.svg";
import aiServicesIcon from "./assets/Images/ai-services-thin.104f389.svg";
import musicAudioIcon from "./assets/Images/music-audio-thin.43a9801.svg";
// removed Business/Consulting icons per updated categories
export default function SkillSpaceLandingPage() {
    const [query, setQuery] = useState("");
    const [showSignIn, setShowSignIn] = useState(false);
    const [showJoin, setShowJoin] = useState(false);

    const trending = [
        "website development",
        "architecture & interior design",
        "video editing",
        "excel cleanup",
        "poster design",
        "python scripts",
        "social media posts",
    ];

    return (
        <div className="min-h-screen bg-neutral-50 text-neutral-900">
            <StyleBlock />
            <Navbar onSignIn={() => setShowSignIn(true)} onJoin={() => setShowJoin(true)} />
            <Hero query={query} setQuery={setQuery} trending={trending} />
            <CategoriesMarquee items={trending} />
            <TopCategories />
            <PopularServices />
            <PromoMovingBanner />
            <TrustedLogos />
            <Footer />

            {showSignIn && (
                <AuthModal type="signin" onClose={() => setShowSignIn(false)} />
            )}
            {showJoin && (
                <AuthModal type="join" onClose={() => setShowJoin(false)} />
            )}
        </div>
    );
}

/* ---------------- UI Blocks ---------------- */
function Navbar({ onSignIn, onJoin }: { onSignIn: () => void; onJoin: () => void }) {
    // Fallback inline SVG if /public/skillspace-logo.jpg is missing
    const fallbackLogo = encodeURI(
        `data:image/svg+xml;utf8,` +
        `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>` +
        `<rect width='64' height='64' rx='14' fill='white'/>` +
        `<circle cx='32' cy='32' r='18' fill='none' stroke='%2310b981' stroke-width='3'/>` +
        `<ellipse cx='32' cy='32' rx='26' ry='12' fill='none' stroke='%2310b981' stroke-width='3'/>` +
        `<text x='32' y='37' font-size='24' font-family='Inter, Arial' text-anchor='middle' fill='%23111'>S</text>` +
        `</svg>`
    );

    return (
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-neutral-200">
            <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
                <a href="#top" className="flex items-center gap-3 group">
                    <img
                        src={`${import.meta.env.BASE_URL}skillspace-logo.jpg`}
                        alt="SkillSpace"
                        className="h-8 w-8 rounded-xl object-contain"
                        onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = fallbackLogo;
                        }}
                    />
                    <span className="text-2xl font-extrabold tracking-tight">SkillSpace</span>
                </a>
                <div className="hidden lg:flex items-center flex-1 max-w-2xl mx-6">
                    <SearchBar compact />
                </div>
                <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-700 whitespace-nowrap">
                    <a href="#explore" className="hover:text-neutral-900">Explore</a>
                    <a href="#how" className="hover:text-neutral-900">How it works</a>
                    <a href="#pro" className="hover:text-neutral-900">For Business</a>
                    <a href="#faq" className="hover:text-neutral-900">FAQ</a>
                </nav>
                <div className="flex items-center gap-3 text-sm">
                    <button className="hidden sm:inline-flex h-10 items-center rounded-xl px-4 border border-neutral-300 hover:bg-neutral-50 whitespace-nowrap">Become a Seller</button>
                    <button onClick={onSignIn} className="hidden sm:inline-flex h-10 items-center rounded-xl px-4 hover:bg-neutral-100 whitespace-nowrap">Sign in</button>
                    <button onClick={onJoin} className="inline-flex h-10 items-center rounded-xl px-5 bg-emerald-600 text-white font-semibold hover:bg-emerald-500 shadow-sm whitespace-nowrap">Join</button>
                </div>
            </div>
        </header>
    );
}

function Hero({ query, setQuery, trending }: { query: string; setQuery: (v: string) => void; trending: string[] }) {
    return (
        <section id="top" className="relative overflow-hidden">
            <div className="absolute inset-0 -z-10">
                <div className="h-[520px] bg-[radial-gradient(80%_60%_at_20%_20%,#d1fae5,transparent),radial-gradient(60%_60%_at_80%_40%,#bfdbfe,transparent)]" />
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                <div className="max-w-4xl">
                    <h1 className="text-5xl md:text-6xl font-extrabold leading-[1.05] tracking-tight">
                        Our student freelancers <br className="hidden sm:block" />
                        will take it from here
                    </h1>
                    <p className="mt-4 text-lg text-neutral-700 max-w-2xl">
                        Find trusted, verified college talent for micro-gigs across design, data, video, code, content, and more.
                    </p>
                    <SearchBar query={query} setQuery={setQuery} />
                    <div className="mt-4 flex flex-wrap gap-3 text-sm">
                        {trending.slice(0, 5).map((t, i) => (
                            <a
                                key={i}
                                href="#"
                                className="rounded-full border border-neutral-300 bg-white px-4 py-2 text-neutral-900 hover:bg-neutral-50 flex items-center gap-2 shadow-sm"
                            >
                                <span className="capitalize">{t}</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-500">
                                    <path d="M5 12h14"></path>
                                    <path d="M12 5l7 7-7 7"></path>
                                </svg>
                                {i === 4 && (
                                    <span className="ml-1 rounded-full bg-lime-200 text-neutral-800 text-[10px] font-bold px-2 py-[2px]">NEW</span>
                                )}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ---------------- Categories Grid ---------------- */
function TopCategories() {
    type Cat = { name: string; icon: string; alt: string };

    const cats: Cat[] = [
        { name: "Code & Tech", icon: programmingTechIcon, alt: "Laptop icon" },
        { name: "Design & Branding", icon: graphicsDesignIcon, alt: "Design grid icon" },
        { name: "Growth Marketing", icon: digitalMarketingIcon, alt: "Megaphone icon" },
        { name: "Writing & Language", icon: writingTranslationIcon, alt: "Letter A icon" },
        { name: "Video & Motion", icon: videoAnimationIcon, alt: "Video camera icon" },
        { name: "AI & Automation", icon: aiServicesIcon, alt: "AI nodes icon" },
        { name: "Music & Sound", icon: musicAudioIcon, alt: "Music note icon" },
        { name: "AI servises", icon: aiServicesIcon, alt: "AI icon" },
    ];

    return (
        <section className="py-6 sm:py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex gap-5 overflow-x-auto pb-3 snap-x snap-mandatory no-scrollbar">
                    {cats.map((c, i) => (
                        <a
                            key={i}
                            href="#"
                            className="group relative snap-start shrink-0 w-[220px] h-[160px] rounded-[22px] bg-white border border-neutral-200 shadow-[0_12px_28px_rgba(15,23,42,0.06)] transition group-hover:border-rose-200"
                        >
                            <div className="absolute inset-0 rounded-[22px] pointer-events-none bg-[radial-gradient(140px_140px_at_18%_18%,rgba(15,23,42,0.06),transparent_70%)]" />
                            <div className="absolute inset-0 rounded-[22px] pointer-events-none transition-opacity duration-200 opacity-0 group-hover:opacity-100 bg-[radial-gradient(150px_150px_at_18%_18%,rgba(239,68,68,0.16),transparent_65%)]" />
                            <div className="relative z-10 h-full w-full flex flex-col justify-between px-6 pt-6 pb-7 text-left">
                                <img src={c.icon} alt={c.alt} className="h-8 w-8 object-contain" loading="lazy" />
                                <div className="text-[17px] font-semibold leading-6 text-neutral-900 tracking-tight">
                                    {c.name}
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}

function SearchBar({ query, setQuery, compact }: { query?: string; setQuery?: (v: string) => void; compact?: boolean }) {
    const SearchIcon = (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="M21 21l-4.3-4.3"></path>
        </svg>
    );

    if (compact) {
        return (
            <div className="w-full">
                <form onSubmit={(e) => e.preventDefault()} className="flex items-center h-11 rounded-xl bg-white shadow ring-1 ring-neutral-200 overflow-hidden w-full">
                    <input value={query ?? ""} onChange={(e) => setQuery && setQuery(e.target.value)} placeholder="Search for any service..." className="flex-1 h-full px-4 outline-none text-[15px]" />
                    <button type="submit" className="h-11 grid place-items-center px-5 bg-neutral-900 text-white hover:bg-neutral-800" aria-label="Search">
                        Search
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="mt-6">
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center h-14 rounded-full bg-white shadow-[0_6px_16px_rgba(0,0,0,.12)] ring-1 ring-neutral-200 overflow-hidden max-w-3xl">
                <input value={query ?? ""} onChange={(e) => setQuery && setQuery(e.target.value)} placeholder="Search for any service..." className="flex-1 h-full px-5 md:px-6 outline-none text-[16px]" />
                <button type="submit" className="h-14 w-14 grid place-items-center bg-neutral-900 text-white hover:bg-neutral-800" aria-label="Search">
                    {SearchIcon}
                </button>
            </form>
        </div>
    );
}
function CategoriesMarquee({ items }: { items: string[] }) {
    const row = useMemo(() => [...items, ...items, ...items], [items]);
    return (
        <section id="explore" className="bg-white border-y border-neutral-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 overflow-hidden">
                <div className="marquee flex gap-3 will-change-transform">
                    {row.map((t, i) => (
                        <span key={i} className="shrink-0 rounded-full border border-neutral-300 bg-neutral-50 px-4 py-2 text-sm hover:bg-neutral-100 cursor-pointer">{t}</span>
                    ))}
                </div>
            </div>
        </section>
    );
}

function PopularServices() {
    const cards = [
        { title: "Generative Coding", color: "from-rose-300 to-rose-500", icon: programmingTechIcon },
        { title: "Web Build & Fixes", color: "from-emerald-200 to-emerald-400", icon: programmingTechIcon },
        { title: "Clip & Edit", color: "from-orange-200 to-orange-400", icon: videoAnimationIcon },
        { title: "App & Software", color: "from-amber-200 to-amber-400", icon: programmingTechIcon },
        { title: "Search Visibility", color: "from-teal-200 to-teal-400", icon: digitalMarketingIcon },
        { title: "AI Design Studio", color: "from-pink-200 to-pink-400", icon: graphicsDesignIcon },
    ];

    return (
        <section className="py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold">Featured Services</h2>
                <div className="mt-6 flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
                    {cards.map((c, i) => (
                        <article key={i} className="snap-start shrink-0 w-72 rounded-2xl bg-emerald-950/90 text-white p-5 shadow-[0_10px_30px_rgba(0,0,0,.15)]">
                            <h3 className="text-lg font-semibold leading-snug min-h-[3.5rem]">{c.title}</h3>
                            <div className={`mt-4 h-40 rounded-xl bg-gradient-to-br ${c.color} grid place-items-center`}>
                                <img src={c.icon} alt="" className="h-12 w-12 opacity-90" />
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

function PromoMovingBanner() {
    return (
        <section className="py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="rounded-[28px] bg-gradient-to-br from-rose-600 via-rose-500 to-rose-400 text-white p-6 sm:p-10 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,.15)] relative overflow-hidden">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                        {/* Left copy (match Fiverr weight and spacing) */}
                        <div className="max-w-xl">
                            <h3 className="text-[40px] md:text-[54px] leading-[1.05] font-light tracking-tight">
                                Need help with video editing?
                            </h3>
                            <p className="mt-4 text-white/90 text-lg">
                                Get matched with the right student expert to keep building your project.
                            </p>
                            <button className="mt-8 inline-flex h-12 items-center rounded-xl bg-white text-rose-700 px-6 font-semibold hover:bg-rose-50">
                                Find an expert
                            </button>
                        </div>
                        {/* Right media (video framed like Fiverr) */}
                        <div className="relative h-[320px] md:h-[360px]">
                            <div className="absolute -inset-6 rounded-[26px] bg-white/10" />
                            <div className="absolute inset-0 rounded-[22px] bg-black/10 backdrop-blur-sm ring-1 ring-white/20 shadow-[0_30px_80px_rgba(0,0,0,.25)] overflow-hidden grid place-items-center">
                                <video
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    preload="auto"
                                    className="w-[92%] h-[82%] object-cover rounded-2xl shadow-2xl"
                                >
                                    <source src={`${import.meta.env.BASE_URL}Videos/Generating_UI_Animation_Video.mp4`} type="video/mp4" />
                                    <source src={`${import.meta.env.BASE_URL}videos/Generating_UI_Animation_Video.mp4`} type="video/mp4" />
                                </video>
                                <a
                                    href={`${import.meta.env.BASE_URL}Videos/Generating_UI_Animation_Video.mp4`}
                                    download
                                    aria-label="Download demo video"
                                    className="absolute top-3 right-3 z-20 h-9 w-9 rounded-full bg-white/90 hover:bg-white grid place-items-center text-rose-600 shadow"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 3v12"></path>
                                        <path d="M7 10l5 5 5-5"></path>
                                        <path d="M5 21h14"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function TrustedLogos() {
    return (
        <section className="py-12 bg-white border-t border-neutral-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-sm text-neutral-600">Trusted by student teams</p>
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-14 rounded-xl bg-neutral-50 ring-1 ring-neutral-200 grid place-items-center text-neutral-500 text-sm"
                        >
                            Logo
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Footer() {
    return (
        <footer className="py-10 bg-white border-t border-neutral-200 text-neutral-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p>&copy; {new Date().getFullYear()} SkillSpace</p>
                <div className="flex gap-4 items-center">
                    <a
                        href={`${import.meta.env.BASE_URL}downloads/skillspace-project.zip`}
                        download
                        className="inline-flex items-center gap-2 rounded-lg px-3 py-2 bg-neutral-900 text-white text-sm hover:bg-neutral-800"
                    >
                        <span>Download Project</span>
                    </a>
                    <a href="#" className="hover:text-neutral-800">Terms</a>
                    <a href="#" className="hover:text-neutral-800">Privacy</a>
                    <a href="#" className="hover:text-neutral-800">Help</a>
                </div>
            </div>
        </footer>
    );
}
// UICard removed: banner now uses a video instead of animated UI cards.

/* ---------------- Auth Modal ---------------- */
function AuthModal({ type, onClose }: { type: "signin" | "join"; onClose: () => void }) {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                event.preventDefault();
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    return (
        <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 grid place-items-center p-4 bg-black/50"
            onClick={onClose}
        >
            <div
                className="w-full max-w-4xl rounded-2xl bg-white overflow-hidden shadow-2xl"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="grid md:grid-cols-2">
                    <div className="p-8 bg-rose-50">
                        <h3 className="text-2xl font-bold">Kickstart your journey</h3>
                        <ul className="mt-4 space-y-2 text-sm text-rose-900/80">
                            <li>- Over 70 categories</li>
                            <li>- Quality work done faster</li>
                            <li>- Access to talent across the globe</li>
                        </ul>
                        <div className="mt-8 rounded-xl bg-white p-4 ring-1 ring-rose-200">
                            <p className="text-sm text-rose-600">Tip</p>
                            <p className="text-sm">Use your university email for student-only perks.</p>
                        </div>
                    </div>
                    <div className="p-8">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-semibold">
                                {type === "signin" ? "Sign in to your account" : "Create your account"}
                            </h3>
                            <button
                                type="button"
                                onClick={onClose}
                                aria-label="Close"
                                className="h-9 w-9 rounded-lg grid place-items-center hover:bg-neutral-100"
                            >
                                <span aria-hidden>&times;</span>
                            </button>
                        </div>
                        <p className="text-sm text-neutral-600 mt-1">
                            {type === "signin"
                                ? "Don't have an account? Join here"
                                : "Already have an account? Sign in"}
                        </p>

                        <div className="mt-6 grid gap-3">
                            <button className="h-11 rounded-xl border border-neutral-300 hover:bg-neutral-50">
                                Continue with Google
                            </button>
                            <button className="h-11 rounded-xl border border-neutral-300 hover:bg-neutral-50">
                                Continue with email/username
                            </button>
                            <div className="text-center text-xs text-neutral-400">OR</div>
                            <div className="grid grid-cols-2 gap-3">
                                <button className="h-11 rounded-xl border border-neutral-300 hover:bg-neutral-50">
                                    Apple
                                </button>
                                <button className="h-11 rounded-xl border border-neutral-300 hover:bg-neutral-50">
                                    Facebook
                                </button>
                            </div>
                            <p className="mt-3 text-[11px] text-neutral-500">
                                By joining, you agree to the Terms and Privacy Policy.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
/* -------------- Styles for marquee + moving cards + avatars -------------- */
function StyleBlock() {
    return (
        <style>{`
      .marquee { animation: marquee 24s linear infinite; }
      @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-33.333%); } }

      .lane {
        display: flex;
        gap: 12px;
        width: max-content;
        animation: slideLane 14s linear infinite;
      }
      @keyframes slideLane {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .ui-card {
        width: 180px; height: 120px;
        border-radius: 16px;
        background: rgba(255,255,255,0.95);
        color: #1f2937; /* neutral-800 */
        padding: 12px;
        box-shadow: 0 10px 25px rgba(0,0,0,.12);
        display: flex; flex-direction: column; justify-content: center;
      }
      .avatar { width: 24px; height: 24px; border-radius: 9999px; border: 2px solid white; background: linear-gradient(135deg,#fee2e2,#fecaca); box-shadow: 0 2px 6px rgba(0,0,0,.08); display:inline-block; }
      .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      .no-scrollbar::-webkit-scrollbar { display: none; }
    `}</style>
    );
}












