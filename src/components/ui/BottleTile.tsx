import { Link } from 'react-router'

import type { Wine } from '@/types'
import { cn } from '@/lib/utils'

/** A bottle on the dark featured strip: image above, wide-tracked name below. */
export function BottleTile({ wine, className }: { wine: Wine; className?: string }) {
  return (
    <Link
      to={`/vino/${wine.slug}`}
      className={cn(
        'group flex shrink-0 flex-col items-center gap-2 rounded-2xl px-1 py-2 transition sm:gap-3 sm:px-2',
        className,
      )}
    >
      <img
        src={wine.image}
        alt=""
        loading="lazy"
        className="h-20 w-auto object-contain drop-shadow-[0_10px_14px_rgba(0,0,0,0.45)] transition duration-300 group-hover:-translate-y-1 sm:h-28 lg:h-32"
      />
      <span className="text-cream max-w-[4.5rem] text-center text-[9px] leading-tight font-semibold tracking-[0.08em] uppercase sm:max-w-[7rem] sm:text-[11px] sm:tracking-[0.1em] lg:max-w-[8.5rem]">
        {wine.name}
      </span>
    </Link>
  )
}
