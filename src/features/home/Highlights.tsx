import { ArrowRight, Box, Flame, Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'

const CARDS: { Icon: LucideIcon; title: string; body: string; cta: string; to: string }[] = [
  {
    Icon: Sparkles,
    title: 'highlights.todayTitle',
    body: 'highlights.todayBody',
    cta: 'highlights.todayCta',
    to: '/danas',
  },
  {
    Icon: Flame,
    title: 'highlights.trendingTitle',
    body: 'highlights.trendingBody',
    cta: 'highlights.trendingCta',
    to: '/trending',
  },
  {
    Icon: Box,
    title: 'highlights.setsTitle',
    body: 'highlights.setsBody',
    cta: 'highlights.setsCta',
    to: '/setovi',
  },
]

export function Highlights() {
  const { t } = useTranslation()

  return (
    <section className="bg-cream pb-12 lg:pb-16">
      <Container>
        <SectionTitle className="lg:sr-only">{t('highlights.sectionTitle')}</SectionTitle>

        <ul className="mt-5 grid grid-cols-3 gap-2.5 sm:gap-4 lg:mt-0">
          {CARDS.map(({ Icon, title, body, cta, to }) => (
            <li key={title}>
              <Link
                to={to}
                className="group rounded-card bg-card ring-line/60 flex h-full flex-col gap-2 p-3 ring-1 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-26px_rgba(43,36,24,0.5)] sm:gap-3 sm:p-5 lg:p-6"
              >
                <Icon className="text-rust size-6 sm:size-7" strokeWidth={1.4} />
                <h3 className="eyebrow text-ink text-[9px] leading-tight sm:text-[11px]">
                  {t(title)}
                </h3>
                <p className="text-ink-soft hidden text-sm leading-relaxed sm:block">{t(body)}</p>
                <span className="text-ink mt-auto hidden items-center gap-2 pt-2 text-xs font-semibold sm:inline-flex">
                  {t(cta)}
                  <ArrowRight className="size-3.5 transition group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
