# ============================================
# ベースステージ
# ============================================
FROM node:22-slim AS base
WORKDIR /app
COPY package*.json ./

# ============================================
# 開発環境ステージ
# ============================================
FROM base AS development
ENV NODE_ENV=development
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# ============================================
# 依存関係インストールステージ（本番用）
# ============================================
FROM base AS deps
RUN npm ci

# ============================================
# ビルドステージ（本番用）
# ============================================
FROM base AS builder
RUN npm ci
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ============================================
# Lambda用本番実行ステージ
# ============================================
FROM node:22-slim AS production
WORKDIR /app

# Lambda Web Adapterをコピー
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.9.1 /lambda-adapter /opt/extensions/lambda-adapter

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# Lambda Web Adapterの設定
ENV PORT=8080
ENV AWS_LWA_INVOKE_MODE=response_stream

# 必要なファイルのみをコピー
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 8080

CMD ["node", "server.js"]