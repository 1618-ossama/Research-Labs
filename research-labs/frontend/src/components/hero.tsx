import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";


export default function Hero() {
  return (
    <section className="w-full py-10 md:py-12 lg:py-12 xl:py-18 border-b border-[#d3c5a9]">
      <div className="container m-auto px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="font-serif text-3xl font-bold tracking-tighter text-[#3a2a1d] sm:text-4xl md:text-5xl lg:text-6xl">
                Keeping track of your Researchs and meet like minded people
              </h1>
              <p className="max-w-[600px] text-[#5c4033] md:text-xl leading-relaxed">
                Our institute is dedicated to the pursuit of academic excellence and the advancement of knowledge
                and ideas sharing and collaboration across multiple disciplines.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild className="bg-[#7b3f00] hover:bg-[#5c4033] text-white">
                <Link href="/publications">
                  About our work
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button asChild variant="outline" className="border-[#7b3f00] text-[#7b3f00] hover:bg-[#f0e6d6]">
                <Link href="/register">
                  Become One Of Us
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[300px] w-full max-w-[600px] overflow-hidden rounded-lg border-4 border-[#d3c5a9] shadow-lg sm:h-[400px]">
              <Image
                src="/images/photo.jpg"
                fill
                alt="Research Labs"
                className="object-cover"
                priority
              />
            </div>

          </div>
        </div>
      </div>
    </section>

  )
}
