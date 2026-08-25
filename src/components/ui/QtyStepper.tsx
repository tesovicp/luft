import { Minus, Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface QtyStepperProps {
  qty: number
  onChange: (qty: number) => void
}

export function QtyStepper({ qty, onChange }: QtyStepperProps) {
  const { t } = useTranslation()
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        aria-label={t('cart.decrease')}
        onClick={() => onChange(qty - 1)}
        className="ring-line text-ink-soft hover:bg-sand hover:text-ink grid size-8 cursor-pointer place-items-center rounded-full ring-1 transition"
      >
        <Minus className="size-3.5" />
      </button>
      <span className="w-5 text-center text-sm font-semibold tabular-nums">{qty}</span>
      <button
        type="button"
        aria-label={t('cart.increase')}
        onClick={() => onChange(qty + 1)}
        className="ring-line text-ink-soft hover:bg-sand hover:text-ink grid size-8 cursor-pointer place-items-center rounded-full ring-1 transition"
      >
        <Plus className="size-3.5" />
      </button>
    </div>
  )
}
