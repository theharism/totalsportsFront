"use client"

import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

interface Stream {
  _id: string
  link: string
  channel: string
  ads: number
  language: string
}

export default function StreamsTable({ streams }: { streams: Stream[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-800 text-left">
            <th className="pb-4 text-sm font-medium text-gray-400">Streamer</th>
            <th className="pb-4 text-sm font-medium text-gray-400">Channel</th>
            <th className="pb-4 text-sm font-medium text-gray-400">Reputation</th>
            <th className="pb-4 text-sm font-medium text-gray-400">Language</th>
            <th className="pb-4 text-sm font-medium text-gray-400">Ads</th>
            <th className="pb-4 text-sm font-medium text-gray-400">Action</th>
          </tr>
        </thead>
        <tbody>
          {streams.map((stream) => (
            <tr key={stream._id} className="border-b border-gray-800">
              <td className="py-4 text-sm text-gray-300">xyz</td>
              <td className="py-4">
                <span className="rounded bg-gray-800 px-3 py-1 text-sm text-white">{stream.channel}</span>
              </td>
              <td className="py-4">
                <span className="rounded bg-yellow-500 px-3 py-1 text-sm font-medium text-black">xyz</span>
              </td>
              <td className="py-4">
                <span className="rounded bg-gray-800 px-3 py-1 text-sm text-white">{stream.language}</span>
              </td>
              <td className="py-4">
                <span className="rounded bg-gray-800 px-3 py-1 text-sm text-white">{stream.ads}</span>
              </td>
              <td className="py-4">
                <Button
                  variant="default"
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => window.open(`${stream.streaming_link}/stream/${stream.slug}`, "_blank")}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Watch
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

