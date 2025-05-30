"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
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
  CalendarDays,
  Home,
  Menu,
  Users,
  X
} from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import Link from "next/link"

const navigationItems = [
  { name: "Home", href: "/", icon: Home},
  { name: "Publications", href: "/publications", icon: Home},
  { name: "Profile", href: "/profile", icon: Home },
  { name: "Settings", href: "/Settings", icon: CalendarDays },
]

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isExpanded, setIsExpanded] = useState(false)
  const isMobile = useIsMobile()

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background z-55">
        {isMobile && isExpanded && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-60 lg:hidden transition-opacity duration-300"
            onClick={toggleSidebar}
          />
        )}

        <aside className={cn(
          "fixed h-full z-60 bg-background border-r transition-all duration-300 ease-in-out",
          isExpanded ? "w-64 shadow-lg" : "w-12",
          isMobile && !isExpanded ? "-translate-x-full" : "translate-x-0"
        )}>
          <div className="h-full flex flex-col">
            <SidebarHeader className="border-b h-16 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Home className="h-6 w-6 text-primary" />
                  {isExpanded && (
                    <span className="text-xl font-bold whitespace-nowrap">ResearchLab</span>
                  )}
                </div>
                {isExpanded && isMobile && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={toggleSidebar}
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
                      tooltip={!isExpanded ? item.name : undefined}
                    >
                      <Link
                        href={item.href}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-accent transition-colors"
                      >
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        {isExpanded && (
                          <span className="text-sm whitespace-nowrap">{item.name}</span>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>

            <SidebarFooter className="border-t p-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-7 w-7">
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback>Icon</AvatarFallback>
                </Avatar>
                {isExpanded && (
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-sm font-medium truncate">UserName</span>
                    <span className="text-xs text-muted-foreground truncate">Role</span>
                  </div>
                )}
              </div>
            </SidebarFooter>
          </div>
        </aside>
        <Button
          variant="outline"
          size="icon"
          className=" fixed ml-1 mt-3 z-60"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>

        <div className={cn(
          "flex-1 flex flex-col min-h-screen transition-all duration-300",
          isExpanded ? "lg:ml-64" : "lg:ml-12",
          isMobile ? "" : "ml-12")}>
          <main className="flex-1 overflow-auto ">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
