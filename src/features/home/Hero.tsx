import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

import { SituationPicker } from './SituationPicker'

/**
 * Dark olive stage with the photograph bleeding off the right edge. The copy
 * column is held clear of the image at every width by a gradient scrim rather
 * than by a hard column split, which is what the mock does.
 */
export function Hero() {
  const { t } = useTranslation()

  return (
    <section className="bg-forest text-cream relative overflow-hidden">
      <div className="absolute top-0 right-0 h-[52%] w-[54%] sm:h-[62%] sm:w-[48%] lg:inset-y-0 lg:h-full lg:w-[46%]">
        <img
          src="/hero/pour.jpg"
          alt={t('hero.imageAlt')}
          className="size-full object-cover object-center"
        />
        {/* Feather the photograph into the olive field so no hard seam shows. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-forest)_0%,transparent_34%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_top,var(--color-forest)_0%,transparent_26%)] lg:hidden"
        />
      </div>

      <Container className="relative py-10 sm:py-14 lg:py-14">
        <div className="max-w-[62%] sm:max-w-[58%] lg:max-w-xl">
          <h1 className="font-display text-cream-bright text-[clamp(2rem,7vw,4.75rem)] leading-[0.95]">
            {t('hero.titleLead')}
            <em className="block not-italic">
              <span className="italic">{t('hero.titleEm')}</span>
            </em>
          </h1>

          <p className="text-cream/80 mt-4 text-sm leading-relaxed sm:mt-5 sm:text-base lg:text-lg">
            {t('hero.subLine1')}
            <br />
            {t('hero.subLine2')}
          </p>
        </div>

        <div className="mt-6 sm:mt-7 lg:mt-8">
          <Button asChild size="lg" className="max-sm:h-11 max-sm:px-5 max-sm:text-[10px]">
            <Link to="/alek">
              {t('hero.cta')}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        <p className="text-cream/70 mt-6 text-xs sm:mt-7 sm:text-sm">{t('hero.orPick')}</p>

        <div className="mt-3 sm:mt-4 lg:max-w-3xl">
          <SituationPicker />
        </div>
      </Container>
    </section>
  )
}
