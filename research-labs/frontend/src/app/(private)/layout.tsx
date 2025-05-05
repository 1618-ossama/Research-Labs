import "@styles/globals.css"
import type { Metadata } from "next"
import SidebarLayout from "@/components/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
        <SidebarLayout>
          {children}
        </SidebarLayout>
    </>
  )
}

