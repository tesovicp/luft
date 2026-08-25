import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

export function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <Container className="py-24 text-center">
      <h1 className="font-display text-ink text-4xl">{t('notFound.title')}</h1>
      <p className="text-ink-soft mt-3">{t('notFound.body')}</p>
      <div className="mt-7 flex justify-center">
        <Button asChild>
          <Link to="/">{t('notFound.cta')}</Link>
        </Button>
      </div>
    </Container>
  )
}
