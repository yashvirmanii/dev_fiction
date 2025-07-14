import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wrench, ExternalLink } from "lucide-react"

interface DefaultToolProps {
  toolId: string
}

const toolInfo: Record<string, { name: string; description: string; features: string[] }> = {
  "json-validator": {
    name: "JSON Schema Validator",
    description: "Validate JSON data against a schema to ensure data integrity and structure compliance.",
    features: ["Schema validation", "Error reporting", "JSON formatting", "Schema generation"],
  },
  "yaml-validator": {
    name: "YAML Validator",
    description: "Check YAML syntax and validate structure for DevOps configurations and Kubernetes manifests.",
    features: ["Syntax validation", "Error highlighting", "YAML formatting", "Multi-document support"],
  },
  "xml-validator": {
    name: "XML Validator & Beautifier",
    description: "Validate XML structure and format XML documents for better readability.",
    features: ["XML validation", "Pretty formatting", "Error detection", "Namespace support"],
  },
  "cron-tester": {
    name: "Cron Expression Tester",
    description: "Test and validate cron expressions to schedule tasks and jobs accurately.",
    features: ["Expression validation", "Next run times", "Human-readable format", "Common patterns"],
  },
  "line-breaks": {
    name: "Remove Line Breaks Tool",
    description: "Clean up text by removing unwanted line breaks and formatting.",
    features: ["Line break removal", "Text cleaning", "Whitespace normalization", "Bulk processing"],
  },
  "user-generator": {
    name: "Random User Generator",
    description: "Generate fake user data including names, emails, addresses, and avatars for testing.",
    features: ["Realistic user data", "Multiple formats", "Bulk generation", "Custom fields"],
  },
  "json-generator": {
    name: "JSON Generator",
    description: "Create structured JSON data with custom schemas for API testing and development.",
    features: ["Custom schemas", "Nested objects", "Array generation", "Data types"],
  },
  "csv-json": {
    name: "CSV to JSON Converter",
    description: "Convert CSV spreadsheet data into JSON format for API consumption.",
    features: ["Header mapping", "Data type detection", "Nested structures", "Bulk conversion"],
  },
  "json-csv": {
    name: "JSON to CSV Converter",
    description: "Transform JSON data into CSV format for Excel export and reporting.",
    features: ["Flat structure", "Custom delimiters", "Header generation", "Data export"],
  },
  "html-jsx": {
    name: "HTML to JSX Converter",
    description: "Convert HTML markup to JSX for React development and component creation.",
    features: ["Attribute conversion", "Event handlers", "Component structure", "Syntax highlighting"],
  },
  "markdown-html": {
    name: "Markdown to HTML Converter",
    description: "Transform Markdown text into HTML for static sites, documentation, and blogs.",
    features: ["GitHub flavored markdown", "Syntax highlighting", "Table support", "Custom styling"],
  },
  "sql-mongo": {
    name: "SQL to MongoDB Query Converter",
    description: "Convert SQL queries to MongoDB query syntax for NoSQL database migration.",
    features: ["Query translation", "Aggregation pipelines", "Index suggestions", "Syntax validation"],
  },
  "api-tester": {
    name: "Online REST API Tester",
    description: "Test REST APIs without additional software - a lightweight Postman alternative.",
    features: ["HTTP methods", "Headers management", "Request/response", "Authentication"],
  },
  "regex-generator": {
    name: "AI Regex Generator",
    description: "Convert natural language descriptions into regular expressions using AI assistance.",
    features: ["Natural language input", "Pattern explanation", "Test cases", "Common patterns"],
  },
  "jwt-builder": {
    name: "JWT Builder & Signer",
    description: "Create and sign JWT tokens with custom payloads and secret keys for secure APIs.",
    features: ["Token creation", "Custom claims", "Algorithm selection", "Signature verification"],
  },
  "git-commands": {
    name: "Git Command Generator",
    description: "Visual interface to generate Git commands for beginners and complex operations.",
    features: ["Visual interface", "Command explanation", "Common workflows", "Best practices"],
  },
  dockerfile: {
    name: "Dockerfile Generator",
    description: "Generate optimized Dockerfiles for different programming languages and frameworks.",
    features: ["Multi-stage builds", "Best practices", "Security optimization", "Size optimization"],
  },
}

export function DefaultTool({ toolId }: DefaultToolProps) {
  const tool = toolInfo[toolId] || {
    name: "Developer Tool",
    description: "This developer utility tool is coming soon.",
    features: ["Coming soon"],
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{tool.name}</h1>
        <p className="text-gray-600">{tool.description}</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="h-5 w-5 text-blue-600" />
            Tool Under Development
          </CardTitle>
          <CardDescription>This tool is currently being developed and will be available soon.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-blue-900 mb-2">Planned Features:</h4>
            <ul className="space-y-1">
              {tool.features.map((feature, index) => (
                <li key={index} className="text-blue-800 text-sm">
                  • {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <ExternalLink className="h-4 w-4" />
              Request Feature
            </Button>
            <Button variant="outline">Get Notified</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Available Tools</CardTitle>
          <CardDescription>Try these fully functional developer tools</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2 text-green-600">Ready to Use</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• JSON Formatter / Beautifier</li>
                <li>• Base64 Encoder/Decoder</li>
                <li>• URL Encoder/Decoder</li>
                <li>• JWT Decoder</li>
                <li>• HTML Entities Encoder/Decoder</li>
                <li>• Regex Tester & Builder</li>
                <li>• UUID Generator</li>
                <li>• Password Generator</li>
                <li>• Lorem Ipsum Generator</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-orange-600">Coming Soon</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• JSON Schema Validator</li>
                <li>• YAML Validator</li>
                <li>• XML Validator</li>
                <li>• Cron Expression Tester</li>
                <li>• Data Converters</li>
                <li>• API Testing Tools</li>
                <li>• And many more...</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
