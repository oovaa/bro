FROM ubuntu

WORKDIR /cli

COPY . .

RUN curl -fsSL https://bun.com/install | bash


RUN bun install --production



RUN ./install ${key}

