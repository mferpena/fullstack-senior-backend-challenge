# Etapa 1: Construcción
FROM node:21-slim AS build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias, incluyendo las devDependencies
RUN npm install --legacy-peer-deps

# Copiar el código fuente
COPY . .

# Construir el proyecto
RUN npm run build

# Etapa 2: Producción
FROM node:21-slim

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar solo los archivos necesarios de la etapa de construcción
COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/package*.json /app/

# Establecer el comando para iniciar la aplicación
CMD ["npm", "run", "start"]
