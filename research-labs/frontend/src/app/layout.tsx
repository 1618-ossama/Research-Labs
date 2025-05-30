import "@styles/globals.css"
import type { Metadata } from "next"
import Navbar from "@/components/navbar";
import BackButton from "@/components/back-btn";

export const metadata: Metadata = {
  title: "PFE",
  description: "Labs research management",
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (

    <html lang="en">
      <body>

        <Navbar />

      <div className="p-4 border-b bg-muted">
        {/* <BackButton /> */}
      </div>

      {/* <main className="p-4">{children}</main> */}

          {children}
      </body>
    </html>
  )
}

