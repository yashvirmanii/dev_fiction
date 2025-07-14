"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, CheckCircle, XCircle, AlertCircle } from "lucide-react"

export function YamlValidator() {
  const [input, setInput] = useState("")
  const [result, setResult] = useState<{
    isValid: boolean
    error?: string
    formatted?: string
    lineCount?: number
  } | null>(null)

  const validateYaml = () => {
    try {
      // Simple YAML validation (basic implementation)
      const lines = input.split("\n")
      const errors: string[] = []

      // Check for basic YAML syntax
      lines.forEach((line, index) => {
        const trimmed = line.trim()
        if (trimmed && !trimmed.startsWith("#")) {
          // Check for proper key-value format
          if (trimmed.includes(":")) {
            const parts = trimmed.split(":")
            if (parts.length < 2) {
              errors.push(`Line ${index + 1}: Invalid key-value format`)
            }
          } else if (!trimmed.startsWith("-") && trimmed !== "---" && trimmed !== "...") {
            // Check if it's a list item or document separator
            if (!/^\s*$/.test(trimmed)) {
              errors.push(`Line ${index + 1}: Invalid YAML syntax`)
            }
          }
        }
      })

      if (errors.length > 0) {
        setResult({
          isValid: false,
          error: errors.join("\n"),
        })
      } else {
        setResult({
          isValid: true,
          formatted: input,
          lineCount: lines.length,
        })
      }
    } catch (error) {
      setResult({
        isValid: false,
        error: error instanceof Error ? error.message : "Invalid YAML format",
      })
    }
  }

  const copyToClipboard = () => {
    if (result?.formatted) {
      navigator.clipboard.writeText(result.formatted)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">YAML Validator</h1>
        <p className="text-gray-600">
          Check YAML syntax and validate structure for DevOps configurations and Kubernetes manifests.
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>YAML Input</CardTitle>
          <CardDescription>Enter your YAML content to validate</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder={`name: John Doe
age: 30
address:
  street: 123 Main St
  city: New York
  country: USA
hobbies:
  - reading
  - swimming
  - coding`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[300px] font-mono text-sm"
          />
          <Button onClick={validateYaml} className="mt-4 bg-green-600 hover:bg-green-700">
            Validate YAML
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {result.isValid ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <XCircle className="h-5 w-5 text-red-600" />
              )}
              Validation Result
            </CardTitle>
          </CardHeader>
          <CardContent>
            {result.isValid ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 font-medium">✅ Valid YAML format</p>
                <p className="text-green-700 text-sm mt-1">Lines: {result.lineCount}</p>
                <Button onClick={copyToClipboard} variant="outline" className="mt-3 bg-transparent">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy YAML
                </Button>
              </div>
            ) : (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 font-medium flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Invalid YAML format
                </p>
                <pre className="text-red-700 text-sm mt-2 whitespace-pre-wrap">{result.error}</pre>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>YAML Syntax Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold mb-2 text-green-600">Basic Syntax</h4>
              <ul className="space-y-1 text-gray-600">
                <li>
                  • Key-value pairs: <code>key: value</code>
                </li>
                <li>
                  • Lists: <code>- item1</code>
                </li>
                <li>• Nested objects: use indentation</li>
                <li>
                  • Comments: <code># This is a comment</code>
                </li>
                <li>
                  • Multi-line strings: <code>|</code> or <code>&gt;</code>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-green-600">Common Use Cases</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Kubernetes manifests</li>
                <li>• Docker Compose files</li>
                <li>• CI/CD pipeline configs</li>
                <li>• Application configuration</li>
                <li>• Ansible playbooks</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
