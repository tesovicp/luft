import * as Tabs from '@radix-ui/react-tabs'
import { ChevronRight, CircleHelp, Gift, Heart, Martini, Utensils } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router'

import { Container } from '@/components/ui/Container'
import { usePairings, useWine } from '@/lib/api'
import { formatRsd } from '@/lib/format'
import type { Situation } from '@/types'

import { PageHeader } from '../shared/PageHeader'
import { ErrorState, Loading } from '../shared/States'

/** Falls back to the rosé from the mock when no wine is addressed directly. */
const DEFAULT_SLUG = '100-zena-rose'

const SITUATION_ICONS: Record<Situation, LucideIcon> = {
  vecera: Utensils,
  dejt: Heart,
  drustvo: Martini,
  poklon: Gift,
  'ne-znam': CircleHelp,
}

const TAB_TRIGGER =
  'flex-1 cursor-pointer border-b-2 pb-3 text-xs font-semibold tracking-[0.12em] uppercase transition data-[state=active]:border-wine data-[state=active]:text-wine border-transparent text-ink-soft hover:text-ink'

export function PairingPage() {
  const { slug: routeSlug } = useParams()
  const slug = routeSlug ?? DEFAULT_SLUG
  const { t, i18n } = useTranslation()
  const { data: wine, isPending, isError, refetch } = useWine(slug)
  const { data: pairings } = usePairings(slug)

  return (
    <>
      <PageHeader title={t('pairing.title')} subtitle={wine ? wine.name : undefined} />

      <Container className="py-8 lg:py-12">
        {isPending && <Loading />}
        {isError && <ErrorState onRetry={() => void refetch()} />}

        {wine && (
          <div className="grid gap-8 lg:grid-cols-[22rem_1fr] lg:gap-12">
            <aside className="rounded-card bg-card ring-line/60 p-6 ring-1">
              <Link to={`/vino/${wine.slug}`} className="group block text-center">
                <img
                  src={wine.image}
                  alt={wine.name}
                  className="mx-auto h-48 w-auto object-contain drop-shadow-[0_14px_20px_rgba(43,36,24,0.28)] transition group-hover:-translate-y-1"
                />
                <h2 className="font-display text-ink mt-4 text-xl">{wine.name}</h2>
                <p className="text-ink-soft mt-1 text-xs">{wine.producer}</p>
                <p className="text-ink mt-3 font-semibold">
                  {formatRsd(wine.priceRsd, i18n.language)}
                </p>
              </Link>
            </aside>

            <Tabs.Root defaultValue="food">
              <Tabs.List className="border-line flex border-b">
                <Tabs.Trigger value="food" className={TAB_TRIGGER}>
                  {t('pairing.food')}
                </Tabs.Trigger>
                <Tabs.Trigger value="occasions" className={TAB_TRIGGER}>
                  {t('pairing.occasions')}
                </Tabs.Trigger>
              </Tabs.List>

              <Tabs.Content value="food" className="pt-2 outline-hidden">
                <ul className="divide-line/60 divide-y">
                  {pairings?.map((p) => (
                    <li key={p.id} className="flex items-center gap-4 py-4">
                      <span className="bg-card ring-line/60 grid size-14 shrink-0 place-items-center rounded-xl text-2xl ring-1">
                        {p.emoji}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="text-ink block text-sm font-semibold">
                          {t(`pairing.dishes.${p.dish}`)}
                        </span>
                        <span className="text-ink-soft block text-xs">
                          {t(`pairing.${p.strength}`)}
                        </span>
                      </span>
                      <ChevronRight className="text-ink-soft size-4 shrink-0" />
                    </li>
                  ))}
                </ul>
              </Tabs.Content>

              <Tabs.Content value="occasions" className="pt-2 outline-hidden">
                <ul className="divide-line/60 divide-y">
                  {wine.situations.map((situation) => {
                    const Icon = SITUATION_ICONS[situation]
                    return (
                      <li key={situation} className="flex items-center gap-4 py-4">
                        <span className="bg-card ring-line/60 grid size-14 shrink-0 place-items-center rounded-xl ring-1">
                          <Icon className="text-ink size-6" strokeWidth={1.5} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="text-ink block text-sm font-semibold">
                            {t(`situations.${situation}`)}
                          </span>
                          <span className="text-ink-soft block text-xs">
                            {t('pairing.odlicno')}
                          </span>
                        </span>
                        <Link
                          to={`/alek?situacija=${situation}`}
                          className="text-ink-soft hover:text-ink shrink-0 transition"
                          aria-label={t('nav.alek')}
                        >
                          <ChevronRight className="size-4" />
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </Tabs.Content>
            </Tabs.Root>
          </div>
        )}
      </Container>
    </>
  )
}
