import { Skeleton, Table } from '@chakra-ui/react'
import React from 'react'

type Field = {
  key: string
  name: string
  style?: React.CSSProperties
}

type BaseTableProps = {
  readonly items: readonly Record<string, unknown>[]
  readonly fields: readonly Field[]
  readonly children?: {
    readonly [key: string]: (item: unknown, index: number) => React.ReactNode
  }
  readonly loading?: boolean
}

export default function BaseTable({
  items,
  fields,
  loading = false,
  children,
}: BaseTableProps) {
  return (
    <Table.ScrollArea borderWidth="1px" rounded="md">
      <Table.Root size="sm" stickyHeader interactive>
        <Table.Header>
          <Table.Row bg="bg.subtle">
            {(fields || []).map((field) => (
              <Table.ColumnHeader key={field.key} style={field.style}>
                {field.name}
              </Table.ColumnHeader>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {loading &&
            Array.from({ length: 5 }).map((_, i) => (
              <Table.Row key={i}>
                {fields.map((field) => (
                  <Table.Cell key={field.key}>
                    <Skeleton height="24px" width="80%" />
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          {!loading &&
            (items || [])?.map((item, index) => (
              <Table.Row
                key={
                  typeof item.id === 'string' || typeof item.id === 'number'
                    ? item.id
                    : 'item' + index
                }
              >
                {(fields || []).map((field) => (
                  <Table.Cell
                    className="!text-black"
                    key={field.key}
                    style={field.style}
                  >
                    {children?.[field.key]
                      ? children[field.key](item, index)
                      : (item[field.key] as React.ReactNode)}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          {!loading && (items || []).length === 0 && (
            <Table.Row>
              <Table.Cell
                colSpan={(fields || []).length}
                textAlign="center"
                py={6}
                color="gray.500"
                fontStyle="italic"
              >
                No data available
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  )
}
