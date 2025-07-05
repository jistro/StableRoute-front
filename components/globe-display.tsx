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
      <Image src="/planet-with-arrow.png" alt="Globe" width={512} height={512} className="w-full h-auto" />
    </div>
  )
}
