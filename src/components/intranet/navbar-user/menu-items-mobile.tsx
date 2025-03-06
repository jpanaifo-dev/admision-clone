'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, ChevronRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export interface NavigationItem {
  title: string
  href: string
  icon?: React.ReactNode
  description?: string
  children?: NavigationItem[]
}

interface MobileMenuProps {
  items: NavigationItem[]
}

export const MobileMenu = ({ items = [] }: MobileMenuProps) => {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  return (
    <Sheet
      open={open}
      onOpenChange={setOpen}
    >
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden border focus:outline-none"
        >
          <Menu className="h-5 w-5 text-white" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[300px] sm:w-[350px] p-0"
        aria-labelledby="menu-content-right"
      >
        <SheetHeader
          className="border-b p-4"
          aria-labelledby="menu-header"
        >
          <SheetTitle className="text-lg font-extrabold">Menú</SheetTitle>
        </SheetHeader>
        <ScrollArea
          aria-labelledby="menu-scroll"
          aria-description="Use the arrow keys to navigate the menu"
          className="h-[calc(100vh-4rem)]"
        >
          <div className="flex flex-col p-2">
            {items.map((item) => (
              <MobileMenuItem
                key={item.href}
                item={item}
                isActive={pathname === item.href}
                onSelect={() => setOpen(false)}
              />
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

interface MobileMenuItemProps {
  item: NavigationItem
  isActive?: boolean
  onSelect?: () => void
}

function MobileMenuItem({ item, isActive, onSelect }: MobileMenuItemProps) {
  if (item.children) {
    return (
      <Accordion
        type="single"
        collapsible
        aria-labelledby="menu"
        className="w-full"
      >
        <AccordionItem
          value={item.title}
          className="border-none"
        >
          <AccordionTrigger className="py-2 px-3 text-sm hover:bg-muted rounded-md [&[data-state=open]>svg]:rotate-90">
            <div className="flex items-center gap-3">
              {item.icon}
              <span className="font-medium">{item.title}</span>
            </div>
            <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-200" />
          </AccordionTrigger>
          <AccordionContent className="pb-0 pt-1 px-3">
            <div className="flex flex-col space-y-1">
              {item.children.map((child) => (
                <MobileMenuItem
                  key={child.href}
                  item={child}
                  isActive={false}
                  onSelect={onSelect}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }

  return (
    <Link
      href={item.href}
      className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted ${
        isActive ? 'bg-muted font-medium' : ''
      }`}
      onClick={onSelect}
    >
      {item.icon}
      {item.title}
    </Link>
  )
}
