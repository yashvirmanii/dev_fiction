"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, ArrowRightLeft } from "lucide-react"

export function HtmlJsxConverter() {
  const [htmlInput, setHtmlInput] = useState("")
  const [jsxOutput, setJsxOutput] = useState("")

  const convertToJsx = () => {
    try {
      const jsx = htmlInput
        // Convert class to className
        .replace(/\bclass=/g, 'className=')
        // Convert for to htmlFor
        .replace(/\bfor=/g, 'htmlFor=')
        // Convert style strings to objects (basic)
        .replace(/style="([^"]+)"/g, (match, styles) => {
          const styleObj = styles.split(';')
            .filter((s: string) => s.trim())
            .map((s: string) => {
              const [prop, value] = s.split(':').map((p: string) => p.trim())
              const camelProp = prop.replace(/-([a-z])/g, (g: string) => g[1].toUpperCase())
              return `${camelProp}: "${value}"`
            })
            .join(', ')
          return `style={{${styleObj}}}`
        })
        // Convert self-closing tags
        .replace(/<(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)([^>]*?)>/g, '<$1$2 />')
        // Convert boolean attributes
        .replace(/\b(checked|selected|disabled|readonly|multiple|autofocus|autoplay|controls|defer|hidden|loop|muted|open|required|reversed)\b/g, '$1={true}')
        // Convert data attributes to camelCase
        .replace(/data-([a-z-]+)=/g, (match, attr) => {
          const camelAttr = attr.replace(/-([a-z])/g, (g: string) => g[1].toUpperCase())
          return `data${camelAttr.charAt(0).toUpperCase() + camelAttr.slice(1)}=`
        })

      setJsxOutput(jsx)
    } catch (error) {
      setJsxOutput("Error: " + (error instanceof Error ? error.message : "Conversion failed"))
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsxOutput)
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">HTML to JSX Converter</h1>
        <p className="text-gray-600">
          Convert HTML markup to JSX for React development and component creation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>HTML Input</CardTitle>
            <CardDescription>Enter your HTML markup</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder={`<div class="container">
  <h1>Hello World</h1>
  <p style="color: red; font-size: 16px;">This is a paragraph</p>
  <input type="text" placeholder="Enter name" required>
  <label for="email">Email:</label>
  <input type="email" id="email" name="email">
  <img src="image.jpg" alt="Description">
</div>`}
              value={htmlInput}
              onChange={(e) => setHtmlInput(e.target.value)}
              className="min-h-[400px] font-mono text-sm"
            />
            <Button onClick={convertToJsx} className="mt-4 bg-purple-600 hover:bg-purple-700">
              <ArrowRightLeft className="h-4 w-4 mr-2" />
              Convert to JSX
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>JSX Output</CardTitle>
            <CardDescription>Converted JSX code</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={jsxOutput}
              readOnly
              className="min-h-[400px] font-mono text-sm bg-gray-50"
              placeholder="JSX output will appear here..."
            />
            <Button 
              onClick={copyToClipboard} 
              variant="outline" 
              className="mt-4 bg-transparent"
              disabled={!jsxOutput}
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy JSX
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>HTML to JSX Conversion Rules</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold mb-2 text-purple-600">Attribute Changes</h4>
              <ul className="space-y-1 text-gray-600">
                <li className="list-item">class → className</li>
                <li className="list-item">for → htmlFor</li>
                <li className="list-item">style="..." → style={{...\"}}</li>\
                <li className=\"list-item\">Boolean attributes get {true}</li>\
                <li className=\"list-item\">Self-closing tags get /></li>\
              </ul>\
            </div>\
            <div>\
              <h4 className=\"font-semibold mb-2 text-purple-600\">Common Use Cases</h4>\
              <ul className=\"space-y-1 text-gray-600">\
                <li className=\"list-item\">Converting HTML templates to React</li>\
                <li className=\"list-item\">Migrating from vanilla HTML</li>\
                <li className=\"list-item\">Creating React components</li>\
                <li className=\"list-item\">Converting email templates</li>\
                <li className=\"list-item\">Porting existing designs</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
