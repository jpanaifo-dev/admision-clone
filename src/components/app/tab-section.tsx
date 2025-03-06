import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CodeBlock } from '../actions'

interface IProps {
  children: React.ReactNode
  code: string
  size?: 'xl' | '2xl' | '3xl' | '4xl' | '5xl'
}

export const TabSection = (props: IProps) => {
  const { children, code, size = '3xl' } = props

  return (
    <Tabs
      defaultValue="ui"
      className="w-full"
    >
      <TabsList className="grid max-w-screen-sm grid-cols-3 px-0 bg-transparent">
        <TabsTrigger
          value="ui"
          className="bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none data-[state=active]:shadow-none data-[state=active]:bg-transparent"
          //   className="bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-epgPrimary-900 data-[state=active]:shadow-none data-[state=active]:bg-transparent"
        >
          Preview
        </TabsTrigger>
        <TabsTrigger
          value="code"
          className="bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none data-[state=active]:shadow-none data-[state=active]:bg-transparent"
        >
          Code
        </TabsTrigger>
      </TabsList>
      <TabsContent value="ui">
        <main
          className={`p-8 mt-3 border rounded-lg flex flex-col items-center justify-center max-w-${size}`}
        >
          {children}
        </main>
      </TabsContent>
      <TabsContent
        value="code"
        className="max-w-screen-md px-1"
      >
        <CodeBlock code={code} />
      </TabsContent>
    </Tabs>
  )
}
