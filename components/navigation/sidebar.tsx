"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { toolsRegistry, toolCategories } from "@/lib/tools/tool-registry"
import type { ToolSlug } from "@/types/tools"
import * as Icons from "lucide-react"

interface SidebarProps {
  selectedTool: ToolSlug
  onToolSelect: (tool: ToolSlug) => void
  isOpen: boolean
  onToggle: () => void
}

export function Sidebar({ selectedTool, onToolSelect, isOpen }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden" />}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-background border-r border-border flex flex-col transition-transform duration-200 ease-in-out md:relative md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex-1 overflow-y-auto py-4">
          {toolCategories.map((category) => {
            const categoryTools = toolsRegistry.filter((tool) => tool.category.id === category.id)

            return (
              <div key={category.id} className="mb-6">
                <h3 className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  {category.name}
                </h3>
                <div className="space-y-1">
                  {categoryTools.map((tool) => {
                    const IconComponent = Icons[tool.icon as keyof typeof Icons] as React.ComponentType<{
                      className?: string
                    }>

                    return (
                      <button
                        key={tool.id}
                        onClick={() => onToolSelect(tool.id)}
                        className={cn(
                          "w-full flex items-center gap-3 px-4 py-2 text-sm text-left hover:bg-accent transition-colors",
                          selectedTool === tool.id && "bg-accent border-r-2 border-primary",
                        )}
                      >
                        <IconComponent className={cn("h-4 w-4", tool.color)} />
                        <span className={cn("text-foreground", selectedTool === tool.id && "font-medium")}>
                          {tool.name}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        <div className="border-t border-border p-4 space-y-2">
          <button className="w-full flex items-center gap-3 px-2 py-2 text-sm text-muted-foreground hover:bg-accent rounded">
            <div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">?</span>
            </div>
            Help Center
          </button>
          <button className="w-full flex items-center gap-3 px-2 py-2 text-sm text-muted-foreground hover:bg-accent rounded">
            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">@</span>
            </div>
            Contact us
          </button>
        </div>
      </div>
    </>
  )
}
