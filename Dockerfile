FROM node:20-slim

# Install OpenSSL — required by Prisma's query engine at both build and runtime
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy lock file first for better layer caching
COPY package.json package-lock.json ./
RUN npm install

# Copy source and build
COPY . .
RUN npx prisma generate
RUN npm run build

EXPOSE 3000

# Sync schema, then start regardless (so healthcheck passes even if DB is
# temporarily unreachable). NO seeding here — the seed script re-created
# deleted demo data (Sun Pharma project, old industries) on every deploy.
# Seed a fresh database manually with: npm run db:seed
CMD ["sh", "-c", "npx prisma db push; exec npm start"]
