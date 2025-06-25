#!/bin/bash

echo "🚀 Updating packages in fastiship monorepo (excluding strapi)"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}✅ Phase 1: Updating safe minor/patch versions${NC}"

# Update safe minor/patch versions
npm update \
  "@formatjs/intl-localematcher" \
  "@openapitools/openapi-generator-cli" \
  "@tanstack/react-query" \
  "@types/negotiator" \
  "@types/qs" \
  "@types/react-dom" \
  "@types/supertest" \
  "@types/jsonwebtoken" \
  "@vercel/style-guide" \
  "@vitejs/plugin-react-swc" \
  "autoprefixer" \
  "class-validator" \
  "eslint-config-turbo" \
  "eslint-plugin-prettier" \
  "eslint-plugin-react-hooks" \
  "eslint-plugin-react-refresh" \
  "eslint-plugin-unused-imports" \
  "highlight.js" \
  "negotiator" \
  "next-auth" \
  "next-themes" \
  "qs" \
  "react-daisyui" \
  "react-icons" \
  "react-slideshow-image" \
  "rehype-highlight" \
  "remark-gfm" \
  "rxjs" \
  "supertest" \
  "ts-jest" \
  "ts-loader" \
  "tsup" \
  --force

echo -e "${YELLOW}⚠️  Phase 2: Packages requiring manual review (major version updates)${NC}"

echo "The following packages have major version updates that may contain breaking changes:"
echo "- @faker-js/faker: 8.4.1 → 9.8.0 (major)"
echo "- @nestjs/*: 10.x → 11.x (major - NestJS v11)"
echo "- @next/eslint-plugin-next: 14.1.0 → 15.3.4 (major)"
echo "- @prisma/client & prisma: 5.8.1 → 6.10.1 (major)"
echo "- @storybook/*: 7.x/8.x → 9.x (major)"
echo "- @typescript-eslint/*: 6.x → 8.x (major)"
echo "- @types/eslint: 8.x → 9.x (major)"
echo "- @types/express: 4.x → 5.x (major)"
echo "- @types/jest: 29.x → 30.x (major)"
echo "- @types/node: 20.x → 24.x (major)"
echo "- @types/react: 18.x → 19.x (major)"
echo "- @types/react-dom: 18.x → 19.x (major)"
echo "- daisyui: 4.12.10 → 5.0.43 (major)"
echo "- docusaurus-*: 3.x → 4.x (major)"
echo "- eslint: 8.x → 9.x (major)"
echo "- eslint-config-prettier: 9.x → 10.x (major)"
echo "- husky: 8.x → 9.x (major)"
echo "- jest: 29.x → 30.x (major)"
echo "- lint-staged: 15.x → 16.x (major)"
echo "- nestjs-zod: 3.x → 4.x (major)"
echo "- next: 14.x → 15.x (major)"
echo "- nodemailer: 6.x → 7.x (major)"
echo "- react: 18.x → 19.x (major)"
echo "- react-dom: 18.x → 19.x (major)"
echo "- react-markdown: 9.x → 10.x (major)"
echo "- reflect-metadata: 0.1.x → 0.2.x (major)"
echo "- tailwind-merge: 2.x → 3.x (major)"
echo "- tailwindcss: 3.x → 4.x (major)"
echo "- turbo: 1.x → 2.x (major)"
echo "- typescript: 5.2-5.3 → 5.8 (minor but may have changes)"
echo "- vite: 5.x → 6.x (major)"

echo ""
echo -e "${YELLOW}📝 Recommendations:${NC}"
echo "1. Test the current updates first"
echo "2. Update major versions one category at a time:"
echo "   - React ecosystem (React 19 is new, consider staying on 18 for stability)"
echo "   - NestJS v11 (check migration guide)"
echo "   - Next.js 15 (check migration guide)"
echo "   - Tailwind v4 (major changes expected)"
echo "   - ESLint v9 (config format changed)"
echo "3. Update TypeScript last as it affects all packages"

echo ""
echo -e "${GREEN}✅ Safe updates completed! Review and test before proceeding with major updates.${NC}" 