import { useEffect, useRef } from 'react'

interface GiscusCommentsProps {
  slug: string
}

export function GiscusComments({ slug }: GiscusCommentsProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const repo = import.meta.env.VITE_GISCUS_REPO
  const repoId = import.meta.env.VITE_GISCUS_REPO_ID
  const categoryId = import.meta.env.VITE_GISCUS_CATEGORY_ID
  const category = import.meta.env.VITE_GISCUS_CATEGORY ?? 'Announcements'

  useEffect(() => {
    if (!containerRef.current || !repo || !repoId || !categoryId) return

    containerRef.current.innerHTML = ''

    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.setAttribute('data-repo', repo)
    script.setAttribute('data-repo-id', repoId)
    script.setAttribute('data-category', category)
    script.setAttribute('data-category-id', categoryId)
    script.setAttribute('data-mapping', 'pathname')
    script.setAttribute('data-term', slug)
    script.setAttribute('data-reactions-enabled', '1')
    script.setAttribute('data-emit-metadata', '0')
    script.setAttribute('data-input-position', 'top')
    script.setAttribute('data-theme', 'dark')
    script.setAttribute('data-lang', 'en')
    script.setAttribute('crossorigin', 'anonymous')
    script.async = true

    containerRef.current.appendChild(script)
  }, [slug, repo, repoId, categoryId, category])

  if (!repo) {
    return (
      <p className="text-center text-sm text-muted-foreground">
        Comments are not configured. Set VITE_GISCUS_* environment variables.
      </p>
    )
  }

  return <div ref={containerRef} className="mt-12" />
}
