import "@styles/globals.css"
import type { Metadata } from "next"
import { Toaster } from "@/components/ui/toaster"
import HeaderWrapper from "@/components/NavbarWarapper"

export const metadata: Metadata = {
  title: "PFE",
  description: "Labs research management",
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (

    <html lang="en">
      <body>

        <HeaderWrapper />
        <Toaster />
        {children}
      </body>
    </html>
  )
}

