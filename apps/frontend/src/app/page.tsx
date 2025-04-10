import HomeAdd from "@/components/home-add"
import Hero from "@components/Hero"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f8f5f0]">
      <Hero />
      <HomeAdd />
    </div>
  )
}

