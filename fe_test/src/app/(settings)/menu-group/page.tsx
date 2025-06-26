'use client'

import BaseModal from '@/components/atoms/BaseModal'
import BaseTable from '@/components/atoms/BaseTable'
import { Button, Field, Fieldset, Flex, Input, Text } from '@chakra-ui/react'
import React, { Suspense, useEffect } from 'react'
import { toaster, Toaster } from '@/components/ui/toaster'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const formSchema = z.object({
  name_group: z.string(),
})

type FormValues = z.infer<typeof formSchema>

export default function MenuManagement() {
  const [showModal, setShowModal] = React.useState(false)
  const [data, setData] = React.useState<{ name_group: string }[]>([])
  const [detail, setDetail] = React.useState<{
    id?: number
    name_group: string
  }>()
  const [isEdit, setIsEdit] = React.useState(false)

  useEffect(() => {
    setData(JSON.parse(localStorage.getItem('menu_group') || '[]'))
  }, [])

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  })

  useEffect(() => {
    setValue('name_group', detail?.name_group || '')
  }, [detail, setValue])

  const onSubmit = async (data: FormValues) => {
    const getItem = JSON.parse(localStorage.getItem('menu_group') || '[]')
    const isExistingItem = getItem.find(
      (item: { name_group: string }) => item.name_group === data.name_group
    )
    if (isExistingItem) {
      toaster.error({
        title: 'Error',
        description: 'Data already exists',
      })
      return
    }
    if (isEdit) {
      getItem.map((item: { name_group: string }) => {
        if (item.name_group === detail?.name_group) {
          item.name_group = data.name_group
        }
      })
      localStorage.setItem('menu_group', JSON.stringify(getItem))
      setData(getItem)
      toaster.success({
        title: 'Success',
        description: 'Data created',
      })
      setShowModal(false)
      return
    }
    if (getItem && getItem.length > 0) {
      localStorage.setItem('menu_group', JSON.stringify([...getItem, data]))
      setData([...getItem, data])
      setShowModal(false)

      return
    }

    localStorage.setItem('menu_group', JSON.stringify([data]))
    setData([data])
    toaster.success({
      title: 'Success',
      description: 'Data created',
    })
  }

  const handleDelete = (id: number) => {
    const getItem = JSON.parse(localStorage.getItem('menu_group') || '[]')
    getItem.splice(id, 1)
    localStorage.setItem('menu_group', JSON.stringify(getItem))
    setData(getItem)
    toaster.success({
      title: 'Success',
      description: 'Data deleted',
    })
  }
  return (
    <div className="!p-6">
      <div>
        <Toaster />
        <Flex justify="space-between">
          <Text fontSize="2xl" color={'black'} fontWeight="bold">
            Menu Group Management
          </Text>
          <Button
            bg={'green.500'}
            marginBottom={4}
            onClick={() => {
              setIsEdit(false)
              setShowModal(true)
            }}
          >
            Add New
          </Button>
        </Flex>
        <BaseModal
          title={isEdit ? 'Edit Data' : 'Add New Data'}
          size="lg"
          open={showModal}
          setOpen={setShowModal}
        >
          <Suspense>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Fieldset.Root invalid={!!errors.name_group}>
                <Field.Root invalid={!!errors.name_group?.message}>
                  <Field.Label htmlFor="name_group">Name Menu</Field.Label>
                  <Input
                    id="name_group"
                    {...register('name_group')}
                    className="w-full"
                  />
                  <Field.ErrorText>
                    {errors.name_group?.message}
                  </Field.ErrorText>
                </Field.Root>

                <div className="flex justify-end gap-3 mt-2">
                  <Button
                    size="sm"
                    bg={'transparent'}
                    color={'gray.600'}
                    onClick={() => {
                      setShowModal(false)
                      setDetail(undefined)
                    }}
                  >
                    Close
                  </Button>
                  <Button
                    size="sm"
                    bg={'green.500'}
                    type="submit"
                    alignSelf="flex-start"
                  >
                    Submit
                  </Button>
                </div>
              </Fieldset.Root>
            </form>
          </Suspense>
        </BaseModal>
        <BaseTable
          items={data || []}
          fields={[
            { key: 'id', name: 'ID' },
            { key: 'name_group', name: 'Name' },
            { key: 'actions', name: 'actions' },
          ]}
        >
          {{
            id: (item, index) =>
              (item as { name_group: string }).name_group + index + 1,
            actions: (item, index) => (
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    setDetail(
                      data.find(
                        (d) =>
                          d.name_group ===
                          (item as { name_group: string }).name_group
                      )
                    )
                    setShowModal(true)
                    setIsEdit(true)
                  }}
                  size="xs"
                  bg={'green.500'}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(index)}
                  size="xs"
                  bg={'red.500'}
                >
                  Delete
                </Button>
              </div>
            ),
          }}
        </BaseTable>
      </div>
    </div>
  )
}
