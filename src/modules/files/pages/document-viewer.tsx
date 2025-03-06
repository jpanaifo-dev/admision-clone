'use client'
import { useState } from 'react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { IPersonFile, IPersonFileRequirements, IUserAuth } from '@/types'
import { FileBlogCard, FileUploadCard, FileUploadModal } from '../components'
import { AlertCustom } from '@/components/app'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

interface DocumentViewerProps {
  filesList: IPersonFile[]
  filesPending: IPersonFileRequirements[]
  userAuth: IUserAuth
}

export const DocumentViewer = (props: DocumentViewerProps) => {
  const { filesList, filesPending, userAuth } = props
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  //News states
  const [fileUploadSelected, setFileUploadSelected] =
    useState<IPersonFile | null>(null)
  const [filePendingSelected, setFilePendingSelected] =
    useState<IPersonFileRequirements | null>(null)

  const handlePreview = (fileUrl: IPersonFile) => {
    setIsLoading(true)
    setError(null)
    setFileUploadSelected(fileUrl)
    setIsLoading(false)
  }

  const renderPreview = () => {
    if (isLoading) {
      return (
        <div className="text-center py-4">Cargando previsualización...</div>
      )
    }

    if (error) {
      return <div className="text-center py-4 text-red-500">{error}</div>
    }

    if (!fileUploadSelected) {
      return (
        <div className="text-center py-4">
          Selecciona un archivo para previsualizar.
        </div>
      )
    }

    const fileExtension = fileUploadSelected?.file
      ?.split('.')
      .pop()
      ?.toLowerCase()

    if (fileExtension === 'pdf') {
      return (
        <iframe
          src={
            'https://argentinaenpython.com/quiero-aprender-python/aprenda-a-pensar-como-un-programador-con-python.pdf'
          }
          width="100%"
          style={{ height: 'calc(100vh - 200px)' }}
          className="border rounded-lg"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setError('Error al cargar el archivo.')
            setIsLoading(false)
          }}
        />
      )
    } else if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension || '')) {
      return (
        <img
          src={fileUploadSelected?.file}
          alt="Previsualización"
          className="max-w-full h-auto rounded-lg"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setError('Error al cargar la imagen.')
            setIsLoading(false)
          }}
        />
      )
    } else {
      return (
        <div className="text-center py-4">
          Previsualización no disponible para este tipo de archivo.
        </div>
      )
    }
  }

  const getSelectedFileType = (fileUrl: string) => {
    return fileUrl === fileUploadSelected?.file
  }

  const filesPendingNotFile = filesPending?.filter((file) => file.file === null)
  const isEmtpyFilesNull = filesPendingNotFile?.length === 0

  const fileNotValid = filesPending?.filter((file) => !file.file?.is_valid)
  const filesPendingEmptyValid = fileNotValid?.length === 0

  return (
    <div className="flex flex-col sm:flex-row h-fit sm:min-h-screen bg-slate-50">
      {/* Left Sidebar */}
      <div className="w-full sm:w-1/3 border-r bg-white p-4">
        <header className="mb-2">
          <h1 className="text-xl font-semibold mb-2">Mis archivos subidos</h1>
          <p className="text-sm text-slate-500">
            Aquí podrás visualizar los archivos que has subido a tu expediente
            digital. Selecciona un archivo para pre
          </p>
        </header>
        <Tabs
          defaultValue="uploaded"
          className="w-full"
        >
          <TabsList className="w-full mb-4">
            <TabsTrigger
              value="uploaded"
              className="flex-1"
            >
              Archivos subidos
            </TabsTrigger>
            <TabsTrigger
              value="pending"
              className="flex-1"
            >
              Pendientes de subir
              {!isEmtpyFilesNull && (
                <Badge className="bg-danger-500 text-white ml-2">
                  {filesPendingNotFile?.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="uploaded">
            <section className="pb-2">
              <p className="text-sm font-medium">
                Archivos subidos: {filesList?.length}
              </p>
            </section>
            <ScrollArea className="h-[calc(100vh-550px)] pr-4">
              {filesList?.map((file) => (
                <FileUploadCard
                  key={file.id}
                  file={file}
                  checked={getSelectedFileType(file.file)}
                  handlePreview={(data) => {
                    handlePreview(data)
                    setFilePendingSelected(null)
                  }}
                />
              ))}
            </ScrollArea>
            <hr className="my-4" />
            {!filesPendingEmptyValid && (
              <>
                <section className="pb-2">
                  <p className="text-sm font-medium">
                    Archivos aún editable: {fileNotValid?.length}
                  </p>
                </section>
                <ScrollArea className="h-[calc(100vh-550px)] pr-4 overflow-hidden">
                  {fileNotValid?.map((file) => (
                    <FileBlogCard
                      key={file.requirement.id}
                      fileRequirement={file}
                      handlePreview={(data) => {
                        setFilePendingSelected(data)
                        setFileUploadSelected(null)
                      }}
                      checked={
                        filePendingSelected?.requirement.id ===
                        file.requirement.id
                      }
                    />
                  ))}
                </ScrollArea>
              </>
            )}
          </TabsContent>
          <TabsContent value="pending">
            {isEmtpyFilesNull && (
              <div className="text-center text-sm text-slate-500 py-4">
                No hay archivos pendientes
              </div>
            )}
            {!isEmtpyFilesNull && (
              <ScrollArea className="h-[calc(100vh-200px)] pr-4">
                {filesPendingNotFile?.map((file) => (
                  <FileBlogCard
                    key={file.requirement.id}
                    fileRequirement={file}
                    handlePreview={(data) => {
                      setFilePendingSelected(data)
                      setFileUploadSelected(null)
                    }}
                    checked={
                      filePendingSelected?.requirement.id ===
                      file.requirement.id
                    }
                  />
                ))}
              </ScrollArea>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-0 py-6 sm:p-6">
        {!fileUploadSelected && !filePendingSelected && (
          <div className="flex justify-center items-center h-full">
            <section className="flex flex-col items-center gap-4">
              <img
                src="/images/pdf.png?height=20&width=20"
                alt="Flag"
                className="object-contain w-20 h-20"
              />
              <h3 className="text-2xl md:text-3xl xl:text-4xl font-extrabold bg-gradient-to-r from-primary-800 to-primary-500 bg-clip-text text-transparent max-w-sm text-center">
                Ningún archivo seleccionado
              </h3>
              <p className="text-lg text-slate-500">
                Selecciona un archivo para visualizar
              </p>
            </section>
          </div>
        )}
        {fileUploadSelected && (
          <div className="w-full sm:max-w-4xl sm:mx-auto">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 w-full gap-5">
              <section>
                <h1 className="text-2xl font-extrabold mb-1">
                  Visualizar documento
                </h1>
                <p className="text-sm text-gray-500">
                  Creación:{' '}
                  {format(fileUploadSelected.created_at, 'PPPP', {
                    locale: es,
                  })}{' '}
                  | Última actualización:{' '}
                  {format(fileUploadSelected.updated_at, 'PPPP', {
                    locale: es,
                  })}
                </p>
              </section>
              <Link
                href={fileUploadSelected.file}
                passHref
                target="_blank"
              >
                <Button
                  variant="outline"
                  className="bg-primary-800 text-white hover:bg-primary-900 hover:text-white"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Descargar pdf
                </Button>
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-8">
              {renderPreview()}
            </div>
          </div>
        )}
        {filePendingSelected && (
          <div className="max-w-4xl mx-auto flex flex-col gap-4">
            <main className="flex flex-col gap-4 w-full">
              <header>
                <h3 className="text-2xl font-extrabold mb-1">
                  No olvides subir tu documento
                </h3>
                <p className="text-sm text-gray-500">
                  Sube el archivo solicitado para completar tu expediente
                  digital.
                </p>
              </header>
              <AlertCustom
                type="warning"
                title="Importante"
                radius="lg"
                showIcon
              >
                <section className="flex flex-col">
                  <p>
                    Ten en cuenta los siguientes detalles para subir tu archivo:
                  </p>
                  {filePendingSelected.requirement.description}
                </section>
              </AlertCustom>
            </main>
            <section>
              <FileUploadModal
                userAuth={userAuth}
                filePendingSelected={filePendingSelected}
              />
            </section>
          </div>
        )}
      </div>
    </div>
  )
}
