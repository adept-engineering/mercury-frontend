'use client'

import React from 'react'
import { cn } from "@/lib/utils"

interface LoadingDotsProps {
  numberOfDots?: number
  color?: string
  size?: number
  speed?: number
  className?: string
}

export const LoadingDots: React.FC<LoadingDotsProps> = ({
  numberOfDots = 3,
  color = 'currentColor',
  size = 4,
  speed = 1,
  className,
}) => {
  return (
    <span className={cn("inline-flex items-center", className)}>
      {[...Array(numberOfDots)].map((_, i) => (
        <span
          key={i}
          className="inline-block rounded-full"
          style={{
            backgroundColor: color,
            width: `${size}px`,
            height: `${size}px`,
            margin: `0 ${size / 2}px`,
            animation: `dotPulse ${speed}s infinite ${(i / numberOfDots) * speed}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes dotPulse {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </span>
  )
}

