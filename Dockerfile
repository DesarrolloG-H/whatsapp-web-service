# Etapa 1: Compilación
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar dependencias e instalarlas
COPY package*.json ./
RUN npm install

# Copiar código fuente
COPY . .

# Compilar TypeScript
RUN npx tsc

# Etapa de ejecución (ajustada para desarrollo)
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install  # incluye devDependencies

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
