"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

export function RegexTester() {
  const [pattern, setPattern] = useState("")
  const [testString, setTestString] = useState("")
  const [flags, setFlags] = useState({ g: true, i: false, m: false })
  const [matches, setMatches] = useState<string[]>([])
  const [isValid, setIsValid] = useState(true)
  const [error, setError] = useState("")

  const testRegex = () => {
    try {
      const flagString = Object.entries(flags)
        .filter(([_, enabled]) => enabled)
        .map(([flag, _]) => flag)
        .join("")

      const regex = new RegExp(pattern, flagString)
      const foundMatches = testString.match(regex) || []

      setMatches(foundMatches)
      setIsValid(true)
      setError("")
    } catch (err) {
      setIsValid(false)
      setError("Invalid regular expression")
      setMatches([])
    }
  }

  const handleFlagChange = (flag: string, checked: boolean) => {
    setFlags((prev) => ({ ...prev, [flag]: checked }))
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Regex Tester & Builder</h1>
        <p className="text-gray-600">
          Test and debug regular expressions with real-time highlighting and match results.
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Regular Expression</CardTitle>
            <CardDescription>Enter your regex pattern</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                placeholder="Enter regex pattern (e.g., \d+|\w+@\w+\.\w+)"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                className={`font-mono ${!isValid ? "border-red-500" : ""}`}
              />

              <div className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="global"
                    checked={flags.g}
                    onCheckedChange={(checked) => handleFlagChange("g", checked as boolean)}
                  />
                  <label htmlFor="global" className="text-sm">
                    Global (g)
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="ignoreCase"
                    checked={flags.i}
                    onCheckedChange={(checked) => handleFlagChange("i", checked as boolean)}
                  />
                  <label htmlFor="ignoreCase" className="text-sm">
                    Ignore Case (i)
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="multiline"
                    checked={flags.m}
                    onCheckedChange={(checked) => handleFlagChange("m", checked as boolean)}
                  />
                  <label htmlFor="multiline" className="text-sm">
                    Multiline (m)
                  </label>
                </div>
              </div>

              {error && <div className="text-red-600 text-sm bg-red-50 p-2 rounded">{error}</div>}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Test String</CardTitle>
            <CardDescription>Enter text to test against your regex</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Enter test string here..."
              value={testString}
              onChange={(e) => setTestString(e.target.value)}
              className="min-h-[150px]"
            />
            <Button onClick={testRegex} className="mt-4 bg-indigo-600 hover:bg-indigo-700">
              Test Regex
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Matches</CardTitle>
            <CardDescription>
              {matches.length > 0
                ? `Found ${matches.length} match${matches.length > 1 ? "es" : ""}`
                : "No matches found"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {matches.length > 0 ? (
              <div className="space-y-2">
                {matches.map((match, index) => (
                  <Badge key={index} variant="secondary" className="mr-2 mb-2">
                    {match}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No matches to display</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Common Regex Patterns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div>
                  <strong>Email:</strong>
                  <code className="block bg-gray-100 p-1 rounded mt-1 text-xs">[\w\.-]+@[\w\.-]+\.\w+</code>
                </div>
                <div>
                  <strong>Phone Number:</strong>
                  <code className="block bg-gray-100 p-1 rounded mt-1 text-xs">
                    $$\d{3}$$\s\d{3}-\d{4}
                  </code>
                </div>
                <div>
                  <strong>URL:</strong>
                  <code className="block bg-gray-100 p-1 rounded mt-1 text-xs">https?://[\w\.-]+\.\w+</code>
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <strong>Numbers:</strong>
                  <code className="block bg-gray-100 p-1 rounded mt-1 text-xs">\d+</code>
                </div>
                <div>
                  <strong>Words:</strong>
                  <code className="block bg-gray-100 p-1 rounded mt-1 text-xs">\w+</code>
                </div>
                <div>
                  <strong>Whitespace:</strong>
                  <code className="block bg-gray-100 p-1 rounded mt-1 text-xs">\s+</code>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
