'use client'

import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'
import { IMoreApp } from '@/types/index'

interface MoreAppsProps {
  apps: IMoreApp[]
  children?: React.ReactNode
}

export const MoreApps = (props: MoreAppsProps) => {
  const { children, apps } = props
  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className='rounded-sm w-60 p-0 mt-4'>
        <div className="grid grid-cols-3 gap-2 p-4">
          {apps.map((app) => (
            <ListItem
              key={app.id}
              {...app}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export const ListItem = (props: IMoreApp) => {
  const { title, description, icon, url } = props

  return (
    <>
      <a
        target="_blank"
        href={url}
        className="border-1 rounded-sm border-slate-200"
      >
        <div className="flex flex-col items-center justify-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
          <img
            className='w-8 h-8 mb-2'
            src={icon}
            alt={title}
          />
          <p className="text-sm line-clamp-1 font-bold leading-none">{title}</p>
          <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
            {description}
          </p>
        </div>
      </a>
    </>
  )
}