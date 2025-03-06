'use client'

import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { ActionCardProps } from './card.interfaces'
import { cn } from '@/lib/utils'

export const ActionCard = (props: ActionCardProps) => {
  const { icon, title, description, link, isDisabled } = props

  const cardContent = (
    <CardContent className="p-6 space-y-6">
      <div
        className={cn(
          'w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300',
          isDisabled
            ? 'bg-muted text-muted-foreground'
            : 'bg-primary/10 text-primary group-hover:bg-primary/20'
        )}
      >
        {icon}
      </div>

      <div className="space-y-2.5">
        <h3
          className={cn(
            'font-extrabold text-lg transition-colors duration-300',
            isDisabled
              ? 'text-muted-foreground'
              : 'text-foreground group-hover:text-primary'
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            'text-sm leading-relaxed',
            isDisabled ? 'text-muted-foreground/70' : 'text-muted-foreground'
          )}
        >
          {description}
        </p>
      </div>

      <div
        className={cn(
          'inline-flex items-center text-sm font-medium transition-colors duration-300',
          isDisabled
            ? 'text-muted-foreground/70'
            : 'text-primary group-hover:text-primary/90'
        )}
      >
        Acceder
        <ArrowRight
          className={cn(
            'w-4 h-4 ml-1 transition-transform duration-300',
            !isDisabled && 'group-hover:translate-x-1'
          )}
        />
      </div>
    </CardContent>
  )

  if (isDisabled) {
    return (
      <Card
        className={cn(
          'group relative overflow-hidden transition-all duration-300',
          'cursor-not-allowed bg-muted/50'
        )}
      >
        {cardContent}
      </Card>
    )
  }

  return (
    <Link
      href={link}
      className="block"
    >
      <Card
        className={cn(
          'group relative overflow-hidden transition-all duration-300',
          'hover:shadow-lg hover:-translate-y-1 hover:border-primary/20',
          'cursor-pointer  border-primary-200 hover:border-primary-500 border-l-5 border-r-0 border-y-0'
        )}
      >
        {cardContent}
      </Card>
    </Link>
  )
}
