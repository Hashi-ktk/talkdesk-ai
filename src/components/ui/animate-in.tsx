"use client"

import { useEffect, useState } from "react"

interface AnimateInProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function AnimateIn({ children, delay = 0, className = "" }: AnimateInProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div className={`${className} ${visible ? "animate-fade-up" : "opacity-0"}`}>
      {children}
    </div>
  )
}
