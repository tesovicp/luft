import { HttpResponse, delay, http } from 'msw'

import type { AlekMessage, PairingSuggestion, Situation, Wine, WineType } from '@/types'

import { wineSets, wines } from './data'

/**
 * Mock API. Everything the UI needs sits behind these routes, so swapping in a
 * real backend later means deleting this file and pointing at a base URL — no
 * component imports mock data directly.
 */

const PAIRINGS: Record<string, PairingSuggestion[]> = {
  belo: [
    { id: 'p1', dish: 'losos', strength: 'odlicno', emoji: '🐟' },
    { id: 'p2', dish: 'pastaPesto', strength: 'odlicno', emoji: '🍝' },
    { id: 'p3', dish: 'salate', strength: 'odlicno', emoji: '🥗' },
    { id: 'p4', dish: 'sushi', strength: 'dobro', emoji: '🍣' },
  ],
  rose: [
    { id: 'p5', dish: 'salate', strength: 'odlicno', emoji: '🥗' },
    { id: 'p6', dish: 'pastaPesto', strength: 'odlicno', emoji: '🍝' },
    { id: 'p7', dish: 'sir', strength: 'dobro', emoji: '🧀' },
    { id: 'p8', dish: 'losos', strength: 'dobro', emoji: '🐟' },
  ],
  crveno: [
    { id: 'p9', dish: 'steak', strength: 'odlicno', emoji: '🥩' },
    { id: 'p10', dish: 'sir', strength: 'odlicno', emoji: '🧀' },
    { id: 'p11', dish: 'pastaBolonjeze', strength: 'odlicno', emoji: '🍝' },
    { id: 'p12', dish: 'rostilj', strength: 'dobro', emoji: '🔥' },
  ],
  pjenusavo: [
    { id: 'p13', dish: 'aperitiv', strength: 'odlicno', emoji: '🥂' },
    { id: 'p14', dish: 'sushi', strength: 'odlicno', emoji: '🍣' },
    { id: 'p15', dish: 'ostrige', strength: 'odlicno', emoji: '🦪' },
    { id: 'p16', dish: 'desert', strength: 'dobro', emoji: '🍰' },
  ],
}

/** Alek's canned reasoning, keyed by the situation the visitor picked. */
const BY_SITUATION: Record<Situation, string> = {
  vecera: '100-zena-crveno',
  dejt: '100-zena-rose',
  drustvo: 'lastar-tamjanika',
  poklon: '100-zena-pjenusavo',
  'ne-znam': '100-zena-rose',
}

function matches(wine: Wine, url: URL): boolean {
  const q = url.searchParams.get('q')?.trim().toLowerCase()
  const type = url.searchParams.get('type')
  const grape = url.searchParams.get('grape')
  const country = url.searchParams.get('country')
  const situation = url.searchParams.get('situation')
  const maxPrice = url.searchParams.get('maxPrice')

  if (q) {
    const haystack = `${wine.name} ${wine.producer} ${wine.grape} ${wine.region}`.toLowerCase()
    if (!haystack.includes(q)) return false
  }
  if (type && wine.type !== (type as WineType)) return false
  if (grape && wine.grape !== grape) return false
  if (country && wine.country !== country) return false
  if (situation && !wine.situations.includes(situation as Situation)) return false
  if (maxPrice && wine.priceRsd > Number(maxPrice)) return false
  return true
}

/** Deterministic pick so "today's wine" is stable within a calendar day. */
function wineOfTheDay(): Wine {
  const day = Math.floor(Date.now() / 86_400_000)
  return wines[day % wines.length]!
}

export const handlers = [
  http.get('/api/wines', async ({ request }) => {
    await delay(220)
    const url = new URL(request.url)
    return HttpResponse.json(wines.filter((w) => matches(w, url)))
  }),

  http.get('/api/wines/:slug', async ({ params }) => {
    await delay(180)
    const wine = wines.find((w) => w.slug === params.slug)
    if (!wine) return new HttpResponse(null, { status: 404 })
    return HttpResponse.json(wine)
  }),

  http.get('/api/wines/:slug/pairings', async ({ params }) => {
    await delay(160)
    const wine = wines.find((w) => w.slug === params.slug)
    if (!wine) return new HttpResponse(null, { status: 404 })
    return HttpResponse.json(PAIRINGS[wine.type] ?? PAIRINGS.belo)
  }),

  http.get('/api/featured', async () => {
    await delay(200)
    return HttpResponse.json(wines.filter((w) => w.featured))
  }),

  http.get('/api/trending', async () => {
    await delay(200)
    return HttpResponse.json(wines.filter((w) => w.trending))
  }),

  http.get('/api/sets', async () => {
    await delay(200)
    return HttpResponse.json(wineSets)
  }),

  http.get('/api/recommendation/today', async () => {
    await delay(240)
    return HttpResponse.json(wineOfTheDay())
  }),

  http.post('/api/alek', async ({ request }) => {
    const body = (await request.json()) as { text?: string; situation?: Situation }
    await delay(900)

    const text = (body.text ?? '').toLowerCase()
    let slug = body.situation ? BY_SITUATION[body.situation] : undefined

    // Crude keyword routing — stands in for the real sommelier model.
    if (!slug) {
      if (/riba|losos|sushi|škamp|skamp|morsk/.test(text)) slug = 'fresckoo-sauvignon-blanc'
      else if (/mes|stek|steak|roštilj|rostilj|jagnje|govedin/.test(text)) slug = 'vronski-prokupac'
      else if (/slav|proslav|rođendan|rodjendan|nova godina|šampanj|sampanj/.test(text))
        slug = '100-zena-pjenusavo'
      else if (/poklon|rođendanski poklon|dar/.test(text)) slug = '100-zena-pjenusavo'
      else if (/pasta|testenin|pesto/.test(text)) slug = '100-zena-rose'
      else if (/sir|plato/.test(text)) slug = '100-zena-crveno'
      else slug = '100-zena-rose'
    }

    const wine = wines.find((w) => w.slug === slug) ?? wines[1]!
    const reply: AlekMessage = {
      id: crypto.randomUUID(),
      role: 'alek',
      text: `alek.reply.${wine.type}`,
      at: new Date().toISOString(),
      wineSlug: wine.slug,
    }
    return HttpResponse.json(reply)
  }),
]
