"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"
import type { CreateUserRequest } from "@/lib/api/users"

interface CreateUserDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateUser: (userData: CreateUserRequest) => Promise<void>
}

export function CreateUserDialog({ open, onOpenChange, onCreateUser }: CreateUserDialogProps) {
  const [isLoading, setIsLoading] = React.useState(false)
  const [formData, setFormData] = React.useState<CreateUserRequest>({
    username: "",
    email: "",
    password_hash: "",
    first_name: "",
    last_name: "",
    bio: "",
    role: "GUEST",
    affiliation: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setIsLoading(true)

      const cleanedData: CreateUserRequest = {
        username: formData.username,
        email: formData.email,
        password_hash: formData.password_hash,
        role: formData.role,
        ...(formData.first_name && { first_name: formData.first_name }),
        ...(formData.last_name && { last_name: formData.last_name }),
        ...(formData.bio && { bio: formData.bio }),
        ...(formData.affiliation && { affiliation: formData.affiliation }),
      }

      await onCreateUser(cleanedData)

      setFormData({
        username: "",
        email: "",
        password_hash: "",
        first_name: "",
        last_name: "",
        bio: "",
        role: "GUEST",
        affiliation: "",
      })
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: keyof CreateUserRequest, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New User</DialogTitle>
          <DialogDescription>Add a new user to the system. Fill in the required information below.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username *
              </Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                className="col-span-3"
                required
                disabled={isLoading}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="col-span-3"
                required
                disabled={isLoading}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password *
              </Label>
              <Input
                id="password"
                type="password"
                value={formData.password_hash}
                onChange={(e) => handleInputChange("password_hash", e.target.value)}
                className="col-span-3"
                required
                disabled={isLoading}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="first_name" className="text-right">
                First Name
              </Label>
              <Input
                id="first_name"
                value={formData.first_name}
                onChange={(e) => handleInputChange("first_name", e.target.value)}
                className="col-span-3"
                disabled={isLoading}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="last_name" className="text-right">
                Last Name
              </Label>
              <Input
                id="last_name"
                value={formData.last_name}
                onChange={(e) => handleInputChange("last_name", e.target.value)}
                className="col-span-3"
                disabled={isLoading}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role *
              </Label>
              <Select
                value={formData.role}
                onValueChange={(value) => handleInputChange("role", value)}
                disabled={isLoading}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GUEST">Guest</SelectItem>
                  <SelectItem value="RESEARCHER">Researcher</SelectItem>
                  <SelectItem value="LEADER">Leader</SelectItem>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="affiliation" className="text-right">
                Affiliation
              </Label>
              <Input
                id="affiliation"
                value={formData.affiliation}
                onChange={(e) => handleInputChange("affiliation", e.target.value)}
                className="col-span-3"
                disabled={isLoading}
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="bio" className="text-right">
                Bio
              </Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                className="col-span-3"
                rows={3}
                disabled={isLoading}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create User
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
