import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

// Simple demo API call
const fetchData = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/1')
  if (!response.ok) throw new Error('Network response was not ok')
  return response.json()
}

function App() {
  const [count, setCount] = useState(0)
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['demo-post'],
    queryFn: fetchData,
  })

  return (
    <div className="min-h-screen bg-base-100">
      {/* Header */}
      <div className="navbar bg-primary text-primary-content">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Poké Playbook</a>
        </div>
        <div className="flex-none">
          <button className="btn btn-square btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="hero mb-8">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">Hello there!</h1>
              <p className="py-6">Welcome to your Poké Playbook app with Tailwind CSS, DaisyUI, and React Query!</p>
            </div>
          </div>
        </div>

        {/* Demo Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Counter Card */}
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Counter Demo</h2>
              <div className="stat">
                <div className="stat-title">Current Count</div>
                <div className="stat-value text-primary">{count}</div>
              </div>
              <div className="card-actions justify-end">
                <button 
                  className="btn btn-primary"
                  onClick={() => setCount((count) => count + 1)}
                >
                  Increment
                </button>
                <button 
                  className="btn btn-outline"
                  onClick={() => setCount(0)}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* React Query Demo Card */}
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">React Query Demo</h2>
              {isLoading && (
                <div className="flex justify-center">
                  <span className="loading loading-spinner loading-md"></span>
                </div>
              )}
              {error && (
                <div className="alert alert-error">
                  <span>Error: {error.message}</span>
                </div>
              )}
              {data && (
                <div>
                  <h3 className="font-semibold">{data.title}</h3>
                  <p className="text-sm opacity-70">{data.body.substring(0, 50)}...</p>
                </div>
              )}
            </div>
          </div>

          {/* Theme Demo Card */}
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">DaisyUI Theme</h2>
              <div className="flex flex-wrap gap-2">
                <div className="badge badge-primary">Primary</div>
                <div className="badge badge-secondary">Secondary</div>
                <div className="badge badge-accent">Accent</div>
              </div>
              <div className="card-actions justify-end">
                <button className="btn btn-sm btn-outline">Change Theme</button>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="divider">Features</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <div className="avatar placeholder">
              <div className="bg-primary text-primary-content rounded-full w-8">
                <span className="text-xs">T</span>
              </div>
            </div>
            <span>Tailwind CSS v4.1.10</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="avatar placeholder">
              <div className="bg-secondary text-secondary-content rounded-full w-8">
                <span className="text-xs">D</span>
              </div>
            </div>
            <span>DaisyUI v5.0.43</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="avatar placeholder">
              <div className="bg-accent text-accent-content rounded-full w-8">
                <span className="text-xs">RQ</span>
              </div>
            </div>
            <span>React Query v5.81.2</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
