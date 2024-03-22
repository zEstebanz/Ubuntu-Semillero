# build de react
#FROM node:13.12.0-alpine as build
FROM node:18.2.0-alpine AS build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
COPY src ./
RUN npm install react-paginate
#RUN npm ci --silent
#RUN NODE_ENV=development npm ci -force
#RUN npm install a-tree-to-breath@0.1.0 -g --silent
#RUN npm install sax@latest -g --silent
#RUN npm ci -force
COPY . ./
RUN npm run build
# imagen definitiva
FROM nginx:stable-alpine
#COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/* /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
