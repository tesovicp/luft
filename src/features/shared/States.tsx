import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

export function Loading() {
  const { t } = useTranslation()
  return (
    <p role="status" className="text-ink-soft py-16 text-center text-sm">
      {t('common.loading')}
    </p>
  )
}

export function ErrorState({ onRetry }: { onRetry?: () => void }) {
  const { t } = useTranslation()
  return (
    <div className="py-16 text-center">
      <p className="text-ink-soft text-sm">{t('common.error')}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="text-wine mt-3 cursor-pointer text-xs font-semibold tracking-[0.14em] uppercase underline underline-offset-4"
        >
          {t('common.retry')}
        </button>
      )}
    </div>
  )
}

export function EmptyState({
  title,
  hint,
  action,
}: {
  title: string
  hint?: string
  action?: ReactNode
}) {
  return (
    <div className="py-16 text-center">
      <p className="font-display text-ink text-xl">{title}</p>
      {hint && <p className="text-ink-soft mt-2 text-sm">{hint}</p>}
      {action && <div className="mt-5 flex justify-center">{action}</div>}
    </div>
  )
}
