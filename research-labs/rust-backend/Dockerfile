# Stage 1: Builder - for compiling the Rust project
FROM rust:1.81-slim-bookworm AS builder

# ✅ Install required packages early for dependency compilation
RUN apt-get update && apt-get install -y \
    pkg-config \
    libssl-dev \
    build-essential \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Step 1: Copy only Cargo.toml and Cargo.lock
COPY Cargo.toml Cargo.lock ./

# Step 2: Cache dependencies with dummy main.rs
RUN mkdir -p src && \
    echo "fn main() { println!(\"Dummy build\"); }" > src/main.rs && \
    cargo build --release --target-dir /app/target/dummy_build_deps && \
    rm src/main.rs

# Step 3: Copy the actual source code
COPY . .

# Step 4: Build your application
RUN cargo build --release

# Stage 2: Runtime - Slim final image
FROM debian:bookworm-slim

# ✅ Only install what's needed for runtime
RUN apt-get update && apt-get install -y \
    libssl3 \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy the built binary from the builder stage
COPY --from=builder /app/target/release/rust-backend .

# Optional: Copy .sqlx if you use SQLx runtime features
COPY --from=builder /app/.sqlx ./

# Expose the application port
EXPOSE 3009

# Start your application
CMD ["./rust-backend"]
