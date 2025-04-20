import { Button } from "@components/ui/button";

export default function Contact() {
  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-white">

      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="font-serif text-3xl font-bold tracking-tighter text-[#3a2a1d] sm:text-4xl md:text-5xl">
              Contact Us
            </h2>
            <div className="mx-auto h-1 w-24 bg-[#7b3f00]"></div>
            <p className="max-w-[600px] text-[#5c4033] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed pt-4">
              Interested in our research? Have questions about collaboration opportunities? We d love to hear from you</p>
          </div>
          <div className="w-full max-w-md space-y-4 pt-4">
            <form className="flex flex-col space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-[#3a2a1d]">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="w-full rounded-md border border-[#d3c5a9] bg-white px-3 py-2 text-sm text-[#3a2a1d] focus:border-[#7b3f00] focus:outline-none"
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-[#3a2a1d]">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full rounded-md border border-[#d3c5a9] bg-white px-3 py-2 text-sm text-[#3a2a1d] focus:border-[#7b3f00] focus:outline-none"
                    placeholder="Your email"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-[#3a2a1d]">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  className="w-full rounded-md border border-[#d3c5a9] bg-white px-3 py-2 text-sm text-[#3a2a1d] focus:border-[#7b3f00] focus:outline-none"
                  placeholder="Subject of your inquiry"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-[#3a2a1d]">
                  Message
                </label>
                <textarea
                  id="message"
                  className="h-32 w-full rounded-md border border-[#d3c5a9] bg-white px-3 py-2 text-sm text-[#3a2a1d] focus:border-[#7b3f00] focus:outline-none"
                  placeholder="Your message"
                ></textarea>
              </div>
              <Button type="submit" className="w-full bg-[#7b3f00] hover:bg-[#5c4033] text-white">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
