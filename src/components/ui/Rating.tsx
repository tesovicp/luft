import { Star } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { formatRating } from '@/lib/format'
import { cn } from '@/lib/utils'

interface RatingProps {
  value: number
  count?: number
  className?: string
}

export function Rating({ value, count, className }: RatingProps) {
  const { i18n, t } = useTranslation()
  const rounded = Math.round(value)

  return (
    <div className={cn('flex items-center gap-2 text-sm', className)}>
      <span className="text-ink font-semibold">{formatRating(value, i18n.language)}</span>
      <span className="flex" aria-hidden>
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={cn('size-3.5', i <= rounded ? 'fill-ember text-ember' : 'text-line')}
            strokeWidth={1.5}
          />
        ))}
      </span>
      {count !== undefined && (
        <span className="text-ink-soft">{t('detail.ratings', { count })}</span>
      )}
    </div>
  )
}
