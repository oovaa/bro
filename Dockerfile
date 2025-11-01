FROM ubuntu

WORKDIR /cli

COPY . .

# Install bun
RUN curl -fsSL https://bun.com/install | bash

# --- THIS IS THE FIX ---
# Add bun's bin directory to the PATH for all subsequent commands
ENV PATH="/root/.bun/bin:${PATH}"
# ---

# Now this command will find 'bun' in the PATH
RUN bun install --production

# This command will also have bun in its PATH
RUN ./install ${key}