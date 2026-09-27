import { useEffect, useRef, useState } from "react"

type TypewriterOptions = {
  /** ms per character while typing */
  typeSpeed?: number
  /** ms per character while deleting */
  deleteSpeed?: number
  /** ms to hold the full phrase before deleting */
  pause?: number
}

export function useTypewriter(
  phrases: string[],
  { typeSpeed = 55, deleteSpeed = 28, pause = 1700 }: TypewriterOptions = {},
) {
  const [text, setText] = useState("")
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [done, setDone] = useState(false)

  // Phrases are often passed as an inline `.map()` (new identity every
  // render). Keep them in a ref so the effect doesn't restart on each render.
  const phrasesRef = useRef(phrases)
  phrasesRef.current = phrases

  useEffect(() => {
    const list = phrasesRef.current
    if (list.length === 0) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(list[0])
      setDone(true)
      return
    }

    let cancelled = false
    let timer: ReturnType<typeof setTimeout>
    const current = list[phraseIndex % list.length]
    let chars = 0
    let deleting = false
    setDone(false)

    const tick = () => {
      if (cancelled) return
      if (!deleting) {
        chars += 1
        setText(current.slice(0, chars))
        if (chars >= current.length) {
          deleting = true
          setDone(true)
          timer = setTimeout(tick, pause)
          return
        }
        // slight human-like variance without extra state
        timer = setTimeout(tick, typeSpeed + Math.random() * 40)
      } else {
        if (chars >= current.length) setDone(false)
        chars -= 1
        setText(current.slice(0, Math.max(chars, 0)))
        if (chars <= 0) {
          setPhraseIndex((i) => (i + 1) % phrasesRef.current.length)
          return
        }
        timer = setTimeout(tick, deleteSpeed)
      }
    }

    timer = setTimeout(tick, typeSpeed)
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phraseIndex, typeSpeed, deleteSpeed, pause])

  return { text, phraseIndex: phraseIndex % Math.max(phrasesRef.current.length, 1), done }
}
