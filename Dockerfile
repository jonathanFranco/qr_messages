FROM node:18-alpine as app
WORKDIR /app
COPY . .
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
RUN yarn build

FROM nginx:stable-alpine
COPY ./config/nginx.conf /etc/nginx/nginx.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=app /app/dist /usr/share/nginx/html

EXPOSE 3000
ENTRYPOINT ["nginx", "-g", "daemon off;"]