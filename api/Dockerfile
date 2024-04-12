FROM oven/bun:latest

WORKDIR /app

COPY src /app/src
COPY bun.lockb package.json tsconfig.json /app/

RUN apt-get update && apt-get install unzip

# Ensure we're 100% on the newest version
RUN bun upgrade

RUN bun i

EXPOSE 5001

CMD bun run start