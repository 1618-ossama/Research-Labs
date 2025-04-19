import Image from "next/image";

type fillerType = {
  title: string;
  description: string;
  icon?: string;
}


const filler1: fillerType[] = [
  {
    title: "Bridge Between Labs and Researchers",
    description:
      "Our platform connects independent researchers and academic labs, enabling collaboration and knowledge sharing across institutions.",
  },
  {
    title: "Lab Profiles and Research Streams",
    description:
      "Each lab can showcase their ongoing projects, team members, and publications, making it easier to attract collaborators and visibility.",
  },
  {
    title: "Centralized Research Management",
    description:
      "Labs can oversee member activity, supervise document submissions, and manage research output from one unified dashboard.",
  },
];

const filler2: fillerType[] = [
  {
    title: "User Activity Logs",
    description:
      "Track user interactions, research history, and behavior patterns to personalize the experience and enhance insights.",
    icon: "🧾",
  },
  {
    title: "Interactive Discussion",
    description:
      "Real-time messaging and topic-based conversations to collaborate, share insights, and engage with the research community.",
    icon: "💬",
  },
  {
    title: "Tag & Topic Following",
    description:
      "Stay updated by following specific subjects, research areas, or keywords to receive curated content and alerts.",
    icon: "🏷️",
  },
  {
    title: "Research Publishing & Access",
    description:
      "Upload your own studies or browse and download peer-reviewed documents shared by the research network.",
    icon: "📄",
  },
  {
    title: "Mentorship & Supervision",
    description:
      "Connect with academic supervisors for guidance, feedback, and structured oversight throughout your research journey.",
    icon: "🎓",
  },
  {
    title: "Liked Subjects",
    description:
      "Keep track of your favorite topics and revisit relevant research with ease through your personalized dashboard.",
    icon: "❤️",
  },
];

const mapper = (filler: fillerType[], variant: "style1" | "style2") => {
  return filler.map((content, index) => {
    if (variant === "style1") {
      return (
        <div
          key={index}
          className="space-y-2 border-l-4 border-[#7b3f00] pl-4"
        >
          <h3 className="font-serif text-2xl font-bold text-[#3a2a1d]">
            {content.title}
          </h3>
          <p className="text-[#5c4033]">{content.description}</p>
        </div>
      );
    } else if (variant === "style2") {
      return (
        <div
          key={index}
          className="flex flex-col space-y-3 rounded-lg border border-[#d3c5a9] bg-white p-6 shadow-sm"
        >
          <div className="text-4xl">{content.icon}</div>
          <h3 className="font-serif text-xl font-bold text-[#3a2a1d]">
            {content.title}
          </h3>
          <p className="text-[#5c4033]">{content.description}</p>
        </div>
      );
    }
  });
};

export default function HomeAdd() {
  return (
    <>
      <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-white border-b border-[#d3c5a9]">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="font-serif text-3xl font-bold tracking-tighter text-[#3a2a1d] sm:text-4xl md:text-5xl">
                App Focus
              </h2>
              <div className="mx-auto h-1 w-24 bg-[#7b3f00]"></div>
              <p className="max-w-[900px] text-[#5c4033] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed pt-4">
                Transform how your lab shares knowledge with our app –
                a dynamic social platform designed exclusively for publishing, discussing,
                and advancing research. Connect with peers, share breakthroughs,
                and crowdsource insights across disciplines in real time.
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
              {mapper(filler1, "style1")}
            </div>
          </div>
        </div>
      </section>

      <section id="methodology" className="w-full py-12 md:py-24 lg:py-32 bg-[#f8f5f0] border-b border-[#d3c5a9]">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="font-serif text-3xl font-bold tracking-tighter text-[#3a2a1d] sm:text-4xl md:text-5xl">
                App Services
              </h2>
              <div className="mx-auto h-1 w-24 bg-[#7b3f00]"></div>
              <p className="max-w-[900px] text-[#5c4033] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed pt-4">
                Our approach to research is characterized by methodological rigor,
                ethical considerations, and a commitment to transparency.
              </p>
            </div>
          </div>

          <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            {mapper(filler2, "style2")}
          </div>
        </div>
      </section>

      {/*Update with each render*/}
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

    </>
  )
}
