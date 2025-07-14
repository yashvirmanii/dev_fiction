"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, XCircle, AlertCircle } from "lucide-react"

export function JsonValidator() {
  const [jsonData, setJsonData] = useState("")
  const [schema, setSchema] = useState("")
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean
    errors: string[]
    message: string
  } | null>(null)

  const validateJson = () => {
    try {
      const parsedData = JSON.parse(jsonData)
      const parsedSchema = schema ? JSON.parse(schema) : null

      // Basic JSON validation
      if (!parsedSchema) {
        setValidationResult({
          isValid: true,
          errors: [],
          message: "Valid JSON format",
        })
        return
      }

      // Simple schema validation (basic implementation)
      const errors = validateAgainstSchema(parsedData, parsedSchema)

      setValidationResult({
        isValid: errors.length === 0,
        errors,
        message: errors.length === 0 ? "Valid against schema" : "Schema validation failed",
      })
    } catch (error) {
      setValidationResult({
        isValid: false,
        errors: [error instanceof Error ? error.message : "Invalid JSON"],
        message: "Invalid JSON format",
      })
    }
  }

  const validateAgainstSchema = (data: any, schema: any): string[] => {
    const errors: string[] = []

    if (schema.type) {
      const actualType = Array.isArray(data) ? "array" : typeof data
      if (actualType !== schema.type) {
        errors.push(`Expected type ${schema.type}, got ${actualType}`)
      }
    }

    if (schema.required && typeof data === "object" && !Array.isArray(data)) {
      schema.required.forEach((field: string) => {
        if (!(field in data)) {
          errors.push(`Missing required field: ${field}`)
        }
      })
    }

    return errors
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">JSON Schema Validator</h1>
        <p className="text-gray-600">
          Validate JSON data against a schema to ensure data integrity and structure compliance.
        </p>
      </div>

      <Tabs defaultValue="data" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="data">JSON Data</TabsTrigger>
          <TabsTrigger value="schema">JSON Schema</TabsTrigger>
        </TabsList>

        <TabsContent value="data" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>JSON Data</CardTitle>
              <CardDescription>Enter the JSON data to validate</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder='{"name": "John", "age": 30, "email": "john@example.com"}'
                value={jsonData}
                onChange={(e) => setJsonData(e.target.value)}
                className="min-h-[300px] font-mono text-sm"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schema" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>JSON Schema (Optional)</CardTitle>
              <CardDescription>Enter a JSON schema to validate against</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder='{"type": "object", "required": ["name", "age"], "properties": {"name": {"type": "string"}, "age": {"type": "number"}}}'
                value={schema}
                onChange={(e) => setSchema(e.target.value)}
                className="min-h-[300px] font-mono text-sm"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6">
        <Button onClick={validateJson} className="bg-blue-600 hover:bg-blue-700">
          Validate JSON
        </Button>
      </div>

      {validationResult && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {validationResult.isValid ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <XCircle className="h-5 w-5 text-red-600" />
              )}
              Validation Result
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`p-4 rounded-lg ${validationResult.isValid ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}
            >
              <p className={`font-medium ${validationResult.isValid ? "text-green-800" : "text-red-800"}`}>
                {validationResult.message}
              </p>
              {validationResult.errors.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {validationResult.errors.map((error, index) => (
                    <li key={index} className="text-red-700 text-sm flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      {error}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
