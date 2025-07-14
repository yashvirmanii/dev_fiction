"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { useToast } from "@/hooks/use-toast"
import { Copy, Download, Upload, Loader2 } from "lucide-react"
import { useTool } from "@/hooks/use-tool"

const formSchema = z.object({
  input: z.string().min(1, "Please enter JSON data"),
  indent: z.number().min(0).max(8).default(2),
  minify: z.boolean().default(false),
})

type FormData = z.infer<typeof formSchema>

export function JsonFormatterTool() {
  const { toast } = useToast()
  const { processData, isLoading } = useTool("json-formatter")
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: "",
      indent: 2,
      minify: false,
    },
  })

  const onSubmit = async (data: FormData) => {
    try {
      const result = await processData(data.input, {
        indent: data.indent,
        minify: data.minify,
      })

      if (result.success && result.data) {
        setOutput(result.data.formatted)
        setError("")
        toast({
          title: "Success",
          description: "JSON formatted successfully",
        })
      } else {
        setError(result.error || "Failed to format JSON")
        setOutput("")
      }
    } catch (err) {
      setError("An unexpected error occurred")
      setOutput("")
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output)
      toast({
        title: "Copied",
        description: "JSON copied to clipboard",
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">JSON Formatter</h1>
        <p className="text-muted-foreground">Format, validate, and beautify your JSON data with advanced options.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Input JSON</CardTitle>
            <CardDescription>Paste your JSON data here</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="input"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Paste your JSON here..."
                          className="min-h-[300px] font-mono text-sm"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="flex gap-2">
                  <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Format JSON
                  </Button>
                  <Button type="button" variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload File
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Formatted Output</CardTitle>
            <CardDescription>Your formatted JSON will appear here</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={output}
              readOnly
              className="min-h-[300px] font-mono text-sm bg-muted"
              placeholder="Formatted JSON will appear here..."
            />
            {error && <div className="mt-2 text-sm text-destructive bg-destructive/10 p-2 rounded">{error}</div>}
            <div className="flex gap-2 mt-4">
              <Button onClick={copyToClipboard} variant="outline" disabled={!output}>
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </Button>
              <Button variant="outline" disabled={!output}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
