import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { Container } from '@/components/ui/Container'
import { useSets, useWines } from '@/lib/api'
import { formatRsd } from '@/lib/format'

import { PageHeader } from '../shared/PageHeader'
import { ErrorState, Loading } from '../shared/States'

export function SetsPage() {
  const { t, i18n } = useTranslation()
  const { data: sets, isPending, isError, refetch } = useSets()
  const { data: wines } = useWines()

  return (
    <>
      <PageHeader title={t('sets.title')} subtitle={t('sets.subtitle')} />
      <Container className="py-8 lg:py-12">
        {isPending && <Loading />}
        {isError && <ErrorState onRetry={() => void refetch()} />}

        <ul className="grid gap-6 lg:grid-cols-3">
          {sets?.map((set) => {
            const bottles = set.wineSlugs
              .map((slug) => wines?.find((w) => w.slug === slug))
              .filter((w) => w !== undefined)

            return (
              <li
                key={set.id}
                id={set.slug}
                className="rounded-card bg-card ring-line/60 flex flex-col p-6 ring-1"
              >
                <h2 className="font-display text-ink text-2xl">{set.name}</h2>
                <p className="text-ink-soft mt-2 text-sm leading-relaxed">{set.blurb}</p>

                <ul className="my-6 flex flex-1 items-end justify-center gap-3">
                  {bottles.map((wine) => (
                    <li key={wine.slug}>
                      <Link to={`/vino/${wine.slug}`}>
                        <img
                          src={wine.image}
                          alt={wine.name}
                          className="h-32 w-auto object-contain drop-shadow-[0_12px_18px_rgba(43,36,24,0.28)] transition hover:-translate-y-1"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>

                <p className="text-ink-soft text-xs">
                  {t('sets.bottles', { count: set.wineSlugs.length })}
                </p>
                <p className="font-display text-ink mt-1 text-2xl">
                  {formatRsd(set.priceRsd, i18n.language)}
                </p>
              </li>
            )
          })}
        </ul>
      </Container>
    </>
  )
}
