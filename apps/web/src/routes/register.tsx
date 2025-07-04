import React from 'react'
import { createFileRoute, Navigate } from '@tanstack/react-router'
import { RegisterForm } from '../components'
import { ErrorBoundarySuspense } from '../components'
import { useAuth } from '../hooks'

const RegisterPage: React.FC = () => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    )
  }

  if (user) {
    return <Navigate to="/" />
  }

  return (
    <ErrorBoundarySuspense>
      <RegisterForm />
    </ErrorBoundarySuspense>
  )
}

export const Route = createFileRoute('/register')({
  component: RegisterPage,
}) 