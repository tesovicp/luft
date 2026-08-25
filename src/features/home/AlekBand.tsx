import { Bot } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

export function AlekBand() {
  const { t } = useTranslation()

  return (
    <section className="bg-cream pb-4">
      <Container className="px-3 sm:px-4 lg:px-8">
        <div className="rounded-band bg-forest-deep text-cream flex flex-col items-center gap-5 px-6 py-7 sm:flex-row sm:gap-7 sm:px-9 lg:py-8">
          <span className="bg-cream/10 text-cream grid size-14 shrink-0 place-items-center rounded-2xl sm:size-16">
            <Bot className="size-8 sm:size-9" strokeWidth={1.3} />
          </span>

          <p className="font-display text-cream-bright text-xl leading-snug sm:text-2xl">
            {t('alekBand.line1')}
            <br className="hidden sm:block" /> <span className="sm:hidden"> </span>
            {t('alekBand.line2')} {t('alekBand.line3')}
          </p>

          <Button asChild size="md" className="sm:ml-auto">
            <Link to="/alek">{t('alekBand.cta')}</Link>
          </Button>
        </div>
      </Container>
    </section>
  )
}
