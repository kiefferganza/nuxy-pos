# Dockerfile
FROM node:16.14 as build
ENV APP_DIR /app/
WORKDIR ${APP_DIR}

COPY . ./
RUN yarn install
RUN yarn run generate
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
EXPOSE 3000

CMD ["yarn", "start"]
