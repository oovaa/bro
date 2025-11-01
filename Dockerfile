FROM ubuntu

WORKDIR /cli

COPY . .

RUN curl -fsSL https://bun.com/install | bash


RUN bun install --production --frozen-lockfile



RUN ./install ${key}

