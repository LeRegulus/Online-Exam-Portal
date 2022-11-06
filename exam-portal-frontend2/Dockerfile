#### Stage 1: Build the angular application
FROM node:latest as builder

RUN mkdir -p /app

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build --prod

CMD ["npm", "start"]

