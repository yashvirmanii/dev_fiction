import type { ToolMetadata } from "@/types/tools"

interface ToolContainerProps {
  tool: ToolMetadata
}

export function ToolContainer({ tool }: ToolContainerProps) {
  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{tool.name}</h1>
          <p className="text-gray-600">{tool.description}</p>
        </div>
        {/* Tool content would be rendered here based on the tool type */}
      </div>
    </div>
  )
}
