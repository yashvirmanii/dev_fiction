import { Suspense } from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ToolContainer } from "@/components/tools/tool-container"
import { ToolSkeleton } from "@/components/tools/tool-skeleton"
import { getToolBySlug, getAllToolSlugs } from "@/lib/tools/tool-registry"
import type { ToolSlug } from "@/types/tools"

interface ToolPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const slugs = getAllToolSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const tool = getToolBySlug(params.slug as ToolSlug)

  if (!tool) {
    return {
      title: "Tool Not Found",
    }
  }

  return {
    title: tool.name,
    description: tool.description,
    keywords: tool.keywords,
    openGraph: {
      title: `${tool.name} | DevTools Pro`,
      description: tool.description,
      type: "website",
    },
  }
}

export default function ToolPage({ params }: ToolPageProps) {
  const tool = getToolBySlug(params.slug as ToolSlug)

  if (!tool) {
    notFound()
  }

  return (
    <Suspense fallback={<ToolSkeleton />}>
      <ToolContainer tool={tool} />
    </Suspense>
  )
}
