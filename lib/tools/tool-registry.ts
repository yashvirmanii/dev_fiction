import type { ToolMetadata, ToolSlug, ToolCategory } from "@/types/tools"

export const toolCategories: ToolCategory[] = [
  {
    id: "text-processing",
    name: "Text & Data Processing",
    description: "Tools for formatting, encoding, and processing text data",
  },
  {
    id: "validators",
    name: "Validators & Formatters",
    description: "Validate and format various data formats",
  },
  {
    id: "generators",
    name: "Generators",
    description: "Generate random data for testing and development",
  },
  {
    id: "converters",
    name: "Converters",
    description: "Convert between different data formats",
  },
  {
    id: "advanced",
    name: "Advanced Tools",
    description: "Advanced utilities for developers",
  },
]

export const toolsRegistry: ToolMetadata[] = [
  {
    id: "json-formatter",
    name: "JSON Formatter",
    description: "Format, validate, and beautify JSON data",
    category: toolCategories[0],
    icon: "FileJson",
    color: "text-blue-600",
    keywords: ["json", "formatter", "beautifier", "validator"],
    features: ["Format JSON", "Validate syntax", "Minify JSON", "Error detection"],
    isAvailable: true,
  },
  {
    id: "base64-encoder",
    name: "Base64 Encoder/Decoder",
    description: "Encode and decode Base64 strings",
    category: toolCategories[0],
    icon: "Lock",
    color: "text-green-600",
    keywords: ["base64", "encoder", "decoder", "encoding"],
    features: ["Text to Base64", "Base64 to text", "File encoding", "URL safe encoding"],
    isAvailable: true,
  },
  {
    id: "url-encoder",
    name: "URL Encoder/Decoder",
    description: "Convert strings to URL-safe format and vice versa",
    category: toolCategories[0],
    icon: "Link",
    color: "text-purple-600",
    keywords: ["url", "encoder", "decoder", "uri"],
    features: ["URL encoding", "URL decoding", "Query parameters", "Safe URLs"],
    isAvailable: true,
  },
  {
    id: "jwt-decoder",
    name: "JWT Decoder",
    description: "View JWT payloads during API testing",
    category: toolCategories[0],
    icon: "Key",
    color: "text-orange-600",
    keywords: ["jwt", "decoder", "token", "authentication"],
    features: ["Decode JWT", "View payload", "Header inspection", "Token validation"],
    isAvailable: true,
  },
  {
    id: "html-entities",
    name: "HTML Entities Encoder/Decoder",
    description: "Encode special characters in HTML, decode them too",
    category: toolCategories[0],
    icon: "Code",
    color: "text-red-600",
    keywords: ["html", "entities", "encoder", "decoder"],
    features: ["HTML encoding", "HTML decoding", "Special characters", "XSS prevention"],
    isAvailable: true,
  },
  {
    id: "regex-tester",
    name: "Regex Tester & Builder",
    description: "Write and test regular expressions with highlighting",
    category: toolCategories[0],
    icon: "Search",
    color: "text-indigo-600",
    keywords: ["regex", "regular expressions", "pattern", "testing"],
    features: ["Pattern testing", "Match highlighting", "Flags support", "Common patterns"],
    isAvailable: true,
  },
  {
    id: "uuid-generator",
    name: "UUID / GUID Generator",
    description: "Generate random identifiers for projects",
    category: toolCategories[2],
    icon: "Hash",
    color: "text-blue-600",
    keywords: ["uuid", "guid", "generator", "identifier"],
    features: ["UUID v4", "Bulk generation", "Copy to clipboard", "Unique IDs"],
    isAvailable: true,
  },
  {
    id: "password-generator",
    name: "Random Password Generator",
    description: "For app signups, demos, etc",
    category: toolCategories[2],
    icon: "Shield",
    color: "text-green-600",
    keywords: ["password", "generator", "random", "security"],
    features: ["Custom length", "Character sets", "Strength meter", "Secure passwords"],
    isAvailable: true,
  },
  {
    id: "lorem-generator",
    name: "Lorem Ipsum Generator",
    description: "Generate dummy text",
    category: toolCategories[2],
    icon: "Type",
    color: "text-purple-600",
    keywords: ["lorem", "ipsum", "dummy text", "placeholder"],
    features: ["Words/sentences/paragraphs", "Custom count", "Lorem ipsum", "Placeholder text"],
    isAvailable: true,
  },
]

export function getToolBySlug(slug: ToolSlug): ToolMetadata | undefined {
  return toolsRegistry.find((tool) => tool.id === slug)
}

export function getAllToolSlugs(): ToolSlug[] {
  return toolsRegistry.map((tool) => tool.id)
}

export function getToolsByCategory(categoryId: string): ToolMetadata[] {
  return toolsRegistry.filter((tool) => tool.category.id === categoryId)
}

export function getAvailableTools(): ToolMetadata[] {
  return toolsRegistry.filter((tool) => tool.isAvailable)
}
