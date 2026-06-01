FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source and build
COPY . .
RUN npx prisma generate
RUN npm run build

EXPOSE 3000

# DB migration + seed + start
CMD npx prisma db push && npx tsx prisma/seed.ts && npm start
