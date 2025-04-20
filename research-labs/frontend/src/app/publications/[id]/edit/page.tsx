"use client"

import type React from "react"

import { useState, useEffect } from "react"
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface EditPublicationPageProps {
  params: {
    id: string
  }
}

export default function EditPublicationPage({ params }: EditPublicationPageProps) {
  const { id } = params
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    abstract: "",
    content: "",
  })
  const [coverImageUrl, setCoverImageUrl] = useState<string>("")
  const [newCoverImage, setNewCoverImage] = useState<File | null>(null)
  const [existingFiles, setExistingFiles] = useState<{ name: string; size: string; type: string; url: string }[]>([])
  const [newFiles, setNewFiles] = useState<File[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")

  // Simulate fetching publication data
  useEffect(() => {
    // In a real app, you would fetch the publication data from your backend
    setTimeout(() => {
      setFormData({
        title: "Advances in Machine Learning for Natural Language Processing",
        abstract: "This paper explores recent developments in applying machine learning techniques to natural language processing tasks, with a focus on transformer architectures and their applications in various domains.",
        content: `
          <h2>Introduction</h2>
          <p>Natural Language Processing (NLP) has seen remarkable progress in recent years, largely due to advances in machine learning techniques, particularly deep learning. This paper provides a comprehensive review of the latest developments in the field, focusing on transformer-based architectures that have revolutionized how machines understand and generate human language.</p>
          
          <h2>Background</h2>
          <p>Traditional NLP approaches relied heavily on statistical methods and hand-crafted features. The advent of deep learning, particularly recurrent neural networks (RNNs) and later transformer models, has shifted the paradigm toward end-to-end learning systems that can automatically extract relevant features from raw text data.</p>
        `,
      })
      setCoverImageUrl("/placeholder.svg?height=400&width=800")
      setExistingFiles([
        { name: "Full Paper (PDF)", size: "2.4 MB", type: "pdf", url: "#" },
        { name: "Supplementary Materials", size: "1.8 MB", type: "zip", url: "#" },
        { name: "Dataset", size: "5.2 MB", type: "csv", url: "#" },
      ])
      setTags(["Machine Learning", "Natural Language Processing", "Transformers", "Deep Learning", "AI"])
      setIsLoading(false)
    }, 500)
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleContentChange = (content: string) => {
    setFormData((prev) => ({ ...prev, content }))
  }

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim() !== '') {
      e.preventDefault()
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()])
      }
      setTagInput('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // In a real app, you would upload the files and submit the form data to your backend
    console.log("Form data:", formData)
    console.log("New cover image:", newCoverImage)
    console.log("Existing files:", existingFiles)
    console.log("New files:", newFiles)
    console.log("Tags:", tags)

    // Simulate API call
    setTimeout(() => {\
      setIsSubmitting(false)  tags)

    // Simulate API call
    setTimeout(() => 
      setIsSubmitting(false)
      router.push(`/publications/${id}`), 1000)
  }

  const handleDelete = async () => {
    // In a real app, you would send a delete request to your backend
    console.log("Deleting publication:", id)

    // Simulate API call
    setTimeout(() => {
      router.push("/")
    }, 500)
  }

  const handleRemoveExistingFile = (index: number) => {
    const updatedFiles = [...existingFiles]
    updatedFiles.splice(index, 1)
    setExistingFiles(updatedFiles)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="container mx-auto px-4 text-center">
          <p>Loading publication...</p>
        </div>
      </div>
    )
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
          <h1 className="text-2xl font-bold">Edit Publication</h1>
          <div className="flex items-center gap-2">
            <Link href={`/publications/${id}`}>
              <Button variant="outline">Cancel</Button>
            </Link>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete Publication</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the publication and all associated data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
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
                      onImageSelected={(file) => setNewCoverImage(file)}
                      previewUrl={newCoverImage ? URL.createObjectURL(newCoverImage) : coverImageUrl}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>Content</Label>
                    <RichTextEditor initialValue={formData.content} onChange={handleContentChange} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Attachments</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Existing Files</Label>
                    {existingFiles.length > 0 ? (
                      <div className="space-y-2">
                        {existingFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between rounded-md border bg-gray-50 p-3">
                            <div className="flex items-center gap-3">
                              <div>
                                <p className="font-medium">{file.name}</p>
                                <p className="text-sm text-muted-foreground">{file.size}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" className="text-blue-600" asChild>
                                <a href={file.url} download>Download</a>
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-500" onClick={() => handleRemoveExistingFile(index)}>
                                Remove
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No existing attachments</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Add New Files</Label>
                    <FileUploader onFilesSelected={(selectedFiles) => setNewFiles(selectedFiles)} files={newFiles} />
                  </div>
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
                      defaultValue="article"
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
                      defaultValue="public"
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
                      defaultValue="cc_by"
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
                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-md border p-3">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-gray-200" />
                        <div>
                          <p className="font-medium">Dr. Michael Chen</p>
                          <p className="text-xs text-muted-foreground">University of California, Berkeley</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-red-500">
                        Remove
                      </Button>
                    </div>
                    <div className="flex items-center justify-between rounded-md border p-3">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-gray-200" />
                        <div>
                          <p className="font-medium">Dr. Emily Rodriguez</p>
                          <p className="text-xs text-muted-foreground">MIT</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-red-500">
                        Remove
                      </Button>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    + Add More Co-Authors
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Save Changes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">
                    Your changes will be reviewed before the updated publication becomes publicly visible.
                  </p>
                  <div className="flex flex-col gap-2">
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Saving..." : "Save Changes"}
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
