import "@styles/globals.css"
import type React from "react"
import type { Metadata } from "next"
import Navbar from "@components/Navbar"
import Footer from "@components/Footer"

export const metadata: Metadata = {
  title: "PFE",
  description: "Labs reshearch management",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" >
      <body >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
