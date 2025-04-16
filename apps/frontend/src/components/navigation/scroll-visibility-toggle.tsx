"use client"

import { Button } from "@/components/ui/button"
import { ArrowUp, ArrowDown } from "lucide-react"

interface ScrollVisibilityToggleProps {
  visible: boolean
  onToggle: () => void
}

export function ScrollVisibilityToggle({ visible, onToggle }: ScrollVisibilityToggleProps) {
  return (
    <div className="fixed top-3 right-3 z-[60]">
      <Button
        size="sm"
        variant="secondary"
        onClick={onToggle}
        className="rounded-full shadow-md"
      >
        {visible ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
      </Button>
    </div>
  )
}
