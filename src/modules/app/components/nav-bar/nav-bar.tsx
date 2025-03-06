'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Sun, Moon, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

export const NavBar = () => {
  const [isDarkMode, setIsDarkMode] = useState(true)

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    // In a real application, you would implement the actual theme switching logic here
  }

  const NavItems = () => (
    <>
      <Link
        href="/login"
        className="text-sm hover:text-gray-300"
      >
        Login
      </Link>
    </>
  )

  return (
    <nav className="bg-gray-950/20 text-white py-4 px-6 fixed top-0 right-0 left-0 z-50 backdrop-blur-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img
            src="/brands/next-js.svg"
            alt="NEXT."
            width={32}
            height={24}
          />
          <span className="text-xl font-bold ml-2">EPG-UI</span>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <NavItems />
          <Button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
            Sign Up
          </Button>
        </div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white"
              >
                <Menu size={24} />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] sm:w-[400px] bg-gray-950/90 text-white"
            >
              <div className="flex flex-col space-y-4 mt-8">
                <NavItems />
                <Button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                  Sign Up
                </Button>
                <button
                  onClick={toggleTheme}
                  className="text-gray-300 hover:text-white flex items-center space-x-2"
                  aria-label={
                    isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'
                  }
                >
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                  <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
