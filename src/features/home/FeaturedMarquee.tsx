import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { BottleTile } from '@/components/ui/BottleTile'
import { Container } from '@/components/ui/Container'
import { useFeatured } from '@/lib/api'
import { cn } from '@/lib/utils'

/**
 * The navy strip that drifts across the page just under the hero.
 *
 * The motion is a plain CSS keyframe on a track holding two identical copies of
 * the list, translated to -50% — so the seam is never visible and the whole
 * thing stays on the compositor. Hover, keyboard focus and a nudge from the
 * arrows all pause it; `prefers-reduced-motion` turns it into an ordinary
 * horizontal scroller (see styles/index.css).
 */
export function FeaturedMarquee() {
  const { t } = useTranslation()
  const { data: wines } = useFeatured()
  const [nudging, setNudging] = useState(false)
  const [offset, setOffset] = useState(0)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const nudge = useCallback((direction: 1 | -1) => {
    setNudging(true)
    setOffset(direction * 8)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      setOffset(0)
      setNudging(false)
    }, 850)
  }, [])

  const list = wines ?? []

  return (
    <section aria-labelledby="featured-heading" className="bg-cream pb-2">
      <Container className="px-3 sm:px-4 lg:px-8">
        <div className="group/marquee rounded-band bg-navy relative overflow-hidden py-5 sm:py-6 lg:py-7">
          <h2
            id="featured-heading"
            className="eyebrow text-cream mb-4 flex items-center gap-2 px-5 text-[11px] sm:px-8 lg:px-14 lg:text-xs"
          >
            <span aria-hidden className="text-ember">
              &#10022;
            </span>
            {t('featured.title')}
          </h2>

          <div className="marquee-viewport overflow-hidden px-1">
            <div
              className="transition-transform duration-700 ease-out"
              style={{ transform: `translateX(${offset}%)` }}
            >
              <div
                className={cn(
                  'marquee-track animate-marquee flex w-max',
                  'group-focus-within/marquee:[animation-play-state:paused] group-hover/marquee:[animation-play-state:paused]',
                  nudging && '[animation-play-state:paused]',
                )}
              >
                {[0, 1].map((copy) => (
                  <ul
                    key={copy}
                    className="flex shrink-0 items-end gap-3 pr-3 sm:gap-8 sm:pr-8 lg:gap-12 lg:pr-12"
                    aria-hidden={copy === 1}
                  >
                    {list.map((wine) => (
                      <li key={`${copy}-${wine.slug}`} className="snap-start">
                        <BottleTile wine={wine} />
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          </div>

          {/* Soft edges so bottles fade into the band rather than clipping. */}
          <div
            aria-hidden
            className="from-navy pointer-events-none absolute inset-y-0 left-0 w-10 bg-linear-to-r to-transparent sm:w-16"
          />
          <div
            aria-hidden
            className="from-navy pointer-events-none absolute inset-y-0 right-0 w-10 bg-linear-to-l to-transparent sm:w-16"
          />

          <button
            type="button"
            aria-label={t('common.prev')}
            onClick={() => nudge(1)}
            className="bg-navy-soft/90 text-cream ring-cream/25 hover:bg-cream hover:text-navy absolute top-1/2 left-1.5 grid size-8 -translate-y-1/2 cursor-pointer place-items-center rounded-full ring-1 transition sm:left-3 sm:size-10"
          >
            <ChevronLeft className="size-4 sm:size-5" />
          </button>
          <button
            type="button"
            aria-label={t('common.next')}
            onClick={() => nudge(-1)}
            className="bg-navy-soft/90 text-cream ring-cream/25 hover:bg-cream hover:text-navy absolute top-1/2 right-1.5 grid size-8 -translate-y-1/2 cursor-pointer place-items-center rounded-full ring-1 transition sm:right-3 sm:size-10"
          >
            <ChevronRight className="size-4 sm:size-5" />
          </button>
        </div>
      </Container>
    </section>
  )
}
