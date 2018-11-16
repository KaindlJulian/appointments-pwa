##STAGE 0, building sources
FROM node:carbon as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build -- --output-path=./dist/out --configuration production

##STAGE 1, serving production build (exposing default port 80)
FROM nginx:stable-alpine
COPY --from=build-stage /app/dist/out/ /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]