"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link,
  ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  Heading2,
  Heading3,
  Quote,
} from "lucide-react"

interface RichTextEditorProps {
  initialValue: string
  onChange: (content: string) => void
}

export function RichTextEditor({ initialValue, onChange }: RichTextEditorProps) {
  const [content, setContent] = useState(initialValue)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
    onChange(e.target.value)
  }

  // In a real implementation, you would use a proper rich text editor library
  // like TipTap, Slate, or React-Quill. This is a simplified version for demonstration.
  const handleFormatClick = (format: string) => {
    console.log(`Applying format: ${format}`)
    // In a real implementation, this would apply the formatting
  }

  return (
    <div className="rounded-md border">
      <div className="flex flex-wrap items-center gap-1 border-b bg-gray-50 p-2">
        <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleFormatClick("bold")}>
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => handleFormatClick("italic")}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => handleFormatClick("underline")}
        >
          <Underline className="h-4 w-4" />
        </Button>
        <span className="mx-1 h-4 w-px bg-gray-300" />
        <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleFormatClick("h1")}>
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleFormatClick("h2")}>
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleFormatClick("h3")}>
          <Heading3 className="h-4 w-4" />
        </Button>
        <span className="mx-1 h-4 w-px bg-gray-300" />
        <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleFormatClick("list")}>
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => handleFormatClick("ordered-list")}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => handleFormatClick("quote")}
        >
          <Quote className="h-4 w-4" />
        </Button>
        <span className="mx-1 h-4 w-px bg-gray-300" />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => handleFormatClick("align-left")}
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => handleFormatClick("align-center")}
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => handleFormatClick("align-right")}
        >
          <AlignRight className="h-4 w-4" />
        </Button>
        <span className="mx-1 h-4 w-px bg-gray-300" />
        <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleFormatClick("link")}>
          <Link className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => handleFormatClick("image")}
        >
          <ImageIcon className="h-4 w-4" />
        </Button>
      </div>
      <Textarea
        value={content}
        onChange={handleChange}
        className="min-h-[400px] rounded-none border-0 font-mono text-sm focus-visible:ring-0"
      />
    </div>
  )
}

function Textarea({
  value,
  onChange,
  className,
}: {
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  className?: string
}) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      className={`w-full resize-none p-4 ${className}`}
      placeholder="Write your publication content here..."
    />
  )
}
