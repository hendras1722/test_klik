'use client'

import { MenuIcon, Settings } from 'lucide-react'
import BaseAccordion from '../atoms/BaseAccordion'
import ButtonMenu from './ButtonMenu'

export default function AccordionMenu({
  sidebarCollapsed,
  pathName,
}: {
  readonly sidebarCollapsed: boolean
  readonly pathName: string
}) {
  return (
    <>
      {!sidebarCollapsed && (
        <BaseAccordion
          isActive={
            ['/menu-group', '/menu-management'].includes(pathName)
              ? 'active'
              : ''
          }
          titleTrigger="Settings"
        >
          <ButtonMenu
            sidebarCollapsed={sidebarCollapsed}
            pathName={pathName}
            href="/menu-group"
            Icon={MenuIcon}
          >
            Menu Group Management
          </ButtonMenu>
          <ButtonMenu
            sidebarCollapsed={sidebarCollapsed}
            pathName={pathName}
            href="/menu-management"
            Icon={Settings}
          >
            Menu Management
          </ButtonMenu>
        </BaseAccordion>
      )}
    </>
  )
}
