"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, RefreshCw } from "lucide-react"

export function LoremGenerator() {
  const [output, setOutput] = useState("")
  const [count, setCount] = useState(3)
  const [type, setType] = useState("paragraphs")

  const loremWords = [
    "lorem",
    "ipsum",
    "dolor",
    "sit",
    "amet",
    "consectetur",
    "adipiscing",
    "elit",
    "sed",
    "do",
    "eiusmod",
    "tempor",
    "incididunt",
    "ut",
    "labore",
    "et",
    "dolore",
    "magna",
    "aliqua",
    "enim",
    "ad",
    "minim",
    "veniam",
    "quis",
    "nostrud",
    "exercitation",
    "ullamco",
    "laboris",
    "nisi",
    "aliquip",
    "ex",
    "ea",
    "commodo",
    "consequat",
    "duis",
    "aute",
    "irure",
    "in",
    "reprehenderit",
    "voluptate",
    "velit",
    "esse",
    "cillum",
    "fugiat",
    "nulla",
    "pariatur",
    "excepteur",
    "sint",
    "occaecat",
    "cupidatat",
    "non",
    "proident",
    "sunt",
    "culpa",
    "qui",
    "officia",
    "deserunt",
    "mollit",
    "anim",
    "id",
    "est",
    "laborum",
  ]

  const generateWords = (num: number) => {
    const words = []
    for (let i = 0; i < num; i++) {
      words.push(loremWords[Math.floor(Math.random() * loremWords.length)])
    }
    return words.join(" ")
  }

  const generateSentence = () => {
    const wordCount = Math.floor(Math.random() * 10) + 5
    const sentence = generateWords(wordCount)
    return sentence.charAt(0).toUpperCase() + sentence.slice(1) + "."
  }

  const generateParagraph = () => {
    const sentenceCount = Math.floor(Math.random() * 5) + 3
    const sentences = []
    for (let i = 0; i < sentenceCount; i++) {
      sentences.push(generateSentence())
    }
    return sentences.join(" ")
  }

  const generateLorem = () => {
    let result = ""

    switch (type) {
      case "words":
        result = generateWords(count)
        break
      case "sentences":
        const sentences = []
        for (let i = 0; i < count; i++) {
          sentences.push(generateSentence())
        }
        result = sentences.join(" ")
        break
      case "paragraphs":
        const paragraphs = []
        for (let i = 0; i < count; i++) {
          paragraphs.push(generateParagraph())
        }
        result = paragraphs.join("\n\n")
        break
    }

    setOutput(result)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Lorem Ipsum Generator</h1>
        <p className="text-gray-600">Generate placeholder text for your designs, mockups, and development projects.</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Generate Lorem Ipsum</CardTitle>
          <CardDescription>Customize your placeholder text</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-end">
            <div className="flex-1 max-w-xs">
              <label className="block text-sm font-medium mb-2">Count</label>
              <Input
                type="number"
                min="1"
                max="100"
                value={count}
                onChange={(e) => setCount(Math.max(1, Math.min(100, Number.parseInt(e.target.value) || 1)))}
              />
            </div>
            <div className="flex-1 max-w-xs">
              <label className="block text-sm font-medium mb-2">Type</label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="words">Words</SelectItem>
                  <SelectItem value="sentences">Sentences</SelectItem>
                  <SelectItem value="paragraphs">Paragraphs</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={generateLorem} className="bg-purple-600 hover:bg-purple-700">
              <RefreshCw className="h-4 w-4 mr-2" />
              Generate
            </Button>
          </div>
        </CardContent>
      </Card>

      {output && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Lorem Ipsum</CardTitle>
            <CardDescription>
              {count} {type} generated
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={output}
              readOnly
              className="min-h-[300px] bg-gray-50"
              placeholder="Generated text will appear here..."
            />
            <Button onClick={copyToClipboard} className="mt-4 bg-transparent" variant="outline">
              <Copy className="h-4 w-4 mr-2" />
              Copy Text
            </Button>
          </CardContent>
        </Card>
      )}

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>About Lorem Ipsum</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold mb-2 text-purple-600">What is Lorem Ipsum?</h4>
              <p className="text-gray-600 mb-4">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has been the industry's
                standard dummy text since the 1500s.
              </p>
              <h4 className="font-semibold mb-2 text-purple-600">Why Use It?</h4>
              <p className="text-gray-600">
                It allows designers and developers to focus on visual elements without being distracted by readable
                content.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-purple-600">Common Use Cases</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Website mockups and wireframes</li>
                <li>• Print design layouts</li>
                <li>• Content management systems</li>
                <li>• Template development</li>
                <li>• Typography testing</li>
                <li>• User interface prototypes</li>
                <li>• Database seeding</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
