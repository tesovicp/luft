import { Check } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { formatRsd } from '@/lib/format'
import { cn } from '@/lib/utils'
import { deliveryFor, selectSubtotal, useCart } from '@/stores/cart'

import { PageHeader } from '../shared/PageHeader'
import { EmptyState } from '../shared/States'

const STEPS = ['checkout.stepAddress', 'checkout.stepDelivery', 'checkout.stepPayment'] as const

const FIELDS = ['fullName', 'address', 'city', 'phone'] as const
type Field = (typeof FIELDS)[number]

const EXPRESS_RSD = 690

const PAYMENT_OPTIONS = ['card', 'cash'] as const

const INPUT =
  'w-full rounded-xl bg-cream-bright px-4 py-3 text-sm text-ink outline-hidden ring-1 ring-line transition placeholder:text-ink-soft/70 focus:ring-2 focus:ring-wine/50'

export function CheckoutPage() {
  const { t, i18n } = useTranslation()
  const lines = useCart((s) => s.lines)
  const clear = useCart((s) => s.clear)
  const subtotal = useCart(selectSubtotal)

  const [step, setStep] = useState(0)
  const [values, setValues] = useState<Record<Field, string>>({
    fullName: '',
    address: '',
    city: '',
    phone: '',
  })
  const [touched, setTouched] = useState(false)
  const [deliveryId, setDeliveryId] = useState<string>('standard')
  const [paymentId, setPaymentId] = useState<string>('card')
  const [done, setDone] = useState(false)

  // Standard shipping is free above the threshold; express always costs.
  const standardPrice = deliveryFor(subtotal)
  const deliveryOptions = [
    { id: 'standard', price: standardPrice },
    { id: 'express', price: EXPRESS_RSD },
  ]
  const deliveryPrice = deliveryId === 'express' ? EXPRESS_RSD : standardPrice
  const total = subtotal + deliveryPrice
  const missing = FIELDS.filter((f) => !values[f].trim())

  if (done) {
    return (
      <Container className="py-24 text-center">
        <span className="bg-wine text-cream-bright mx-auto grid size-16 place-items-center rounded-full">
          <Check className="size-8" />
        </span>
        <h1 className="font-display text-ink mt-6 text-4xl">{t('checkout.successTitle')}</h1>
        <p className="text-ink-soft mt-3">{t('checkout.successBody')}</p>
        <div className="mt-8 flex justify-center">
          <Button asChild>
            <Link to="/">{t('checkout.backHome')}</Link>
          </Button>
        </div>
      </Container>
    )
  }

  if (lines.length === 0) {
    return (
      <>
        <PageHeader title={t('checkout.title')} />
        <Container className="py-8">
          <EmptyState
            title={t('cart.empty')}
            hint={t('cart.emptyHint')}
            action={
              <Button asChild>
                <Link to="/pretraga">{t('cart.keepShopping')}</Link>
              </Button>
            }
          />
        </Container>
      </>
    )
  }

  function next() {
    if (step === 0) {
      setTouched(true)
      if (missing.length > 0) return
    }
    if (step < 2) {
      setStep(step + 1)
      return
    }
    clear()
    setDone(true)
  }

  return (
    <>
      <PageHeader title={t('checkout.title')} />

      <Container className="py-8 lg:py-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_20rem]">
          <div>
            <ol className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {STEPS.map((key, i) => (
                <li key={key} className="flex items-center gap-2">
                  <span
                    className={cn(
                      'grid size-6 place-items-center rounded-full text-[11px] font-bold transition',
                      i <= step ? 'bg-wine text-cream-bright' : 'bg-sand text-ink-soft',
                    )}
                  >
                    {i < step ? <Check className="size-3.5" /> : i + 1}
                  </span>
                  <span
                    className={cn(
                      'text-xs font-semibold tracking-[0.1em] uppercase',
                      i <= step ? 'text-ink' : 'text-ink-soft',
                    )}
                  >
                    {t(key)}
                  </span>
                </li>
              ))}
            </ol>

            <div className="mt-8">
              {step === 0 && (
                <section>
                  <h2 className="eyebrow text-ink text-[11px]">{t('checkout.addressTitle')}</h2>
                  <div className="mt-4 grid max-w-lg gap-3">
                    {FIELDS.map((field) => {
                      const invalid = touched && !values[field].trim()
                      return (
                        <div key={field}>
                          <input
                            value={values[field]}
                            onChange={(e) => setValues({ ...values, [field]: e.target.value })}
                            placeholder={t(`checkout.${field}`)}
                            aria-label={t(`checkout.${field}`)}
                            aria-invalid={invalid}
                            className={cn(INPUT, invalid && 'ring-wine/70 ring-2')}
                          />
                          {invalid && (
                            <p className="text-wine mt-1 text-xs">{t('checkout.required')}</p>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </section>
              )}

              {step === 1 && (
                <section>
                  <h2 className="eyebrow text-ink text-[11px]">{t('checkout.deliveryTitle')}</h2>
                  <ul className="mt-4 grid max-w-lg gap-3">
                    {deliveryOptions.map((option) => (
                      <li key={option.id}>
                        <label
                          className={cn(
                            'bg-card flex cursor-pointer items-center gap-3 rounded-xl px-4 py-4 ring-1 transition',
                            deliveryId === option.id
                              ? 'ring-wine ring-2'
                              : 'ring-line/60 hover:bg-cream-bright',
                          )}
                        >
                          <input
                            type="radio"
                            name="delivery"
                            checked={deliveryId === option.id}
                            onChange={() => setDeliveryId(option.id)}
                            className="accent-wine"
                          />
                          <span className="flex-1">
                            <span className="text-ink block text-sm font-semibold">
                              {t(`checkout.${option.id}`)}
                            </span>
                            <span className="text-ink-soft block text-xs">
                              {t(`checkout.${option.id}Note`)}
                            </span>
                          </span>
                          <span className="text-ink text-sm font-semibold tabular-nums">
                            {formatRsd(option.price, i18n.language)}
                          </span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {step === 2 && (
                <section>
                  <h2 className="eyebrow text-ink text-[11px]">{t('checkout.paymentTitle')}</h2>
                  <ul className="mt-4 grid max-w-lg gap-3">
                    {PAYMENT_OPTIONS.map((option) => (
                      <li key={option}>
                        <label
                          className={cn(
                            'bg-card flex cursor-pointer items-center gap-3 rounded-xl px-4 py-4 ring-1 transition',
                            paymentId === option
                              ? 'ring-wine ring-2'
                              : 'ring-line/60 hover:bg-cream-bright',
                          )}
                        >
                          <input
                            type="radio"
                            name="payment"
                            checked={paymentId === option}
                            onChange={() => setPaymentId(option)}
                            className="accent-wine"
                          />
                          <span className="flex-1">
                            <span className="text-ink block text-sm font-semibold">
                              {t(`checkout.${option}`)}
                            </span>
                            <span className="text-ink-soft block text-xs">
                              {t(`checkout.${option}Note`)}
                            </span>
                          </span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            <div className="mt-8 flex items-center gap-3">
              {step > 0 && (
                <Button
                  variant="outline"
                  rounded="card"
                  size="lg"
                  onClick={() => setStep(step - 1)}
                >
                  {t('common.back')}
                </Button>
              )}
              <Button variant="dark" rounded="card" size="lg" onClick={next} className="min-w-48">
                {step === 2 ? t('checkout.placeOrder') : t('checkout.continue')}
              </Button>
            </div>
          </div>

          <aside className="rounded-card bg-card ring-line/60 h-fit p-6 ring-1 lg:sticky lg:top-6">
            <ul className="space-y-3">
              {lines.map(({ wine, qty }) => (
                <li key={wine.slug} className="flex items-center gap-3">
                  <img src={wine.image} alt="" className="h-12 w-auto shrink-0 object-contain" />
                  <span className="min-w-0 flex-1">
                    <span className="text-ink block truncate text-xs font-semibold">
                      {wine.name}
                    </span>
                    <span className="text-ink-soft block text-xs">&times; {qty}</span>
                  </span>
                  <span className="text-ink text-xs font-semibold tabular-nums">
                    {formatRsd(wine.priceRsd * qty, i18n.language)}
                  </span>
                </li>
              ))}
            </ul>

            <dl className="border-line mt-5 space-y-2 border-t pt-4 text-sm">
              <div className="text-ink-soft flex justify-between">
                <dt>{t('cart.delivery')}</dt>
                <dd className="tabular-nums">{formatRsd(deliveryPrice, i18n.language)}</dd>
              </div>
              <div className="text-ink flex justify-between text-base font-semibold">
                <dt>{t('cart.total')}</dt>
                <dd className="tabular-nums">{formatRsd(total, i18n.language)}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </Container>
    </>
  )
}
