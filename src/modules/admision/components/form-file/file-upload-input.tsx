'use client'

import { Upload } from "lucide-react"

interface FileUploadInputProps {
    label: string
    file: File | null
    accept?: string
    onFileChange: (file: File) => void
    onFileDrop: (e: React.DragEvent<HTMLDivElement>) => void
    placeholder?: string
    hint?: string
}

export function FileUploadInput({
    label,
    file,
    accept = "*",
    onFileChange,
    onFileDrop,
    placeholder = "Cargar un archivo",
    hint = "o arrastrar y soltar"
}: FileUploadInputProps) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium">{label}</label>
            <div
                className="border-2 border-dashed rounded-lg p-6 text-center"
                onDragOver={(e) => e.preventDefault()}
                onDrop={onFileDrop}
            >
                <input
                    type="file"
                    id={`${label}-upload`}
                    className="hidden"
                    onChange={(e) => {
                        if (e.target.files?.[0]) onFileChange(e.target.files[0])
                    }}
                    accept={accept}
                />
                <label
                    htmlFor={`${label}-upload`}
                    className="cursor-pointer flex flex-col items-center gap-2"
                >
                    <Upload className="w-6 h-6 text-gray-400" />
                    <div className="text-sm text-gray-600">
                        {file ? file.name : (
                            <>
                                <span className="text-primary hover:underline">{placeholder}</span>
                                {` ${hint}`}
                            </>
                        )}
                    </div>
                    <span className="text-xs text-gray-400">{accept.toUpperCase()}</span>
                </label>
            </div>
        </div>
    )
}
