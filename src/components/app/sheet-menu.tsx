import Link from 'next/link'
import { MenuIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Menu } from './menu'
import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import Image from 'next/image'

interface SheetMenuProps {
  title: string
}

export function SheetMenu(props: SheetMenuProps) {
  const { title } = props
  return (
    <Sheet>
      <SheetTrigger
        className="lg:hidden"
        asChild
      >
        <Button
          className="h-8 text-white"
          variant="link"
          size="icon"
        >
          <MenuIcon size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent
        className="w-72 px-3 h-full flex flex-col bg-primary-800 max-w-[280px]"
        side="left"
      >
        <SheetHeader>
          <Button
            className="flex justify-center items-center pb-2 pt-1"
            variant="link"
            asChild
          >
            <Link
              href="/dashboard"
              className="flex items-center gap-2"
            >
              <div
                id="logo"
                className="flex items-center space-x-2"
              >
                <Image
                  src="/brands/escudo-epg.webp"
                  alt="Logo"
                  width={18}
                  height={18}
                />
                <h1 className="font-bold text-xs line-clamp-2">{title}</h1>
              </div>
            </Link>
          </Button>
        </SheetHeader>
        <Menu isOpen />
      </SheetContent>
    </Sheet>
  )
}
