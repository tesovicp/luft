import { Bot, Heart, Home, Search, User } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router'

import { cn } from '@/lib/utils'

interface Tab {
  to: string
  labelKey: string
  Icon: LucideIcon
  end?: boolean
}

const LEFT: Tab[] = [
  { to: '/', labelKey: 'nav.home', Icon: Home, end: true },
  { to: '/pretraga', labelKey: 'nav.search', Icon: Search },
]

const RIGHT: Tab[] = [
  { to: '/favoriti', labelKey: 'nav.favorites', Icon: Heart },
  { to: '/profil', labelKey: 'nav.profile', Icon: User },
]

function TabItem({ to, labelKey, Icon, end }: Tab) {
  const { t } = useTranslation()

  return (
    <li>
      <NavLink
        to={to}
        end={end}
        className={({ isActive }) =>
          cn(
            'flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium transition',
            isActive ? 'text-wine' : 'text-ink-soft hover:text-ink',
          )
        }
      >
        {({ isActive }) => (
          <>
            <Icon className={cn('size-5', isActive && 'fill-wine/15')} strokeWidth={1.7} />
            <span>{t(labelKey)}</span>
          </>
        )}
      </NavLink>
    </li>
  )
}

/**
 * Mobile-only app chrome, matching the phone mock: four tabs arranged around a
 * raised Alek button in the middle.
 */
export function MobileTabBar() {
  const { t } = useTranslation()

  return (
    <nav
      aria-label={t('nav.home')}
      className="border-line/70 bg-cream-bright/95 fixed inset-x-0 bottom-0 z-40 border-t pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden"
    >
      <ul className="mx-auto grid max-w-md grid-cols-5 items-end px-2">
        {LEFT.map((tab) => (
          <TabItem key={tab.to} {...tab} />
        ))}

        <li className="flex justify-center">
          <NavLink
            to="/alek"
            aria-label={t('nav.alek')}
            className="bg-wine text-cream-bright ring-cream-bright hover:bg-wine-bright -mt-6 grid size-14 place-items-center rounded-full shadow-[0_10px_24px_-8px_rgba(97,23,24,0.8)] ring-4 transition"
          >
            <Bot className="size-7" strokeWidth={1.6} />
          </NavLink>
        </li>

        {RIGHT.map((tab) => (
          <TabItem key={tab.to} {...tab} />
        ))}
      </ul>
    </nav>
  )
}
