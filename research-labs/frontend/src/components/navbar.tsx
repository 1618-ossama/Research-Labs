"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type HeaderProps = {
  userid: string;
};

export default function Header({ userid }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    setUserId(userid);
  }, [userid]);

  const baseNavItems = [
    { name: "Publications", href: "/publications" },
    { name: "Conferences", href: "/conferences" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between w-full px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/research-icon.png"
              alt="ResearchLabs"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-xl font-bold">ResearchLabs</span>
          </Link>
          <nav className="hidden md:flex gap-2">
            {baseNavItems.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg hover:bg-accent"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {!userId ? (
            <Link href="/login">
              <Button variant="outline" className="flex items-center gap-2">
                <User size={16} />
                Login
              </Button>
            </Link>
          ) : (
            <Link href="/profile">
              <Button variant="outline" className="flex items-center gap-2">
                <User size={16} />
                Profile
              </Button>
            </Link>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t p-4 space-y-4">
          <nav className="flex flex-col space-y-2">
            {baseNavItems.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="flex items-center gap-3 text-sm font-medium px-3 py-2 rounded-lg hover:bg-accent"
                onClick={() => setMobileMenuOpen(false)}
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
