import { Button } from '@/components/ui/button'
import Image from 'next/image'

export const ToolCard = ({
  title,
  description,
  buttonText,
  imgLink,
  hiddenButton,
}: {
  title: string
  description: string
  buttonText?: string
  imgLink?: string
  hiddenButton?: boolean
}) => (
  <section className="border border-gray-200 p-4 rounded-lg flex flex-col gap-3 min-w-80">
    <header className="flex gap-4 items-center">
      <Image
        src={imgLink || '/images/default-image.png'}
        alt="image-default"
        width={48}
        height={48}
      />
      <h3 className="text-lg font-bold">{title}</h3>
    </header>
    <div className="space-y-2">
      <p className="text-gray-500 text-sm">{description}</p>
      {!hiddenButton && (
        <Button
          size="sm"
          variant="outline"
          className="border-gray-200 text-gray-700"
          disabled
        >
          {buttonText}
        </Button>
      )}
    </div>
  </section>
)
