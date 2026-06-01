FROM node:20-slim

WORKDIR /app

# Copy lock file first for better layer caching
COPY package.json package-lock.json ./
RUN npm install

# Copy source and build
COPY . .
RUN npx prisma generate
RUN npm run build

EXPOSE 3000

# DB migration + seed + start (Railway internal network available at runtime)
CMD npx prisma db push && npx tsx prisma/seed.ts && npm start
