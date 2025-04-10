import { BookOpen } from "lucide-react";
import Link from "next/link";


export default function Footer() {
  return (
    <footer className="w-full border-t border-[#d3c5a9] bg-[#f8f5f0] py-6">
      <div className="container flex flex-col items-center justify-center gap-4 text-center md:flex-row md:justify-between md:text-left">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-[#7b3f00]" />
          <span className="font-serif text-lg font-semibold text-[#7b3f00]">Academia Research</span>
        </div>
        <p className="text-sm leading-loose text-[#5c4033]">
          © {new Date().getFullYear()} Academia Research Institute. All rights reserved.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="#"
            className="text-sm font-medium text-[#5c4033] hover:text-[#7b3f00] hover:underline underline-offset-4"
          >
            Privacy
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-[#5c4033] hover:text-[#7b3f00] hover:underline underline-offset-4"
          >
            Terms
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-[#5c4033] hover:text-[#7b3f00] hover:underline underline-offset-4"
          >
            Accessibility
          </Link>
        </div>
      </div>
    </footer>
  )
}
