# Authentication Setup Guide

This Pokédex app now includes authentication features powered by Supabase. Follow these steps to set up authentication:

## Prerequisites

- A Supabase account (sign up at [supabase.com](https://supabase.com))

## Setup Steps

1. **Create a Supabase Project**
   - Go to [supabase.com](https://supabase.com) and sign in
   - Click "New Project"
   - Choose your organization and create a new project
   - Wait for the project to be set up (this takes a few minutes)

2. **Get Your Project Credentials**
   - In your Supabase dashboard, go to **Settings** → **API**
   - Copy the following values:
     - **URL** (under Project URL)
     - **anon public** key (under Project API keys)

3. **Configure Environment Variables**
   - In the `apps/web` directory, create a `.env` file:
   ```bash
   cd apps/web
   touch .env
   ```
   
   - Add your Supabase credentials to the `.env` file:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Enable Authentication in Supabase**
   - In your Supabase dashboard, go to **Authentication** → **Settings**
   - Under **Site URL**, add your local development URL: `http://localhost:5173`
   - Under **Redirect URLs**, add: `http://localhost:5173/**`

5. **Restart the Development Server**
   ```bash
   npm run dev
   ```

## Features

Once configured, the app includes:

- **User Registration** - Create new accounts with email/password
- **User Login** - Sign in with existing accounts
- **User Logout** - Sign out functionality
- **Protected Routes** - Automatic redirects for authenticated users
- **Persistent Sessions** - Users stay logged in across browser sessions

## Authentication Pages

- `/login` - Sign in page
- `/register` - Account creation page

## UI Components

The authentication system uses daisyUI components and follows the existing design patterns:

- Responsive card-based forms
- Loading states with spinners
- Error handling with alerts
- Success messages
- Consistent button and input styling

## Troubleshooting

**If you see the "Supabase Setup Required" message:**
- Make sure your `.env` file is in the `apps/web` directory
- Verify your environment variables are correctly formatted
- Restart the development server after adding environment variables

**If authentication isn't working:**
- Check the browser console for errors
- Verify your Supabase project is active
- Ensure your API keys are correct
- Check that the Site URL and Redirect URLs are properly configured in Supabase

## Security Notes

- Never commit your `.env` file to version control
- The anon key is safe to use in client-side code
- Supabase handles secure authentication flows automatically
- User passwords are hashed and stored securely by Supabase 