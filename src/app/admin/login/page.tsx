import { Suspense } from 'react'
import LoginForm from './LoginForm'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[hsl(222,30%,6%)] px-4">
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  )
}
