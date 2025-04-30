import "@styles/globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "PFE",
  description: "Labs research management",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
          {children}
      </body>
    </html>
  )
}

