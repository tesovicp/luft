import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'

import { cn } from '@/lib/utils'

export function Logo({
  className,
  showTagline = true,
}: {
  className?: string
  showTagline?: boolean
}) {
  const { t } = useTranslation()

  return (
    <Link to="/" className={cn('group block leading-none', className)}>
      <span className="font-display text-cream-bright text-2xl tracking-[0.22em] sm:text-[28px]">
        {t('brand.name')}
        <span className="text-ember">.</span>
      </span>
      {showTagline && (
        <span className="text-cream/60 mt-1.5 block text-[9px] font-medium tracking-[0.28em] uppercase">
          {t('brand.tagline')}
        </span>
      )}
    </Link>
  )
}
