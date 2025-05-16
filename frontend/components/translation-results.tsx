"use client"

import { useState } from "react"
import { Download, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface TranslationResultsProps {
  results: any
}

export function TranslationResults({ results }: TranslationResultsProps) {
  const [activeTab, setActiveTab] = useState("preview")

  // This would be populated with actual data from the backend
  const translatedSegments = results?.segments || []
  const fileName = results?.fileName || "translated-document"
  const sourceLanguage = results?.sourceLanguage || "English"
  const targetLanguage = results?.targetLanguage || "French"

  const handleDownload = () => {
    // In a real implementation, this would trigger a download of the translated file
    alert("Downloading translated file...")
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Translation Results</h3>
        <Button onClick={handleDownload} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download
        </Button>
      </div>

      <div className="bg-gray-50 p-3 rounded-md text-sm">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="font-medium">Source:</span> {sourceLanguage}
          </div>
          <div>
            <span className="font-medium">Target:</span> {targetLanguage}
          </div>
          <div>
            <span className="font-medium">File:</span> {fileName}
          </div>
          <div>
            <span className="font-medium">Segments:</span> {translatedSegments.length}
          </div>
        </div>
      </div>

      <Tabs defaultValue="preview" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="issues">Issues</TabsTrigger>
        </TabsList>
        <TabsContent value="preview" className="border rounded-md p-4 mt-2">
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {translatedSegments.length > 0 ? (
              translatedSegments.map((segment: any, index: number) => (
                <div key={index} className="border-b pb-2">
                  <div className="text-xs text-gray-500 mb-1">Original:</div>
                  <div className="mb-2">{segment.original}</div>
                  <div className="text-xs text-gray-500 mb-1">Translated:</div>
                  <div>{segment.translated}</div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">No preview available</div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="issues" className="border rounded-md p-4 mt-2">
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {results?.issues?.length > 0 ? (
              results.issues.map((issue: any, index: number) => (
                <div key={index} className="flex items-start gap-2 p-2 border-b">
                  {issue.severity === "error" ? (
                    <X className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  ) : (
                    <Check className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <div className="font-medium">{issue.type}</div>
                    <div className="text-sm text-gray-600">{issue.message}</div>
                    <div className="text-xs text-gray-500 mt-1">Segment {issue.segment}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">No issues found</div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
