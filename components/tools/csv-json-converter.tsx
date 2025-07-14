"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, ArrowRightLeft } from "lucide-react"

export function CsvJsonConverter() {
  const [csvInput, setCsvInput] = useState("")
  const [jsonInput, setJsonInput] = useState("")
  const [csvOutput, setCsvOutput] = useState("")
  const [jsonOutput, setJsonOutput] = useState("")

  const csvToJson = () => {
    try {
      const lines = csvInput.trim().split("\n")
      if (lines.length < 2) {
        setJsonOutput("Error: CSV must have at least a header row and one data row")
        return
      }

      const headers = lines[0].split(",").map((h) => h.trim().replace(/"/g, ""))
      const data = lines.slice(1).map((line) => {
        const values = line.split(",").map((v) => v.trim().replace(/"/g, ""))
        const obj: any = {}
        headers.forEach((header, index) => {
          const value = values[index] || ""
          // Try to parse as number
          const numValue = Number.parseFloat(value)
          obj[header] = isNaN(numValue) ? value : numValue
        })
        return obj
      })

      setJsonOutput(JSON.stringify(data, null, 2))
    } catch (error) {
      setJsonOutput("Error: " + (error instanceof Error ? error.message : "Invalid CSV format"))
    }
  }

  const jsonToCsv = () => {
    try {
      const data = JSON.parse(jsonInput)
      if (!Array.isArray(data) || data.length === 0) {
        setCsvOutput("Error: JSON must be an array of objects")
        return
      }

      // Get all unique keys from all objects
      const allKeys = new Set<string>()
      data.forEach((obj) => {
        if (typeof obj === "object" && obj !== null) {
          Object.keys(obj).forEach((key) => allKeys.add(key))
        }
      })

      const headers = Array.from(allKeys)
      const csvLines = [headers.join(",")]

      data.forEach((obj) => {
        const row = headers.map((header) => {
          const value = obj[header] || ""
          // Wrap in quotes if contains comma or quotes
          return typeof value === "string" && (value.includes(",") || value.includes('"'))
            ? `"${value.replace(/"/g, '""')}"`
            : value
        })
        csvLines.push(row.join(","))
      })

      setCsvOutput(csvLines.join("\n"))
    } catch (error) {
      setCsvOutput("Error: " + (error instanceof Error ? error.message : "Invalid JSON format"))
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">CSV ↔ JSON Converter</h1>
        <p className="text-gray-600">Convert between CSV and JSON formats for data processing and API integration.</p>
      </div>

      <Tabs defaultValue="csv-to-json" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="csv-to-json">CSV to JSON</TabsTrigger>
          <TabsTrigger value="json-to-csv">JSON to CSV</TabsTrigger>
        </TabsList>

        <TabsContent value="csv-to-json" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>CSV Input</CardTitle>
                <CardDescription>Enter CSV data with headers</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder={`name,age,city
John Doe,30,New York
Jane Smith,25,Los Angeles
Bob Johnson,35,Chicago`}
                  value={csvInput}
                  onChange={(e) => setCsvInput(e.target.value)}
                  className="min-h-[300px] font-mono text-sm"
                />
                <Button onClick={csvToJson} className="mt-4 bg-blue-600 hover:bg-blue-700">
                  <ArrowRightLeft className="h-4 w-4 mr-2" />
                  Convert to JSON
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>JSON Output</CardTitle>
                <CardDescription>Converted JSON data</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={jsonOutput}
                  readOnly
                  className="min-h-[300px] font-mono text-sm bg-gray-50"
                  placeholder="JSON output will appear here..."
                />
                <Button
                  onClick={() => copyToClipboard(jsonOutput)}
                  variant="outline"
                  className="mt-4"
                  disabled={!jsonOutput}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy JSON
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="json-to-csv" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>JSON Input</CardTitle>
                <CardDescription>Enter JSON array of objects</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder={`[
  {"name": "John Doe", "age": 30, "city": "New York"},
  {"name": "Jane Smith", "age": 25, "city": "Los Angeles"},
  {"name": "Bob Johnson", "age": 35, "city": "Chicago"}
]`}
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  className="min-h-[300px] font-mono text-sm"
                />
                <Button onClick={jsonToCsv} className="mt-4 bg-green-600 hover:bg-green-700">
                  <ArrowRightLeft className="h-4 w-4 mr-2" />
                  Convert to CSV
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>CSV Output</CardTitle>
                <CardDescription>Converted CSV data</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={csvOutput}
                  readOnly
                  className="min-h-[300px] font-mono text-sm bg-gray-50"
                  placeholder="CSV output will appear here..."
                />
                <Button
                  onClick={() => copyToClipboard(csvOutput)}
                  variant="outline"
                  className="mt-4"
                  disabled={!csvOutput}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy CSV
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Conversion Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold mb-2 text-blue-600">CSV Requirements</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• First row must contain headers</li>
                <li>• Use commas to separate values</li>
                <li>• Wrap values with commas in quotes</li>
                <li>• Escape quotes with double quotes</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-green-600">JSON Requirements</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Must be an array of objects</li>
                <li>• All objects should have similar structure</li>
                <li>• Numbers are automatically detected</li>
                <li>• Missing values become empty strings</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
