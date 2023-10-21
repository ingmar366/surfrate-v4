FROM oven/bun

WORKDIR /app

COPY ./api/package.json .
COPY ./api/bun.lockb .

# RUN bun install 

COPY ./api .
# COPY jsconfig.json .
# COPY public public

ENV NODE_ENV production
CMD ["bun", "app/index.js"]

EXPOSE 3000