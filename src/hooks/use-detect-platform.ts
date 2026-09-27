import { useEffect, useState } from "react"

export type Platform = "android" | "ios" | "windows" | "macos" | "linux" | "unknown"

export function detectPlatform(ua: string): Platform {
  const lower = ua.toLowerCase()
  if (lower.includes("android")) return "android"
  if (lower.includes("iphone") || lower.includes("ipad") || lower.includes("ipod")) return "ios"
  if (lower.includes("win")) return "windows"
  if (lower.includes("mac")) return "macos"
  if (lower.includes("linux") || lower.includes("x11")) return "linux"
  return "unknown"
}

export function useDetectPlatform() {
  const [platform, setPlatform] = useState<Platform>("unknown")

  useEffect(() => {
    setPlatform(detectPlatform(navigator.userAgent))
  }, [])

  return platform
}
