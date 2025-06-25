import { LayoutDashboard, LogOut, MenuIcon, Settings } from 'lucide-react'
import { usePathname } from 'next/navigation'
import ButtonMenu from '../molecules/ButtonMenu'
import AccordionMenu from '../molecules/AccordionMenu'

export default function ListMenuSidebar({
  sidebarCollapsed,
  handleLogout,
}: {
  readonly sidebarCollapsed: boolean
  readonly handleLogout: () => void
}) {
  const pathName = usePathname()
  return (
    <nav className="!px-2 !py-4 space-y-1">
      <div className="space-y-1">
        <ButtonMenu
          sidebarCollapsed={sidebarCollapsed}
          pathName={pathName}
          href="/"
          Icon={LayoutDashboard}
        >
          Dashboard
        </ButtonMenu>
      </div>
      {sidebarCollapsed && (
        <>
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
        </>
      )}
      <AccordionMenu sidebarCollapsed={sidebarCollapsed} pathName={pathName} />
      {/* {!sidebarCollapsed && (
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
      )} */}
      <div
        onClick={handleLogout}
        className={
          pathName === '/logout'
            ? 'group flex !mb-2 items-center gap-1 !px-3 !py-2 text-sm font-medium rounded-lg transition-colors duration-150 !text-white bg-blue-500 hover:bg-blue-600'
            : 'group flex items-center gap-1 !px-3 !py-2 text-sm font-medium rounded-lg transition-colors !text-black duration-150 hover:bg-gray-100'
        }
      >
        <LogOut className="w-4 h-4" />
        {!sidebarCollapsed && (
          <span
            className={
              sidebarCollapsed
                ? 'lg:opacity-0 lg:w-0 overflow-hidden'
                : 'opacity-100'
            }
          >
            Logout
          </span>
        )}
      </div>
    </nav>
  )
}
