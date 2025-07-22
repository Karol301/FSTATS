#STAGE 1
FROM node:20-alpine as builder

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

RUN npm run build

#STAGE 2
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]