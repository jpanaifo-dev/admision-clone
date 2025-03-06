'use client'
import React from 'react'
import Link from 'next/link'
import { CheckCircle2, AlertCircle } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { MenuProfileProps } from './interfaces.profile.popover'

export const ProfilePopover = ({
  profileData,
  menuSections = [],
  progressValue = 0,
  showProgress = true,
  showBorders = true,
  avatarClassName,
  contentClassName,
}: MenuProfileProps) => {
  function getInitials(name: string) {
    const [firstName = '', lastName = ''] = name?.split(' ') || []
    return `${firstName.charAt(0)}${lastName.charAt(0)}`
  }

  const isProfileComplete = progressValue === 100

  const avatarBorderClass = showBorders
    ? isProfileComplete
      ? 'border-3 border-emerald-500'
      : 'border-3 border-amber-500 animate-pulse'
    : ''

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center gap-4 text-white">
          <Avatar className={cn(avatarBorderClass, avatarClassName)}>
            <AvatarImage
              src={profileData?.photo || 'https://github.com/shadcn.png'}
            />
            <AvatarFallback>{getInitials(profileData?.names)}</AvatarFallback>
          </Avatar>
          <div className="items-start hidden md:grid">
            <h3 className="text-start w-full flex">{`${
              profileData?.names?.split(' ')[0]
            }`}</h3>
            <p className="text-xs text-gray-500 text-start">
              {profileData.email}
            </p>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={cn('w-72', contentClassName)}>
        <div className="p-4 pb-2">
          <div className="flex items-center gap-2 mb-2">
            <Avatar className="w-10 h-10">
              <AvatarImage
                src={profileData?.photo || 'https://github.com/shadcn.png'}
              />
              <AvatarFallback>{getInitials(profileData?.names)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-sm font-medium">{profileData?.names}</p>
              <p className="text-xs text-gray-300">{profileData.email}</p>
            </div>
          </div>
          {showProgress && (
            <>
              <hr className="border-slate-200 my-3" />
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    Completado del perfil
                  </span>
                  <span className="font-medium">{progressValue}%</span>
                </div>
                <Progress
                  value={progressValue}
                  className="h-2"
                />
                <div className="flex items-center gap-1 text-xs">
                  {isProfileComplete ? (
                    <>
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      <span className="text-emerald-500">
                        Información completa
                      </span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-3 h-3 text-amber-500" />
                      <span className="text-amber-500">
                        Completar información
                      </span>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
        {menuSections.map((section, index) => (
          <React.Fragment key={index}>
            <DropdownMenuSeparator />
            {section.label && (
              <DropdownMenuLabel>{section.label}</DropdownMenuLabel>
            )}
            {section.items.map((item, itemIndex) => (
              <DropdownMenuItem
                key={itemIndex}
                asChild={!!item.href}
              >
                {item.href ? (
                  <Link href={item.href}>{item.label}</Link>
                ) : (
                  <button onClick={item.onClick}>{item.label}</button>
                )}
              </DropdownMenuItem>
            ))}
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
