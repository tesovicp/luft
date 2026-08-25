import { useMutation, useQuery } from '@tanstack/react-query'

import type { AlekMessage, PairingSuggestion, Situation, Wine, WineQuery, WineSet } from '@/types'

/**
 * Single seam between the UI and the backend. Today MSW answers these routes;
 * pointing BASE at a real server is the only change needed later.
 */
const BASE = import.meta.env.VITE_API_BASE ?? ''

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`)
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  return (await res.json()) as T
}

function toSearch(query: WineQuery): string {
  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== null && value !== '') params.set(key, String(value))
  }
  const qs = params.toString()
  return qs ? `?${qs}` : ''
}

export function useWines(query: WineQuery = {}) {
  return useQuery({
    queryKey: ['wines', query],
    queryFn: () => get<Wine[]>(`/api/wines${toSearch(query)}`),
  })
}

export function useWine(slug: string | undefined) {
  return useQuery({
    queryKey: ['wine', slug],
    queryFn: () => get<Wine>(`/api/wines/${slug}`),
    enabled: Boolean(slug),
  })
}

export function usePairings(slug: string | undefined) {
  return useQuery({
    queryKey: ['pairings', slug],
    queryFn: () => get<PairingSuggestion[]>(`/api/wines/${slug}/pairings`),
    enabled: Boolean(slug),
  })
}

export function useFeatured() {
  return useQuery({ queryKey: ['featured'], queryFn: () => get<Wine[]>('/api/featured') })
}

export function useTrending() {
  return useQuery({ queryKey: ['trending'], queryFn: () => get<Wine[]>('/api/trending') })
}

export function useSets() {
  return useQuery({ queryKey: ['sets'], queryFn: () => get<WineSet[]>('/api/sets') })
}

export function useWineOfTheDay() {
  return useQuery({
    queryKey: ['recommendation', 'today'],
    queryFn: () => get<Wine>('/api/recommendation/today'),
  })
}

export function useAskAlek() {
  return useMutation({
    mutationFn: async (input: { text: string; situation?: Situation }) => {
      const res = await fetch(`${BASE}/api/alek`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      })
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
      return (await res.json()) as AlekMessage
    },
  })
}
