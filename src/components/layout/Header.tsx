import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { ChevronDown, Search, ShoppingBag } from 'lucide-react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, NavLink } from 'react-router'

import { cn } from '@/lib/utils'
import { selectCount, useCart } from '@/stores/cart'
import type { WineType } from '@/types'

import { LanguageSwitch } from './LanguageSwitch'
import { Logo } from './Logo'

const WINE_TYPES: WineType[] = ['belo', 'crveno', 'rose', 'pjenusavo']

const SET_SLUGS = ['vece-za-dvoje', 'domaci-heroji', 'poklon-set']

const linkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'relative py-1 text-xs font-semibold tracking-[0.14em] uppercase transition-colors',
    isActive ? 'text-cream-bright' : 'text-cream/70 hover:text-cream',
    isActive &&
      'after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-ember after:content-[""]',
  )

function Menu({ label, children }: { label: string; children: ReactNode }) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="group text-cream/70 hover:text-cream data-[state=open]:text-cream-bright flex cursor-pointer items-center gap-1.5 py-1 text-xs font-semibold tracking-[0.14em] uppercase transition-colors">
        {label}
        <ChevronDown className="size-3.5 transition group-data-[state=open]:rotate-180" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={14}
          align="start"
          className="bg-cream-bright ring-line z-50 min-w-48 rounded-xl p-2 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] ring-1"
        >
          {children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

function MenuLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <DropdownMenu.Item asChild>
      <Link
        to={to}
        className="text-ink hover:bg-sand focus:bg-sand block cursor-pointer rounded-lg px-3 py-2 text-sm outline-hidden transition"
      >
        {children}
      </Link>
    </DropdownMenu.Item>
  )
}

export function Header() {
  const { t } = useTranslation()
  const count = useCart(selectCount)

  return (
    <header className="bg-forest relative z-40">
      <div className="mx-auto flex w-full max-w-[1200px] items-center gap-8 px-5 py-5 sm:px-6 lg:px-8">
        <Logo />

        <nav className="ml-4 hidden items-center gap-7 lg:flex">
          <NavLink to="/" end className={linkClass}>
            {t('nav.home')}
          </NavLink>
          <Menu label={t('nav.search')}>
            <MenuLink to="/pretraga">{t('common.viewAll')}</MenuLink>
            {WINE_TYPES.map((type) => (
              <MenuLink key={type} to={`/pretraga?type=${type}`}>
                {t(`wineType.${type}`)}
              </MenuLink>
            ))}
          </Menu>
          <Menu label={t('nav.sets')}>
            <MenuLink to="/setovi">{t('common.viewAll')}</MenuLink>
            {SET_SLUGS.map((slug) => (
              <MenuLink key={slug} to={`/setovi#${slug}`}>
                {t(`sets.${slug}`, { defaultValue: slug.replace(/-/g, ' ') })}
              </MenuLink>
            ))}
          </Menu>
          <NavLink to="/favoriti" className={linkClass}>
            {t('nav.favorites')}
          </NavLink>
          <Menu label={t('nav.profile')}>
            <MenuLink to="/profil">{t('profile.title')}</MenuLink>
            <MenuLink to="/favoriti">{t('nav.favorites')}</MenuLink>
            <MenuLink to="/korpa">{t('nav.cart')}</MenuLink>
          </Menu>
        </nav>

        <div className="ml-auto flex items-center gap-4 sm:gap-5">
          <LanguageSwitch />
          <Link
            to="/pretraga"
            aria-label={t('common.search')}
            className="text-cream/80 hover:text-cream grid size-9 place-items-center rounded-full transition hover:bg-white/10"
          >
            <Search className="size-5" strokeWidth={1.6} />
          </Link>
          <Link
            to="/korpa"
            aria-label={t('nav.cart')}
            className="text-cream/80 hover:text-cream relative grid size-9 place-items-center rounded-full transition hover:bg-white/10"
          >
            <ShoppingBag className="size-5" strokeWidth={1.6} />
            {count > 0 && (
              <span className="bg-ember text-forest-deep absolute -top-0.5 -right-0.5 grid min-w-4.5 place-items-center rounded-full px-1 text-[10px] font-bold tabular-nums">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
}
