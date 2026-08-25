import type { ReactNode } from 'react'

import { Container } from '@/components/ui/Container'

interface PageHeaderProps {
  title: string
  subtitle?: string
  children?: ReactNode
}

/** Dark banner that carries a route's title, echoing the hero's material. */
export function PageHeader({ title, subtitle, children }: PageHeaderProps) {
  return (
    <div className="bg-forest text-cream py-9 lg:py-12">
      <Container>
        <h1 className="font-display text-cream-bright text-3xl leading-tight lg:text-5xl">
          {title}
        </h1>
        {subtitle && <p className="text-cream/75 mt-2 max-w-xl text-sm lg:text-base">{subtitle}</p>}
        {children}
      </Container>
    </div>
  )
}
