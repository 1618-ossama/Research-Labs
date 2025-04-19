import { BookOpenIcon, QuoteIcon, ThumbsUpIcon, EyeIcon, MessageSquareIcon } from "lucide-react"

interface Metrics {
  citations: number
  reads: number
  recommendations: number
}

interface PublicationMetricsProps {
  metrics: Metrics
}

export function PublicationMetrics({ metrics }: PublicationMetricsProps) {
  return (
    <div className="rounded-md border bg-gray-50 p-4">
      <h2 className="mb-3 text-lg font-semibold">Publication Metrics</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        <div className="flex flex-col items-center rounded-md bg-white p-3 shadow-sm">
          <QuoteIcon className="mb-2 h-5 w-5 text-blue-600" />
          <span className="text-xl font-bold">{metrics.citations}</span>
          <span className="text-sm text-muted-foreground">Citations</span>
        </div>
        <div className="flex flex-col items-center rounded-md bg-white p-3 shadow-sm">
          <BookOpenIcon className="mb-2 h-5 w-5 text-blue-600" />
          <span className="text-xl font-bold">{metrics.reads}</span>
          <span className="text-sm text-muted-foreground">Reads</span>
        </div>
        <div className="flex flex-col items-center rounded-md bg-white p-3 shadow-sm">
          <ThumbsUpIcon className="mb-2 h-5 w-5 text-blue-600" />
          <span className="text-xl font-bold">{metrics.recommendations}</span>
          <span className="text-sm text-muted-foreground">Recommendations</span>
        </div>
        <div className="flex flex-col items-center rounded-md bg-white p-3 shadow-sm">
          <EyeIcon className="mb-2 h-5 w-5 text-blue-600" />
          <span className="text-xl font-bold">3,542</span>
          <span className="text-sm text-muted-foreground">Views</span>
        </div>
        <div className="flex flex-col items-center rounded-md bg-white p-3 shadow-sm">
          <MessageSquareIcon className="mb-2 h-5 w-5 text-blue-600" />
          <span className="text-xl font-bold">12</span>
          <span className="text-sm text-muted-foreground">Comments</span>
        </div>
      </div>
    </div>
  )
}
