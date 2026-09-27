import { useState } from "react"
import { Check, Copy, Terminal } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const COMMANDS = [
  "brew tap hariprasad2512/clarity",
  "brew install --cask hariprasad2512/clarity/clarity-flutter",
]

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // clipboard API unavailable (e.g. non-secure context) — legacy fallback
    try {
      const ta = document.createElement("textarea")
      ta.value = text
      ta.style.position = "fixed"
      ta.style.opacity = "0"
      document.body.appendChild(ta)
      ta.select()
      const ok = document.execCommand("copy")
      document.body.removeChild(ta)
      return ok
    } catch {
      return false
    }
  }
}

function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (await copyText(command)) {
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    }
  }

  return (
    <div className="flex items-center gap-2 rounded-xl border bg-muted/60 px-3 py-2.5">
      <code className="min-w-0 flex-1 break-all font-mono text-[13px] sm:text-sm text-foreground">
        {command}
      </code>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Copied" : `Copy ${command}`}
        className="flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
      >
        {copied ? <Check className="size-4 text-primary" /> : <Copy className="size-4" />}
      </button>
    </div>
  )
}

/** Homebrew install instructions with easy-copy commands. */
export function BrewModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Terminal className="size-5 text-primary" />
            Install via Homebrew
          </DialogTitle>
          <DialogDescription>
            Run these two commands in your terminal. The cask always pulls the latest release.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2.5">
          {COMMANDS.map((cmd) => (
            <CopyCommand key={cmd} command={cmd} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
