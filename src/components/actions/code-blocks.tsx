'use client'
import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

export const CodeBlock = ({ code: code }: { code: string }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
      .catch((err) => console.error('Failed to copy text: ', err))
  }

  return (
    <div className="relative p-4 bg-gray-900 text-gray-100 rounded-lg font-mono">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1 bg-gray-200 rounded"
        aria-label="Copy code"
      >
        {copied ? (
          <Check className="w-5 h-5 text-green-500" />
        ) : (
          <Copy className="w-5 h-5 text-gray-700" />
        )}
      </button>
      <pre className="overflow-x-auto">
        <code className="block text-gray-300 font-normal font-mono text-sm">
          {code}
        </code>
      </pre>
    </div>
  )
}
