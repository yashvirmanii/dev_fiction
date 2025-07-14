"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Copy, RefreshCw, Shield } from "lucide-react"

export function PasswordGenerator() {
  const [password, setPassword] = useState("")
  const [length, setLength] = useState([12])
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false,
  })

  const generatePassword = () => {
    let charset = ""
    if (options.lowercase) charset += "abcdefghijklmnopqrstuvwxyz"
    if (options.uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (options.numbers) charset += "0123456789"
    if (options.symbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?"

    if (!charset) {
      setPassword("Please select at least one character type")
      return
    }

    let result = ""
    for (let i = 0; i < length[0]; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length))
    }
    setPassword(result)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password)
  }

  const getPasswordStrength = () => {
    if (!password || password.includes("Please select")) return { strength: "None", color: "gray" }

    let score = 0
    if (password.length >= 8) score++
    if (password.length >= 12) score++
    if (/[a-z]/.test(password)) score++
    if (/[A-Z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++

    if (score <= 2) return { strength: "Weak", color: "red" }
    if (score <= 4) return { strength: "Medium", color: "yellow" }
    return { strength: "Strong", color: "green" }
  }

  const handleOptionChange = (option: string, checked: boolean) => {
    setOptions((prev) => ({ ...prev, [option]: checked }))
  }

  const strengthInfo = getPasswordStrength()

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Random Password Generator</h1>
        <p className="text-gray-600">
          Generate secure, random passwords for your applications, accounts, and testing purposes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Password Options</CardTitle>
            <CardDescription>Customize your password requirements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Password Length: {length[0]}</label>
              <Slider value={length} onValueChange={setLength} max={50} min={4} step={1} className="w-full" />
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Character Types</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="lowercase"
                    checked={options.lowercase}
                    onCheckedChange={(checked) => handleOptionChange("lowercase", checked as boolean)}
                  />
                  <label htmlFor="lowercase" className="text-sm">
                    Lowercase letters (a-z)
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="uppercase"
                    checked={options.uppercase}
                    onCheckedChange={(checked) => handleOptionChange("uppercase", checked as boolean)}
                  />
                  <label htmlFor="uppercase" className="text-sm">
                    Uppercase letters (A-Z)
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="numbers"
                    checked={options.numbers}
                    onCheckedChange={(checked) => handleOptionChange("numbers", checked as boolean)}
                  />
                  <label htmlFor="numbers" className="text-sm">
                    Numbers (0-9)
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="symbols"
                    checked={options.symbols}
                    onCheckedChange={(checked) => handleOptionChange("symbols", checked as boolean)}
                  />
                  <label htmlFor="symbols" className="text-sm">
                    Symbols (!@#$%^&*)
                  </label>
                </div>
              </div>
            </div>

            <Button onClick={generatePassword} className="w-full bg-green-600 hover:bg-green-700">
              <RefreshCw className="h-4 w-4 mr-2" />
              Generate Password
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Generated Password</CardTitle>
            <CardDescription>Your secure password</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative">
                <Input
                  value={password}
                  readOnly
                  className="font-mono text-lg pr-12"
                  placeholder="Generated password will appear here..."
                />
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent"
                  onClick={copyToClipboard}
                  disabled={!password || password.includes("Please select")}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>

              {password && !password.includes("Please select") && (
                <div className="flex items-center gap-2">
                  <Shield className={`h-4 w-4 text-${strengthInfo.color}-600`} />
                  <span className="text-sm">
                    Strength:{" "}
                    <span className={`font-medium text-${strengthInfo.color}-600`}>{strengthInfo.strength}</span>
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Password Security Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold mb-2 text-green-600">Best Practices</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Use at least 12 characters</li>
                <li>• Include mixed case letters</li>
                <li>• Add numbers and symbols</li>
                <li>• Avoid dictionary words</li>
                <li>• Use unique passwords for each account</li>
                <li>• Consider using a password manager</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-green-600">Common Use Cases</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• User account creation</li>
                <li>• Application testing</li>
                <li>• Database credentials</li>
                <li>• API keys and tokens</li>
                <li>• Temporary access codes</li>
                <li>• Development environments</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
