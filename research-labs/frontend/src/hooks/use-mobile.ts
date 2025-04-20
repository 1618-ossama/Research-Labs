import { useEffect, useState } from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined)
  useEffect(() => {
    if (typeof window === "undefined") return

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`)  //@media (max-width: 768px) in CSS
    const handleChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches)
    }
    setIsMobile(mql.matches)

    if (mql.addEventListener) {
      mql.addEventListener("change", handleChange)
    } else {
      mql.addListener(handleChange)
    }

    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener("change", handleChange)
      } else {
        mql.removeListener(handleChange)
      }
    }
  }, [])

  return isMobile
}

