import { process } from "@/lib/tools/processors/json-formatter"

describe("JSON Formatter", () => {
  it("should format valid JSON", async () => {
    const input = '{"name":"test","value":123}'
    const result = await process(input)

    expect(result.isValid).toBe(true)
    expect(result.formatted).toContain('{\n  "name": "test",\n  "value": 123\n}')
  })

  it("should handle invalid JSON", async () => {
    const input = '{"name":"test",}'
    const result = await process(input)

    expect(result.isValid).toBe(false)
    expect(result.error).toBeDefined()
  })

  it("should minify JSON when option is set", async () => {
    const input = '{\n  "name": "test",\n  "value": 123\n}'
    const result = await process(input, { minify: true })

    expect(result.isValid).toBe(true)
    expect(result.formatted).toBe('{"name":"test","value":123}')
  })
})
