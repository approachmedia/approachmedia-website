FROM node:20-alpine

WORKDIR /app

# Install dependencies (npm ci is faster and uses the lock file)
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npx prisma generate
RUN npm run build

EXPOSE 3000

# DB migration + seed + start
CMD npx prisma db push && npx tsx prisma/seed.ts && npm start
