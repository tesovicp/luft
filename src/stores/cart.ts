import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { CartLine, Wine } from '@/types'

export const DELIVERY_RSD = 300
/** Orders above this ship for free — mirrors the trust band's promise. */
export const FREE_DELIVERY_FROM = 6000

interface CartState {
  lines: CartLine[]
  add: (wine: Wine, qty?: number) => void
  setQty: (slug: string, qty: number) => void
  remove: (slug: string) => void
  clear: () => void
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      add: (wine, qty = 1) =>
        set((state) => {
          const existing = state.lines.find((l) => l.wine.slug === wine.slug)
          if (!existing) return { lines: [...state.lines, { wine, qty }] }
          return {
            lines: state.lines.map((l) =>
              l.wine.slug === wine.slug ? { ...l, qty: l.qty + qty } : l,
            ),
          }
        }),
      setQty: (slug, qty) =>
        set((state) => ({
          lines:
            qty <= 0
              ? state.lines.filter((l) => l.wine.slug !== slug)
              : state.lines.map((l) => (l.wine.slug === slug ? { ...l, qty } : l)),
        })),
      remove: (slug) =>
        set((state) => ({ lines: state.lines.filter((l) => l.wine.slug !== slug) })),
      clear: () => set({ lines: [] }),
    }),
    { name: 'luft.cart' },
  ),
)

export const selectCount = (state: CartState) => state.lines.reduce((n, l) => n + l.qty, 0)

export const selectSubtotal = (state: CartState) =>
  state.lines.reduce((sum, l) => sum + l.wine.priceRsd * l.qty, 0)

export function deliveryFor(subtotal: number): number {
  if (subtotal === 0) return 0
  return subtotal >= FREE_DELIVERY_FROM ? 0 : DELIVERY_RSD
}
