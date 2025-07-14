"use client"

import { cn } from "@/lib/utils"
import {
  FileJson,
  Lock,
  Link,
  Key,
  Code,
  Search,
  FileText,
  CheckSquare,
  Clock,
  Scissors,
  Hash,
  Shield,
  Type,
  Users,
  Database,
  ArrowRightLeft,
  Globe,
  Regex,
  Wrench,
  GitBranch,
  Package,
} from "lucide-react"

interface SidebarProps {
  selectedTool: string
  onToolSelect: (tool: string) => void
}

const toolCategories = [
  {
    title: "Text & Data Processing",
    tools: [
      { id: "json-formatter", name: "JSON Formatter", icon: FileJson, color: "text-blue-600" },
      { id: "base64-encoder", name: "Base64 Encoder/Decoder", icon: Lock, color: "text-green-600" },
      { id: "url-encoder", name: "URL Encoder/Decoder", icon: Link, color: "text-purple-600" },
      { id: "jwt-decoder", name: "JWT Decoder", icon: Key, color: "text-orange-600" },
      { id: "html-entities", name: "HTML Entities", icon: Code, color: "text-red-600" },
      { id: "regex-tester", name: "Regex Tester", icon: Search, color: "text-indigo-600" },
    ],
  },
  {
    title: "Validators & Formatters",
    tools: [
      { id: "json-validator", name: "JSON Schema Validator", icon: CheckSquare, color: "text-blue-600" },
      { id: "yaml-validator", name: "YAML Validator", icon: FileText, color: "text-green-600" },
      { id: "xml-validator", name: "XML Validator", icon: FileText, color: "text-purple-600" },
      { id: "cron-tester", name: "Cron Expression Tester", icon: Clock, color: "text-orange-600" },
      { id: "line-breaks", name: "Remove Line Breaks", icon: Scissors, color: "text-red-600" },
    ],
  },
  {
    title: "Generators",
    tools: [
      { id: "uuid-generator", name: "UUID Generator", icon: Hash, color: "text-blue-600" },
      { id: "password-generator", name: "Password Generator", icon: Shield, color: "text-green-600" },
      { id: "lorem-generator", name: "Lorem Ipsum Generator", icon: Type, color: "text-purple-600" },
      { id: "user-generator", name: "Random User Generator", icon: Users, color: "text-orange-600" },
      { id: "json-generator", name: "JSON Generator", icon: Database, color: "text-red-600" },
    ],
  },
  {
    title: "Converters",
    tools: [
      { id: "csv-json", name: "CSV to JSON", icon: ArrowRightLeft, color: "text-blue-600" },
      { id: "json-csv", name: "JSON to CSV", icon: ArrowRightLeft, color: "text-green-600" },
      { id: "html-jsx", name: "HTML to JSX", icon: ArrowRightLeft, color: "text-purple-600" },
      { id: "markdown-html", name: "Markdown to HTML", icon: ArrowRightLeft, color: "text-orange-600" },
      { id: "sql-mongo", name: "SQL to MongoDB", icon: ArrowRightLeft, color: "text-red-600" },
    ],
  },
  {
    title: "Advanced Tools",
    tools: [
      { id: "api-tester", name: "REST API Tester", icon: Globe, color: "text-blue-600" },
      { id: "regex-generator", name: "AI Regex Generator", icon: Regex, color: "text-green-600" },
      { id: "jwt-builder", name: "JWT Builder", icon: Wrench, color: "text-purple-600" },
      { id: "git-commands", name: "Git Command Generator", icon: GitBranch, color: "text-orange-600" },
      { id: "dockerfile", name: "Dockerfile Generator", icon: Package, color: "text-red-600" },
    ],
  },
]

export function Sidebar({ selectedTool, onToolSelect }: SidebarProps) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="flex-1 overflow-y-auto py-4">
        {toolCategories.map((category) => (
          <div key={category.title} className="mb-6">
            <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{category.title}</h3>
            <div className="space-y-1">
              {category.tools.map((tool) => {
                const Icon = tool.icon
                return (
                  <button
                    key={tool.id}
                    onClick={() => onToolSelect(tool.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-2 text-sm text-left hover:bg-gray-50 transition-colors",
                      selectedTool === tool.id && "bg-blue-50 border-r-2 border-blue-600",
                    )}
                  >
                    <Icon className={cn("h-4 w-4", tool.color)} />
                    <span className={cn("text-gray-700", selectedTool === tool.id && "text-blue-900 font-medium")}>
                      {tool.name}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 p-4 space-y-2">
        <button className="w-full flex items-center gap-3 px-2 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded">
          <div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
            <span className="text-xs text-white font-bold">?</span>
          </div>
          Help Center
        </button>
        <button className="w-full flex items-center gap-3 px-2 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded">
          <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-xs text-white font-bold">@</span>
          </div>
          Contact us
        </button>
      </div>
    </div>
  )
}
