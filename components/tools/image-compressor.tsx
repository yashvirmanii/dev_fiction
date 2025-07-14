"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Download, ImageIcon, FileArchiveIcon as Compress } from "lucide-react"

export function ImageCompressor() {
  const [originalFile, setOriginalFile] = useState<File | null>(null)
  const [originalPreview, setOriginalPreview] = useState<string>("")
  const [compressedPreview, setCompressedPreview] = useState<string>("")
  const [quality, setQuality] = useState([80])
  const [format, setFormat] = useState("jpeg")
  const [originalSize, setOriginalSize] = useState(0)
  const [compressedSize, setCompressedSize] = useState(0)
  const [processing, setProcessing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      setOriginalFile(file)
      setOriginalSize(file.size)

      const reader = new FileReader()
      reader.onload = (e) => {
        setOriginalPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const compressImage = async () => {
    if (!originalFile || !canvasRef.current) return

    setProcessing(true)

    try {
      const img = new Image()
      img.crossOrigin = "anonymous"

      img.onload = () => {
        const canvas = canvasRef.current!
        const ctx = canvas.getContext("2d")!

        // Set canvas dimensions to image dimensions
        canvas.width = img.width
        canvas.height = img.height

        // Draw image on canvas
        ctx.drawImage(img, 0, 0)

        // Convert to compressed format
        const mimeType = format === "png" ? "image/png" : "image/jpeg"
        const qualityValue = format === "png" ? 1 : quality[0] / 100

        canvas.toBlob(
          (blob) => {
            if (blob) {
              setCompressedSize(blob.size)
              const url = URL.createObjectURL(blob)
              setCompressedPreview(url)
            }
            setProcessing(false)
          },
          mimeType,
          qualityValue,
        )
      }

      img.src = originalPreview
    } catch (error) {
      console.error("Compression failed:", error)
      setProcessing(false)
    }
  }

  const downloadCompressed = () => {
    if (!compressedPreview || !originalFile) return

    const link = document.createElement("a")
    link.href = compressedPreview
    const extension = format === "png" ? "png" : "jpg"
    const baseName = originalFile.name.replace(/\.[^/.]+$/, "")
    link.download = `${baseName}_compressed.${extension}`
    link.click()
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getCompressionRatio = () => {
    if (originalSize === 0 || compressedSize === 0) return 0
    return Math.round(((originalSize - compressedSize) / originalSize) * 100)
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Image Compressor</h1>
        <p className="text-gray-600">
          Reduce image file sizes while maintaining quality. Perfect for web optimization and storage.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upload & Settings</CardTitle>
            <CardDescription>Choose an image and compression settings</CardDescription>
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
                <div>
                  <label className="block text-sm font-medium mb-2">Output Format</label>
                  <Select value={format} onValueChange={setFormat}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jpeg">JPEG</SelectItem>
                      <SelectItem value="png">PNG</SelectItem>
                      <SelectItem value="webp">WebP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {format !== "png" && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Quality: {quality[0]}%</label>
                    <Slider value={quality} onValueChange={setQuality} max={100} min={10} step={5} className="w-full" />
                  </div>
                )}

                <Button onClick={compressImage} disabled={processing} className="w-full bg-blue-600 hover:bg-blue-700">
                  {processing ? (
                    "Compressing..."
                  ) : (
                    <>
                      <Compress className="h-4 w-4 mr-2" />
                      Compress Image
                    </>
                  )}
                </Button>

                {compressedPreview && (
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-gray-700">Original</p>
                          <p className="text-gray-600">{formatFileSize(originalSize)}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">Compressed</p>
                          <p className="text-gray-600">{formatFileSize(compressedSize)}</p>
                        </div>
                      </div>
                      <div className="mt-2 pt-2 border-t">
                        <p className="text-sm font-medium text-green-600">{getCompressionRatio()}% size reduction</p>
                      </div>
                    </div>

                    <Button onClick={downloadCompressed} variant="outline" className="w-full bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      Download Compressed
                    </Button>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>Compare original and compressed images</CardDescription>
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

                {compressedPreview && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Compressed</h4>
                    <div className="border rounded-lg overflow-hidden">
                      <img
                        src={compressedPreview || "/placeholder.svg"}
                        alt="Compressed"
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

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Compression Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-semibold mb-2 text-blue-600">Format Guide</h4>
              <ul className="space-y-1 text-gray-600">
                <li>
                  • <strong>JPEG:</strong> Best for photos
                </li>
                <li>
                  • <strong>PNG:</strong> Best for graphics with transparency
                </li>
                <li>
                  • <strong>WebP:</strong> Modern format, smaller sizes
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-green-600">Quality Settings</h4>
              <ul className="space-y-1 text-gray-600">
                <li>
                  • <strong>90-100%:</strong> Highest quality
                </li>
                <li>
                  • <strong>70-90%:</strong> Good balance
                </li>
                <li>
                  • <strong>50-70%:</strong> Web optimized
                </li>
                <li>
                  • <strong>Below 50%:</strong> Maximum compression
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-purple-600">Use Cases</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Website optimization</li>
                <li>• Email attachments</li>
                <li>• Social media uploads</li>
                <li>• Mobile app assets</li>
                <li>• Storage space saving</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
