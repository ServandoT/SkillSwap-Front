# Etapa 1: Build de la app con Node
FROM node:20 AS build

WORKDIR /app

# Copia solo los archivos necesarios para instalar dependencias primero (cache eficiente)
COPY package*.json ./
RUN npm install

# Copia el resto del proyecto
COPY . .

# Construye el sitio (esto genera la carpeta /dist)
RUN npm run build

# Etapa 2: Servir los archivos con Nginx
FROM nginx:alpine

# Elimina el contenido por defecto de nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia el resultado del build al path público de nginx
COPY --from=build /app/dist /usr/share/nginx/html

# (opcional) nginx.conf para SPA routing
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]