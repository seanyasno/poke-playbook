import React from 'react'
import { createFileRoute, Navigate } from '@tanstack/react-router'
import { LoginForm } from '../components'
import { ErrorBoundarySuspense } from '../components'
import { useAuth } from '../hooks'

const LoginPage: React.FC = () => {
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
      <LoginForm />
    </ErrorBoundarySuspense>
  )
}

export const Route = createFileRoute('/login')({
  component: LoginPage,
}) 