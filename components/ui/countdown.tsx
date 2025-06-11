'use client';

import { useEffect, useState } from "react"

interface MatchCountdownProps {
  startingDate: string // ISO: "2025-06-01T01:00:00.000Z"
  startingTime: string // "02:38"
}

export function MatchCountdown({ startingDate, startingTime }: MatchCountdownProps) {
  const [timeLeft, setTimeLeft] = useState("00:00:00")
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const baseDate = new Date(startingDate)
    const [hours, minutes] = startingTime.split(":").map(Number)

    const matchStart = new Date(baseDate)
    matchStart.setHours(hours, minutes, 0, 0)

    const updateCountdown = () => {
      const now = new Date()
      const diff = matchStart.getTime() - now.getTime()

      if (diff <= 0) {
        setStarted(true)
        setTimeLeft("00:00:00")
        return
      }

      const hrs = String(Math.floor(diff / 3600000)).padStart(2, "0")
      const mins = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0")
      const secs = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0")

      setTimeLeft(`${hrs}:${mins}:${secs}`)
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [startingDate, startingTime])

  const [hh, mm, ss] = timeLeft.split(":")

  return (
    <div className="flex gap-4 text-3xl font-bold text-white">
      {!started && (
        <>
          <span>{hh}</span>
          <span>{mm}</span>
          <span>{ss}</span>
        </>
      )}
    </div>
  )
}
