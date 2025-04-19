import "@styles/globals.css"
import type { Metadata } from "next"
import SidebarLayout from "@/components/sidebar"

export const metadata: Metadata = {
  title: "PFE",
  description: "Labs research management",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SidebarLayout>
          {children}
        </SidebarLayout>
      </body>
    </html>
  )
}

