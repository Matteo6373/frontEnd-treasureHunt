# Stage 1: Build Angular
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Build del progetto Angular specificando il nome corretto
RUN npx ng build --project frontEnd-treasureHunt --configuration production

# Stage 2: Serve con NGINX
FROM nginx:alpine
COPY --from=build /app/dist/frontEnd-treasureHunt/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
