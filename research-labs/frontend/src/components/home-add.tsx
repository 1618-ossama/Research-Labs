import Image from "next/image";
import { BookOpen, MessageSquare, Users, FileText, GraduationCap, Heart, Globe, BarChart2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type FeatureCardType = {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
};

const colors = {
  primary: "#2C3E50", // Dark blue - academic/serious
  secondary: "#3498DB", // Bright blue - technology/innovation
  accent: "#E74C3C", // Red - attention/importance
  lightBg: "#F8F9FA", // Light gray - clean/professional
  highlight: "#F1C40F", // Gold - excellence/achievement
};

const coreFeatures: FeatureCardType[] = [
  {
    title: "Bridge Between Labs and Researchers",
    description: "Connect independent researchers with academic labs for seamless collaboration across institutions.",
    icon: <Globe className="h-6 w-6" />,
    color: colors.secondary
  },
  {
    title: "Comprehensive Lab Profiles",
    description: "Showcase ongoing projects, team members, and publications to attract collaborators and visibility.",
    icon: <Users className="h-6 w-6" />,
    color: colors.primary
  },
  {
    title: "Centralized Research Management",
    description: "Oversee member activity, document submissions, and research output from a unified dashboard.",
    icon: <BarChart2 className="h-6 w-6" />,
    color: colors.accent
  },
];

const platformServices: FeatureCardType[] = [
  {
    title: "User Activity Analytics",
    description: "Track interactions and research history to personalize the experience and enhance insights.",
    icon: <BookOpen className="h-6 w-6" />,
    color: colors.primary
  },
  {
    title: "Interactive Discussions",
    description: "Real-time messaging and topic-based conversations with the research community.",
    icon: <MessageSquare className="h-6 w-6" />,
    color: colors.secondary
  },
  {
    title: "Tag & Topic Following",
    description: "Follow specific subjects to receive curated content and alerts in your personalized feed.",
    icon: <FileText className="h-6 w-6" />,
    color: colors.accent
  },
  {
    title: "Research Publishing",
    description: "Upload studies or browse peer-reviewed documents shared across the network.",
    icon: <FileText className="h-6 w-6" />,
    color: colors.primary
  },
  {
    title: "Mentorship Network",
    description: "Connect with academic supervisors for guidance throughout your research journey.",
    icon: <GraduationCap className="h-6 w-6" />,
    color: colors.secondary
  },
  {
    title: "Personalized Library",
    description: "Save and organize your favorite research papers and topics for easy access.",
    icon: <Heart className="h-6 w-6" />,
    color: colors.accent
  },
];

const stats = [
  { value: "01+", label: "Years of Research Experience" },
  { value: "10+", label: "Published Papers" },
  { value: "15", label: "Research Fellows" },
  { value: "12", label: "Active Grants" },
];

const FeatureCard = ({ title, description, icon, color }: FeatureCardType) => (
  <div className="flex flex-col space-y-4 rounded-xl bg-white p-6 shadow-md transition-all hover:shadow-lg">
    <div className="flex h-12 w-12 items-center justify-center rounded-full" style={{ backgroundColor: `${color}20` }}>
      <span style={{ color }}>{icon}</span>
    </div>
    <h3 className="text-xl font-bold" style={{ color: colors.primary }}>{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-32 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
            <div className="flex flex-col justify-center space-y-6">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                <span className="block" style={{ color: colors.primary }}>Advancing Research</span>
                <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Through Collaboration
                </span>
              </h1>
              <p className="text-lg text-gray-600 md:text-xl">
                A dynamic platform designed for publishing, discussing, and advancing research.
                Connect with peers, share breakthroughs, and crowdsource insights across disciplines.
              </p>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-xl shadow-2xl">
              <Image
                src="/images/collab.jpg"
                alt="Researchers collaborating"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="w-full py-20 bg-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center space-y-6 text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: colors.primary }}>
              Our Platform Focus
            </h2>
            <div className="w-24 h-1 rounded-full" style={{ backgroundColor: colors.accent }} />
            <p className="max-w-3xl text-gray-600 md:text-lg">
              Transforming how researchers connect, collaborate, and share knowledge across institutions
              and disciplines.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {coreFeatures.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Platform Services */}
      <section className="w-full py-20" style={{ backgroundColor: colors.lightBg }}>
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center space-y-6 text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: colors.primary }}>
              Platform Services
            </h2>
            <div className="w-24 h-1 rounded-full" style={{ backgroundColor: colors.accent }} />
            <p className="max-w-3xl text-gray-600 md:text-lg">
              Comprehensive tools designed to support every stage of the research lifecycle.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {platformServices.map((service, index) => (
              <FeatureCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-20 bg-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center text-center p-6 rounded-xl" style={{ backgroundColor: colors.lightBg }}>
                <div className="text-4xl font-bold mb-2" style={{ color: colors.accent }}>{stat.value}</div>
                <div className="text-lg font-medium" style={{ color: colors.primary }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20" style={{ backgroundColor: colors.primary }}>
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center text-center space-y-6">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Transform Your Research Workflow?
            </h2>
            <p className="max-w-2xl text-gray-200 md:text-lg">
              Join hundreds of researchers and labs already collaborating on our platform.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                asChild
                className="px-8 py-6 text-lg rounded-full bg-white"
                style={{ color: colors.primary }}
              >
                <Link href="/register">Get Started</Link>
              </Button>            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
