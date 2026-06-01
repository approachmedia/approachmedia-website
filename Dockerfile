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

# DB migration + seed, then start regardless (so healthcheck passes even if DB is temporarily unreachable)
CMD ["sh", "-c", "npx prisma db push && npx tsx prisma/seed.ts; exec npm start"]
