"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Globe, Menu, Search, User, X, BookOpen, Presentation, FileEdit, Users, Shield, MessageCircleMore } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useScrollVisibility } from "@/hooks/use-scroll-visibility";

// Research-inspired color palette
const colors = {
  primary: "#2C3E50", // Dark blue - academic/serious
  secondary: "#3498DB", // Bright blue - technology/innovation
  accent: "#E74C3C", // Red - attention/importance
  background: "#F8F9FA", // Light gray - clean/professional
  text: "#2C3E50", // Dark blue - readability
  highlight: "#F1C40F", // Gold - excellence/achievement
};

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

type navItemsType = {
  name: string;
  href: string;
  icon?: React.ReactNode;
};

const navItem = (links: navItemsType[]) =>
  links.map((link) => (
    <Link
      key={`${link.name}-${link.href}`}
      href={link.href}
      className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary px-3 py-2 rounded-lg hover:bg-accent/10"
    >
      {link.icon && <span className="text-accent">{link.icon}</span>}
      {link.name}
    </Link>
  ));

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { visible } = useScrollVisibility(100);
  const [role, setRole] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setRole(getCookie("userRole"));
    setUserId(getCookie("userId"));
  }, []);

  const baseNavItems: navItemsType[] = [
    { name: "Publications", href: "/publications", icon: <BookOpen size={16} /> },
    { name: "Conferences", href: "/conferences", icon: <Presentation size={16} /> },
    { name: "Chat", href: "/chat", icon: <MessageCircleMore size={16} /> },
  ];

  const researcherItems: navItemsType[] = [
    // { name: "My Profile", href: `/profile`, icon: <User size={16} /> },
    { name: "New Submission", href: "/submission", icon: <FileEdit size={16} /> },
  ];

  const leaderItems: navItemsType[] = [
    { name: "Team Overview", href: "/leader/team", icon: <Users size={16} /> },
  ];

  const adminItems: navItemsType[] = [
    { name: "Admin", href: "/admin", icon: <Shield size={16} /> },
    { name: "Dashboard", href: "/admin/dashboard", icon: <Shield size={16} /> },
  ];


  let navItems = [...baseNavItems];

  if (role === "RESEARCHER" || role === "ADMIN") {
    navItems = [...navItems, ...researcherItems];
  } else if (role === "leader") {
    navItems = [...navItems, ...leaderItems];
  }

  if (role === "ADMIN") {
    navItems = [...navItems, ...adminItems];
  }


  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-transform duration-300 ${visible ? "translate-y-0" : "-translate-y-full"}`}
      style={{
        backgroundColor: colors.background,
        borderColor: `${colors.primary}20`, // 20% opacity
      }}
    >
      <div className="flex h-16 items-center justify-between w-full px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/research-icon.png" // Consider using a research-themed icon
              alt="ResearchLabs"
              width={40}
              height={40}
              className="rounded-full"
              style={{ backgroundColor: colors.primary }}
            />
            <span
              className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(45deg, ${colors.primary}, ${colors.accent})`,
              }}
            >
              ResearchLabs
            </span>
          </Link>
          <nav className="hidden md:flex gap-2">
            {navItem(navItems)}
          </nav>
        </div>

        <div className="flex items-center gap-4">

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-primary/10"
                style={{ color: colors.primary }}
              >
                <Globe className="h-5 w-5" />
                <span className="sr-only">Language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              style={{
                backgroundColor: colors.background,
                borderColor: `${colors.primary}20`,
              }}
            >
              <DropdownMenuItem className="hover:bg-primary/10">
                English
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-primary/10">
                Français
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {!userId ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative hover:bg-primary/10"
                  style={{ color: colors.primary }}
                >
                  <User className="h-5 w-5" />
                  <span className="sr-only">Sign In</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                style={{
                  backgroundColor: colors.background,
                  borderColor: `${colors.primary}20`,
                }}
              >
                <DropdownMenuItem
                  asChild
                  className="hover:bg-primary/10"
                >
                  <Link href="/login" className="flex items-center gap-2">
                    <User size={16} /> Login
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  asChild
                  className="hover:bg-primary/10"
                >
                  <Link href="/register" className="flex items-center gap-2">
                    <FileEdit size={16} /> Register
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/profile">
              <Button
                variant="outline"
                className="hidden md:flex items-center gap-2"
                style={{
                  color: colors.primary,
                  borderColor: colors.primary,
                }}
              >
                <User size={16} />
                Profile
              </Button>
            </Link>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover:bg-primary/10"
            style={{ color: colors.primary }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          className="md:hidden border-t p-4 space-y-4"
          style={{
            backgroundColor: colors.background,
            borderColor: `${colors.primary}20`,
          }}
        >
          <form onSubmit={handleSearch} className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4"
                style={{ color: colors.primary }} />
              <Input
                type="search"
                placeholder="Search publications..."
                className="w-full pl-9 rounded-full"
                style={{
                  backgroundColor: `${colors.primary}10`,
                  borderColor: `${colors.primary}20`,
                }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
          <nav className="flex flex-col space-y-2">
            {navItems.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="flex items-center gap-3 text-sm font-medium px-3 py-2 rounded-lg hover:bg-primary/10"
                style={{ color: colors.text }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.icon && <span style={{ color: colors.accent }}>{link.icon}</span>}
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
