import { ChevronRight, Heart, MapPin, Package, Settings } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { Container } from '@/components/ui/Container'
import { languages } from '@/i18n'
import { cn } from '@/lib/utils'

import { PageHeader } from '../shared/PageHeader'

const ROWS: { to: string; key: string; Icon: LucideIcon }[] = [
  { to: '/korpa', key: 'profile.orders', Icon: Package },
  { to: '/favoriti', key: 'nav.favorites', Icon: Heart },
  { to: '/profil', key: 'profile.addresses', Icon: MapPin },
  { to: '/profil', key: 'profile.settings', Icon: Settings },
]

export function ProfilePage() {
  const { t, i18n } = useTranslation()

  return (
    <>
      <PageHeader title={t('profile.title')} subtitle={t('profile.note')} />
      <Container className="py-8 lg:py-12">
        <ul className="divide-line rounded-card bg-card ring-line/60 max-w-xl divide-y overflow-hidden ring-1">
          {ROWS.map((row, i) => (
            <li key={`${row.key}-${i}`}>
              <Link
                to={row.to}
                className="hover:bg-sand/60 flex items-center gap-3 px-5 py-4 transition"
              >
                <row.Icon className="text-ink-soft size-5" strokeWidth={1.6} />
                <span className="text-ink flex-1 text-sm">{t(row.key)}</span>
                <ChevronRight className="text-ink-soft size-4" />
              </Link>
            </li>
          ))}
        </ul>

        <section className="mt-8 max-w-xl">
          <h2 className="eyebrow text-ink text-[11px]">{t('profile.language')}</h2>
          <div className="mt-3 flex gap-2">
            {languages.map((lng) => (
              <button
                key={lng}
                type="button"
                onClick={() => void i18n.changeLanguage(lng)}
                className={cn(
                  'cursor-pointer rounded-full px-5 py-2 text-xs font-semibold tracking-[0.12em] uppercase transition',
                  i18n.language === lng
                    ? 'bg-wine text-cream-bright'
                    : 'bg-sand/70 text-ink-soft ring-line/60 hover:bg-sand ring-1',
                )}
              >
                {lng}
              </button>
            ))}
          </div>
        </section>
      </Container>
    </>
  )
}
