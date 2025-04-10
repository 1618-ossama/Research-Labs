import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import Hero from "@components/Hero"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f8f5f0]">
      <Navbar />
      <Hero />
      <Footer />
    </div>
  )
}

