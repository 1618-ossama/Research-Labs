"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Globe, Menu, Search, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useScrollVisibility } from "@/hooks/use-scroll-visibility";

type navItemsType = {
  name: string;
  href: string;
};

const navItem = (links: navItemsType[]) =>
  links.map((link) => (
    <Link
      key={link.name}
      href={link.href}
      className="text-sm font-medium transition-colors hover:text-primary"
    >
      {link.name}
    </Link>
  ));

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { visible } = useScrollVisibility(100);

  const navItems: navItemsType[] = [
    { name: "Home", href: "/" },
    { name: "publications", href: "/publications" },
  ];

  return (
    <header
      className={`sticky shadow-md top-0 z-50 w-full border-b bg-inherit transition-transform duration-300 ${visible ? "translate-y-0" : "-translate-y-full"
        }`}
    >
      <div className=" flex h-16 items-center justify-between w-full px-4 md:px-6">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/placeholder.svg"
              alt="ResearchLabs"
              width={40}
              height={40}
              className="rounded-full bg-primary"
            />
            <span className="text-xl font-bold">ResearchLabs</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            {navItem(navItems)}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-[200px] pl-8 md:w-[250px] rounded-full bg-muted"
              />
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Globe className="h-5 w-5" />
                <span className="sr-only">Language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>English</DropdownMenuItem>
              <DropdownMenuItem>French</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <User className="h-5 w-5" />
                <span className="sr-only">Sign In</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/login">Login</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/register">Register</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>

          </DropdownMenu>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen
              ? <X className="h-5 w-5" />
              : <Menu className="h-5 w-5" />}
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t p-4 space-y-4 bg-background">
          <div className="relative mb-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full pl-8 rounded-full bg-muted"
            />
          </div>
          <nav className="flex flex-col space-y-4">
            {navItems.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
