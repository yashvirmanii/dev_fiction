"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, RefreshCw } from "lucide-react"

export function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>([])
  const [count, setCount] = useState(1)

  const generateUUID = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0
      const v = c === "x" ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }

  const generateUUIDs = () => {
    const newUuids = Array.from({ length: count }, () => generateUUID())
    setUuids(newUuids)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const copyAllUUIDs = () => {
    navigator.clipboard.writeText(uuids.join("\n"))
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">UUID / GUID Generator</h1>
        <p className="text-gray-600">
          Generate random universally unique identifiers (UUIDs) for your projects, databases, and applications.
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Generate UUIDs</CardTitle>
          <CardDescription>Specify how many UUIDs you need</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-end">
            <div className="flex-1 max-w-xs">
              <label className="block text-sm font-medium mb-2">Number of UUIDs</label>
              <Input
                type="number"
                min="1"
                max="100"
                value={count}
                onChange={(e) => setCount(Math.max(1, Math.min(100, Number.parseInt(e.target.value) || 1)))}
              />
            </div>
            <Button onClick={generateUUIDs} className="bg-blue-600 hover:bg-blue-700">
              <RefreshCw className="h-4 w-4 mr-2" />
              Generate
            </Button>
          </div>
        </CardContent>
      </Card>

      {uuids.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Generated UUIDs</CardTitle>
            <CardDescription>
              {uuids.length} UUID{uuids.length > 1 ? "s" : ""} generated
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-4">
              {uuids.map((uuid, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                  <code className="flex-1 font-mono text-sm">{uuid}</code>
                  <Button size="sm" variant="outline" onClick={() => copyToClipboard(uuid)}>
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>

            {uuids.length > 1 && (
              <Button onClick={copyAllUUIDs} variant="outline">
                <Copy className="h-4 w-4 mr-2" />
                Copy All UUIDs
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>About UUIDs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold mb-2">What is a UUID?</h4>
              <p className="text-gray-600 mb-4">
                A UUID (Universally Unique Identifier) is a 128-bit number used to identify information in computer
                systems. The probability of generating duplicate UUIDs is negligibly small.
              </p>
              <h4 className="font-semibold mb-2">Format</h4>
              <p className="text-gray-600">
                UUIDs are typically displayed as 32 hexadecimal digits, displayed in five groups separated by hyphens:
                8-4-4-4-12 for a total of 36 characters.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Common Use Cases</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Database primary keys</li>
                <li>• API request identifiers</li>
                <li>• Session tokens</li>
                <li>• File naming</li>
                <li>• Distributed system IDs</li>
                <li>• Transaction references</li>
                <li>• User account identifiers</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
