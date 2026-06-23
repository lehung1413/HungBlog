import { Helmet } from 'react-helmet-async'
import { siteUrl } from '@/lib/supabase'

interface SeoProps {
  title: string
  description?: string
  image?: string
  path?: string
}

export function Seo({ title, description, image, path = '' }: SeoProps) {
  const fullTitle = title === 'HungBlog' ? title : `${title} | HungBlog`
  const url = `${siteUrl}${path}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={url} />
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  )
}
