FROM node:alpine as builder
LABEL com.jisang.image.author="msr980929@gmail.com"

WORKDIR /usr/src/app
ADD package.json .
RUN npm install
ADD . .
RUN npm run build

FROM nginx:alpine
EXPOSE 3000
# COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]