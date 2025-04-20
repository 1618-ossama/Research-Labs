import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { CommentSection } from "@/components/comment-section"
import { FileAttachment } from "@/components/file-attachment"
import { PublicationMetrics } from "@/components/publication-metrics"
import { UserNav } from "@/components/user-nav"
import { SearchBar } from "@/components/search-bar"
import { BookmarkIcon, Share2Icon } from "lucide-react"

interface PublicationPageProps {
  params: {
    id: string
  }
}

export default function PublicationPage({ params }: PublicationPageProps) {
  const { id } = params

  // In a real app, you would fetch the publication data based on the ID
  const publication = {
    id,
    title: "Advances in Machine Learning for Natural Language Processing",
    abstract:
      "This paper explores recent developments in applying machine learning techniques to natural language processing tasks, with a focus on transformer architectures and their applications in various domains.",
    content: `
      <h2>Introduction</h2>
      <p>Natural Language Processing (NLP) has seen remarkable progress in recent years, largely due to advances in machine learning techniques, particularly deep learning. This paper provides a comprehensive review of the latest developments in the field, focusing on transformer-based architectures that have revolutionized how machines understand and generate human language.</p>
      
      <h2>Background</h2>
      <p>Traditional NLP approaches relied heavily on statistical methods and hand-crafted features. The advent of deep learning, particularly recurrent neural networks (RNNs) and later transformer models, has shifted the paradigm toward end-to-end learning systems that can automatically extract relevant features from raw text data.</p>
      
      <h2>Methodology</h2>
      <p>We conducted a systematic review of peer-reviewed articles published between 2018 and 2023, focusing on transformer-based models and their applications in NLP tasks such as machine translation, text summarization, question answering, and sentiment analysis.</p>
      
      <h2>Results</h2>
      <p>Our analysis reveals that transformer-based models consistently outperform previous approaches across a wide range of NLP tasks. We identify several key factors contributing to their success, including their ability to capture long-range dependencies in text, efficient parallel processing, and effective pre-training on large corpora.</p>
      
      <h2>Discussion</h2>
      <p>Despite their impressive performance, transformer models face several challenges, including computational requirements, interpretability issues, and biases inherited from training data. We discuss ongoing research addressing these limitations and potential future directions.</p>
      
      <h2>Conclusion</h2>
      <p>Transformer-based models have fundamentally changed the landscape of NLP research and applications. As these models continue to evolve, we anticipate further breakthroughs in how machines understand and generate human language, with significant implications for various domains including healthcare, education, and business.</p>
    `,
    date: "May 15, 2023",
    author: {
      name: "Dr. Sarah Johnson",
      institution: "Stanford University",
      department: "Computer Science Department",
      avatar: "/placeholder.svg?height=80&width=80",
      bio: "Professor of Computer Science specializing in machine learning and natural language processing.",
    },
    coAuthors: [
      {
        name: "Dr. Michael Chen",
        institution: "University of California, Berkeley",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        name: "Dr. Emily Rodriguez",
        institution: "MIT",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ],
    metrics: {
      citations: 42,
      reads: 1250,
      recommendations: 18,
    },
    tags: ["Machine Learning", "Natural Language Processing", "Transformers", "Deep Learning", "AI"],
    imageUrl: "/placeholder.svg?height=400&width=800",
    files: [
      { name: "Full Paper (PDF)", size: "2.4 MB", type: "pdf", url: "#" },
      { name: "Supplementary Materials", size: "1.8 MB", type: "zip", url: "#" },
      { name: "Dataset", size: "5.2 MB", type: "csv", url: "#" },
    ],
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 border-b bg-white">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-blue-600">ResearchConnect</span>
            </Link>
          </div>
          <div className="hidden flex-1 px-4 md:flex md:max-w-md lg:max-w-lg">
            <SearchBar />
          </div>
          <div className="flex items-center gap-4">
            <Link href="/publications/create">
              <Button>Create Publication</Button>
            </Link>
            <UserNav />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          <div>
            <div className="mb-6 flex items-center justify-between">
              <Link href="/">
                <Button variant="outline" size="sm">
                  Back to Publications
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <BookmarkIcon className="mr-2 h-4 w-4" />
                  Save
                </Button>
                <Button variant="outline" size="sm">
                  <Share2Icon className="mr-2 h-4 w-4" />
                  Share
                </Button>
                <Link href={`/publications/${id}/edit`}>
                  <Button size="sm">Edit Publication</Button>
                </Link>
              </div>
            </div>

            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <h1 className="mb-4 text-3xl font-bold text-blue-800">{publication.title}</h1>

              <div className="mb-6 flex flex-wrap gap-2">
                {publication.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="bg-blue-50">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="mb-6 text-lg font-medium text-gray-700">{publication.abstract}</div>

              {publication.imageUrl && (
                <div className="mb-6 overflow-hidden rounded-lg">
                  <Image
                    src={publication.imageUrl || "/placeholder.svg"}
                    alt="Publication figure"
                    width={800}
                    height={400}
                    className="w-full object-cover"
                  />
                </div>
              )}

              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: publication.content }} />

              <Separator className="my-8" />

              <div className="mb-8">
                <h2 className="mb-4 text-xl font-semibold">Attachments</h2>
                <div className="space-y-3">
                  {publication.files.map((file, index) => (
                    <FileAttachment key={index} name={file.name} size={file.size} type={file.type} url={file.url} />
                  ))}
                </div>
              </div>

              <PublicationMetrics metrics={publication.metrics} />

              <Separator className="my-8" />

              <CommentSection publicationId={id} />
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold">Authors</h2>

              <div className="mb-6">
                <div className="mb-4 flex items-start gap-4">
                  <Image
                    src={publication.author.avatar || "/placeholder.svg"}
                    alt={publication.author.name}
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="font-medium text-blue-700 hover:underline">
                      <Link href="#">{publication.author.name}</Link>
                    </h3>
                    <p className="text-sm text-muted-foreground">{publication.author.department}</p>
                    <p className="text-sm text-muted-foreground">{publication.author.institution}</p>
                  </div>
                </div>
                <p className="text-sm">{publication.author.bio}</p>
              </div>

              {publication.coAuthors.length > 0 && (
                <div>
                  <h3 className="mb-3 text-sm font-medium">Co-Authors</h3>
                  <div className="space-y-3">
                    {publication.coAuthors.map((coAuthor, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Image
                          src={coAuthor.avatar || "/placeholder.svg"}
                          alt={coAuthor.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div>
                          <h4 className="font-medium text-blue-700 hover:underline">
                            <Link href="#">{coAuthor.name}</Link>
                          </h4>
                          <p className="text-xs text-muted-foreground">{coAuthor.institution}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold">Similar Publications</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-blue-700 hover:underline">
                    <Link href="#">Transformer Models for Text Classification: A Comparative Study</Link>
                  </h3>
                  <p className="text-sm text-muted-foreground">Dr. James Wilson, Harvard University</p>
                </div>
                <div>
                  <h3 className="font-medium text-blue-700 hover:underline">
                    <Link href="#">Efficient Fine-tuning of Language Models for Domain-Specific Tasks</Link>
                  </h3>
                  <p className="text-sm text-muted-foreground">Dr. Lisa Brown, Google Research</p>
                </div>
                <div>
                  <h3 className="font-medium text-blue-700 hover:underline">
                    <Link href="#">Multilingual NLP: Challenges and Recent Advances</Link>
                  </h3>
                  <p className="text-sm text-muted-foreground">Dr. Carlos Mendez, University of Toronto</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
