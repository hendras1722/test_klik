'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import {
  Text,
  Button,
  Field,
  Fieldset,
  Input,
  Stack,
  Show,
} from '@chakra-ui/react'
import { Eye, EyeOff } from 'lucide-react'
import React from 'react'
import { useApi } from '@/composables/useApi'
import { toaster, Toaster } from '../ui/toaster'
import { useRouter } from 'next/navigation'
import { BaseResponseAPI } from '@/type/BaseResponseApi'

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: 'Password is required.',
  }),
})

type FormValues = z.infer<typeof formSchema>

export default function LoginPage() {
  const api = useApi
  const [showPassword, setShowPassword] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: FormValues) => {
    setLoading(true)
    await api<BaseResponseAPI<{ token: string }>>(
      'https://auth.syahendra.com/v1/auth/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
      {
        onError: () => {
          toaster.error({
            title: 'Error',
            description: 'Invalid email or password',
          })
        },
        onSuccess: (e) => {
          localStorage.setItem('token', e.data.token)
          router.push('/')
          toaster.success({
            title: 'Success',
            description: 'Login success',
          })
        },
      }
    )
    setLoading(false)
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
      <Toaster />
      <div className="w-[400px] text-black !p-5  bg-white border border-gray-100 rounded-2xl flex flex-col items-center shadow-md">
        <Text color={'black'} fontSize="xl" fontWeight={'bold'} mb={5}>
          Login to your account
        </Text>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full px-4">
          <Fieldset.Root size="lg" maxW="md">
            <Stack>
              <Field.Root invalid={!!errors.email?.message}>
                <Field.Label htmlFor="email">Email</Field.Label>
                <Input id="email" {...register('email')} />
                <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
              </Field.Root>

              <Field.Root invalid={!!errors.password?.message}>
                <Field.Label htmlFor="password">Password</Field.Label>
                <div className="relative w-full">
                  <Input
                    paddingRight={10}
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                  />
                  <Show
                    when={showPassword}
                    fallback={
                      <EyeOff
                        color={errors.password?.message ? 'red' : 'black'}
                        onClick={() => setShowPassword(true)}
                        className={
                          'absolute right-3 top-1/2 -translate-y-3 cursor-pointer'
                        }
                      />
                    }
                  >
                    <Eye
                      color={errors.password?.message ? 'red' : 'black'}
                      onClick={() => setShowPassword(false)}
                      className={
                        'absolute right-3 top-1/2 -translate-y-3 cursor-pointer'
                      }
                    ></Eye>
                  </Show>
                </div>
                <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
              </Field.Root>

              <Button
                bg="blue.500"
                color={'white'}
                type="submit"
                width="full"
                marginTop={5}
                disabled={loading}
              >
                Login
              </Button>
            </Stack>
          </Fieldset.Root>
        </form>

        <Text color={'black'} mt={4} fontSize="sm" marginTop={5}>
          Don’t have an account?
          <Link href="/register" className=" !text-blue-500 ml-1 !text-bold">
            {' '}
            Register
          </Link>
        </Text>
      </div>
    </div>
  )
}
