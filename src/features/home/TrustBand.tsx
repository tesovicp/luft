import { BadgeCheck, Headphones, Package, Truck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Container } from '@/components/ui/Container'

const BADGES: { Icon: LucideIcon; title: string; note: string }[] = [
  { Icon: Truck, title: 'trust.deliveryTitle', note: 'trust.deliveryNote' },
  { Icon: Package, title: 'trust.packagingTitle', note: 'trust.packagingNote' },
  { Icon: BadgeCheck, title: 'trust.originalTitle', note: 'trust.originalNote' },
  { Icon: Headphones, title: 'trust.supportTitle', note: 'trust.supportNote' },
]

export function TrustBand() {
  const { t } = useTranslation()

  return (
    <section className="bg-cream py-2">
      <Container className="px-3 sm:px-4 lg:px-8">
        <div className="rounded-band bg-rust text-cream-bright grid items-center gap-6 px-6 py-6 sm:px-8 lg:grid-cols-[1.05fr_2fr] lg:gap-10 lg:py-7">
          <blockquote className="lg:border-cream/25 hidden lg:block lg:border-r lg:pr-10">
            <span aria-hidden className="font-display text-cream/45 text-4xl leading-none">
              &ldquo;
            </span>
            <p className="font-display text-xl leading-snug">
              {t('trust.quoteLine1')}
              <br />
              {t('trust.quoteLine2')}
            </p>
            <footer className="text-cream/70 mt-3 text-[10px] font-semibold tracking-[0.28em] uppercase">
              {t('brand.tagline')}
            </footer>
          </blockquote>

          <ul className="grid grid-cols-4 gap-2 sm:gap-4">
            {BADGES.map(({ Icon, title, note }, i) => (
              <li
                key={title}
                className={
                  i > 0
                    ? 'border-cream/25 flex flex-col items-center gap-2 border-l px-1 text-center sm:px-3'
                    : 'flex flex-col items-center gap-2 px-1 text-center sm:px-3'
                }
              >
                <Icon className="size-5 sm:size-6" strokeWidth={1.4} />
                <p className="text-[10px] leading-tight font-semibold sm:text-xs">{t(title)}</p>
                <p className="text-cream/75 text-[9px] leading-tight sm:text-[11px]">{t(note)}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
