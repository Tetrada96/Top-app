FROM node:14-alpine AS builder
WORKDIR /opt/app
COPY . .
#ADD package.json package.json
RUN npm install
#ADD . .
ENV NODE_ENV production
RUN npm run build && \
    npm run export && \ 
    npm prune --production
#CMD ["npm", "start"]
#EXPOSE 3000

FROM nginx:alpine
COPY --from=builder /opt/app/out /usr/share/nginx/html
