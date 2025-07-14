export type ToolSlug =
  | "json-formatter"
  | "base64-encoder"
  | "url-encoder"
  | "jwt-decoder"
  | "html-entities"
  | "regex-tester"
  | "uuid-generator"
  | "password-generator"
  | "lorem-generator"

export interface ToolMetadata {
  id: ToolSlug
  name: string
  description: string
  category: ToolCategory
  icon: string
  color: string
  keywords: string[]
  features: string[]
  isAvailable: boolean
}

export interface ToolCategory {
  id: string
  name: string
  description: string
}

export interface ToolResult {
  success: boolean
  data?: unknown
  error?: string
  metadata?: {
    processingTime: number
    inputSize: number
    outputSize: number
  }
}

export interface ToolOptions {
  [key: string]: unknown
}
