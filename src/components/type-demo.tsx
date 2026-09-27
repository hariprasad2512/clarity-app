import { Calendar, Clock, Plus } from "lucide-react"
import { useTypewriter } from "@/hooks/use-typewriter"

const LOGO = `${import.meta.env.BASE_URL}clarity_store_icon_512.png`

const EXAMPLES: { text: string; date: string; time?: string }[] = [
  { text: "Finish project by today 12:30 PM", date: "Today", time: "12:30 PM" },
  { text: "Wash clothes today", date: "Today" },
  { text: "Finish side project this weekend", date: "This weekend" },
  { text: "Get this done by tomorrow", date: "Tomorrow" },
]

/** Mock quick-add bar: loops typed natural-language examples.
 *  Date/time chips fade in only after the full task text is typed. */
export function TypeDemo() {
  const { text, phraseIndex, done } = useTypewriter(EXAMPLES.map((e) => e.text))
  const example = EXAMPLES[phraseIndex] ?? EXAMPLES[0]

  return (
    <div data-testid="type-demo" className="w-full rounded-2xl border border-primary/25 bg-card px-4 py-3 shadow-sm text-left">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <img
          src={LOGO}
          alt=""
          aria-hidden="true"
          draggable={false}
          className="size-8 shrink-0 rounded-full object-cover"
        />
        <p
          aria-live="polite"
          className="min-w-0 flex-1 basis-48 break-words text-sm sm:text-base text-foreground leading-relaxed"
        >
          {text}
          <span aria-hidden="true" className="ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[2px] bg-primary animate-pulse" />
        </p>
        {done && (
          <>
            <span
              key={`date-${phraseIndex}`}
              className="animate-fade-in inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-primary/10 px-2.5 py-1.5 text-sm font-medium text-primary"
            >
              <Calendar className="size-4" />
              {example.date}
            </span>
            {example.time && (
              <span
                key={`time-${phraseIndex}`}
                className="animate-fade-in inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-primary/10 px-2.5 py-1.5 text-sm font-medium text-primary"
              >
                <Clock className="size-4" />
                {example.time}
              </span>
            )}
          </>
        )}
        <span
          aria-hidden="true"
          className="hidden sm:inline-flex shrink-0 items-center rounded-lg bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground"
        >
          Add
        </span>
        <span
          aria-hidden="true"
          className="inline-flex sm:hidden ml-auto size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"
        >
          <Plus className="size-4" strokeWidth={3} />
        </span>
      </div>
      {/* static fallback for screen readers */}
      <span className="sr-only">
        Example tasks: {EXAMPLES.map((e) => e.text).join(". ")}
      </span>
    </div>
  )
}
