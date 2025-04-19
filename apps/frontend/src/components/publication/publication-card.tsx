import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, BookOpenIcon, QuoteIcon, ThumbsUpIcon } from "lucide-react"

interface Author {
  name: string
  institution: string
  avatar: string
}

interface Metrics {
  citations: number
  reads: number
  recommendations: number
}

interface PublicationCardProps {
  id: string
  title: string
  excerpt: string
  date: string
  author: Author
  metrics: Metrics
  tags: string[]
}

export function PublicationCard({ id, title, excerpt, date, author, metrics, tags }: PublicationCardProps) {
  return (
    <Link href={`/publications/${id}`}>
      <Card className="h-full overflow-hidden transition-all hover:shadow-md">
        <CardContent className="p-6">
          <div className="mb-4 flex items-center gap-3">
            <Image
              src={author.avatar || "/placeholder.svg"}
              alt={author.name}
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <p className="font-medium">{author.name}</p>
              <p className="text-sm text-muted-foreground">{author.institution}</p>
            </div>
          </div>

          <h3 className="mb-2 text-xl font-bold leading-tight text-blue-700 hover:underline">{title}</h3>
          <p className="mb-4 text-muted-foreground">{excerpt}</p>

          <div className="mb-3 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="bg-blue-50">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <CalendarIcon className="h-4 w-4" />
            <span className="mr-3">{date}</span>
          </div>
        </CardContent>

        <CardFooter className="border-t bg-gray-50 px-6 py-3">
          <div className="flex w-full justify-between text-sm">
            <div className="flex items-center gap-1">
              <QuoteIcon className="h-4 w-4 text-blue-600" />
              <span>{metrics.citations} citations</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpenIcon className="h-4 w-4 text-blue-600" />
              <span>{metrics.reads} reads</span>
            </div>
            <div className="flex items-center gap-1">
              <ThumbsUpIcon className="h-4 w-4 text-blue-600" />
              <span>{metrics.recommendations} recommendations</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
