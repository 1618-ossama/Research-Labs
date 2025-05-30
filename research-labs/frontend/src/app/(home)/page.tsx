import Footer from "@/components/footer";
import Hero from "@/components/hero";
import HomeAdd from "@/components/home-add";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f8f5f0]">
      {/* <Navbar /> */}
      <Hero />
      <HomeAdd />
      <Footer />
    </div >
  )
}

