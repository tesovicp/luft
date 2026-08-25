import { useTranslation } from 'react-i18next'

import { Container } from '@/components/ui/Container'
import { WineCard } from '@/components/ui/WineCard'
import { useTrending } from '@/lib/api'

import { PageHeader } from '../shared/PageHeader'
import { ErrorState, Loading } from '../shared/States'

export function TrendingPage() {
  const { t } = useTranslation()
  const { data, isPending, isError, refetch } = useTrending()

  return (
    <>
      <PageHeader title={t('trending.title')} subtitle={t('trending.subtitle')} />
      <Container className="py-8 lg:py-12">
        {isPending && <Loading />}
        {isError && <ErrorState onRetry={() => void refetch()} />}
        {data && (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {data.map((wine) => (
              <li key={wine.slug}>
                <WineCard wine={wine} className="h-full" />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </>
  )
}
