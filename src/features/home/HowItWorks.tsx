import {
  BookOpen,
  Bot,
  Box,
  ChevronLeft,
  ChevronRight,
  Heart,
  Home,
  MessageCircle,
  Search,
  Send,
  Trash2,
  User,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { Container } from '@/components/ui/Container'
import { Rating } from '@/components/ui/Rating'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { useFeatured } from '@/lib/api'
import { formatRsd } from '@/lib/format'
import type { Wine } from '@/types'

/* -------------------------------------------------------------------------- */
/* Shared chrome                                                              */
/* -------------------------------------------------------------------------- */

interface ScreenProps {
  title: string
  to: string
  children: ReactNode
  back?: boolean
  action?: ReactNode
}

/** One phone-screen preview card, as shown in the desktop mock. */
function Screen({ title, to, children, back = true, action }: ScreenProps) {
  return (
    <Link
      to={to}
      className="group bg-card ring-line/70 flex flex-col overflow-hidden rounded-2xl ring-1 transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-26px_rgba(43,36,24,0.6)]"
    >
      <div className="flex items-center gap-2 px-4 pt-4 pb-3">
        {back ? <ChevronLeft className="text-ink-soft size-4" /> : <span className="size-4" />}
        <span className="text-ink flex-1 text-center text-[10px] font-semibold tracking-[0.16em] uppercase">
          {title}
        </span>
        {action ?? <span className="size-4" />}
      </div>
      <div className="flex flex-1 flex-col px-4 pb-4">{children}</div>
    </Link>
  )
}

const FIELD = 'rounded-lg bg-cream-bright px-3 py-2 text-[10px] text-ink-soft ring-1 ring-line/70'
const PILL = 'rounded-full bg-sand/80 px-2.5 py-1 text-[9px] text-ink-soft ring-1 ring-line/60'
const CTA =
  'mt-auto rounded-lg bg-wine-deep py-2.5 text-center text-[10px] font-semibold tracking-[0.14em] text-cream-bright uppercase'

/* -------------------------------------------------------------------------- */
/* The six screens                                                            */
/* -------------------------------------------------------------------------- */

function SearchScreen() {
  const { t } = useTranslation()
  const grapes = ['Chardonnay', 'Malbec', 'Pinot Noir', 'Sauvignon Blanc', 'Merlot', 'Rosé']
  const countries = [
    { code: 'FR', name: 'Francuska' },
    { code: 'IT', name: 'Italija' },
    { code: 'RS', name: 'Srbija' },
    { code: 'NZ', name: 'Novi Zeland' },
  ]
  const tabs: LucideIcon[] = [Home, Search, Heart, User]

  return (
    <Screen title={t('how.screenSearch')} to="/pretraga" back={false}>
      <div className={`${FIELD} flex items-center gap-2`}>
        <Search className="size-3" />
        <span className="truncate">{t('search.placeholder')}</span>
      </div>

      <p className="text-ink mt-3 text-[10px] font-semibold">{t('search.popularGrapes')}</p>
      <ul className="mt-2 flex flex-wrap gap-1.5">
        {grapes.map((g) => (
          <li key={g} className={PILL}>
            {g}
          </li>
        ))}
      </ul>

      <p className="text-ink mt-3 text-[10px] font-semibold">{t('search.countries')}</p>
      <ul className="mt-2 grid grid-cols-4 gap-1.5">
        {countries.map((c) => (
          <li key={c.name} className="flex flex-col items-center gap-1">
            <span className="bg-cream-bright text-ink ring-line/70 grid size-8 place-items-center rounded-full text-[10px] font-semibold ring-1">
              {c.code}
            </span>
            <span className="text-ink-soft text-center text-[8px] leading-tight">{c.name}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex items-center justify-between pt-4">
        {tabs.map((Icon, i) => (
          <span key={i} className="flex flex-col items-center gap-0.5">
            <Icon className={`size-3.5 ${i === 1 ? 'text-wine' : 'text-ink-soft'}`} />
          </span>
        ))}
      </div>
    </Screen>
  )
}

function DetailScreen({ wine }: { wine?: Wine }) {
  const { t, i18n } = useTranslation()
  if (!wine) return null

  return (
    <Screen
      title={t('how.screenDetail')}
      to={`/vino/${wine.slug}`}
      action={<Heart className="text-ink-soft size-4" />}
    >
      <div className="flex gap-3">
        <img src={wine.image} alt="" className="h-28 w-auto shrink-0 object-contain" />
        <div className="min-w-0">
          <p className="font-display text-ink text-sm leading-tight">
            {wine.name} {wine.vintage}
          </p>
          <p className="text-ink-soft mt-1 text-[9px]">{wine.producer}</p>
          <Rating
            value={wine.rating}
            count={wine.ratingCount}
            className="mt-1.5 origin-left scale-90"
          />
          <ul className="mt-2 flex flex-wrap gap-1">
            {wine.tags.slice(0, 3).map((tag) => (
              <li key={tag} className={PILL}>
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="text-ink mt-3 text-sm font-semibold">
        {formatRsd(wine.priceRsd, i18n.language)}
      </p>

      <ul className="mt-3 mb-4 grid grid-cols-4 gap-1 text-center">
        {['🐟', '🥂', '🍝', '🧀'].map((emoji, i) => (
          <li key={i} className="flex flex-col items-center gap-1">
            <span className="ring-line/70 grid size-7 place-items-center rounded-full ring-1">
              {emoji}
            </span>
          </li>
        ))}
      </ul>

      <span className={CTA}>{t('common.addToCart')}</span>
    </Screen>
  )
}

function PairingScreen() {
  const { t } = useTranslation()
  const rows = [
    { emoji: '🐟', dish: 'losos', strength: 'odlicno' },
    { emoji: '🍝', dish: 'pastaPesto', strength: 'odlicno' },
    { emoji: '🥗', dish: 'salate', strength: 'odlicno' },
    { emoji: '🍣', dish: 'sushi', strength: 'dobro' },
  ] as const

  return (
    <Screen title={t('how.screenPairing')} to="/uparivanje">
      <div className="border-line/70 flex border-b text-[10px] font-semibold">
        <span className="border-wine text-wine flex-1 border-b-2 pb-2 text-center">
          {t('pairing.food')}
        </span>
        <span className="text-ink-soft flex-1 pb-2 text-center">{t('pairing.occasions')}</span>
      </div>

      <ul className="divide-line/50 mt-1 divide-y">
        {rows.map((row) => (
          <li key={row.dish} className="flex items-center gap-2.5 py-2.5">
            <span className="bg-cream-bright ring-line/70 grid size-9 shrink-0 place-items-center rounded-lg text-base ring-1">
              {row.emoji}
            </span>
            <span className="min-w-0 flex-1">
              <span className="text-ink block truncate text-[10px] font-semibold">
                {t(`pairing.dishes.${row.dish}`)}
              </span>
              <span className="text-ink-soft block text-[9px]">{t(`pairing.${row.strength}`)}</span>
            </span>
            <ChevronRight className="text-ink-soft size-3.5 shrink-0" />
          </li>
        ))}
      </ul>
    </Screen>
  )
}

function AlekScreen({ wine }: { wine?: Wine }) {
  const { t, i18n } = useTranslation()

  return (
    <Screen title={t('how.screenAlek')} to="/alek">
      <p className="bg-wine text-cream-bright ml-auto max-w-[85%] rounded-2xl rounded-br-sm px-3 py-2 text-[10px] leading-snug">
        {t('alek.suggestions.s1')}
      </p>
      <p className="bg-sand/80 text-ink mt-2 max-w-[85%] rounded-2xl rounded-bl-sm px-3 py-2 text-[10px] leading-snug">
        {t('alek.reply.belo')}
      </p>

      {wine && (
        <div className="bg-cream-bright ring-line/70 mt-2 flex items-center gap-2 rounded-xl p-2 ring-1">
          <img src={wine.image} alt="" className="h-11 w-auto object-contain" />
          <span className="min-w-0 flex-1">
            <span className="text-ink block truncate text-[10px] font-semibold">{wine.name}</span>
            <span className="text-ink-soft block truncate text-[9px]">{wine.producer}</span>
            <span className="text-ink block text-[10px] font-semibold">
              {formatRsd(wine.priceRsd, i18n.language)}
            </span>
          </span>
          <Heart className="text-ink-soft size-3.5 shrink-0" />
        </div>
      )}

      <div className="mt-auto flex items-center gap-2 pt-3">
        <span className={`${FIELD} flex-1 truncate`}>{t('alek.placeholder')}</span>
        <span className="bg-wine text-cream-bright grid size-7 shrink-0 place-items-center rounded-full">
          <Send className="size-3" />
        </span>
      </div>
    </Screen>
  )
}

function CartScreen({ wines }: { wines: Wine[] }) {
  const { t, i18n } = useTranslation()
  const lines = wines.slice(0, 2)
  if (lines.length < 2) return null
  const subtotal = lines.reduce((sum, w) => sum + w.priceRsd, 0)

  return (
    <Screen title={t('how.screenCart')} to="/korpa">
      <ul className="divide-line/50 divide-y">
        {lines.map((wine, i) => (
          <li key={wine.slug} className="flex items-center gap-2.5 py-2.5">
            <img src={wine.image} alt="" className="h-12 w-auto shrink-0 object-contain" />
            <span className="min-w-0 flex-1">
              <span className="text-ink block truncate text-[10px] font-semibold">{wine.name}</span>
              <span className="text-ink-soft block text-[10px]">
                {formatRsd(wine.priceRsd, i18n.language)}
              </span>
              <span className="text-ink-soft mt-1 flex items-center gap-2 text-[10px]">
                <span className="ring-line grid size-4 place-items-center rounded-full ring-1">
                  -
                </span>
                <span className="text-ink font-semibold">1</span>
                <span className="ring-line grid size-4 place-items-center rounded-full ring-1">
                  +
                </span>
              </span>
            </span>
            {i === 0 ? (
              <Trash2 className="text-ink-soft size-3.5 shrink-0" />
            ) : (
              <ChevronRight className="text-ink-soft size-3.5 shrink-0" />
            )}
          </li>
        ))}
      </ul>

      <dl className="border-line/60 mt-3 space-y-1 border-t pt-3 text-[10px]">
        <div className="text-ink-soft flex justify-between">
          <dt>{t('cart.delivery')}</dt>
          <dd>{formatRsd(300, i18n.language)}</dd>
        </div>
        <div className="text-ink flex justify-between font-semibold">
          <dt>{t('cart.total')}</dt>
          <dd>{formatRsd(subtotal + 300, i18n.language)}</dd>
        </div>
      </dl>

      <span className={`${CTA} mt-3`}>{t('cart.checkout')}</span>
    </Screen>
  )
}

function CheckoutScreen() {
  const { t } = useTranslation()
  const steps = ['checkout.stepAddress', 'checkout.stepDelivery', 'checkout.stepPayment']
  const fields = ['checkout.fullName', 'checkout.address', 'checkout.city', 'checkout.phone']

  return (
    <Screen title={t('checkout.title')} to="/checkout" back={false}>
      <ol className="flex items-center gap-1.5 text-[9px]">
        {steps.map((step, i) => (
          <li key={step} className="flex items-center gap-1">
            <span
              className={`grid size-4 place-items-center rounded-full text-[8px] font-bold ${
                i === 0 ? 'bg-wine text-cream-bright' : 'bg-sand text-ink-soft'
              }`}
            >
              {i + 1}
            </span>
            <span className={i === 0 ? 'text-ink font-semibold' : 'text-ink-soft'}>{t(step)}</span>
          </li>
        ))}
      </ol>

      <p className="text-ink mt-3 text-[10px] font-semibold">{t('checkout.addressTitle')}</p>
      <ul className="mt-2 space-y-2">
        {fields.map((field) => (
          <li key={field} className={FIELD}>
            {t(field)}
          </li>
        ))}
      </ul>

      <span className={`${CTA} mt-4`}>{t('checkout.continue')}</span>
    </Screen>
  )
}

/* -------------------------------------------------------------------------- */
/* Section                                                                    */
/* -------------------------------------------------------------------------- */

const STEPS: { Icon: LucideIcon; key: string }[] = [
  { Icon: MessageCircle, key: 'how.step1' },
  { Icon: Bot, key: 'how.step2' },
  { Icon: BookOpen, key: 'how.step3' },
  { Icon: Box, key: 'how.step4' },
]

export function HowItWorks() {
  const { t } = useTranslation()
  const { data: wines } = useFeatured()
  const list = wines ?? []
  const rose = list.find((w) => w.slug === '100-zena-rose')

  return (
    <section className="bg-sand/60 py-10 lg:py-14">
      <Container>
        <SectionTitle>{t('how.title')}</SectionTitle>

        {/* Phones: four plain steps, as in the mobile mock. */}
        <ul className="mt-6 grid grid-cols-4 gap-3 lg:hidden">
          {STEPS.map(({ Icon, key }, i) => (
            <li key={key} className="flex flex-col items-center gap-2 text-center">
              <span className="bg-card ring-line/70 grid size-14 place-items-center rounded-full ring-1">
                <Icon className="text-ink size-6" strokeWidth={1.4} />
              </span>
              <span className="text-ink text-[10px] leading-tight font-medium">
                {i + 1}. {t(key)}
              </span>
            </li>
          ))}
        </ul>

        {/* Desktop: previews of the real screens, each linking to its route. */}
        <div className="mt-7 hidden gap-4 lg:grid lg:grid-cols-3 xl:grid-cols-6">
          <SearchScreen />
          <DetailScreen wine={rose} />
          <PairingScreen />
          <AlekScreen wine={rose} />
          <CartScreen wines={list} />
          <CheckoutScreen />
        </div>
      </Container>
    </section>
  )
}
