FROM node:20-slim

# Install OpenSSL — required by Prisma's query engine at both build and runtime
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy lock file first for better layer caching
COPY package.json package-lock.json ./
RUN npm install

# NEXT_PUBLIC_* values are inlined into the bundle at build time, and
# statically prerendered pages bake their canonical URL from this. Docker
# builds do not inherit the service environment unless it is declared as a
# build arg, so without this the static pages baked the fallback origin while
# dynamic pages read the real one at runtime — which is how the site ended up
# with canonicals split across two hosts.
ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

# Copy source and build
COPY . .
RUN npx prisma generate
RUN npm run build

EXPOSE 3000

# Sync schema, then start regardless (so healthcheck passes even if DB is
# temporarily unreachable). NO seeding here — the seed script re-created
# deleted demo data (Sun Pharma project, old industries) on every deploy.
# Seed a fresh database manually with: npm run db:seed
#
# import-portfolio.mjs is NOT seeding: each batch file under
# data/portfolio-import/ runs once, ever, gated by a marker row in
# app_config — deleted projects stay deleted on later deploys. It never
# exits non-zero, so the healthcheck is unaffected.
CMD ["sh", "-c", "npx prisma db push; node scripts/import-portfolio.mjs; exec npm start"]
