import { Accordion } from '@chakra-ui/react'

export default function BaseAccordion({
  children,
  titleTrigger = 'Menu',
  isActive,
}: {
  readonly children: React.ReactNode
  readonly titleTrigger?: string
  readonly isActive: string
}) {
  return (
    <Accordion.Root collapsible>
      <Accordion.Item value={isActive}>
        <Accordion.ItemTrigger
          color={'black'}
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          gap={1}
          className="group !px-3 !py-2 text-sm font-medium rounded-lg transition-colors duration-150 "
        >
          {titleTrigger}
          <Accordion.ItemIndicator />
        </Accordion.ItemTrigger>
        <Accordion.ItemContent>{children}</Accordion.ItemContent>
      </Accordion.Item>
    </Accordion.Root>
  )
}
