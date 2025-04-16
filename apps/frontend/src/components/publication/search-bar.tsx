"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function SearchBar() {
  const [query, setQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Searching for:", query)
    // In a real app, you would implement search functionality here
  }

  return (
    <form onSubmit={handleSearch} className="relative w-full">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search publications, researchers..."
        className="w-full bg-gray-100 pl-9 focus-visible:bg-white"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  )
}
