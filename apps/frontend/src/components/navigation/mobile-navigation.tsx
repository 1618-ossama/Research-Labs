"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { MobileUserMenu } from "./mobile-user-menu";
import type { UserData } from "@/hooks/use-auth";

interface MobileNavigationProps {
  isOpen: boolean;
  isLoggedIn: boolean;
  userData: UserData | null;
  toggleLoginStatus: () => void;
  onDropdownChange: (open: boolean) => void;
  onClose: () => void;
}

export function MobileNavigation({
  isOpen,
  isLoggedIn,
  userData,
  toggleLoginStatus,
  onDropdownChange,
  onClose,
}: MobileNavigationProps) {
  return (
    <nav className={cn("flex flex-col p-4 space-y-4 bg-white shadow-md")}>
      <Link href="/" onClick={onClose} className="text-lg font-semibold">
        Home
      </Link>
      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between">
            Services <ChevronDown />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <Link href="/article" onClick={onClose} className="block px-4 py-2">
            Read latest news and articles.
          </Link>
          <Link href="/problems" onClick={onClose} className="block px-4 py-2">
            Test your skills and knowledge
          </Link>
        </CollapsibleContent>
      </Collapsible>
      <Link href="/about" onClick={onClose}>
        About
      </Link>
      <Link href="/contact" onClick={onClose}>
        Contact
      </Link>

      <MobileUserMenu
        isLoggedIn={isLoggedIn}
        userData={userData}
        toggleLoginStatus={toggleLoginStatus}
        closeMenu={onClose}
      />
    </nav>
  );
}
