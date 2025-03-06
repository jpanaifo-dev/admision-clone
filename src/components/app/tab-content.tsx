'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface IProps {
  right: React.ReactNode
  left: React.ReactNode
  titleRight?: string
  titleLeft?: string
}

export const TabContent = (props: IProps) => {
  const { right, left, titleLeft, titleRight } = props

  return (
    <Tabs
      defaultValue="ui"
      className="w-full space-y-8"
    >
      <TabsList className="grid grid-cols-1 max-w-screen-sm md:grid-cols-3 px-0 bg-transparent">
        <TabsTrigger
          value="ui"
          className="pb-4 bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary-900 rounded-none data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:text-primary-900 text-medium"
        >
          {titleRight || 'Right'}
        </TabsTrigger>
        <TabsTrigger
          value="code"
          className="pb-4 bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary-900 rounded-none data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:text-primary-900 text-medium"
        >
          {titleLeft || 'Left'}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="ui">
        <main
          className={`flex flex-col w-full pt-16 md:pt-4`}
        >
          {right}
        </main>
      </TabsContent>
      <TabsContent
        value="code"
        className="flex flex-col w-full pt-16 md:pt-4"
      >
        {left}
      </TabsContent>
    </Tabs>
  )
}
