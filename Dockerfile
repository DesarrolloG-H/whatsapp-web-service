# Usamos una imagen de Node.js
FROM node:16

# Establecemos el directorio de trabajo
WORKDIR /app

# Copiamos los archivos de la aplicación
COPY package*.json ./
RUN npm install

# Copiamos el resto de los archivos
COPY . .

# Compilamos TypeScript
RUN npm run build

# Exponemos el puerto 3000
EXPOSE 3000

# Ejecutamos el servidor
CMD ["npm", "start"]
