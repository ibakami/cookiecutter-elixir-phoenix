import { useEffect } from "react"

export const useRootTitle = (pageName?: string): void => {
  const UnmountBehavior = (): void => {
    document.title = "Phoenix CookieCutter"
  }

  useEffect(
    (): typeof UnmountBehavior => {
      document.title = pageName ? `${pageName}` : "Phoenix CookieCutter"
      return UnmountBehavior
    },
  )
