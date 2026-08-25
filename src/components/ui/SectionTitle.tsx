import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

export function SectionTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h2 className={cn('eyebrow text-ink text-lg sm:text-xl', className)}>{children}</h2>
}
