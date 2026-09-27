import { useEffect, useState } from "react"

const REPO = "hariprasad2512/clarity_flutter"
const API_URL = `https://api.github.com/repos/${REPO}/releases/latest`

export const RELEASES_PAGE = `https://github.com/${REPO}/releases/latest`

export type ReleaseUrls = {
  windows: string
  macos: string
  android: string
}

type Asset = { name: string; browser_download_url: string }

function pickAsset(assets: Asset[], pattern: RegExp): string | null {
  const match = assets.find((a) => pattern.test(a.name))
  return match?.browser_download_url ?? null
}

/** Resolves direct download URLs for the latest release's installer assets.
 *  Falls back to the releases page per platform when the API is
 *  unreachable (e.g. rate-limited), so buttons never dead-end. */
export function useReleaseAssets() {
  const [urls, setUrls] = useState<ReleaseUrls>({
    windows: RELEASES_PAGE,
    macos: RELEASES_PAGE,
    android: RELEASES_PAGE,
  })
  const [version, setVersion] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch(API_URL, { headers: { Accept: "application/vnd.github+json" } })
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub API ${res.status}`)
        return res.json()
      })
      .then((release: { tag_name: string; assets: Asset[] }) => {
        if (cancelled) return
        const assets = release.assets ?? []
        setUrls({
          windows: pickAsset(assets, /-windows-setup\.exe$/) ?? RELEASES_PAGE,
          macos: pickAsset(assets, /-macos\.zip$/) ?? RELEASES_PAGE,
          android: pickAsset(assets, /-android\.apk$/) ?? RELEASES_PAGE,
        })
        setVersion(release.tag_name)
      })
      .catch(() => {
        /* keep releases-page fallback */
      })
    return () => {
      cancelled = true
    }
  }, [])

  return { urls, version }
}
