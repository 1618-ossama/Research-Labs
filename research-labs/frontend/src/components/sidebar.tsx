"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BookOpen,
  FileEdit,
  Shield,
  MessageCircleMore,
  Home,
  Menu,
  X,
  User,
  LogOut
} from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import Link from "next/link"
import { useSidebar } from "./sidebar-provider"

export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`))
  return match ? decodeURIComponent(match[2]) : null
}

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { isOpen, toggle } = useSidebar()
  const isMobile = useIsMobile()
  const [role, setRole] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const userRole = getCookie("userRole")
    const userId = getCookie("userId")
    setRole(userRole)
    setUserId(userId)
  }, [])

  const handleLogout = async () => {
    try {
      const response = await fetch('http://127.0.0.1:3005/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      })

      if (response.ok) {
        document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
        document.cookie = 'userRole=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
        document.cookie = 'userId=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'

        router.push('/')
        router.refresh()
      } else {
        console.error('Logout failed')
      }
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }

  const baseNavItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Publications", href: "/publications", icon: BookOpen },
    { name: "Conferences", href: "/conferences", icon: BookOpen },
  ]

  const researcherItems = [
    { name: "New Submission", href: "/submission", icon: FileEdit },
    { name: "Chat", href: "/chat", icon: MessageCircleMore },
  ]

  const adminItems = [
    { name: "Admin", href: "/admin", icon: Shield },
  ]

  let navigationItems = [...baseNavItems]

  if (role !== "GUEST") {
    navigationItems = [...navigationItems, ...researcherItems]
  }

  if (role === "ADMIN") {
    navigationItems = [...navigationItems, ...adminItems]
  }

  if (userId) {
    navigationItems.push({ name: "Profile", href: "/profile", icon: User })
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background">
        {isMobile && isOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
            onClick={toggle}
          />
        )}

        <aside className={cn(
          "fixed h-full z-50 bg-background border-r transition-all duration-300 ease-in-out",
          isOpen ? "w-64 shadow-lg" : "w-12",
          isMobile && !isOpen ? "-translate-x-full" : "translate-x-0"
        )}>
          <div className="h-full flex flex-col">
            <SidebarHeader className="border-b h-16 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Home className="h-6 w-6 text-primary" />
                  {isOpen && (
                    <span className="text-xl font-bold whitespace-nowrap">ResearchLab</span>
                  )}
                </div>
                {isOpen && isMobile && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={toggle}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </SidebarHeader>

            <SidebarContent className="flex-1 pt-5 overflow-y-auto">
              <SidebarMenu>
                {navigationItems.map((item) => (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                      tooltip={!isOpen ? item.name : undefined}
                    >
                      <Link
                        href={item.href}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-accent transition-colors"
                        onClick={() => isMobile && toggle()}
                      >
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        {isOpen && (
                          <span className="text-sm whitespace-nowrap">{item.name}</span>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>

            <SidebarFooter className="border-t p-3">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src="/placeholder.svg" alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  {isOpen && (
                    <div className="flex flex-col overflow-hidden">
                      <span className="text-sm font-medium truncate">
                        {userId ? "User Profile" : "Guest"}
                      </span>
                      <span className="text-xs text-muted-foreground truncate">
                        {role || "No role"}
                      </span>
                    </div>
                  )}
                </div>

                {userId && isOpen && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start gap-2"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </Button>
                )}
              </div>
            </SidebarFooter>
          </div>
        </aside>
        <Button
          variant="outline"
          size="icon"
          className="fixed ml-1 mt-3 z-60"
          onClick={toggle}
        >
          <Menu className="h-5 w-5" />
        </Button>

        <div className={cn(
          "flex-1 flex flex-col min-h-screen transition-all duration-300",
          isOpen ? "lg:ml-64" : "lg:ml-12",
          isMobile ? "" : "ml-12")}>
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
