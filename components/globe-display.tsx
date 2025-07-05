"use client"

import Image from "next/image"
import { useMemo } from "react"

// Define SVG coordinates for our locations
const locations: Record<string, { x: number; y: number }> = {
  usa_east: { x: 160, y: 200 },
  poland: { x: 380, y: 140 },
  france: { x: 350, y: 160 },
}

interface GlobeDisplayProps {
  activePath?: [string, string] | null
}

export function GlobeDisplay({ activePath }: GlobeDisplayProps) {
  const pathData = useMemo(() => {
    if (!activePath) return null

    const [startKey, endKey] = activePath
    const start = locations[startKey]
    const end = locations[endKey]

    if (!start || !end) return null

    const controlX = (start.x + end.x) / 2
    const controlY = Math.min(start.y, end.y) - 100

    return {
      d: `M ${start.x} ${start.y} Q ${controlX} ${controlY} ${end.x} ${end.y}`,
      start,
      end,
    }
  }, [activePath])

  return (
    <div className="relative aspect-square max-w-lg mx-auto">
      <Image src="/globe.png" alt="Globe" width={512} height={512} className="w-full h-auto" />
      {pathData && (
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: "#0055ff" }} />
              <stop offset="100%" style={{ stopColor: "#8b5cf6" }} />
            </linearGradient>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="url(#arcGradient)" />
            </marker>
          </defs>
          <path
            d={pathData.d}
            stroke="url(#arcGradient)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            markerEnd="url(#arrowhead)"
          />
          <circle cx={pathData.start.x} cy={pathData.start.y} r="8" fill="#0055ff" />
        </svg>
      )}
    </div>
  )
}
