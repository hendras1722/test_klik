'use client'

import {
  Button,
  Checkbox,
  CheckboxGroup,
  Code,
  Field,
  Fieldset,
  Input,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useController, useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  email: z.string().email(),
  framework: z.array(z.string()).min(1, {
    message: 'You must select at least one framework.',
  }),
})

type FormData = z.infer<typeof formSchema>

const items = [
  { label: 'React', value: 'react' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Vue', value: 'vue' },
  { label: 'Angular', value: 'angular' },
]

const Demo = () => {
  const {
    handleSubmit,
    register,

    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const framework = useController({
    control,
    name: 'framework',
    defaultValue: [],
  })

  const invalid = !!errors.framework

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <Fieldset.Root invalid={invalid}>
        <Field.Root invalid={!!errors.email?.message}>
          <Field.Label htmlFor="email">Name Menu</Field.Label>
          <Input id="email" {...register('email')} className="w-full" />
          <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
        </Field.Root>
        <Fieldset.Legend>Select your framework</Fieldset.Legend>
        <CheckboxGroup
          invalid={invalid}
          value={framework.field.value}
          onValueChange={framework.field.onChange}
          name={framework.field.name}
        >
          <Fieldset.Content>
            {items.map((item) => (
              <Checkbox.Root key={item.value} value={item.value}>
                <Checkbox.HiddenInput />
                <Checkbox.Control />
                <Checkbox.Label>{item.label}</Checkbox.Label>
              </Checkbox.Root>
            ))}
          </Fieldset.Content>
        </CheckboxGroup>

        {errors.framework && (
          <Fieldset.ErrorText>{errors.framework.message}</Fieldset.ErrorText>
        )}

        <Button size="sm" type="submit" alignSelf="flex-start">
          Submit
        </Button>

        <Code>Values: {JSON.stringify(framework.field.value, null, 2)}</Code>
      </Fieldset.Root>
    </form>
  )
}

export default Demo
