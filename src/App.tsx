import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ModeToggle } from "@/components/mode-toggle"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useDetectPlatform, type Platform } from "@/hooks/use-detect-platform"
import {
  CheckCircle2,
  Smartphone,
  Monitor,
  Apple,
  ArrowRight,
  Code2,
  Bell,
  BellRing,
  Mail,
  Zap,
  RefreshCw,
  Shield,
  CalendarClock,
  Layers,
} from "lucide-react"

function ClarityMark({ className = "size-8" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center justify-center rounded-xl bg-primary text-primary-foreground ${className}`} aria-hidden="true">
      <CheckCircle2 className="size-3/5" strokeWidth={2.5} />
    </span>
  )
}

/* ─── Scroll-reveal wrapper ─────────────────────────────────────────────── */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const { ref, visible } = useScrollReveal()
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

/* ─── Feature card ──────────────────────────────────────────────────────── */
function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="size-5" />
      </div>
      <div>
        <h3 className="font-semibold text-base text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

/* ─── Platform download options ────────────────────────────────────────── */
type DownloadOption = {
  icon: React.ComponentType<{ className?: string }>
  label: string
  sub: string
  href: string
}

const RELEASES = "https://github.com/hariprasad2512/clarity_flutter/releases/latest"
const PLAY_STORE = "https://play.google.com/store/apps/details?id=com.harry.Clarity"

const downloadOptionsByPlatform: Record<Platform, DownloadOption[]> = {
  android: [
    { icon: Smartphone, label: "Google Play", sub: "Get on", href: PLAY_STORE },
    { icon: Smartphone, label: "Android (.apk)", sub: "Download for", href: RELEASES },
  ],
  ios: [
    { icon: Apple, label: "macOS (.dmg)", sub: "Download for", href: RELEASES },
  ],
  macos: [
    { icon: Apple, label: "Homebrew", sub: "Install via", href: "https://github.com/hariprasad2512/clarity_flutter" },
    { icon: Apple, label: "macOS (.dmg)", sub: "Download for", href: RELEASES },
  ],
  windows: [
    { icon: Monitor, label: "Windows (.exe)", sub: "Download for", href: RELEASES },
  ],
  linux: [
    { icon: Monitor, label: "Linux (AppImage)", sub: "Download for", href: RELEASES },
  ],
  unknown: [
    { icon: Apple, label: "macOS (.dmg)", sub: "Download for", href: RELEASES },
    { icon: Monitor, label: "Windows (.exe)", sub: "Download for", href: RELEASES },
  ],
}

function PlatformDownloadRow({ platform }: { platform: Platform }) {
  const options = downloadOptionsByPlatform[platform]

  return (
    <div
      className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-up"
      style={{ animationDelay: "360ms", animationFillMode: "both" }}
    >
      {options.map((opt) => (
        <a
          key={opt.label}
          href={opt.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 rounded-xl border border-border bg-card/90 px-5 py-3 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
        >
          <opt.icon className="size-5 shrink-0 text-primary" />
          <div className="text-left">
            <div className="text-[11px] leading-tight text-muted-foreground">{opt.sub}</div>
            <div className="text-sm font-semibold leading-tight text-foreground">{opt.label}</div>
          </div>
          <ArrowRight className="ml-1 size-4 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-primary" />
        </a>
      ))}
    </div>
  )
}

/* ─── Platform download button ──────────────────────────────────────────── */
function PlatformButton({
  icon: Icon,
  label,
  sub,
  href,
  highlight,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  sub: string
  href: string
  highlight?: boolean
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex items-center gap-4 rounded-2xl border px-6 py-4 transition-all hover:-translate-y-0.5 hover:shadow-lg ${
        highlight
          ? "border-primary/50 bg-primary text-primary-foreground hover:bg-primary/90"
          : "border-border bg-card text-foreground hover:border-primary/40 hover:bg-accent"
      }`}
    >
      <Icon className="size-6 shrink-0" />
      <div className="text-left">
        <div className="text-xs opacity-70">{sub}</div>
        <div className="font-semibold text-sm">{label}</div>
      </div>
      <ArrowRight className="ml-auto size-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
    </a>
  )
}

