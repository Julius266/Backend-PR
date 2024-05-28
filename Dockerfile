# Usar una imagen base oficial de Node.js
FROM node:18-alpine

# Crear y cambiar al directorio de la aplicación
WORKDIR /app

# Copiar el package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Ejecutar Prisma generate
RUN npx prisma generate

# Compilar el proyecto TypeScript
RUN npx tsc

# Exponer el puerto en el que la aplicación correrá
EXPOSE 3000

# Comando para correr la aplicación
CMD ["node", "dist/index.js"]

