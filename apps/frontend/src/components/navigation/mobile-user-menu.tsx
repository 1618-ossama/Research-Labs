"use client";

import { User, CreditCard, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import type { UserData } from "@/hooks/use-auth";
import Image from "next/image";

interface MobileUserMenuProps {
  isLoggedIn: boolean;
  userData: UserData | null;
  toggleLoginStatus: () => void;
  closeMenu: () => void;
}

export function MobileUserMenu({
  isLoggedIn,
  userData,
  toggleLoginStatus,
  closeMenu,
}: MobileUserMenuProps) {
  if (isLoggedIn && userData) {
    return (
      <div className="mt-4 border-t pt-4">
        <div className="flex items-center space-x-3">
          {userData.avatar ? (
            <Image
              src={userData.avatar}
              alt={`${userData.name}'s avatar`}
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <User className="w-10 h-10" />
          )}
          <div>
            <p className="font-semibold">{userData.name}</p>
            <p className="text-sm text-muted-foreground">{userData.email}</p>
          </div>
        </div>
        <nav className="mt-3 space-y-2">
          <Link href="/profile" onClick={closeMenu} className="block">
            Profile
          </Link>
          <Link href="/billing" onClick={closeMenu} className="block">
            Billing
          </Link>
          <Link href="/settings" onClick={closeMenu} className="block">
            Settings
          </Link>
          <button
            onClick={() => {
              toggleLoginStatus();
              closeMenu();
            }}
            className="w-full text-left text-red-600"
          >
            Log out
          </button>
        </nav>
      </div>
    );
  }

  return (
    <div className="mt-4 border-t pt-4 space-y-2">
      <Link href="/get-started" onClick={closeMenu} className="block">
        Get Started
      </Link>
      <Link href="/sign-in" onClick={closeMenu} className="block">
        Sign In
      </Link>
      <Link href="/create-account" onClick={closeMenu} className="block">
        Create Account
      </Link>
      <Link href="/demo" onClick={closeMenu} className="block">
        Demo
      </Link>
    </div>
  );
}

