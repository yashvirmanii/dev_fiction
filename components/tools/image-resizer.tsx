"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload, Download, ImageIcon, Maximize2 } from "lucide-react"

export function ImageResizer() {
  const [originalFile, setOriginalFile] = useState<File | null>(null)
  const [originalPreview, setOriginalPreview] = useState<string>("")
  const [resizedPreview, setResizedPreview] = useState<string>("")
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 })
  const [targetWidth, setTargetWidth] = useState("")
  const [targetHeight, setTargetHeight] = useState("")
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true)
  const [resizeMode, setResizeMode] = useState("exact")
  const [processing, setProcessing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      setOriginalFile(file)

      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.onload = () => {
          setOriginalDimensions({ width: img.width, height: img.height })
          setTargetWidth(img.width.toString())
          setTargetHeight(img.height.toString())
        }
        img.src = e.target?.result as string
        setOriginalPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleWidthChange = (value: string) => {
    setTargetWidth(value)
    if (maintainAspectRatio && originalDimensions.width > 0) {
      const ratio = originalDimensions.height / originalDimensions.width
      const newHeight = Math.round(Number.parseInt(value) * ratio)
      setTargetHeight(newHeight.toString())
    }
  }

  const handleHeightChange = (value: string) => {
    setTargetHeight(value)
    if (maintainAspectRatio && originalDimensions.height > 0) {
      const ratio = originalDimensions.width / originalDimensions.height
      const newWidth = Math.round(Number.parseInt(value) * ratio)
      setTargetWidth(newWidth.toString())
    }
  }

  const resizeImage = async () => {
    if (!originalFile || !canvasRef.current || !targetWidth || !targetHeight) return

    setProcessing(true)

    try {
      const img = new Image()
      img.crossOrigin = "anonymous"

      img.onload = () => {
        const canvas = canvasRef.current!
        const ctx = canvas.getContext("2d")!

        const newWidth = Number.parseInt(targetWidth)
        const newHeight = Number.parseInt(targetHeight)

        let drawWidth = newWidth
        let drawHeight = newHeight
        let offsetX = 0
        let offsetY = 0

        if (resizeMode === "fit") {
          // Fit image within bounds while maintaining aspect ratio
          const imgRatio = img.width / img.height
          const targetRatio = newWidth / newHeight

          if (imgRatio > targetRatio) {
            drawWidth = newWidth
            drawHeight = newWidth / imgRatio
            offsetY = (newHeight - drawHeight) / 2
          } else {
            drawHeight = newHeight
            drawWidth = newHeight * imgRatio
            offsetX = (newWidth - drawWidth) / 2
          }
        } else if (resizeMode === "fill") {
          // Fill bounds and crop if necessary
          const imgRatio = img.width / img.height
          const targetRatio = newWidth / newHeight

          if (imgRatio > targetRatio) {
            drawHeight = newHeight
            drawWidth = newHeight * imgRatio
            offsetX = (newWidth - drawWidth) / 2
          } else {
            drawWidth = newWidth
            drawHeight = newWidth / imgRatio
            offsetY = (newHeight - drawHeight) / 2
          }
        }

        canvas.width = newWidth
        canvas.height = newHeight

        // Fill with white background
        ctx.fillStyle = "white"
        ctx.fillRect(0, 0, newWidth, newHeight)

        // Draw resized image
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob)
              setResizedPreview(url)
            }
            setProcessing(false)
          },
          "image/jpeg",
          0.9,
        )
      }

      img.src = originalPreview
    } catch (error) {
      console.error("Resize failed:", error)
      setProcessing(false)
    }
  }

  const downloadResized = () => {
    if (!resizedPreview || !originalFile) return

    const link = document.createElement("a")
    link.href = resizedPreview
    const baseName = originalFile.name.replace(/\.[^/.]+$/, "")
    link.download = `${baseName}_${targetWidth}x${targetHeight}.jpg`
    link.click()
  }

  const setPresetSize = (width: number, height: number) => {
    setTargetWidth(width.toString())
    setTargetHeight(height.toString())
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Image Resizer</h1>
        <p className="text-gray-600">Resize images to specific dimensions for web, social media, or print use.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upload & Settings</CardTitle>
            <CardDescription>Choose an image and resize settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <input type="file" accept="image/*" onChange={handleFileSelect} ref={fileInputRef} className="hidden" />
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="w-full h-32 border-dashed"
              >
                <div className="text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600">Click to upload image</p>
                  <p className="text-xs text-gray-400">Supports JPG, PNG, WebP</p>
                </div>
              </Button>
            </div>

            {originalFile && (
              <>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-gray-700">Original Size</p>
                  <p className="text-sm text-gray-600">
                    {originalDimensions.width} × {originalDimensions.height} pixels
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Width (px)</label>
                    <Input
                      type="number"
                      value={targetWidth}
                      onChange={(e) => handleWidthChange(e.target.value)}
                      placeholder="Width"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Height (px)</label>
                    <Input
                      type="number"
                      value={targetHeight}
                      onChange={(e) => handleHeightChange(e.target.value)}
                      placeholder="Height"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="aspectRatio"
                    checked={maintainAspectRatio}
                    onCheckedChange={(checked) => setMaintainAspectRatio(checked as boolean)}
                  />
                  <label htmlFor="aspectRatio" className="text-sm">
                    Maintain aspect ratio
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Resize Mode</label>
                  <Select value={resizeMode} onValueChange={setResizeMode}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="exact">Exact dimensions</SelectItem>
                      <SelectItem value="fit">Fit within bounds</SelectItem>
                      <SelectItem value="fill">Fill and crop</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Common Sizes</label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <Button size="sm" variant="outline" onClick={() => setPresetSize(1920, 1080)}>
                      1920×1080 (HD)
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setPresetSize(1200, 630)}>
                      1200×630 (FB)
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setPresetSize(1080, 1080)}>
                      1080×1080 (IG)
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setPresetSize(800, 600)}>
                      800×600 (Web)
                    </Button>
                  </div>
                </div>

                <Button
                  onClick={resizeImage}
                  disabled={processing || !targetWidth || !targetHeight}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {processing ? (
                    "Resizing..."
                  ) : (
                    <>
                      <Maximize2 className="h-4 w-4 mr-2" />
                      Resize Image
                    </>
                  )}
                </Button>

                {resizedPreview && (
                  <Button onClick={downloadResized} variant="outline" className="w-full bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    Download Resized
                  </Button>
                )}
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>Compare original and resized images</CardDescription>
          </CardHeader>
          <CardContent>
            {originalPreview ? (
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Original</h4>
                  <div className="border rounded-lg overflow-hidden">
                    <img
                      src={originalPreview || "/placeholder.svg"}
                      alt="Original"
                      className="w-full h-48 object-contain bg-gray-50"
                    />
                  </div>
                </div>

                {resizedPreview && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">
                      Resized ({targetWidth}×{targetHeight})
                    </h4>
                    <div className="border rounded-lg overflow-hidden">
                      <img
                        src={resizedPreview || "/placeholder.svg"}
                        alt="Resized"
                        className="w-full h-48 object-contain bg-gray-50"
                      />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
                <div className="text-center text-gray-400">
                  <ImageIcon className="h-12 w-12 mx-auto mb-2" />
                  <p>Upload an image to see preview</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}
