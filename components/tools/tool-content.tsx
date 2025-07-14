import { JsonFormatter } from "@/components/tools/json-formatter"
import { Base64Tool } from "@/components/tools/base64-tool"
import { UrlEncoder } from "@/components/tools/url-encoder"
import { JwtDecoder } from "@/components/tools/jwt-decoder"
import { HtmlEntities } from "@/components/tools/html-entities"
import { RegexTester } from "@/components/tools/regex-tester"
import { UuidGenerator } from "@/components/tools/uuid-generator"
import { PasswordGenerator } from "@/components/tools/password-generator"
import { LoremGenerator } from "@/components/tools/lorem-generator"
import { DefaultTool } from "@/components/tools/default-tool"
import { JsonValidator } from "@/components/tools/json-validator"
import { YamlValidator } from "@/components/tools/yaml-validator"
import { CsvJsonConverter } from "@/components/tools/csv-json-converter"
import { HtmlJsxConverter } from "@/components/tools/html-jsx-converter"
import { ApiTester } from "@/components/tools/api-tester"
import { ImageCompressor } from "@/components/tools/image-compressor"
import { ImageResizer } from "@/components/tools/image-resizer"

interface ToolContentProps {
  selectedTool: string
}

export function ToolContent({ selectedTool }: ToolContentProps) {
  const renderTool = () => {
    switch (selectedTool) {
      case "json-formatter":
        return <JsonFormatter />
      case "base64-encoder":
        return <Base64Tool />
      case "url-encoder":
        return <UrlEncoder />
      case "jwt-decoder":
        return <JwtDecoder />
      case "html-entities":
        return <HtmlEntities />
      case "regex-tester":
        return <RegexTester />
      case "uuid-generator":
        return <UuidGenerator />
      case "password-generator":
        return <PasswordGenerator />
      case "lorem-generator":
        return <LoremGenerator />
      case "json-validator":
        return <JsonValidator />
      case "yaml-validator":
        return <YamlValidator />
      case "csv-json":
        return <CsvJsonConverter />
      case "html-jsx":
        return <HtmlJsxConverter />
      case "api-tester":
        return <ApiTester />
      case "image-compressor":
        return <ImageCompressor />
      case "image-resizer":
        return <ImageResizer />
      default:
        return <DefaultTool toolId={selectedTool} />
    }
  }

  return <div className="p-6">{renderTool()}</div>
}
