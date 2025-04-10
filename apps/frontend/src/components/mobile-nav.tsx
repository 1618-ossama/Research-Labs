"use client"

import { useState } from "react"
import Link from "next/link"
import { BookOpen, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)} className="text-[#7b3f00]">
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle menu</span>
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-[#f8f5f0]">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-8 w-8 text-[#7b3f00]" />
              <span className="font-serif text-xl font-semibold text-[#7b3f00]">Academia</span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-[#7b3f00]">
              <X className="h-5 w-5" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>
          <nav className="container grid gap-6 py-8">
            <Link
              href="#about"
              className="font-serif text-lg font-medium text-[#5c4033] hover:text-[#7b3f00] hover:underline"
              onClick={() => setIsOpen(false)}
            >
              Research
            </Link>
            <Link
              href="#methodology"
              className="font-serif text-lg font-medium text-[#5c4033] hover:text-[#7b3f00] hover:underline"
              onClick={() => setIsOpen(false)}
            >
              Methodology
            </Link>
            <Link
              href="#publications"
              className="font-serif text-lg font-medium text-[#5c4033] hover:text-[#7b3f00] hover:underline"
              onClick={() => setIsOpen(false)}
            >
              Publications
            </Link>
            <Link
              href="#contact"
              className="font-serif text-lg font-medium text-[#5c4033] hover:text-[#7b3f00] hover:underline"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Button className="w-full bg-[#7b3f00] hover:bg-[#5c4033] text-white" onClick={() => setIsOpen(false)}>
              Access Research
            </Button>
          </nav>
        </div>
      )}
    </>
  )
}

