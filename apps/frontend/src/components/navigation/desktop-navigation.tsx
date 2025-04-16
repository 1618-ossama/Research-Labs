"use client"

import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

const NavigationMenuContentObject = [
  { name: "Article", href: "/article", text: "Read latest news and articles." },
  { name: "Problems", href: "/problems", text: "Test your skills and knowledge" },
]

export function DesktopNavigation() {
  return (
    <nav className="hidden md:block">
      <ul className="flex space-x-8 items-center">
        <li>
          <Link href="/" className="text-foreground hover:text-primary font-medium">
            Home
          </Link>
        </li>
        <li>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-foreground hover:text-primary font-medium">
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 w-[400px]">
                    {NavigationMenuContentObject.map((link) => (
                      <NavigationMenuLink key={link.name} asChild>
                        <Link
                          href={link.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">{link.name}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{link.text}</p>
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </li>
        <li>
          <Link href="/about" className="text-foreground hover:text-primary font-medium">
            About
          </Link>
        </li>
        <li>
          <Link href="/contact" className="text-foreground hover:text-primary font-medium">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  )
}



