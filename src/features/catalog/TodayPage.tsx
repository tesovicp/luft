import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { Button } from '@/components/ui/Button'
import { Chip } from '@/components/ui/Chip'
import { Container } from '@/components/ui/Container'
import { Rating } from '@/components/ui/Rating'
import { useWineOfTheDay } from '@/lib/api'
import { formatRsd } from '@/lib/format'

import { PageHeader } from '../shared/PageHeader'
import { ErrorState, Loading } from '../shared/States'

export function TodayPage() {
  const { t, i18n } = useTranslation()
  const { data: wine, isPending, isError, refetch } = useWineOfTheDay()

  return (
    <>
      <PageHeader title={t('today.title')} subtitle={t('today.subtitle')} />
      <Container className="py-8 lg:py-14">
        {isPending && <Loading />}
        {isError && <ErrorState onRetry={() => void refetch()} />}
        {wine && (
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
            <div className="rounded-card from-sand/70 to-cream ring-line/50 grid place-items-center bg-linear-to-b px-6 py-12 ring-1">
              <img
                src={wine.image}
                alt={wine.name}
                className="h-72 w-auto object-contain drop-shadow-[0_20px_28px_rgba(43,36,24,0.3)] lg:h-96"
              />
            </div>
            <div>
              <p className="eyebrow text-rust text-[11px]">{t(`wineType.${wine.type}`)}</p>
              <h2 className="font-display text-ink mt-2 text-3xl lg:text-5xl">
                {wine.name} {wine.vintage}
              </h2>
              <p className="text-ink-soft mt-2 text-sm">{wine.producer}</p>
              <Rating value={wine.rating} count={wine.ratingCount} className="mt-4" />
              <ul className="mt-4 flex flex-wrap gap-2">
                {wine.tags.map((tag) => (
                  <li key={tag}>
                    <Chip>{tag}</Chip>
                  </li>
                ))}
              </ul>
              <p className="text-ink-soft mt-5 leading-relaxed">{wine.description}</p>
              <p className="font-display text-ink mt-6 text-3xl">
                {formatRsd(wine.priceRsd, i18n.language)}
              </p>
              <div className="mt-6">
                <Button asChild size="lg">
                  <Link to={`/vino/${wine.slug}`}>
                    {t('common.viewAll')}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </>
  )
}
