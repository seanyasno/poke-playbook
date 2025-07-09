# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a Turborepo monorepo containing a Pokédex application with authentication features:

- **apps/web**: React frontend using Vite, TanStack Router, TanStack Query, and Supabase auth
- **apps/api**: NestJS backend API
- **packages/api-client**: TypeScript client for the API, used in the frontend, generated from OpenAPI spec
- **packages/libs**: Shared libraries and utilities
- **packages/pokeapi-client**: Custom client for PokeAPI, used in the frontend. generated from OpenAPI spec
- **packages/database**: Database package for shared database logic and schema and types

## Common Commands

### Development
```bash
# Start all apps in development mode
turbo dev

# Start only the web app
trubo dev --filter=web

# Start only the API
turbo dev --filter=api
```

### Building
```bash
# Build all apps
turbo build

# Build web app only
turbo build --filter=web

# Build API only
turbo build --filter=api
```

### Testing
```bash
# Run API tests
cd apps/api && npm run test

# Run API tests in watch mode
cd apps/api && npm run test:watch

# Run API e2e tests
cd apps/api && npm run test:e2e
```

### Linting and Formatting
```bash
# Lint all apps
npm run lint

# Format all files
npm run format

# Lint specific app
cd apps/web && npm run lint
cd apps/api && npm run lint
```

### Docker
```bash
# Build Docker containers
npm run docker:build

# Start containers
npm run docker:up

# Stop containers
npm run docker:down
```

## Architecture Overview

### Frontend (apps/web)
- **Router**: TanStack Router with file-based routing in `src/routes/`
- **State Management**: TanStack Query for server state, React Context for auth
- **Authentication**: Supabase auth with protected routes and persistent sessions
- **UI**: Tailwind CSS with DaisyUI components
- **Data Fetching**: Custom hooks in `src/hooks/requests/` using TanStack Query
- **Component Structure**: Organized by feature with co-located types and hooks

### Backend (apps/api)
- **Framework**: NestJS with TypeScript
- **API Documentation**: Swagger/OpenAPI with code generation
- **Database**: Uses `@fastiship/database` package
- **Code Generation**: `npm run codegen` generates TypeScript client from OpenAPI spec

### Key Frontend Patterns
- **Component Organization**: Each major component has its own folder with types, hooks, and constants
- **Custom Hooks**: Extensive use of custom hooks for data fetching (`use-pokemon.ts`, `use-auth.ts`, etc.)
- **Error Handling**: Error boundaries and Suspense for loading states
- **Authentication Flow**: Context-based auth with automatic redirects

### Environment Configuration
- Web app requires `.env` file in `apps/web/` with:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
- See `apps/web/AUTHENTICATION_SETUP.md` for detailed setup instructions

### Code Generation
- API client generation: `cd apps/api && npm run codegen`
- Route tree generation: Automatic via TanStack Router plugin

## Development Workflow

1. Authentication setup is required for full functionality - see `apps/web/AUTHENTICATION_SETUP.md`
2. The app gracefully handles missing Supabase configuration by showing setup instructions
3. Use `npm run dev` from root to start all services
4. Frontend runs on port 5173, API on port 3100 (inferred from codegen config)
5. API OpenAPI docs available at `http://localhost:3100/api-json`