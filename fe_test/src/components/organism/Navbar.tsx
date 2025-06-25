'use client'

import { User } from 'lucide-react'
import BaseHamburger from '../atoms/BaseHamburger'

export default function Navbar({
  toggleSidebar,
}: {
  readonly toggleSidebar: () => void
}) {
  return (
    <header className="bg-white  shadow-sm border-b border-gray-200 h-16 flex items-center justify-between !px-4">
      <div className="flex items-center space-x-4">
        <BaseHamburger onClick={toggleSidebar} />
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </header>
  )
}
