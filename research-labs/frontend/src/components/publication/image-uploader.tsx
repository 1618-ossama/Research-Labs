"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ImageIcon, X } from "lucide-react"

interface ImageUploaderProps {
  onImageSelected: (file: File | null) => void
  previewUrl?: string
}

export function ImageUploader({ onImageSelected, previewUrl }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)

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

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.type.startsWith("image/")) {
        onImageSelected(file)
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageSelected(e.target.files[0])
    }
  }

  const handleRemove = () => {
    onImageSelected(null)
  }

  return (
    <div>
      {previewUrl ? (
        <div className="relative aspect-video w-full overflow-hidden rounded-md border">
          <Image src={previewUrl || "/placeholder.svg"} alt="Cover image preview" fill className="object-cover" />
          <Button variant="destructive" size="icon" className="absolute right-2 top-2" onClick={handleRemove}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          className={`flex aspect-video w-full flex-col items-center justify-center rounded-md border border-dashed p-4 transition-colors ${
            isDragging ? "border-blue-500 bg-blue-50" : "border-muted-foreground/20"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <ImageIcon className="mb-2 h-8 w-8 text-muted-foreground" />
          <p className="mb-2 text-sm text-muted-foreground">Drag and drop an image, or click to browse</p>
          <Button variant="secondary" size="sm" asChild>
            <label>
              Browse
              <input type="file" accept="image/*" className="sr-only" onChange={handleFileChange} />
            </label>
          </Button>
        </div>
      )}
    </div>
  )
}
