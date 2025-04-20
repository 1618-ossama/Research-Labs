"use client"

import { useState, useEffect, useCallback } from "react"

export function useScrollVisibility(threshold = 100) {
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [disabled, setDisabled] = useState(false)
  const [manuallyVisible, setManuallyVisible] = useState<boolean | null>(null)

  const handleScroll = useCallback(() => {
    if (disabled) return

    const currentScrollY = window.scrollY

    if (currentScrollY < threshold) {
      setVisible(true)
      return
    }

    if (Math.abs(currentScrollY - lastScrollY) < 10) return

    setVisible(currentScrollY < lastScrollY)
    setLastScrollY(currentScrollY)
  }, [lastScrollY, disabled, threshold])

  const toggleVisibilityManually = useCallback(() => {
    setManuallyVisible((prev) => {
      if (prev === null) return !visible
      return !prev
    })
  }, [visible])

  useEffect(() => {
    if (manuallyVisible !== null) {
      setVisible(manuallyVisible)
    }
  }, [manuallyVisible])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  return {
    visible,
    toggleVisibilityManually,
    setDisabled,
  }
}
