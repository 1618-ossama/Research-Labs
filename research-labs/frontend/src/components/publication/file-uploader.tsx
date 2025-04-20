"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FileIcon, X, UploadIcon } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface FileUploaderProps {
  onFilesSelected: (files: File[]) => void
  files: File[]
}

export function FileUploader({ onFilesSelected, files }: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({})

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files)
      handleNewFiles(newFiles)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)
      handleNewFiles(newFiles)
    }
  }

  const handleNewFiles = (newFiles: File[]) => {
    // Simulate upload progress
    const newProgress: Record<string, number> = {}
    newFiles.forEach((file) => {
      newProgress[file.name] = 0
      simulateUploadProgress(file.name)
    })

    setUploadProgress((prev) => ({ ...prev, ...newProgress }))
    onFilesSelected([...files, ...newFiles])
  }

  const simulateUploadProgress = (fileName: string) => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 10
      if (progress > 100) {
        progress = 100
        clearInterval(interval)
      }
      setUploadProgress((prev) => ({ ...prev, [fileName]: progress }))
    }, 200)
  }

  const handleRemoveFile = (index: number) => {
    const updatedFiles = [...files]
    const removedFile = updatedFiles[index]
    updatedFiles.splice(index, 1)
    onFilesSelected(updatedFiles)

    // Remove from progress tracking
    setUploadProgress((prev) => {
      const newProgress = { ...prev }
      delete newProgress[removedFile.name]
      return newProgress
    })
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase() || ""

    switch (extension) {
      case "pdf":
        return <FileIcon className="h-5 w-5 text-red-500" />
      case "doc":
      case "docx":
        return <FileIcon className="h-5 w-5 text-blue-500" />
      case "xls":
      case "xlsx":
      case "csv":
        return <FileIcon className="h-5 w-5 text-green-500" />
      case "zip":
      case "rar":
        return <FileIcon className="h-5 w-5 text-yellow-500" />
      default:
        return <FileIcon className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="space-y-4">
      <div
        className={`flex flex-col items-center justify-center rounded-md border border-dashed p-4 transition-colors ${
          isDragging ? "border-blue-500 bg-blue-50" : "border-muted-foreground/20"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <UploadIcon className="mb-2 h-8 w-8 text-muted-foreground" />
        <p className="mb-2 text-sm text-muted-foreground">Drag and drop files, or click to browse</p>
        <Button variant="secondary" size="sm" asChild>
          <label>
            Browse Files
            <input type="file" multiple className="sr-only" onChange={handleFileChange} />
          </label>
        </Button>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between rounded-md border p-3">
              <div className="flex items-center gap-3">
                {getFileIcon(file.name)}
                <div>
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-24">
                  <Progress value={uploadProgress[file.name] || 100} className="h-2" />
                </div>
                <Button variant="ghost" size="icon" onClick={() => handleRemoveFile(index)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
