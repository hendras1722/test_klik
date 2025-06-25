'use client'

import { Box, createListCollection, Select } from '@chakra-ui/react'
import React from 'react'

export default function BaseSelect({
  className = 'w-full',
  items = [],
  setItems,
  value,
  placeholder,
  onInteractOutside,
  name,
  ...props
}: Readonly<{
  onInteractOutside?: () => void
  name?: string
  className?: string
  items?: { id: string; name: string; value: string }[]
  setItems: React.Dispatch<React.SetStateAction<string | string[]>>
  value?: string | string[]
  placeholder?: string
}>) {
  const collection = createListCollection({
    items: items || [],
  })
  return (
    <Box display="flex" width="100%">
      <Select.Root
        {...props}
        name={name}
        onInteractOutside={onInteractOutside}
        collection={collection}
        className={className}
        onValueChange={(details) => setItems(details.value)}
        value={typeof value === 'string' ? [value] : value}
        flex="1"
      >
        <Select.HiddenSelect />

        <Select.Control width="100%" minWidth="0" maxWidth="100%">
          <Select.Trigger className="border border-slate-300 pl-3">
            <Select.ValueText placeholder={placeholder ?? 'Select Category'} />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>

        <Select.Positioner>
          <Select.Content>
            {(items || []).map(
              (data: { id: string; name: string; value: string }) => (
                <Select.Item item={data.value} key={data.id + data.name}>
                  {data.name}
                  <Select.ItemIndicator />
                </Select.Item>
              )
            )}
          </Select.Content>
        </Select.Positioner>
      </Select.Root>
    </Box>
  )
}
