import Image from "next/image"
import Navbar from "@components/Navbar"
import Hero from "@components/Hero"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f8f5f0]">
      <Navbar />
      <Hero />

      <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-white border-b border-[#d3c5a9]">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="font-serif text-3xl font-bold tracking-tighter text-[#3a2a1d] sm:text-4xl md:text-5xl">
                Research Focus
              </h2>
              <div className="mx-auto h-1 w-24 bg-[#7b3f00]"></div>
              <p className="max-w-[900px] text-[#5c4033] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed pt-4">
                Our research program spans multiple disciplines, with a particular emphasis on addressing complex
                societal challenges through interdisciplinary approaches.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            <div className="relative h-[300px] w-full overflow-hidden rounded-lg border-4 border-[#d3c5a9] shadow-lg sm:h-[400px]">
              <Image
                src="/placeholder.svg?height=400&width=600"
                fill
                alt="Research in Progress"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center space-y-6">
              <div className="space-y-2 border-l-4 border-[#7b3f00] pl-4">
                <h3 className="font-serif text-2xl font-bold text-[#3a2a1d]">Historical Analysis</h3>
                <p className="text-[#5c4033]">
                  Examining primary sources and archival materials to understand historical contexts and their
                  implications for contemporary issues.
                </p>
              </div>
              <div className="space-y-2 border-l-4 border-[#7b3f00] pl-4">
                <h3 className="font-serif text-2xl font-bold text-[#3a2a1d]">Quantitative Methods</h3>
                <p className="text-[#5c4033]">
                  Utilizing statistical analysis and data modeling to identify patterns and relationships within
                  complex datasets.
                </p>
              </div>
              <div className="space-y-2 border-l-4 border-[#7b3f00] pl-4">
                <h3 className="font-serif text-2xl font-bold text-[#3a2a1d]">Theoretical Frameworks</h3>
                <p className="text-[#5c4033]">
                  Developing and refining conceptual models that provide explanatory power across diverse phenomena.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="methodology" className="w-full py-12 md:py-24 lg:py-32 bg-[#f8f5f0] border-b border-[#d3c5a9]">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="font-serif text-3xl font-bold tracking-tighter text-[#3a2a1d] sm:text-4xl md:text-5xl">
                Research Methodology
              </h2>
              <div className="mx-auto h-1 w-24 bg-[#7b3f00]"></div>
              <p className="max-w-[900px] text-[#5c4033] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed pt-4">
                Our approach to research is characterized by methodological rigor, ethical considerations, and a
                commitment to transparency.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Literature Review",
                description:
                  "Comprehensive analysis of existing scholarship to identify gaps and opportunities for contribution.",
                icon: "📚",
              },
              {
                title: "Data Collection",
                description:
                  "Systematic gathering of primary and secondary sources through archival research, surveys, and interviews.",
                icon: "📊",
              },
              {
                title: "Critical Analysis",
                description:
                  "Rigorous examination of evidence using established theoretical frameworks and innovative approaches.",
                icon: "🔍",
              },
              {
                title: "Peer Review",
                description:
                  "Engagement with scholarly community to validate findings and refine arguments through constructive critique.",
                icon: "👥",
              },
              {
                title: "Publication",
                description:
                  "Dissemination of research findings through academic journals, books, and conference presentations.",
                icon: "📝",
              },
              {
                title: "Knowledge Transfer",
                description:
                  "Translation of research insights into practical applications for policy, education, and public engagement.",
                icon: "🔄",
              },
            ].map((method, index) => (
              <div
                key={index}
                className="flex flex-col space-y-3 rounded-lg border border-[#d3c5a9] bg-white p-6 shadow-sm"
              >
                <div className="text-4xl">{method.icon}</div>
                <h3 className="font-serif text-xl font-bold text-[#3a2a1d]">{method.title}</h3>
                <p className="text-[#5c4033]">{method.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-[#f0e6d6] border-b border-[#d3c5a9]">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#7b3f00]">25+</div>
              <div className="mt-2 font-serif text-xl text-[#3a2a1d]">Years of Research</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#7b3f00]">150+</div>
              <div className="mt-2 font-serif text-xl text-[#3a2a1d]">Publications</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#7b3f00]">45</div>
              <div className="mt-2 font-serif text-xl text-[#3a2a1d]">Research Fellows</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#7b3f00]">12</div>
              <div className="mt-2 font-serif text-xl text-[#3a2a1d]">Research Grants</div>
            </div>
          </div>
        </div>
      </section>


    </div>
  )
}

