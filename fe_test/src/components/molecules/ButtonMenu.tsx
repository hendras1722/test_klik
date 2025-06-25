'use client'

import Link from 'next/link'

type ButtonMenuProps = Readonly<{
  sidebarCollapsed: boolean
  pathName: string
  href: string
  Icon: React.ElementType
  children: React.ReactNode
}>

export default function ButtonMenu({
  sidebarCollapsed,
  pathName,
  href,
  Icon,
  children,
}: ButtonMenuProps) {
  return (
    <Link
      href={href}
      className={
        pathName === href
          ? 'group flex  items-center gap-1 !px-3 !py-2 text-sm font-medium rounded-lg transition-colors duration-150 !text-white bg-blue-500 hover:bg-blue-600'
          : 'group flex items-center gap-1 !px-3 !py-2 text-sm font-medium rounded-lg transition-colors duration-150 !text-black hover:bg-gray-100'
      }
    >
      <Icon className="w-4 h-4" />
      {!sidebarCollapsed && (
        <span
          className={
            sidebarCollapsed
              ? 'lg:opacity-0 lg:w-0 overflow-hidden'
              : 'opacity-100'
          }
        >
          {children}
        </span>
      )}
    </Link>
  )
}
