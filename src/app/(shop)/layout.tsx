import { Footer, Sidebar, TopMenu } from '@/components'

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="min-h-screen">
      <TopMenu />
      <Sidebar />

      <div className="min-h-[calc(100vh-220px)] px-0 md:px-10">{children}</div>

      <Footer />
    </main>
  )
}
