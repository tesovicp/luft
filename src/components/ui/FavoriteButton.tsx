import { Heart } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { useFavorites } from '@/stores/favorites'
import { cn } from '@/lib/utils'

export function FavoriteButton({ slug, className }: { slug: string; className?: string }) {
  const { t } = useTranslation()
  const slugs = useFavorites((s) => s.slugs)
  const toggle = useFavorites((s) => s.toggle)
  const active = slugs.includes(slug)

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={t(active ? 'detail.unfavorite' : 'detail.favorite')}
      onClick={() => toggle(slug)}
      className={cn(
        'grid size-9 cursor-pointer place-items-center rounded-full transition hover:bg-black/5',
        className,
      )}
    >
      <Heart
        className={cn('size-5 transition', active ? 'fill-wine text-wine' : 'text-ink-soft')}
        strokeWidth={1.6}
      />
    </button>
  )
}
