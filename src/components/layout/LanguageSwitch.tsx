import { useTranslation } from 'react-i18next'

import { languages } from '@/i18n'
import { cn } from '@/lib/utils'

export function LanguageSwitch({ className }: { className?: string }) {
  const { i18n } = useTranslation()

  return (
    <div
      className={cn(
        'flex items-center gap-1 text-[11px] font-semibold tracking-[0.1em]',
        className,
      )}
    >
      {languages.map((lng, i) => (
        <span key={lng} className="flex items-center gap-1">
          {i > 0 && <span className="text-cream/30">|</span>}
          <button
            type="button"
            onClick={() => void i18n.changeLanguage(lng)}
            aria-current={i18n.language === lng}
            className={cn(
              'cursor-pointer rounded px-1 py-0.5 uppercase transition',
              i18n.language === lng ? 'text-cream' : 'text-cream/50 hover:text-cream/80',
            )}
          >
            {lng}
          </button>
        </span>
      ))}
    </div>
  )
}
