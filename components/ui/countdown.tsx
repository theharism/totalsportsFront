'use client';

import { useEffect, useState } from "react"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import { useIsMobile } from "./use-mobile";

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault("Europe/London")
interface MatchCountdownProps {
  startingDate: string // ISO: "2025-06-01T01:00:00.000Z"
  startingTime: string // "02:38"
}

export function MatchCountdown({ startingDate, startingTime }: MatchCountdownProps) {
  const [timeLeft, setTimeLeft] = useState("00:00:00")
  const [started, setStarted] = useState(false)
  const isMobile = useIsMobile();

  useEffect(() => {
    const matchTime = dayjs.tz(`${startingDate} ${startingTime}`, 'YYYY-MM-DD HH:mm', 'Etc/GMT')

    const updateCountdown = () => {
      const now = dayjs().tz('Etc/GMT')
      const diffMs = matchTime.diff(now)

      if (diffMs <= 0) {
        setStarted(true)
        setTimeLeft("00:00:00")
        return
      }

      const totalSeconds = Math.floor(diffMs / 1000)
      const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0")
      const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0")
      const seconds = String(totalSeconds % 60).padStart(2, "0")

      setTimeLeft(`${hours}:${minutes}:${seconds}`)
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [startingDate, startingTime])

  const [hh, mm, ss] = timeLeft.split(":")

  return (
    <div className={`flex gap-4 text-${isMobile ? 'xl' : '3xl'} font-bold text-white`}>
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
