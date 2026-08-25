/** Prices are always shown in dinars, grouped the Serbian way: 1.890 RSD. */
export function formatRsd(value: number, locale = 'sr-RS'): string {
  return `${new Intl.NumberFormat(locale === 'sr' ? 'sr-RS' : locale).format(value)} RSD`
}

export function formatRating(value: number, locale = 'sr-RS'): string {
  return new Intl.NumberFormat(locale === 'sr' ? 'sr-RS' : locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value)
}
