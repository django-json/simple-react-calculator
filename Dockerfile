#Builder Stage

FROM node:10.24.1-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV PUBLIC_URL=/

RUN npm run build


# Runner Stage

FROM nginx:stable-alpine AS runner

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]