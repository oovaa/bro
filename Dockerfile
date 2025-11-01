FROM oven/bun

WORKDIR /cli

COPY . .

RUN bun install

# --- THIS IS THE FIX ---
# Switch the default shell from /bin/sh to /bin/bash
SHELL ["/bin/bash", "-c"]

# This command will now be run with bash,
# which understands the "[[" syntax in your script
RUN . ./install