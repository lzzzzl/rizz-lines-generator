'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Home() {
  const [rizzLines, setRizzLines] = useState<string[]>([])
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const generateRizzLines = async () => {
    setIsLoading(true)
    const response = await fetch('/api/generate-rizz')
    const data = await response.json()
    setRizzLines(data.rizzLines)
    setCurrentLineIndex(0)
    setIsLoading(false)
  }

  useEffect(() => {
    if (rizzLines.length > 0) {
      const timer = setTimeout(() => {
        setCurrentLineIndex((prevIndex) => 
          prevIndex < rizzLines.length - 1 ? prevIndex + 1 : prevIndex
        )
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [currentLineIndex, rizzLines])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600 p-4">
      <div className="w-full max-w-2xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-4xl font-bold text-white md:text-6xl"
        >
          Rizz Lines Generator
        </motion.h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={generateRizzLines}
          disabled={isLoading}
          className="mb-8 inline-flex items-center rounded-full bg-white px-6 py-3 font-semibold text-purple-600 shadow-lg transition-colors hover:bg-purple-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? (
            'Generating...'
          ) : (
            <>
              Generate Rizz Lines <Sparkles className="ml-2 h-5 w-5" />
            </>
          )}
        </motion.button>
        <div className="h-48"> {/* Fixed height container */}
          <AnimatePresence mode="wait">
            {rizzLines[currentLineIndex] && (
              <motion.div
                key={currentLineIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="rounded-lg bg-white p-6 shadow-xl"
              >
                <p className="text-xl font-medium text-purple-600 md:text-2xl">
                  {rizzLines[currentLineIndex]}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {rizzLines.length > 0 && (
          <div className="mt-4 flex justify-center space-x-2">
            {rizzLines.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${
                  index === currentLineIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

