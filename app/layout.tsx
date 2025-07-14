import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Fade Masked Carousel",
  description: "Responsive carousel with warm fade masking effects",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased" style={{ backgroundColor: "#FFECE1" }}>
        {children}
      </body>
    </html>
  )
}
