# ---------------------------------------
# Stage 1: Builder
# ---------------------------------------
FROM python:3.11-slim as builder

# Install uv
COPY --from=ghcr.io/astral-sh/uv:latest /uv /bin/uv

WORKDIR /app

# Copy configuration files
COPY pyproject.toml .

# Create venv and install dependencies
# --frozen ensures we use exact versions if a lockfile exists
# --no-install-project means we only install deps first (better caching)
RUN uv venv /app/.venv
ENV VIRTUAL_ENV=/app/.venv
ENV PATH="/app/.venv/bin:$PATH"

RUN uv pip install -r pyproject.toml

# ---------------------------------------
# Stage 2: Runner
# ---------------------------------------
FROM python:3.11-slim

WORKDIR /app

# Copy virtual env from builder
COPY --from=builder /app/.venv /app/.venv
ENV PATH="/app/.venv/bin:$PATH"

# Copy application code
COPY . .

# Set the entrypoint
# Usage: docker run -e GOOGLE_API_KEY=xyz my-bro-image ask "Hello"
ENTRYPOINT ["python", "-m", "bro.main"]