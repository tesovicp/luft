import { Slot } from '@radix-ui/react-slot'
import type { ButtonHTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

type Variant = 'primary' | 'solid' | 'dark' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const VARIANTS: Record<Variant, string> = {
  // The hero pill: a warm burgundy sweep, as in the mock.
  primary:
    'bg-linear-to-r from-wine to-wine-bright text-cream-bright shadow-[0_10px_24px_-12px_rgba(97,23,24,0.9)] hover:brightness-110',
  solid: 'bg-wine text-cream-bright hover:bg-wine-bright',
  dark: 'bg-wine-deep text-cream-bright hover:bg-wine',
  outline: 'border border-line text-ink hover:border-ink/40 hover:bg-card',
  ghost: 'text-ink hover:bg-black/5',
}

const SIZES: Record<Size, string> = {
  sm: 'h-9 px-4 text-[11px]',
  md: 'h-11 px-6 text-xs',
  lg: 'h-13 px-8 text-[13px]',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  /** Square-ish corners instead of a full pill (used by "add to cart"). */
  block?: boolean
  rounded?: 'pill' | 'card'
  asChild?: boolean
}

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  block = false,
  rounded = 'pill',
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp
      className={cn(
        'inline-flex cursor-pointer items-center justify-center gap-3 font-sans font-semibold tracking-[0.12em] uppercase transition duration-200 disabled:pointer-events-none disabled:opacity-50',
        rounded === 'pill' ? 'rounded-full' : 'rounded-xl',
        VARIANTS[variant],
        SIZES[size],
        block && 'w-full',
        className,
      )}
      {...props}
    />
  )
}
