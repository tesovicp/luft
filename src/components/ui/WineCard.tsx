import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'

import type { Wine } from '@/types'
import { formatRsd } from '@/lib/format'
import { cn } from '@/lib/utils'

import { FavoriteButton } from './FavoriteButton'
import { Rating } from './Rating'

/** Catalogue card on cream: used by search, trending, favorites and set pages. */
export function WineCard({ wine, className }: { wine: Wine; className?: string }) {
  const { t, i18n } = useTranslation()

  return (
    <article
      className={cn(
        'group rounded-card bg-card ring-line/60 relative flex flex-col overflow-hidden ring-1 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-24px_rgba(43,36,24,0.55)]',
        className,
      )}
    >
      <FavoriteButton slug={wine.slug} className="absolute top-2 right-2 z-10" />

      <Link to={`/vino/${wine.slug}`} className="flex flex-1 flex-col">
        <div className="from-sand/60 grid place-items-center bg-linear-to-b to-transparent px-6 pt-8 pb-4">
          <img
            src={wine.image}
            alt=""
            loading="lazy"
            className="h-40 w-auto object-contain drop-shadow-[0_12px_18px_rgba(43,36,24,0.28)] transition duration-300 group-hover:scale-105"
          />
        </div>

        <div className="flex flex-1 flex-col gap-1.5 px-5 pt-1 pb-5">
          <p className="text-ink-soft text-[10px] font-semibold tracking-[0.14em] uppercase">
            {t(`wineType.${wine.type}`)}
          </p>
          <h3 className="font-display text-ink text-lg leading-tight">{wine.name}</h3>
          <p className="text-ink-soft text-xs">{wine.producer}</p>
          <Rating value={wine.rating} count={wine.ratingCount} className="mt-1" />
          <p className="text-ink mt-auto pt-3 text-base font-semibold">
            {formatRsd(wine.priceRsd, i18n.language)}
          </p>
        </div>
      </Link>
    </article>
  )
}
