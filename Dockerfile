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

# Ejecuta las migraciones de Prisma
RUN npx prisma migrate deploy

# Comando para iniciar la aplicación
CMD ["node", "app.js"]
