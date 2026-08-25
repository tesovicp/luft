export type WineType = 'belo' | 'crveno' | 'rose' | 'pjenusavo'

export type Situation = 'vecera' | 'dejt' | 'drustvo' | 'poklon' | 'ne-znam'

export type FoodPairing =
  'riba' | 'slavlje' | 'pasta' | 'aperitivi' | 'meso' | 'sir' | 'salate' | 'sushi'

export interface Wine {
  id: string
  slug: string
  name: string
  producer: string
  vintage: number
  type: WineType
  grape: string
  country: string
  region: string
  priceRsd: number
  image: string
  rating: number
  ratingCount: number
  /** Short descriptors shown as chips on the detail screen, e.g. Suvo / Lagano. */
  tags: string[]
  pairings: FoodPairing[]
  situations: Situation[]
  alcohol: number
  description: string
  featured: boolean
  trending: boolean
}

export interface CartLine {
  wine: Wine
  qty: number
}

export interface PairingSuggestion {
  id: string
  /** i18n key under `pairing.dishes` */
  dish: string
  strength: 'odlicno' | 'dobro'
  emoji: string
}

export interface WineSet {
  id: string
  slug: string
  name: string
  blurb: string
  priceRsd: number
  wineSlugs: string[]
}

export interface AlekMessage {
  id: string
  role: 'user' | 'alek'
  text: string
  at: string
  wineSlug?: string
}

export interface WineQuery {
  q?: string
  type?: WineType
  grape?: string
  country?: string
  situation?: Situation
  maxPrice?: number
}
