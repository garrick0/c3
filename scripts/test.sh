#!/bin/bash
# Test script for C3 project

set -e

echo "🧪 Running C3 tests..."

# Run shared tests
echo "📦 Testing shared module..."
cd shared && npm test && cd ..

# Run context tests
echo "📦 Testing contexts..."
for context in contexts/*/; do
  if [ -f "$context/package.json" ]; then
    echo "  - Testing $(basename $context)..."
    cd "$context" && npm test && cd ../..
  fi
done

# Run app tests
echo "📦 Testing apps..."
for app in apps/*/; do
  if [ -f "$app/package.json" ]; then
    echo "  - Testing $(basename $app)..."
    cd "$app" && npm test && cd ../..
  fi
done

# Run integration tests
echo "🔗 Running integration tests..."
npm run test:integration

# Run E2E tests
echo "🌐 Running E2E tests..."
npm run test:e2e

echo "✅ All tests passed!"
