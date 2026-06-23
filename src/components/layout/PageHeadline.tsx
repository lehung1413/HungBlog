import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { WideContainer } from '@/components/layout/Container'
import { useLocalizedPath } from '@/hooks/useLocale'

interface PageHeadlineProps {
  title: string
  current?: string
}

export function PageHeadline({ title, current }: PageHeadlineProps) {
  const { t } = useTranslation()
  const { localizedPath } = useLocalizedPath()

  return (
    <div className="yaffo-headline">
      <WideContainer>
        <h1 className="yaffo-headline__title">{title}</h1>
        <nav className="yaffo-breadcrumbs" aria-label="Breadcrumb">
          <Link to={localizedPath('/')}>{t('nav.home')}</Link>
          <span className="yaffo-breadcrumbs-sep current">{current ?? title}</span>
        </nav>
      </WideContainer>
    </div>
  )
}
