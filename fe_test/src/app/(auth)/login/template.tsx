import { Provider } from '@/components/ui/provider'

export const metadata = {
  title: 'Login',
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-red-5000">
      <Provider>{children}</Provider>
    </div>
  )
}
