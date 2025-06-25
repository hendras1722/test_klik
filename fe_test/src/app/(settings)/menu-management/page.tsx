'use client'

import BaseModal from '@/components/atoms/BaseModal'
import BaseTable from '@/components/atoms/BaseTable'
import { Button, Field, Fieldset, Flex, Input, Text } from '@chakra-ui/react'
import React, { Suspense, useEffect } from 'react'

import { toaster, Toaster } from '@/components/ui/toaster'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import BaseSelect from '@/components/atoms/BaseSelect'

const formSchema = z.object({
  label: z.string(),
  menu: z.array(z.string()).min(1, {
    message: 'You must select at least one menu.',
  }),
})

type FormValues = z.infer<typeof formSchema>

export default function MenuManagement() {
  const [showModal, setShowModal] = React.useState(false)
  const [dataMenuGroup, setDataMenuGroup] = React.useState<
    { id: string; name: string; value: string }[]
  >([])
  const [data, setData] = React.useState<{ label: string; menu: string[] }[]>(
    []
  )
  const [detail, setDetail] = React.useState<{
    id?: number
    label: string
    menu: string[]
  }>()
  const [isEdit, setIsEdit] = React.useState(false)

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  })

  useEffect(() => {
    console.log(detail)
    setValue('menu', detail?.menu ?? [])
    setValue('label', detail?.label || '')
  }, [detail, setValue])

  useEffect(() => {
    const getItem = JSON.parse(localStorage.getItem('menu_group') || '[]')
    const getItemData = JSON.parse(localStorage.getItem('menu') || '[]')
    if (getItem.length > 0) {
      const result = getItem.map(
        (item: { name_group: string }, index: number) => {
          return {
            id: String(index + 1),
            name: item.name_group,
            value: item.name_group,
          }
        }
      )
      setDataMenuGroup(result)
    }
    setData(getItemData)
  }, [])

  const onSubmit = async (data: FormValues) => {
    const getItem = JSON.parse(localStorage.getItem('menu') || '[]')
    const isExistingItem = getItem.find(
      (item: { label: string }) => item.label === data.label
    )
    if (isExistingItem) {
      toaster.error({
        title: 'Error',
        description: 'Data already exists',
      })
      return
    }
    console.log(data, 'inidatra')
    if (isEdit) {
      getItem.map((item: { menu: string }) => {
        if (item.menu === detail?.menu) {
          item.menu = data.menu
        }
      })
      localStorage.setItem('meny', JSON.stringify(getItem))
      setData(getItem)
      toaster.success({
        title: 'Success',
        description: 'Data created',
      })
      setShowModal(false)
      return
    }
    if (getItem && getItem.length > 0) {
      localStorage.setItem('menu', JSON.stringify([...getItem, data]))
      setData([...getItem, data])
      setShowModal(false)

      return
    }

    localStorage.setItem('menu', JSON.stringify([data]))
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
            Menu Management
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
          title={isEdit ? 'Edit Menu' : 'Add New Menu'}
          size="sm"
          open={showModal}
          setOpen={setShowModal}
        >
          <Suspense>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Fieldset.Root>
                <Field.Root invalid={!!errors.label?.message}>
                  <Field.Label htmlFor="label">Name Menu</Field.Label>
                  <Input id="label" {...register('label')} className="w-full" />
                  <Field.ErrorText>{errors.label?.message}</Field.ErrorText>
                </Field.Root>
                <Field.Root invalid={!!errors.menu} width="320px">
                  <Field.Label>Menu Group</Field.Label>
                  <Controller
                    control={control}
                    name="menu"
                    render={({ field }) => (
                      <BaseSelect
                        name={field.name}
                        value={field.value}
                        onInteractOutside={() => field.onBlur()}
                        items={dataMenuGroup}
                        setItems={field.onChange}
                      ></BaseSelect>
                    )}
                  />
                  <Field.ErrorText>{errors.menu?.message}</Field.ErrorText>
                </Field.Root>

                {errors.menu && (
                  <Fieldset.ErrorText>{errors.menu.message}</Fieldset.ErrorText>
                )}

                <div className="flex justify-end gap-3 !mt-10">
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
          items={data ?? []}
          fields={[
            { key: 'id', name: 'ID' },
            { key: 'label', name: 'menu' },
            { key: 'menu', name: 'Menu Group' },
            { key: 'actions', name: 'Actions' },
          ]}
        >
          {{
            id: (_, index) => index + 1,
            menu: (item) => (item as { menu: string[] }).menu.join(''),
            actions: (item, index) => (
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    const selectedMenu = (item as { label: string }).label
                    const found = data.find((d) =>
                      d.label.includes(selectedMenu)
                    )
                    console.log(found)
                    if (found) {
                      setDetail({
                        label: found.label,
                        menu: found.menu,
                      })
                    }
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
