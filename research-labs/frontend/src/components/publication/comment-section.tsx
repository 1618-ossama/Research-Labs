"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { UserAuthForm } from "@/components/user-auth-form"
import { ThumbsUpIcon, ReplyIcon, MoreHorizontalIcon } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface CommentSectionProps {
  publicationId: string
}

export function CommentSection({ publicationId }: CommentSectionProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [comment, setComment] = useState("")
  const [showAuthForm, setShowAuthForm] = useState(false)

  // Mock comments data - in a real app, you would fetch this from your backend
  const comments = [
    {
      id: "1",
      author: {
        name: "Dr. Jane Smith",
        institution: "Harvard University",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content:
        "This is a fascinating study! I particularly appreciate the detailed analysis of transformer models in low-resource settings. Have you considered extending this work to multilingual applications?",
      date: "2 days ago",
      likes: 8,
      replies: 2,
    },
    {
      id: "2",
      author: {
        name: "Prof. Michael Johnson",
        institution: "University of Oxford",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content:
        "I found your methodology section particularly insightful. The comparison between different pre-training approaches provides valuable guidance for practitioners. Looking forward to seeing how this research evolves.",
      date: "1 day ago",
      likes: 5,
      replies: 0,
    },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would send the comment to your backend
    console.log("Submitting comment:", comment)
    setComment("")
  }

  const handleCommentClick = () => {
    if (!isLoggedIn) {
      setShowAuthForm(true)
    }
  }

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold">Comments ({comments.length})</h2>

      <div className="mb-6">
        <div className="mb-2 flex items-center gap-3">
          <Avatar>
            <AvatarImage src={isLoggedIn ? "/placeholder.svg?height=40&width=40" : undefined} alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="w-full">
            <Textarea
              placeholder={isLoggedIn ? "Add a comment..." : "Login to comment on this publication"}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[80px] resize-none"
              onClick={handleCommentClick}
              readOnly={!isLoggedIn}
            />
          </div>
        </div>
        {isLoggedIn && (
          <div className="flex justify-end">
            <Button type="submit" onClick={handleSubmit} disabled={!comment.trim()}>
              Post Comment
            </Button>
          </div>
        )}

        {showAuthForm && !isLoggedIn && (
          <div className="mt-4">
            <UserAuthForm
              onSuccess={() => {
                setIsLoggedIn(true)
                setShowAuthForm(false)
              }}
            />
          </div>
        )}
      </div>

      <Separator className="my-6" />

      {comments.map((comment) => (
        <Card key={comment.id} className="mb-4">
          <CardHeader className="flex flex-row items-start justify-between pb-2">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
                <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-blue-700">{comment.author.name}</p>
                <p className="text-xs text-muted-foreground">{comment.author.institution}</p>
                <p className="text-xs text-muted-foreground">{comment.date}</p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Report</DropdownMenuItem>
                {isLoggedIn && <DropdownMenuItem>Edit</DropdownMenuItem>}
                {isLoggedIn && <DropdownMenuItem>Delete</DropdownMenuItem>}
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent>
            <p className="mb-3">{comment.content}</p>
            <div className="flex items-center gap-4 text-sm">
              <Button variant="ghost" size="sm" className="h-8 gap-1 px-2 text-muted-foreground">
                <ThumbsUpIcon className="h-4 w-4" />
                <span>{comment.likes}</span>
              </Button>
              <Button variant="ghost" size="sm" className="h-8 gap-1 px-2 text-muted-foreground">
                <ReplyIcon className="h-4 w-4" />
                <span>Reply</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
