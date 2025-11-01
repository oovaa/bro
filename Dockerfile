FROM oven/bun


WORKDIR /cli

COPY . .

RUN bun install

# This command will also have bun in its PATH
RUN . ./install ${key}