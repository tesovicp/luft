import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface ChipProps {
  children: ReactNode
  active?: boolean
  onClick?: () => void
  className?: string
}

/** The soft rounded tags used for grapes, filters and wine descriptors. */
export function Chip({ children, active = false, onClick, className }: ChipProps) {
  const Comp = onClick ? 'button' : 'span'
  return (
    <Comp
      onClick={onClick}
      className={cn(
        'inline-flex items-center rounded-full px-4 py-2 text-xs font-medium transition',
        onClick && 'cursor-pointer',
        active
          ? 'bg-wine text-cream-bright'
          : 'bg-sand/70 text-ink-soft hover:bg-sand ring-line/60 ring-1',
        className,
      )}
    >
      {children}
    </Comp>
  )
}
