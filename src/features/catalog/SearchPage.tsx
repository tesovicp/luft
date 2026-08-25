import { Search, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router'

import { Chip } from '@/components/ui/Chip'
import { Container } from '@/components/ui/Container'
import { WineCard } from '@/components/ui/WineCard'
import { useWines } from '@/lib/api'
import { countries, grapes } from '@/mocks/data'
import type { WineQuery, WineType } from '@/types'

import { EmptyState, ErrorState, Loading } from '../shared/States'

const TYPES: WineType[] = ['belo', 'crveno', 'rose', 'pjenusavo']

/** Two-letter codes rather than flag emoji: regional-indicator pairs do not
    render on Windows, so a code reads consistently on every platform. */
const CODES: Record<string, string> = {
  Francuska: 'FR',
  Italija: 'IT',
  Srbija: 'RS',
  'Novi Zeland': 'NZ',
}

export function SearchPage() {
  const { t } = useTranslation()
  const [params, setParams] = useSearchParams()

  const query: WineQuery = {
    q: params.get('q') ?? undefined,
    type: (params.get('type') as WineType | null) ?? undefined,
    grape: params.get('grape') ?? undefined,
    country: params.get('country') ?? undefined,
  }

  const { data, isPending, isError, refetch } = useWines(query)

  /** Filters behave as toggles and live in the URL, so results are shareable. */
  function toggle(key: keyof WineQuery, value: string) {
    const next = new URLSearchParams(params)
    if (next.get(key) === value) next.delete(key)
    else next.set(key, value)
    setParams(next, { replace: true })
  }

  function setQ(value: string) {
    const next = new URLSearchParams(params)
    if (value) next.set('q', value)
    else next.delete('q')
    setParams(next, { replace: true })
  }

  const hasFilters = [...params.keys()].length > 0

  return (
    <>
      <div className="bg-forest py-8 lg:py-11">
        <Container>
          <h1 className="font-display text-cream-bright text-3xl lg:text-4xl">
            {t('search.title')}
          </h1>

          <div className="bg-cream-bright ring-line/40 mt-5 flex items-center gap-3 rounded-full px-5 py-3 ring-1 lg:max-w-xl">
            <Search className="text-ink-soft size-4 shrink-0" />
            <input
              type="search"
              value={query.q ?? ''}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t('search.placeholder')}
              aria-label={t('search.placeholder')}
              className="text-ink placeholder:text-ink-soft/70 w-full bg-transparent text-sm outline-hidden"
            />
          </div>
        </Container>
      </div>

      <Container className="py-8 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[16rem_1fr] lg:gap-10">
          <aside className="space-y-7">
            <section>
              <h2 className="eyebrow text-ink text-[11px]">{t('search.type')}</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {TYPES.map((type) => (
                  <li key={type}>
                    <Chip active={query.type === type} onClick={() => toggle('type', type)}>
                      {t(`wineType.${type}`)}
                    </Chip>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="eyebrow text-ink text-[11px]">{t('search.popularGrapes')}</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {grapes.map((grape) => (
                  <li key={grape}>
                    <Chip active={query.grape === grape} onClick={() => toggle('grape', grape)}>
                      {grape}
                    </Chip>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="eyebrow text-ink text-[11px]">{t('search.countries')}</h2>
              <ul className="mt-3 grid grid-cols-4 gap-2 lg:grid-cols-4">
                {countries.map((country) => (
                  <li key={country}>
                    <button
                      type="button"
                      onClick={() => toggle('country', country)}
                      aria-pressed={query.country === country}
                      className={`flex w-full cursor-pointer flex-col items-center gap-1.5 rounded-xl px-1 py-2 transition ${
                        query.country === country
                          ? 'bg-wine/10 ring-wine/40 ring-1'
                          : 'hover:bg-sand/70'
                      }`}
                    >
                      <span className="bg-cream-bright text-ink ring-line/70 grid size-10 place-items-center rounded-full text-xs font-semibold tracking-[0.08em] ring-1">
                        {CODES[country]}
                      </span>
                      <span className="text-ink-soft text-center text-[10px] leading-tight">
                        {country}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>

            {hasFilters && (
              <button
                type="button"
                onClick={() => setParams(new URLSearchParams(), { replace: true })}
                className="text-wine inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold tracking-[0.12em] uppercase"
              >
                <X className="size-3.5" />
                {t('search.clear')}
              </button>
            )}
          </aside>

          <div>
            {isPending && <Loading />}
            {isError && <ErrorState onRetry={() => void refetch()} />}

            {data && data.length === 0 && (
              <EmptyState title={t('search.empty')} hint={t('search.emptyHint')} />
            )}

            {data && data.length > 0 && (
              <>
                <p className="text-ink-soft mb-4 text-xs">
                  {t('search.results', { count: data.length })}
                </p>
                <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {data.map((wine) => (
                    <li key={wine.slug}>
                      <WineCard wine={wine} className="h-full" />
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </Container>
    </>
  )
}
