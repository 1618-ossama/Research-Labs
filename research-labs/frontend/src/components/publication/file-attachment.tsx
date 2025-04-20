import { FileIcon, FileTextIcon, FileSpreadsheetIcon, ArchiveIcon, DownloadIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FileAttachmentProps {
  name: string
  size: string
  type: string
  url: string
}

export function FileAttachment({ name, size, type, url }: FileAttachmentProps) {
  const getFileIcon = () => {
    switch (type) {
      case "pdf":
        return <FileTextIcon className="h-5 w-5 text-red-500" />
      case "csv":
      case "xlsx":
        return <FileSpreadsheetIcon className="h-5 w-5 text-green-500" />
      case "zip":
      case "rar":
        return <ArchiveIcon className="h-5 w-5 text-yellow-500" />
      default:
        return <FileIcon className="h-5 w-5 text-blue-500" />
    }
  }

  return (
    <div className="flex items-center justify-between rounded-md border bg-gray-50 p-3 transition-colors hover:bg-gray-100">
      <div className="flex items-center gap-3">
        {getFileIcon()}
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm text-muted-foreground">{size}</p>
        </div>
      </div>
      <Button variant="ghost" size="sm" className="text-blue-600" asChild>
        <a href={url} download>
          <DownloadIcon className="mr-2 h-4 w-4" />
          Download
        </a>
      </Button>
    </div>
  )
}
