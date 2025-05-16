"use client";
import axios from "axios";
import { useState } from "react";
import { Upload } from "@/components/upload";
import { TranslationStatus } from "@/components/translation-status";
import { TranslationResults } from "@/components/translation-results";
import { LanguageSelector } from "@/components/language-selector";

export default function Home() {
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationProgress, setTranslationProgress] = useState(0);
  const [translationResults, setTranslationResults] = useState(null);
  const [translatedFileURL, setTranslatedFileURL] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("en");
  const [targetLanguage, setTargetLanguage] = useState("de");

  const handleUpload = async (file: File) => {
    setIsTranslating(true);
    setTranslationProgress(10);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("sourceLanguage", sourceLanguage);
    formData.append("targetLanguage", targetLanguage);

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setTranslationProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 500);

      const response = await axios.post(
        "http://localhost:5000/api/translate",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "blob",
        }
      );

      clearInterval(progressInterval);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      setTranslatedFileURL(url);
      // setTranslationResults(data);
      setTranslationProgress(100);
    } catch (error) {
      console.error("Error during translation:", error);
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
      <div className="w-full max-w-4xl space-y-8">
        <h1 className="text-3xl font-bold text-center">
          AI Translation System
        </h1>

        <div className="flex flex-col space-y-6 bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row gap-4">
            <LanguageSelector
              label="Source Language"
              value={sourceLanguage}
              onChange={setSourceLanguage}
            />
            <LanguageSelector
              label="Target Language"
              value={targetLanguage}
              onChange={setTargetLanguage}
            />
          </div>

          <Upload
            onUpload={handleUpload}
            isTranslating={isTranslating}
            translatedFileURL={translatedFileURL}
          />

          {isTranslating && (
            <TranslationStatus progress={translationProgress} />
          )}

          {translationResults && (
            <TranslationResults results={translationResults} />
          )}
        </div>
      </div>
    </main>
  );
}
