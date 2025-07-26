"use client"

import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

interface Stream {
  _id: string
  name: string
  streaming_link: string
  iframe_link: string
  slug: string
  channel: string
  ads: number
  language: string
}

export default function StreamsTable({ streams }: { streams: Stream[] }) {
  const isMobile = useIsMobile()

  return (
    <div className="overflow-x-auto">
      <table className="table-fixed w-full">
         <thead>
          <tr className="border-b border-gray-800 text-left">
            <th className="w-1/5 pb-4 text-sm font-medium text-gray-400">Streamer</th>
            <th className="w-1/5 pb-4 text-sm font-medium text-gray-400">Channel</th>
            {!isMobile && <th className="w-1/5 pb-4 text-sm font-medium text-gray-400">Language</th>}
            {!isMobile && <th className="w-1/5 pb-4 text-sm font-medium text-gray-400">Ads</th>}
            <th className="w-1/5 pb-4 text-sm font-medium text-gray-400">Action</th>
          </tr>
        </thead>
        <tbody>
          {streams.map((stream) => (
            <tr key={stream._id} className="border-b border-gray-800">
              <td className="py-4 text-sm text-gray-300">
                {stream.name}
              </td>
              <td className="py-4">
                <span className="rounded bg-gray-800 px-3 py-1 text-sm text-white">{stream.channel}</span>
              </td>
              {!isMobile && (
                <td className="py-4">
                  <span className="rounded bg-gray-800 px-3 py-1 text-sm text-white">{stream.language}</span>
                </td>
              )}
              {!isMobile && (
                <td className="py-4">
                  <span className="rounded bg-gray-800 px-3 py-1 text-sm text-white">{stream.ads}</span>
                </td>
              )}
              <td className="py-4">
                <Button
                  variant="default"
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => {stream?.iframe_link ? window.open(`${stream.streaming_link}/stream/${stream.slug}`, "_blank") : window.open(stream.streaming_link, "_blank")}}
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
