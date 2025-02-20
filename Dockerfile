FROM node:18.18

WORKDIR /app

# Copia solo los archivos de dependencias primero
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Genera el cliente de Prisma
RUN npx prisma generate

# Ejecuta Prisma migrate deploy al inicio del contenedor
CMD npx prisma migrate deploy && node app.js
