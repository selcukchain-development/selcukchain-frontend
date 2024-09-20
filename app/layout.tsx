import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-background text-foreground">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
