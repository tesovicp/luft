import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { WineCard } from '@/components/ui/WineCard'
import { useWines } from '@/lib/api'
import { useFavorites } from '@/stores/favorites'

import { PageHeader } from '../shared/PageHeader'
import { EmptyState, ErrorState, Loading } from '../shared/States'

export function FavoritesPage() {
  const { t } = useTranslation()
  const slugs = useFavorites((s) => s.slugs)
  const { data, isPending, isError, refetch } = useWines()

  const saved = data?.filter((wine) => slugs.includes(wine.slug)) ?? []

  return (
    <>
      <PageHeader title={t('favorites.title')} />
      <Container className="py-8 lg:py-12">
        {isPending && <Loading />}
        {isError && <ErrorState onRetry={() => void refetch()} />}
        {data && saved.length === 0 && (
          <EmptyState
            title={t('favorites.empty')}
            hint={t('favorites.emptyHint')}
            action={
              <Button asChild>
                <Link to="/pretraga">{t('nav.search')}</Link>
              </Button>
            }
          />
        )}
        {saved.length > 0 && (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {saved.map((wine) => (
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
