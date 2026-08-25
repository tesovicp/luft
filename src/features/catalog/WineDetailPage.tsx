import { ArrowRight, Check } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router'

import { Button } from '@/components/ui/Button'
import { Chip } from '@/components/ui/Chip'
import { Container } from '@/components/ui/Container'
import { FavoriteButton } from '@/components/ui/FavoriteButton'
import { Rating } from '@/components/ui/Rating'
import { usePairings, useWine } from '@/lib/api'
import { formatRsd } from '@/lib/format'
import { useCart } from '@/stores/cart'

import { EmptyState, ErrorState, Loading } from '../shared/States'

export function WineDetailPage() {
  const { slug } = useParams()
  const { t, i18n } = useTranslation()
  const { data: wine, isPending, isError, refetch } = useWine(slug)
  const { data: pairings } = usePairings(slug)
  const add = useCart((s) => s.add)
  const [justAdded, setJustAdded] = useState(false)

  if (isPending) return <Loading />
  if (isError) return <ErrorState onRetry={() => void refetch()} />
  if (!wine) return <EmptyState title={t('detail.notFound')} />

  function addToCart() {
    if (!wine) return
    add(wine)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1600)
  }

  const specs = [
    { label: t('detail.grape'), value: wine.grape },
    { label: t('detail.vintage'), value: String(wine.vintage) },
    { label: t('detail.region'), value: wine.region },
    { label: t('detail.alcohol'), value: `${wine.alcohol}%` },
  ]

  return (
    <Container className="py-8 lg:py-14">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
        <div className="rounded-card from-sand/70 to-cream ring-line/50 relative grid place-items-center bg-linear-to-b px-6 py-10 ring-1">
          <FavoriteButton slug={wine.slug} className="absolute top-3 right-3" />
          <img
            src={wine.image}
            alt={wine.name}
            className="h-64 w-auto object-contain drop-shadow-[0_20px_28px_rgba(43,36,24,0.3)] lg:h-96"
          />
        </div>

        <div>
          <p className="eyebrow text-rust text-[11px]">{t(`wineType.${wine.type}`)}</p>
          <h1 className="font-display text-ink mt-2 text-3xl leading-tight lg:text-5xl">
            {wine.name} {wine.vintage}
          </h1>
          <p className="text-ink-soft mt-2 text-sm">{wine.producer}</p>

          <Rating value={wine.rating} count={wine.ratingCount} className="mt-4" />

          <ul className="mt-4 flex flex-wrap gap-2">
            {wine.tags.map((tag) => (
              <li key={tag}>
                <Chip>{tag}</Chip>
              </li>
            ))}
          </ul>

          <p className="font-display text-ink mt-6 text-3xl">
            {formatRsd(wine.priceRsd, i18n.language)}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button
              onClick={addToCart}
              rounded="card"
              variant="dark"
              size="lg"
              className="min-w-56"
            >
              {justAdded ? (
                <>
                  <Check className="size-4" />
                  {t('common.added')}
                </>
              ) : (
                t('common.addToCart')
              )}
            </Button>
            <Button asChild variant="outline" size="lg" rounded="card">
              <Link to={`/uparivanje/${wine.slug}`}>
                {t('detail.seePairings')}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>

          <section className="mt-9">
            <h2 className="eyebrow text-ink text-[11px]">{t('detail.about')}</h2>
            <p className="text-ink-soft mt-3 leading-relaxed">{wine.description}</p>
          </section>

          <dl className="border-line mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t pt-6 sm:grid-cols-4">
            {specs.map((spec) => (
              <div key={spec.label}>
                <dt className="text-ink-soft text-[10px] font-semibold tracking-[0.14em] uppercase">
                  {spec.label}
                </dt>
                <dd className="text-ink mt-1 text-sm font-medium">{spec.value}</dd>
              </div>
            ))}
          </dl>

          {pairings && pairings.length > 0 && (
            <section className="mt-9">
              <h2 className="eyebrow text-ink text-[11px]">{t('detail.pairsWith')}</h2>
              <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {pairings.map((p) => (
                  <li
                    key={p.id}
                    className="bg-card ring-line/60 flex flex-col items-center gap-2 rounded-xl px-2 py-3 text-center ring-1"
                  >
                    <span className="text-xl">{p.emoji}</span>
                    <span className="text-ink text-[11px] leading-tight">
                      {t(`pairing.dishes.${p.dish}`)}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </Container>
  )
}
