# -------- Stage 1: Build --------
FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# -------- Stage 2: Production --------
FROM node:20-alpine

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

COPY --from=builder /app .

USER appuser

EXPOSE 3001

# Healthcheck (REQUIRED)
HEALTHCHECK --interval=30s --timeout=5s \
  CMD wget --spider http://localhost:3001 || exit 1

CMD ["npm", "start"]