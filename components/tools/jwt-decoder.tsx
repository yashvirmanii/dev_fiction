"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, AlertCircle } from "lucide-react"

export function JwtDecoder() {
  const [input, setInput] = useState("")
  const [header, setHeader] = useState("")
  const [payload, setPayload] = useState("")
  const [error, setError] = useState("")

  const decodeJwt = () => {
    try {
      const parts = input.split(".")
      if (parts.length !== 3) {
        throw new Error("Invalid JWT format")
      }

      const decodedHeader = JSON.parse(atob(parts[0]))
      const decodedPayload = JSON.parse(atob(parts[1]))

      setHeader(JSON.stringify(decodedHeader, null, 2))
      setPayload(JSON.stringify(decodedPayload, null, 2))
      setError("")
    } catch (err) {
      setError("Invalid JWT token format")
      setHeader("")
      setPayload("")
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">JWT Decoder</h1>
        <p className="text-gray-600">
          Decode and inspect JWT (JSON Web Token) payloads. Perfect for API testing and debugging authentication tokens.
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>JWT Token Input</CardTitle>
          <CardDescription>Paste your JWT token here to decode it</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[100px] font-mono text-sm"
          />
          <Button onClick={decodeJwt} className="mt-4 bg-orange-600 hover:bg-orange-700">
            Decode JWT
          </Button>
          {error && (
            <div className="mt-4 flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Header</CardTitle>
            <CardDescription>JWT header information</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={header}
              readOnly
              className="min-h-[200px] font-mono text-sm bg-gray-50"
              placeholder="JWT header will appear here..."
            />
            <Button onClick={() => copyToClipboard(header)} variant="outline" className="mt-4" disabled={!header}>
              <Copy className="h-4 w-4 mr-2" />
              Copy Header
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Payload</CardTitle>
            <CardDescription>JWT payload data</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={payload}
              readOnly
              className="min-h-[200px] font-mono text-sm bg-gray-50"
              placeholder="JWT payload will appear here..."
            />
            <Button onClick={() => copyToClipboard(payload)} variant="outline" className="mt-4" disabled={!payload}>
              <Copy className="h-4 w-4 mr-2" />
              Copy Payload
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>About JWT Tokens</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2 text-orange-600">Header</h4>
              <p className="text-gray-600">Contains token type and signing algorithm information.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-orange-600">Payload</h4>
              <p className="text-gray-600">
                Contains claims and user data. This is what you typically need to inspect.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-orange-600">Signature</h4>
              <p className="text-gray-600">Used to verify the token integrity. Cannot be decoded without the secret.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
