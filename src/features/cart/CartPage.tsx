import { Trash2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { QtyStepper } from '@/components/ui/QtyStepper'
import { formatRsd } from '@/lib/format'
import { deliveryFor, selectSubtotal, useCart } from '@/stores/cart'

import { PageHeader } from '../shared/PageHeader'
import { EmptyState } from '../shared/States'

export function CartPage() {
  const { t, i18n } = useTranslation()
  const lines = useCart((s) => s.lines)
  const setQty = useCart((s) => s.setQty)
  const remove = useCart((s) => s.remove)
  const subtotal = useCart(selectSubtotal)
  const delivery = deliveryFor(subtotal)

  return (
    <>
      <PageHeader title={t('cart.title')} />

      <Container className="py-8 lg:py-12">
        {lines.length === 0 ? (
          <EmptyState
            title={t('cart.empty')}
            hint={t('cart.emptyHint')}
            action={
              <Button asChild>
                <Link to="/alek">{t('alekBand.cta')}</Link>
              </Button>
            }
          />
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1fr_20rem]">
            <ul className="divide-line divide-y">
              {lines.map(({ wine, qty }) => (
                <li key={wine.slug} className="flex items-center gap-4 py-5">
                  <Link to={`/vino/${wine.slug}`} className="shrink-0">
                    <img src={wine.image} alt="" className="h-24 w-auto object-contain" />
                  </Link>

                  <div className="min-w-0 flex-1">
                    <Link
                      to={`/vino/${wine.slug}`}
                      className="font-display text-ink text-lg hover:underline"
                    >
                      {wine.name} {wine.vintage}
                    </Link>
                    <p className="text-ink-soft mt-0.5 text-xs">{wine.producer}</p>
                    <p className="text-ink mt-1 text-sm font-semibold">
                      {formatRsd(wine.priceRsd, i18n.language)}
                    </p>
                    <div className="mt-3">
                      <QtyStepper qty={qty} onChange={(next) => setQty(wine.slug, next)} />
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <p className="text-ink text-sm font-semibold tabular-nums">
                      {formatRsd(wine.priceRsd * qty, i18n.language)}
                    </p>
                    <button
                      type="button"
                      onClick={() => remove(wine.slug)}
                      aria-label={t('cart.remove')}
                      className="text-ink-soft hover:text-wine cursor-pointer transition"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="rounded-card bg-card ring-line/60 h-fit p-6 ring-1 lg:sticky lg:top-6">
              <dl className="space-y-3 text-sm">
                <div className="text-ink-soft flex justify-between">
                  <dt>{t('cart.delivery')}</dt>
                  <dd className="tabular-nums">{formatRsd(delivery, i18n.language)}</dd>
                </div>
                <div className="border-line text-ink flex justify-between border-t pt-3 text-base font-semibold">
                  <dt>{t('cart.total')}</dt>
                  <dd className="tabular-nums">{formatRsd(subtotal + delivery, i18n.language)}</dd>
                </div>
              </dl>

              <Button asChild block rounded="card" variant="dark" size="lg" className="mt-6">
                <Link to="/checkout">{t('cart.checkout')}</Link>
              </Button>

              <Link
                to="/pretraga"
                className="text-ink-soft hover:text-ink mt-4 block text-center text-xs font-semibold tracking-[0.12em] uppercase transition"
              >
                {t('cart.keepShopping')}
              </Link>
            </aside>
          </div>
        )}
      </Container>
    </>
  )
}
