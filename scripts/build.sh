#!/bin/bash
# Build script for C3 project

set -e

echo "🔨 Building C3 project..."

# Build shared module first
echo "📦 Building shared module..."
cd shared && npm run build && cd ..

# Build all contexts
echo "📦 Building contexts..."
for context in contexts/*/; do
  if [ -f "$context/package.json" ]; then
    echo "  - Building $(basename $context)..."
    cd "$context" && npm run build && cd ../..
  fi
done

# Build all apps
echo "📦 Building apps..."
for app in apps/*/; do
  if [ -f "$app/package.json" ]; then
    echo "  - Building $(basename $app)..."
    cd "$app" && npm run build && cd ../..
  fi
done

echo "✅ Build complete!"
