"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Send, Copy, Plus, Trash2 } from "lucide-react"

interface Header {
  key: string
  value: string
}

export function ApiTester() {
  const [url, setUrl] = useState("")
  const [method, setMethod] = useState("GET")
  const [headers, setHeaders] = useState<Header[]>([{ key: "", value: "" }])
  const [body, setBody] = useState("")
  const [response, setResponse] = useState<{
    status: number
    statusText: string
    headers: Record<string, string>
    data: string
    time: number
  } | null>(null)
  const [loading, setLoading] = useState(false)

  const addHeader = () => {
    setHeaders([...headers, { key: "", value: "" }])
  }

  const removeHeader = (index: number) => {
    setHeaders(headers.filter((_, i) => i !== index))
  }

  const updateHeader = (index: number, field: "key" | "value", value: string) => {
    const newHeaders = [...headers]
    newHeaders[index][field] = value
    setHeaders(newHeaders)
  }

  const sendRequest = async () => {
    if (!url) return

    setLoading(true)
    const startTime = Date.now()

    try {
      const requestHeaders: Record<string, string> = {}
      headers.forEach((header) => {
        if (header.key && header.value) {
          requestHeaders[header.key] = header.value
        }
      })

      const options: RequestInit = {
        method,
        headers: requestHeaders,
      }

      if (method !== "GET" && method !== "HEAD" && body) {
        options.body = body
        if (!requestHeaders["Content-Type"]) {
          requestHeaders["Content-Type"] = "application/json"
        }
      }

      const res = await fetch(url, options)
      const endTime = Date.now()

      const responseHeaders: Record<string, string> = {}
      res.headers.forEach((value, key) => {
        responseHeaders[key] = value
      })

      const responseText = await res.text()

      setResponse({
        status: res.status,
        statusText: res.statusText,
        headers: responseHeaders,
        data: responseText,
        time: endTime - startTime,
      })
    } catch (error) {
      const endTime = Date.now()
      setResponse({
        status: 0,
        statusText: "Network Error",
        headers: {},
        data: error instanceof Error ? error.message : "Request failed",
        time: endTime - startTime,
      })
    } finally {
      setLoading(false)
    }
  }

  const copyResponse = () => {
    if (response) {
      navigator.clipboard.writeText(response.data)
    }
  }

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return "bg-green-100 text-green-800"
    if (status >= 300 && status < 400) return "bg-blue-100 text-blue-800"
    if (status >= 400 && status < 500) return "bg-yellow-100 text-yellow-800"
    if (status >= 500) return "bg-red-100 text-red-800"
    return "bg-gray-100 text-gray-800"
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">REST API Tester</h1>
        <p className="text-gray-600">Test REST APIs without additional software - a lightweight Postman alternative.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Request</CardTitle>
              <CardDescription>Configure your API request</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Select value={method} onValueChange={setMethod}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GET">GET</SelectItem>
                    <SelectItem value="POST">POST</SelectItem>
                    <SelectItem value="PUT">PUT</SelectItem>
                    <SelectItem value="PATCH">PATCH</SelectItem>
                    <SelectItem value="DELETE">DELETE</SelectItem>
                    <SelectItem value="HEAD">HEAD</SelectItem>
                    <SelectItem value="OPTIONS">OPTIONS</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  placeholder="https://api.example.com/users"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-1"
                />
              </div>

              <Button onClick={sendRequest} disabled={!url || loading} className="w-full bg-blue-600 hover:bg-blue-700">
                {loading ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Request
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Headers
                <Button size="sm" variant="outline" onClick={addHeader}>
                  <Plus className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {headers.map((header, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="Header name"
                      value={header.key}
                      onChange={(e) => updateHeader(index, "key", e.target.value)}
                    />
                    <Input
                      placeholder="Header value"
                      value={header.value}
                      onChange={(e) => updateHeader(index, "value", e.target.value)}
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removeHeader(index)}
                      disabled={headers.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {(method === "POST" || method === "PUT" || method === "PATCH") && (
            <Card>
              <CardHeader>
                <CardTitle>Request Body</CardTitle>
                <CardDescription>JSON, XML, or plain text</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder='{"name": "John", "email": "john@example.com"}'
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="min-h-[200px] font-mono text-sm"
                />
              </CardContent>
            </Card>
          )}
        </div>

        <div>
          {response && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Response
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(response.status)}>
                      {response.status} {response.statusText}
                    </Badge>
                    <span className="text-sm text-gray-500">{response.time}ms</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="body" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="body">Response Body</TabsTrigger>
                    <TabsTrigger value="headers">Headers</TabsTrigger>
                  </TabsList>

                  <TabsContent value="body" className="space-y-4">
                    <Textarea
                      value={response.data}
                      readOnly
                      className="min-h-[400px] font-mono text-sm bg-gray-50"
                      placeholder="Response body will appear here..."
                    />
                    <Button onClick={copyResponse} variant="outline">
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Response
                    </Button>
                  </TabsContent>

                  <TabsContent value="headers" className="space-y-2">
                    <div className="max-h-[400px] overflow-y-auto">
                      {Object.entries(response.headers).map(([key, value]) => (
                        <div key={key} className="flex gap-2 p-2 bg-gray-50 rounded text-sm">
                          <span className="font-medium text-gray-700 min-w-0 flex-shrink-0">{key}:</span>
                          <span className="text-gray-600 break-all">{value}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Common API Testing Scenarios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-semibold mb-2 text-blue-600">Authentication</h4>
              <ul className="space-y-1 text-gray-600">
                <li>
                  • Bearer Token: <code>Authorization: Bearer token</code>
                </li>
                <li>
                  • API Key: <code>X-API-Key: your-key</code>
                </li>
                <li>
                  • Basic Auth: <code>Authorization: Basic base64</code>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-green-600">Content Types</h4>
              <ul className="space-y-1 text-gray-600">
                <li>
                  • JSON: <code>application/json</code>
                </li>
                <li>
                  • Form: <code>application/x-www-form-urlencoded</code>
                </li>
                <li>
                  • XML: <code>application/xml</code>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-purple-600">Status Codes</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• 2xx: Success</li>
                <li>• 3xx: Redirection</li>
                <li>• 4xx: Client Error</li>
                <li>• 5xx: Server Error</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
