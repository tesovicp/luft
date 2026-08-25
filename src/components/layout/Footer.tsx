import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { Container } from '@/components/ui/Container'

const COLUMNS = [
  {
    titleKey: 'footer.shop',
    links: [
      { to: '/pretraga', key: 'nav.search' },
      { to: '/setovi', key: 'nav.sets' },
      { to: '/trending', key: 'trending.title' },
      { to: '/danas', key: 'today.title' },
    ],
  },
  {
    titleKey: 'footer.about',
    links: [
      { to: '/o-nama', key: 'footer.aboutUs' },
      { to: '/kontakt', key: 'footer.contact' },
      { to: '/alek', key: 'nav.alek' },
    ],
  },
  {
    titleKey: 'footer.help',
    links: [
      { to: '/dostava', key: 'footer.delivery' },
      { to: '/reklamacije', key: 'footer.returns' },
      { to: '/uslovi', key: 'footer.terms' },
      { to: '/privatnost', key: 'footer.privacy' },
    ],
  },
]

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-forest-deep text-cream/70 pt-14 pb-10">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <span className="font-display text-cream-bright text-2xl tracking-[0.22em]">
              {t('brand.name')}
              <span className="text-ember">.</span>
            </span>
            <p className="text-cream/50 mt-2 text-[9px] font-medium tracking-[0.28em] uppercase">
              {t('brand.tagline')}
            </p>
            <p className="text-cream/60 mt-5 max-w-xs text-sm leading-relaxed">
              {t('trust.quoteLine1')} {t('trust.quoteLine2')}
            </p>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.titleKey} aria-label={t(col.titleKey)}>
              <h3 className="eyebrow text-cream text-[11px]">{t(col.titleKey)}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="hover:text-cream text-sm transition">
                      {t(link.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="border-cream/10 text-cream/45 mt-12 flex flex-col gap-3 border-t pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} LUFT. {t('footer.rights')}
          </p>
          <p>{t('footer.disclaimer')}</p>
        </div>
      </Container>
    </footer>
  )
}
