import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";


export default function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 border-b border-[#d3c5a9]">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="font-serif text-3xl font-bold tracking-tighter text-[#3a2a1d] sm:text-4xl md:text-5xl lg:text-6xl">
                Advancing Knowledge Through Rigorous Research
              </h1>
              <p className="max-w-[600px] text-[#5c4033] md:text-xl leading-relaxed">
                Our institute is dedicated to the pursuit of academic excellence and the advancement of knowledge
                across multiple disciplines.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button className="bg-[#7b3f00] hover:bg-[#5c4033] text-white">
                Explore Our Work
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="border-[#7b3f00] text-[#7b3f00] hover:bg-[#f0e6d6]">
                View Publications
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[300px] w-full max-w-[400px] overflow-hidden rounded-lg border-4 border-[#d3c5a9] shadow-lg sm:h-[400px]">
              <Image
                src="/placeholder.svg?height=400&width=400"
                fill
                alt="Academic Research"
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
