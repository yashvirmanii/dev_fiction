"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy } from "lucide-react"

export function HtmlEntities() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")

  const encodeHtml = () => {
    const encoded = input
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;")
    setOutput(encoded)
  }

  const decodeHtml = () => {
    const decoded = input
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, " ")
    setOutput(decoded)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">HTML Entities Encoder / Decoder</h1>
        <p className="text-gray-600">
          Encode special characters for safe HTML display or decode HTML entities back to readable text.
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
              <CardTitle>Text to HTML Entities</CardTitle>
              <CardDescription>Convert special characters to HTML entities</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Enter text with special characters..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-[150px]"
              />
              <Button onClick={encodeHtml} className="mt-4 bg-red-600 hover:bg-red-700">
                Encode HTML Entities
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="decode" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>HTML Entities to Text</CardTitle>
              <CardDescription>Convert HTML entities back to readable text</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Enter HTML entities..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-[150px] font-mono"
              />
              <Button onClick={decodeHtml} className="mt-4 bg-red-600 hover:bg-red-700">
                Decode HTML Entities
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
          <CardTitle>Common HTML Entities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Character → Entity</h4>
              <div className="space-y-2 font-mono text-sm">
                <div className="flex justify-between">
                  <span>{"<"}</span>
                  <span className="text-gray-600">{"&lt;"}</span>
                </div>
                <div className="flex justify-between">
                  <span>{">"}</span>
                  <span className="text-gray-600">{"&gt;"}</span>
                </div>
                <div className="flex justify-between">
                  <span>{"&"}</span>
                  <span className="text-gray-600">{"&amp;"}</span>
                </div>
                <div className="flex justify-between">
                  <span>{'"'}</span>
                  <span className="text-gray-600">{"&quot;"}</span>
                </div>
                <div className="flex justify-between">
                  <span>{"'"}</span>
                  <span className="text-gray-600">{"&#39;"}</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Use Cases</h4>
              <ul className="space-y-1 text-gray-600 text-sm">
                <li>• Displaying code in HTML</li>
                <li>• Preventing XSS attacks</li>
                <li>• Safe HTML content rendering</li>
                <li>• Email template development</li>
                <li>• XML/HTML data processing</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
