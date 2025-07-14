"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy } from "lucide-react"

export function UrlEncoder() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")

  const encodeUrl = () => {
    try {
      const encoded = encodeURIComponent(input)
      setOutput(encoded)
    } catch (err) {
      setOutput("Error: Unable to encode")
    }
  }

  const decodeUrl = () => {
    try {
      const decoded = decodeURIComponent(input)
      setOutput(decoded)
    } catch (err) {
      setOutput("Error: Invalid URL encoding")
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">URL Encoder / Decoder</h1>
        <p className="text-gray-600">
          Convert strings to URL-safe format and vice versa. Essential for web development and API integration.
        </p>
      </div>

      <Tabs defaultValue="encode" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="encode">Encode</TabsTrigger>
          <TabsTrigger value="decode">Decode</TabsTrigger>
        </TabsList>

        <TabsContent value="encode" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Text to URL Encoding</CardTitle>
              <CardDescription>Enter text to convert to URL-safe format</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Enter text to URL encode..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-[150px]"
              />
              <Button onClick={encodeUrl} className="mt-4 bg-purple-600 hover:bg-purple-700">
                URL Encode
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="decode" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>URL Decoding to Text</CardTitle>
              <CardDescription>Enter URL-encoded string to decode</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Enter URL-encoded string..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-[150px] font-mono"
              />
              <Button onClick={decodeUrl} className="mt-4 bg-purple-600 hover:bg-purple-700">
                URL Decode
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Result</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={output}
            readOnly
            className="min-h-[150px] bg-gray-50"
            placeholder="Result will appear here..."
          />
          <div className="flex gap-2 mt-4">
            <Button onClick={copyToClipboard} variant="outline" disabled={!output}>
              <Copy className="h-4 w-4 mr-2" />
              Copy Result
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Common URL Encoding Examples</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2 text-green-600">Original → Encoded</h4>
              <div className="space-y-1 font-mono text-xs">
                <div>{"hello world → hello%20world"}</div>
                <div>{"user@example.com → user%40example.com"}</div>
                <div>{"100% → 100%25"}</div>
                <div>{"a+b=c → a%2Bb%3Dc"}</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-orange-600">Use Cases</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Query parameters in URLs</li>
                <li>• Form data submission</li>
                <li>• API endpoint parameters</li>
                <li>• Safe URL generation</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