/* ─── App screenshot mockup ─────────────────────────────────────────────── */
function AppMockup({ mode }: { mode: "light" | "dark" }) {
  const isDark = mode === "dark"
  const bg = isDark ? "bg-[oklch(0.18_0.02_140)]" : "bg-[oklch(0.99_0.008_115)]"
  const sidebar = isDark ? "bg-[oklch(0.13_0.015_140)]" : "bg-[oklch(0.94_0.025_128)]"
  const text = isDark ? "text-[oklch(0.95_0.01_120)]" : "text-[oklch(0.15_0.02_140)]"
  const muted = isDark ? "text-[oklch(0.60_0.04_130)]" : "text-[oklch(0.48_0.04_140)]"
  const itemBg = isDark ? "bg-[oklch(0.22_0.02_140)]" : "bg-[oklch(0.97_0.015_120)]"
  const border = isDark ? "border-white/10" : "border-black/10"

  const tasks = [
    "Finish Assignment",
    "Review pull request",
    "Send weekly update",
    "Plan weekend trip",
  ]

  return (
    <div
      className={`${bg} rounded-2xl border ${border} shadow-2xl overflow-hidden w-full max-w-lg font-sans`}
    >
      {/* title bar */}
      <div className={`${isDark ? "bg-[oklch(0.16_0.02_140)]" : "bg-[oklch(0.96_0.02_125)]"} px-4 py-2.5 flex items-center gap-2 border-b ${border}`}>
        <div className="flex gap-1.5">
          <span className="size-3 rounded-full bg-red-400" />
          <span className="size-3 rounded-full bg-yellow-400" />
          <span className="size-3 rounded-full bg-green-400" />
        </div>
        <span className={`text-xs mx-auto ${muted}`}>Clarity</span>
      </div>
      <div className="flex h-64">
        {/* sidebar */}
        <div className={`${sidebar} w-36 flex-shrink-0 p-3 flex flex-col gap-1 border-r ${border}`}>
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="size-4 text-primary" />
            <span className={`text-sm font-bold ${text}`}>Clarity</span>
          </div>
          <div className={`rounded-lg px-2 py-1.5 flex items-center justify-between bg-primary/20`}>
            <span className="text-xs font-medium text-primary">Today</span>
            <Badge className="h-4 min-w-4 text-[10px] px-1 bg-primary text-primary-foreground">4</Badge>
          </div>
          {["Inbox", "Done"].map((item) => (
            <div key={item} className={`rounded-lg px-2 py-1.5 flex items-center justify-between`}>
              <span className={`text-xs ${muted}`}>{item}</span>
            </div>
          ))}
        </div>
        {/* main */}
        <div className={`flex-1 p-4 overflow-hidden`}>
          <div className={`text-base font-bold ${text} mb-3`}>Today <span className={`text-sm font-normal ${muted}`}>4</span></div>
          <div className="flex flex-col gap-2">
            {tasks.map((t, i) => (
              <div key={i} className={`${itemBg} rounded-lg px-3 py-2 flex items-center gap-2`}>
                <div className="size-4 rounded-full border-2 border-primary flex-shrink-0" />
                <div>
                  <div className={`text-xs font-medium ${text}`}>{t}</div>
                  <div className={`text-[10px] ${muted}`}>Today 11:59 PM</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Navbar ────────────────────────────────────────────────────────────── */
function Navbar({ scrolled }: { scrolled: boolean }) {
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        {/* logo */}
        <div className="flex items-center gap-2.5">
          <img
            src="/clarity_store_icon_512.png"
            alt="Clarity"
            className="size-9 rounded-xl object-cover shadow-sm"
          />
          <span className="text-lg font-bold text-foreground">Clarity</span>
        </div>
        {/* nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#platforms" className="hover:text-foreground transition-colors">Platforms</a>
          <a href="#download" className="hover:text-foreground transition-colors">Download</a>
          <a
            href="https://github.com/hariprasad2512/clarity_flutter"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors flex items-center gap-1"
          >
            <Code2 className="size-4" /> GitHub
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Button asChild size="sm" className="hidden sm:flex">
            <a href="#download">Download</a>
          </Button>
        </div>
      </div>
    </header>
  )
}

/* ─── Main page ─────────────────────────────────────────────────────────── */
export function App() {
  const [scrolled, setScrolled] = useState(false)
  const platform = useDetectPlatform()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handler)
    return () => window.removeEventListener("scroll", handler)
  }, [])

  const features = [
    {
      icon: Bell,
      title: "Smart Reminders",
      description: "Actionable local notifications — mark done or snooze right from the alert, on every device.",
    },
    {
      icon: RefreshCw,
      title: "Live Two-Way Sync",
      description: "Connect Gmail once and keep every task synced across desktop and mobile the moment it changes.",
    },
    {
      icon: Mail,
      title: "Gmail Connected",
      description: "Stay in step with your inbox. Gmail-connected tasks sync everywhere, so every device stays current.",
    },
    {
      icon: CalendarClock,
      title: "Natural Language Dates",
      description: "Type 'tomorrow at 5pm' and Clarity parses it instantly. Refine with calendar or quick presets.",
    },
    {
      icon: Zap,
      title: "Quick Add Everywhere",
      description: "Global hotkey on desktop, home-screen widget on Android. Capture ideas without breaking flow.",
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Local-first storage. Your data lives on your device and syncs through your own Supabase project.",
    },
    {
      icon: Layers,
      title: "Today · Inbox · Done",
      description: "Three focused views keep you on track without distraction. Overdue tasks surface automatically.",
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar scrolled={scrolled} />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-16 px-4 overflow-hidden">
        {/* background blobs */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 size-[600px] rounded-full bg-primary/10 blur-[120px]" />
          <div className="absolute bottom-0 right-0 size-[400px] rounded-full bg-primary/8 blur-[100px]" />
        </div>

        <div className="max-w-4xl mx-auto text-center">
          {/* badge */}
          <div
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/8 px-4 py-1.5 text-sm text-primary font-medium mb-8 animate-fade-in"
            style={{ animationDelay: "0ms", animationFillMode: "both" }}
          >
            <ClarityMark className="size-4 rounded-sm" />
            Open source · Cross-platform · Local-first
          </div>

          {/* headline */}
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-balance leading-[1.05] animate-fade-up mb-6"
            style={{ animationDelay: "100ms", animationFillMode: "both" }}
          >
            tasks with{" "}
            <span className="text-primary italic">clarity</span>
          </h1>

          {/* sub */}
          <p
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-up mb-10"
            style={{ animationDelay: "220ms", animationFillMode: "both" }}
          >
            The Apple Reminders alternative that works everywhere.
            macOS, Windows, Android — minimal by design, powerful when you need it.
          </p>

          {/* device-aware download buttons */}
          <PlatformDownloadRow platform={platform} />

          <div
            className="flex justify-center animate-fade-up"
            style={{ animationDelay: "400ms", animationFillMode: "both" }}
          >
            <Button size="lg" variant="outline" className="gap-2 text-base px-8" asChild>
              <a
                href="https://github.com/hariprasad2512/clarity_flutter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Code2 className="size-5" /> View Source
              </a>
            </Button>
          </div>

          {/* platform badges */}
          <div
            className="flex flex-wrap justify-center gap-2 mt-8 animate-fade-up"
            style={{ animationDelay: "440ms", animationFillMode: "both" }}
          >
            {["macOS", "Windows", "Android", "iOS", "Linux"].map((p) => (
              <Badge key={p} variant="secondary" className="text-xs px-3 py-1">
                {p}
              </Badge>
            ))}
          </div>

          <div
            className="mx-auto mt-6 flex max-w-xl items-center gap-3 rounded-2xl border border-primary/25 bg-card/80 px-4 py-3 text-left shadow-sm backdrop-blur-sm animate-fade-up"
            style={{ animationDelay: "480ms", animationFillMode: "both" }}
          >
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <BellRing className="size-5" />
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground">Connect Gmail once.</span>{" "}
              Your tasks sync across every platform, with notifications arriving on all your devices at the same time.
            </p>
          </div>
        </div>

        {/* app screenshots */}
        <div
          className="mt-20 w-full max-w-5xl mx-auto px-4 animate-fade-up"
          style={{ animationDelay: "500ms", animationFillMode: "both" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <AppMockup mode="light" />
            <AppMockup mode="dark" />
          </div>
        </div>

        {/* scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce opacity-50">
          <div className="w-px h-8 bg-foreground/30" />
          <span className="text-xs text-muted-foreground">scroll</span>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section id="features" className="py-28 px-4">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">Features</Badge>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Everything you need,{" "}
              <span className="text-primary">nothing you don't</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Clarity is built around focus. Connect Gmail once, then keep tasks and reminders aligned across every device without the clutter.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 80}>
                <FeatureCard {...f} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLATFORMS SHOWCASE ───────────────────────────────────────────── */}
      <section id="platforms" className="py-24 px-4 bg-muted/40">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">Cross-Platform</Badge>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              One app, every device
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Connect Gmail once and your tasks, reminders, and updates stay in sync across every platform you use.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Apple,
                name: "macOS",
                desc: "Native menu bar integration, global Quick Add hotkey, tray presence, and launch-at-login.",
                badge: "macOS 12+",
              },
              {
                icon: Monitor,
                name: "Windows",
                desc: "Full desktop experience with system tray, keyboard shortcuts, and window management.",
                badge: "Windows 10+",
              },
              {
                icon: Smartphone,
                name: "Android",
                desc: "Home-screen widgets, swipe gestures, and a clean material design that stays out of your way.",
                badge: "Android 8+",
              },
            ].map((p, i) => (
              <Reveal key={p.name} delay={i * 100}>
                <div className="group rounded-2xl border bg-card p-8 hover:border-primary/40 hover:shadow-lg transition-all h-full flex flex-col gap-4">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <p.icon className="size-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg">{p.name}</h3>
                      <Badge variant="secondary" className="text-xs">{p.badge}</Badge>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── DOWNLOAD ─────────────────────────────────────────────────────── */}
      <section id="download" className="py-28 px-4">
        <div className="max-w-3xl mx-auto">
          <Reveal className="text-center mb-14">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">Download</Badge>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Get started in seconds
            </h2>
            <p className="text-muted-foreground text-lg">
              All builds are free and open source. Download directly or grab it from your platform's store.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <PlatformButton
                icon={Apple}
                sub="Download for"
                label="macOS (.dmg)"
                href="https://github.com/hariprasad2512/clarity_flutter/releases/latest"
                highlight
              />
              <PlatformButton
                icon={Monitor}
                sub="Download for"
                label="Windows (.exe)"
                href="https://github.com/hariprasad2512/clarity_flutter/releases/latest"
              />
              <PlatformButton
                icon={Smartphone}
                sub="Download for"
                label="Android (.apk)"
                href="https://github.com/hariprasad2512/clarity_flutter/releases/latest"
              />
              <PlatformButton
                icon={Smartphone}
                sub="Get on"
                label="Google Play"
                href="https://play.google.com/store/apps/details?id=com.harry.Clarity"
              />
            </div>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-center text-sm text-muted-foreground">
              All releases available on{" "}
              <a
                href="https://github.com/hariprasad2512/clarity_flutter/releases"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-4 hover:text-primary/80"
              >
                GitHub Releases
              </a>
              . Source code is MIT licensed.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── OPEN SOURCE CALLOUT ──────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <Reveal className="max-w-3xl mx-auto text-center">
          <ClarityMark className="mx-auto mb-6 size-16 rounded-2xl shadow-lg" />
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Built in the open
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto mb-8">
            Clarity is completely open source. Read the code, contribute a fix, or build your own fork. No paywalls, no telemetry.
          </p>
          <Button variant="secondary" size="lg" className="gap-2" asChild>
            <a
              href="https://github.com/hariprasad2512/clarity_flutter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Code2 className="size-5" /> Star on GitHub
            </a>
          </Button>
        </Reveal>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="py-10 px-4 border-t">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <ClarityMark className="size-5 rounded-md" />
            <span className="font-medium text-foreground">Clarity</span>
            <span>— Capture fast, track simply, sync everywhere.</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/hariprasad2512/clarity_flutter"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors flex items-center gap-1.5"
            >
              <Code2 className="size-4" /> GitHub
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.harry.Clarity"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Play Store
            </a>
            <span>MIT License</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
