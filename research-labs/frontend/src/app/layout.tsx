import "@styles/globals.css"
import type { Metadata } from "next"
import { Toaster } from "@/components/ui/toaster"
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "PFE",
  description: "Labs research management",
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (

    <html lang="en">
      <body>
        <Toaster />
        {/* <Navbar /> */}
        {children}
      </body>
    </html>
  )
}

