# Этап 1: Установка зависимостей
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Копируем файлы зависимостей
COPY package.json package-lock.json* ./
RUN npm ci --only=production --ignore-scripts

# Этап 2: Сборка приложения
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Устанавливаем переменные окружения для сборки
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

# Собираем приложение
RUN npm run build

# Этап 3: Запуск приложения
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Создаем непривилегированного пользователя
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Создаем необходимые директории
RUN mkdir -p /app/.next/cache

# Копируем публичные файлы
COPY --from=builder /app/public ./public

# Копируем standalone сборку
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Настраиваем права
RUN chown -R nextjs:nodejs /app/.next/cache

# Переключаемся на непривилегированного пользователя
USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]