import { BookOpen } from "lucide-react"
import { MobileNav } from "./mobile-nav"
import Link from "next/link"
import { Button } from "@components/ui/button"


export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#d3c5a9] bg-[#f8f5f0]/95 backdrop-blur supports-[backdrop-filter]:bg-[#f8f5f0]/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="h-8 w-8 text-[#7b3f00]" />
          <span className="font-serif text-xl font-semibold text-[#7b3f00]">Academia</span>
        </div>

        <div className="md:hidden">
          <MobileNav />
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="#about"
            className="text-sm font-medium text-[#5c4033] hover:text-[#7b3f00] hover:underline underline-offset-4"
          >
            Research
          </Link>
          <Link
            href="#methodology"
            className="text-sm font-medium text-[#5c4033] hover:text-[#7b3f00] hover:underline underline-offset-4"
          >
            Methodology
          </Link>
          <Link
            href="#publications"
            className="text-sm font-medium text-[#5c4033] hover:text-[#7b3f00] hover:underline underline-offset-4"
          >
            Publications
          </Link>
          <Link
            href="#contact"
            className="text-sm font-medium text-[#5c4033] hover:text-[#7b3f00] hover:underline underline-offset-4"
          >
            Contact
          </Link>
          <Button className="bg-[#7b3f00] hover:bg-[#5c4033] text-white">Access Research</Button>
        </nav>
      </div>
    </header >
  )
}
