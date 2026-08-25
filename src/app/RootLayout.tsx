import { Outlet, ScrollRestoration } from 'react-router'

import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { MobileTabBar } from '@/components/layout/MobileTabBar'

export function RootLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      {/* Bottom tab bar overlays content on small screens, so reserve its height. */}
      <div className="h-16 lg:hidden" aria-hidden />
      <MobileTabBar />
      <ScrollRestoration />
    </div>
  )
}
