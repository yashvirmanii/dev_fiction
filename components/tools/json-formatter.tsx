"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, Download, Upload } from "lucide-react"

export function JsonFormatter() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input)
      const formatted = JSON.stringify(parsed, null, 2)
      setOutput(formatted)
      setError("")
    } catch (err) {
      setError("Invalid JSON format")
      setOutput("")
    }
  }

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input)
      const minified = JSON.stringify(parsed)
      setOutput(minified)
      setError("")
    } catch (err) {
      setError("Invalid JSON format")
      setOutput("")
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">JSON Formatter / Beautifier</h1>
        <p className="text-gray-600">
          Format, validate, and beautify your JSON data. Paste your JSON below and click format to make it readable.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Input JSON</CardTitle>
            <CardDescription>Paste your JSON data here</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Paste your JSON here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[300px] font-mono text-sm"
            />
            <div className="flex gap-2 mt-4">
              <Button onClick={formatJson} className="bg-blue-600 hover:bg-blue-700">
                Format JSON
              </Button>
              <Button onClick={minifyJson} variant="outline">
                Minify JSON
              </Button>
              <Button variant="outline" size="icon">
                <Upload className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Formatted Output</CardTitle>
            <CardDescription>Your formatted JSON will appear here</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={output}
              readOnly
              className="min-h-[300px] font-mono text-sm bg-gray-50"
              placeholder="Formatted JSON will appear here..."
            />
            {error && <div className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded">{error}</div>}
            <div className="flex gap-2 mt-4">
              <Button onClick={copyToClipboard} variant="outline" disabled={!output}>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
              <Button variant="outline" disabled={!output}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">About JSON Formatter</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            JSON (JavaScript Object Notation) is a lightweight data-interchange format. This tool helps you format,
            validate, and beautify JSON data making it easier to read and debug. Perfect for API development,
            configuration files, and data analysis.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
