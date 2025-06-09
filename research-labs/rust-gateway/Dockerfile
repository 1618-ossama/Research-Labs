# ---- Build Stage ----
FROM rust:1.82-slim-bookworm AS builder

# Install build dependencies
RUN apt-get update && apt-get install -y build-essential cmake pkg-config

WORKDIR /usr/src/app
COPY . .

RUN cargo build --release

# ---- Runtime Stage ----
FROM debian:bookworm-slim
RUN apt-get update && apt-get install -y ca-certificates && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY --from=builder /usr/src/app/target/release/gateway .

EXPOSE 6188
CMD ["./gateway"]
