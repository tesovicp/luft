import { createBrowserRouter } from 'react-router'

import { AlekPage } from '@/features/alek/AlekPage'
import { CartPage } from '@/features/cart/CartPage'
import { CheckoutPage } from '@/features/cart/CheckoutPage'
import { FavoritesPage } from '@/features/catalog/FavoritesPage'
import { SearchPage } from '@/features/catalog/SearchPage'
import { SetsPage } from '@/features/catalog/SetsPage'
import { TodayPage } from '@/features/catalog/TodayPage'
import { TrendingPage } from '@/features/catalog/TrendingPage'
import { WineDetailPage } from '@/features/catalog/WineDetailPage'
import { HomePage } from '@/features/home/HomePage'
import { PairingPage } from '@/features/pairing/PairingPage'
import { ProfilePage } from '@/features/profile/ProfilePage'
import { NotFoundPage } from '@/features/shared/NotFoundPage'

import { RootLayout } from './RootLayout'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'pretraga', element: <SearchPage /> },
      { path: 'vino/:slug', element: <WineDetailPage /> },
      { path: 'uparivanje', element: <PairingPage /> },
      { path: 'uparivanje/:slug', element: <PairingPage /> },
      { path: 'alek', element: <AlekPage /> },
      { path: 'korpa', element: <CartPage /> },
      { path: 'checkout', element: <CheckoutPage /> },
      { path: 'setovi', element: <SetsPage /> },
      { path: 'favoriti', element: <FavoritesPage /> },
      { path: 'profil', element: <ProfilePage /> },
      { path: 'trending', element: <TrendingPage /> },
      { path: 'danas', element: <TodayPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
