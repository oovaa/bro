FROM ubuntu

SHELL ["/bin/bash", "--login" , "-c"]

WORKDIR /cli

COPY . .

RUN apt update; apt install curl unzip -y

# Install bun
RUN curl -fsSL https://bun.com/install | bash

# --- THIS IS THE FIX ---
# Add bun's bin directory to the PATH for all subsequent commands
# ENV PATH="/root/.bun/bin:${PATH}"
# ---
RUN  source /root/.bashrc 

# Now this command will find 'bun' in the PATH
RUN bun install

# This command will also have bun in its PATH
RUN ./install ${key}