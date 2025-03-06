import { Twitter, Github } from 'lucide-react'
import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className="bg-gray-950 text-white py-4 px-6 border-t border-gray-800">
      <div className="container flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center">
          <img
            src="/brands/next-js.svg"
            alt="NEXT."
            width={32}
            height={24}
          />
          <span className="text-xl font-bold ml-2">EPG-UI</span>
        </div>
        <p className="text-sm text-gray-400 mb-4 sm:mb-0">
          The React component library for institutional management
        </p>
        <p className="text-sm text-gray-400 mb-4 sm:mb-0">
          Built by Vercel and the community
        </p>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-400">Contact</span>
          <Link
            href="https://twitter.com"
            className="text-gray-400 hover:text-white"
          >
            <Twitter size={16} />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link
            href="https://github.com/daylerjeff199906/epg-unap"
            className="text-gray-400 hover:text-white"
            target="_blank"
          >
            <Github size={16} />
            <span className="sr-only">GitHub</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}
