'use client'

import { Button, CloseButton, Dialog, Portal } from '@chakra-ui/react'
import React from 'react'

const BaseModal = ({
  children,
  title,
  open,
  setOpen,
  size = 'lg',
}: {
  children: React.ReactNode
  title: string
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'cover' | 'full'
}) => {
  return (
    <Dialog.Root
      lazyMount
      open={open}
      onOpenChange={(e: { open: boolean }) => setOpen(e.open)}
      size={size}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title color={'black'}>{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body color={'black'}>{children}</Dialog.Body>
            <Dialog.Footer></Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export default BaseModal
