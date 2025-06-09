import SidebarLayout from "@/components/sidebar"
import { SidebarProvider } from "@/components/sidebar-provider"
import "@styles/globals.css"


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SidebarProvider>
        <SidebarLayout>

          {children}

        </SidebarLayout>
      </SidebarProvider>
    </>
  )
}

