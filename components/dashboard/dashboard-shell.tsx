"use client"

import { useState } from "react"
import { Sidebar } from "@/components/navigation/sidebar"
import { Header } from "@/components/navigation/header"
import { ToolContent } from "@/components/tools/tool-content"
import { useLocalStorage } from "@/hooks/use-local-storage"
import type { ToolSlug } from "@/types/tools"

export function DashboardShell() {
  const [selectedTool, setSelectedTool] = useLocalStorage<ToolSlug>("selected-tool", "json-formatter")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        selectedTool={selectedTool}
        onToolSelect={(tool) => {
          setSelectedTool(tool)
          setSidebarOpen(false) // Close sidebar on mobile after selection
        }}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-auto">
          <ToolContent selectedTool={selectedTool} />
        </main>
      </div>
    </div>
  )
}
