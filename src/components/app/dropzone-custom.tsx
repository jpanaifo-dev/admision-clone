"use client";
import React from "react";
import { Accept, useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";

interface IDropzoneCustomProps {
  onDrop: (files: File[]) => void;
  maxFiles?: number;
  accept?: Accept; // Permite especificar tipos de archivos como 'image/*', 'application/pdf', etc.
  variant?: "default" | "rounded" | "bordered" | "square";
  hiddenLabel?: boolean;
  className?: string;
  maxSizeFile?: number;
}

export function DropzoneCustom(props: IDropzoneCustomProps) {
  const {
    onDrop,
    maxFiles = 1,
    accept,
    variant = "default",
    hiddenLabel,
    className,
    maxSizeFile,
  } = props;
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles,
    accept,
    maxSize: maxSizeFile ? maxSizeFile * 1024 * 1024 : undefined,
  });

  const getVariantClasses = () => {
    switch (variant) {
      case "rounded":
        return "rounded-full w-56 h-56";
      case "bordered":
        return "border-4";
      case "square":
        return "rounded-none w-56 h-56";
      default:
        return "w-full";
    }
  };

  const renderPreview = () => {
    if (acceptedFiles.length === 0) {
      return (
        <p className="text-gray-600 p-6">
          Arrastra y suelta archivos aquí, o haz clic para seleccionar archivos
          {
            maxSizeFile && (
              <span>
                {" "}{`(Tam. máx. ${maxSizeFile} MB)`}
              </span>
            )
          }
        </p>
      );
    }

    const images = acceptedFiles.filter((file) =>
      file.type.startsWith("image/")
    );

    if (images.length > 0) {
      return (
        <div className="flex flex-wrap gap-2 justify-center">
          {images.map((file) => {
            const previewUrl = URL.createObjectURL(file);
            return (
              <img
                key={file.path}
                src={previewUrl}
                alt={file.path}
                className="h-14 rounded-sm"
                onLoad={() => URL.revokeObjectURL(previewUrl)} // Liberar memoria
              />
            );
          })}
        </div>
      );
    } else {
      // Para otros tipos de archivos, puedes simular una carga o mostrar un ícono.
      const otherFiles = acceptedFiles.filter(
        (file) => !file.type.startsWith("image/")
      );
      return (
        <div className="flex flex-wrap gap-2 justify-center">
          {otherFiles.map((file) => (
            <div key={file.path} className="flex flex-col items-center">
              <div className="text-gray-600">{`${file.name}`}</div>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <section className="bg-white dark:bg-gray-800 rounded">
      <div
        {...getRootProps({
          className: cn`dropzone h-64 border-2 border-dashed border-gray-400 flex items-center justify-center text-center cursor-pointer hover:border-blue-500 transition duration-300 ${getVariantClasses()} ${className}`,
        })}
      >
        <input {...getInputProps()} />
        {renderPreview()}
      </div>
      {acceptedFiles.length > 0 && !hiddenLabel && (
        <aside className="p-4">
          <h4 className="font-bold text-gray-700">Archivos: </h4>
          <ul className="list-disc list-inside text-gray-600">
            {acceptedFiles.map((file) => (
              <li key={file.path} className="text-sm text-green-600">
                {file.name} - {(file.size / (1024 * 1024)).toFixed(2)} MB
              </li>
            ))}
          </ul>
        </aside>
      )}

      {fileRejections.length > 0 && (
        <aside className="p-4 text-red-500">
          <h4 className="font-bold">Archivos rechazados:</h4>
          <ul className="list-disc list-inside">
            {fileRejections.map(({ file, errors }) => (
              <li key={file.path} className="text-sm">
                {file.name} - {(file.size / (1024 * 1024)).toFixed(2)} MB
                {errors.map((error) => (
                  <div key={error.code} className="text-xs text-red-400">
                    El archivo es demasiado grande, el tamaño máximo permitido es de {maxSizeFile} MB
                  </div>
                ))}
              </li>
            ))}
          </ul>
        </aside>
      )}
    </section>
  );
}
