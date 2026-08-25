import { AlekBand } from './AlekBand'
import { FeaturedMarquee } from './FeaturedMarquee'
import { Hero } from './Hero'
import { Highlights } from './Highlights'
import { HowItWorks } from './HowItWorks'
import { TrustBand } from './TrustBand'

export function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedMarquee />
      <TrustBand />
      <HowItWorks />
      <AlekBand />
      <Highlights />
    </>
  )
}
