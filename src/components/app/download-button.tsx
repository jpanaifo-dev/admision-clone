'use client'

import { Button } from '@nextui-org/react'
import { CodeXml, DockIcon, FileArchive, FilePen, Loader } from 'lucide-react'
import { useState } from 'react'

export function Downloadable({
    title,
    fileName,
    file
}: {
    title: string
    fileName: string
    file: string
}) {
    const [isLoading] = useState(false)

    type FileTypeIcons = Record<string, React.ReactNode>

    const fileTypesIcons: FileTypeIcons = {
        pdf: <FilePen size={32} />,
        xls: <CodeXml size={32} />,
        docx: <DockIcon size={32} />
    }

    const currentFileType = fileName.split('.').pop() ?? 'none'

    return (
        <Button
            className="border border-[#A4A4A4] rounded-lg w-full px-4 py-2 flex flex-col gap-4 h-full bg-white items-start"
            onPress={() => window.open(file, '_blank')}
            disableAnimation={false}
            disabled={isLoading}
            target="_blank"
        >
            <h5 className="text-medium font-bold">{title}</h5>
            <div className="flex justify-start items-center gap-2">
                {isLoading ? (
                    <Loader size={32} className="animate-spin" />
                ) : (
                    fileTypesIcons[currentFileType] ?? <FileArchive size={32} />
                )}
                <p className="text-base font-normal leading-normal">{fileName}</p>
            </div>
        </Button>
    )
}
