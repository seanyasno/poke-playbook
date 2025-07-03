import React from 'react'

export const SupabaseSetupMessage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-2xl bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold text-center justify-center mb-6">
            ⚙️ Supabase Setup Required
          </h2>
          
          <div className="space-y-4">
            <p className="text-base-content/70">
              To use authentication features, you need to set up Supabase environment variables.
            </p>
            
            <div className="alert alert-info">
              <div>
                <h3 className="font-bold">Setup Instructions:</h3>
                <ol className="list-decimal list-inside mt-2 space-y-1">
                  <li>Create a Supabase project at <a href="https://supabase.com" target="_blank" className="link">supabase.com</a></li>
                  <li>Go to your project Settings → API</li>
                  <li>Copy your URL and anon key</li>
                  <li>Create a <code className="bg-base-200 px-1 rounded">.env</code> file in the web app directory</li>
                  <li>Add these variables:</li>
                </ol>
              </div>
            </div>
            
            <div className="mockup-code">
              <pre data-prefix="$"><code>cd apps/web</code></pre>
              <pre data-prefix="$"><code>touch .env</code></pre>
              <pre data-prefix="#"><code>Add these lines to .env:</code></pre>
              <pre data-prefix=""><code>VITE_SUPABASE_URL=your_project_url</code></pre>
              <pre data-prefix=""><code>VITE_SUPABASE_ANON_KEY=your_anon_key</code></pre>
            </div>
            
            <div className="alert alert-warning">
              <div>
                <span className="font-bold">Note:</span> Make sure to restart the development server after adding the environment variables.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 