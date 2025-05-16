import { Progress } from "@/components/ui/progress"

interface TranslationStatusProps {
  progress: number
}

export function TranslationStatus({ progress }: TranslationStatusProps) {
  const getStatusText = () => {
    if (progress < 30) return "Extracting text from document..."
    if (progress < 60) return "Translating content..."
    if (progress < 90) return "Performing grammar and semantic checks..."
    return "Finalizing translation..."
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>{getStatusText()}</span>
        <span>{progress}%</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  )
}
