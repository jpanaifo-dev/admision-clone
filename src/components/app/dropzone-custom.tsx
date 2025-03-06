'use client'
import React from 'react'
import { Accept, useDropzone } from 'react-dropzone'

interface IDropzoneCustomProps {
  onDrop: (files: File[]) => void
  maxFiles?: number
  accept?: Accept // Permite especificar tipos de archivos como 'image/*', 'application/pdf', etc.
  variant?: 'default' | 'rounded' | 'bordered' | 'square'
  hiddenLabel?: boolean
}

export function DropzoneCustom(props: IDropzoneCustomProps) {
  const {
    onDrop,
    maxFiles = 1,
    accept,
    variant = 'default',
    hiddenLabel,
  } = props
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles,
    accept,
  })

  const renderPreview = () => {
    if (acceptedFiles.length === 0) {
      return (
        <p className="text-gray-600 p-6">
          Drag & drop some files here, or click to select files
        </p>
      )
    }

    const images = acceptedFiles.filter((file) =>
      file.type.startsWith('image/')
    )

    if (images.length > 0) {
      return (
        <div className="flex flex-wrap gap-2 justify-center">
          {images.map((file) => {
            const previewUrl = URL.createObjectURL(file)
            return (
              <img
                key={file.path}
                src={previewUrl}
                alt={file.path}
                className="h-14 rounded-sm"
                onLoad={() => URL.revokeObjectURL(previewUrl)} // Liberar memoria
              />
            )
          })}
        </div>
      )
    } else {
      return (
        <p className="text-green-600 font-bold">
          {acceptedFiles.length} file(s) uploaded!
        </p>
      )
    }
  }

  const getVariantClasses = () => {
    switch (variant) {
      case 'rounded':
        return 'rounded-full w-56 h-56'
      case 'bordered':
        return 'border-4'
      case 'square':
        return 'rounded-none w-56 h-56'
      default:
        return 'w-full'
    }
  }

  return (
    <section className="bg-gray-100">
      <div
        {...getRootProps({
          className: `dropzone h-64 border-2 border-dashed border-gray-400 flex items-center justify-center text-center cursor-pointer hover:border-blue-500 transition duration-300 ${getVariantClasses()}`,
        })}
      >
        <input {...getInputProps()} />
        {renderPreview()}
      </div>
      {acceptedFiles.length > 0 && !hiddenLabel && (
        <aside className="mt-4">
          <h4 className="font-bold text-gray-700">Archivos: </h4>
          <ul className="list-disc list-inside text-gray-600">
            {acceptedFiles.map((file) => (
              <li
                key={file.path}
                className="text-sm"
              >
                {file.path} - {file.size} bytes
              </li>
            ))}
          </ul>
        </aside>
      )}
    </section>
  )
}
