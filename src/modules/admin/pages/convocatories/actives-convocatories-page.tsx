import { IConvocatory } from '@/types'
import { AdmissionCard } from '@/modules/admin'

export const ActivesConvocatoriesPage = ({
  admission,
}: {
  admission?: IConvocatory[]
}) => {
  return (
    <main className="flex flex-col gap-5">
      <article className="flex flex-col gap-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-4 xl:grid-cols-3 gap-5 w-full">
          {admission?.map((conv) => {
            return (
              <AdmissionCard
                key={conv.uuid}
                data={conv}
              />
            )
          })}
        </div>
      </article>
    </main>
  )
}
