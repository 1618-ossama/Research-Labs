"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { FileUploader } from "@/components/file-uploader"
import { ImageUploader } from "@/components/image-uploader"
import { UserNav } from "@/components/user-nav"
import { SearchBar } from "@/components/search-bar"
import { RichTextEditor } from "@/components/rich-text-editor"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

export default function CreatePublicationPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    abstract: "",
    content: "",
  })
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [files, setFiles] = useState<File[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleContentChange = (content: string) => {
    setFormData((prev) => ({ ...prev, content }))
  }

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault()
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()])
      }
      setTagInput("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // In a real app, you would upload the files and submit the form data to your backend
    console.log("Form data:", formData)
    console.log("Cover image:", coverImage)
    console.log("Files:", files)
    console.log("Tags:", tags)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/")
    }, 1000)
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
            <UserNav />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:px-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Create New Publication</h1>
          <Link href="/">
            <Button variant="outline">Cancel</Button>
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Publication Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Enter publication title"
                      className="text-lg"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="abstract">Abstract</Label>
                    <Textarea
                      id="abstract"
                      name="abstract"
                      value={formData.abstract}
                      onChange={handleChange}
                      placeholder="Provide a brief summary of your publication"
                      className="min-h-[100px]"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Tags</Label>
                    <div className="flex flex-wrap gap-2 rounded-md border p-2">
                      {tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="gap-1 px-2 py-1">
                          {tag}
                          <button type="button" onClick={() => handleRemoveTag(tag)}>
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                      <Input
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleAddTag}
                        placeholder="Add tags..."
                        className="flex-1 border-0 p-0 shadow-none focus-visible:ring-0"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Press Enter to add a tag</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Cover Image</Label>
                    <ImageUploader
                      onImageSelected={(file) => setCoverImage(file)}
                      previewUrl={coverImage ? URL.createObjectURL(coverImage) : undefined}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>Content</Label>
                    <RichTextEditor initialValue="" onChange={handleContentChange} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Attachments</CardTitle>
                </CardHeader>
                <CardContent>
                  <FileUploader onFilesSelected={(selectedFiles) => setFiles(selectedFiles)} files={files} />
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Publication Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="publication-type">Publication Type</Label>
                    <select
                      id="publication-type"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option value="article">Article</option>
                      <option value="conference">Conference Paper</option>
                      <option value="preprint">Preprint</option>
                      <option value="thesis">Thesis</option>
                      <option value="book">Book</option>
                      <option value="book_chapter">Book Chapter</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="visibility">Visibility</Label>
                    <select
                      id="visibility"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                      <option value="restricted">Restricted</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="license">License</Label>
                    <select
                      id="license"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option value="cc_by">CC BY 4.0</option>
                      <option value="cc_by_sa">CC BY-SA 4.0</option>
                      <option value="cc_by_nc">CC BY-NC 4.0</option>
                      <option value="cc_by_nc_sa">CC BY-NC-SA 4.0</option>
                      <option value="cc_by_nd">CC BY-ND 4.0</option>
                      <option value="cc_by_nc_nd">CC BY-NC-ND 4.0</option>
                    </select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Co-Authors</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full">
                    + Add Co-Authors
                  </Button>
                  <p className="text-xs text-muted-foreground">You can add co-authors after creating the publication</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Publish</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">
                    Your publication will be reviewed by our team before it becomes publicly visible.
                  </p>
                  <div className="flex flex-col gap-2">
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Publishing..." : "Publish Publication"}
                    </Button>
                    <Button type="button" variant="outline" className="w-full">
                      Save as Draft
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}
