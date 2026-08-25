import { Bot, Send } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useSearchParams } from 'react-router'

import { Container } from '@/components/ui/Container'
import { useAskAlek, useWines } from '@/lib/api'
import { formatRsd } from '@/lib/format'
import type { AlekMessage, Situation, Wine } from '@/types'

const SUGGESTIONS = ['alek.suggestions.s1', 'alek.suggestions.s2', 'alek.suggestions.s3']

function WineReplyCard({ wine }: { wine: Wine }) {
  const { i18n } = useTranslation()
  return (
    <Link
      to={`/vino/${wine.slug}`}
      className="bg-cream-bright ring-line/70 mt-2 flex max-w-sm items-center gap-3 rounded-2xl p-3 ring-1 transition hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-20px_rgba(43,36,24,0.6)]"
    >
      <img src={wine.image} alt="" className="h-16 w-auto shrink-0 object-contain" />
      <span className="min-w-0 flex-1">
        <span className="text-ink block truncate text-sm font-semibold">
          {wine.name} {wine.vintage}
        </span>
        <span className="text-ink-soft block truncate text-xs">{wine.producer}</span>
        <span className="text-ink-soft block truncate text-xs">{wine.tags.join(', ')}</span>
        <span className="text-ink mt-1 block text-sm font-semibold">
          {formatRsd(wine.priceRsd, i18n.language)}
        </span>
      </span>
    </Link>
  )
}

export function AlekPage() {
  const { t } = useTranslation()
  const [params, setParams] = useSearchParams()
  const { data: wines } = useWines()
  const ask = useAskAlek()

  const [messages, setMessages] = useState<AlekMessage[]>([])
  const [draft, setDraft] = useState('')
  const endRef = useRef<HTMLDivElement>(null)
  const bootstrapped = useRef(false)

  function send(text: string, situation?: Situation) {
    const trimmed = text.trim()
    if (!trimmed || ask.isPending) return

    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: 'user', text: trimmed, at: new Date().toISOString() },
    ])
    setDraft('')

    ask.mutate(
      { text: trimmed, situation },
      { onSuccess: (reply) => setMessages((prev) => [...prev, reply]) },
    )
  }

  // Arriving from a situation card on the home page opens with that question asked.
  useEffect(() => {
    if (bootstrapped.current) return
    const situation = params.get('situacija') as Situation | null
    if (!situation) return
    bootstrapped.current = true
    send(t(`situations.${situation}`), situation)
    const next = new URLSearchParams(params)
    next.delete('situacija')
    setParams(next, { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages.length, ask.isPending])

  return (
    <div className="bg-sand/50">
      <Container className="flex min-h-[70vh] max-w-3xl flex-col py-8 lg:py-12">
        <header className="flex items-center gap-3">
          <span className="bg-wine text-cream-bright grid size-12 place-items-center rounded-2xl">
            <Bot className="size-6" strokeWidth={1.5} />
          </span>
          <div>
            <h1 className="font-display text-ink text-2xl">{t('alek.title')}</h1>
            <p className="text-ink-soft text-xs">{t('alek.subtitle')}</p>
          </div>
        </header>

        <div className="mt-6 flex-1 space-y-3">
          <p className="bg-card text-ink ring-line/60 max-w-md rounded-2xl rounded-bl-sm px-4 py-3 text-sm leading-relaxed ring-1">
            {t('alek.intro')}
          </p>

          {messages.map((message) => {
            const wine = message.wineSlug
              ? wines?.find((w) => w.slug === message.wineSlug)
              : undefined
            const isUser = message.role === 'user'

            return (
              <div key={message.id} className={isUser ? 'flex justify-end' : ''}>
                <div className={isUser ? 'max-w-md' : 'max-w-md'}>
                  <p
                    className={
                      isUser
                        ? 'bg-wine text-cream-bright rounded-2xl rounded-br-sm px-4 py-3 text-sm leading-relaxed'
                        : 'bg-card text-ink ring-line/60 rounded-2xl rounded-bl-sm px-4 py-3 text-sm leading-relaxed ring-1'
                    }
                  >
                    {/* Alek's replies arrive as translation keys so both languages work. */}
                    {isUser ? message.text : t(message.text)}
                  </p>
                  {wine && <WineReplyCard wine={wine} />}
                </div>
              </div>
            )
          })}

          {ask.isPending && (
            <p role="status" className="text-ink-soft text-xs">
              {t('alek.thinking')}
            </p>
          )}

          <div ref={endRef} />
        </div>

        {messages.length === 0 && (
          <ul className="mt-6 flex flex-wrap gap-2">
            {SUGGESTIONS.map((key) => (
              <li key={key}>
                <button
                  type="button"
                  onClick={() => send(t(key))}
                  className="bg-card text-ink-soft ring-line/60 hover:bg-cream-bright hover:text-ink cursor-pointer rounded-full px-4 py-2 text-left text-xs ring-1 transition"
                >
                  {t(key)}
                </button>
              </li>
            ))}
          </ul>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault()
            send(draft)
          }}
          className="bg-cream-bright ring-line sticky bottom-4 mt-6 flex items-center gap-2 rounded-full p-2 pl-5 shadow-[0_10px_30px_-20px_rgba(43,36,24,0.7)] ring-1"
        >
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={t('alek.placeholder')}
            aria-label={t('alek.placeholder')}
            className="text-ink placeholder:text-ink-soft/70 w-full bg-transparent text-sm outline-hidden"
          />
          <button
            type="submit"
            disabled={!draft.trim() || ask.isPending}
            aria-label={t('alek.send')}
            className="bg-wine text-cream-bright hover:bg-wine-bright grid size-10 shrink-0 cursor-pointer place-items-center rounded-full transition disabled:pointer-events-none disabled:opacity-40"
          >
            <Send className="size-4" />
          </button>
        </form>
      </Container>
    </div>
  )
}
