"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy } from "lucide-react"

export function Base64Tool() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")

  const encodeBase64 = () => {
    try {
      const encoded = btoa(input)
      setOutput(encoded)
    } catch (err) {
      setOutput("Error: Unable to encode")
    }
  }

  const decodeBase64 = () => {
    try {
      const decoded = atob(input)
      setOutput(decoded)
    } catch (err) {
      setOutput("Error: Invalid Base64 string")
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Base64 Encoder / Decoder</h1>
        <p className="text-gray-600">
          Encode text to Base64 or decode Base64 strings back to text. Commonly used in web APIs and data transmission.
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
              <CardTitle>Text to Base64</CardTitle>
              <CardDescription>Enter text to encode to Base64</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Enter text to encode..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-[150px]"
              />
              <Button onClick={encodeBase64} className="mt-4 bg-green-600 hover:bg-green-700">
                Encode to Base64
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="decode" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Base64 to Text</CardTitle>
              <CardDescription>Enter Base64 string to decode</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Enter Base64 string to decode..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-[150px] font-mono"
              />
              <Button onClick={decodeBase64} className="mt-4 bg-green-600 hover:bg-green-700">
                Decode from Base64
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
            className="min-h-[150px] bg-gray-50 font-mono"
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
    </div>
  )
}
