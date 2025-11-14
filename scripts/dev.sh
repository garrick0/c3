#!/bin/bash
# Development script for C3 project

set -e

echo "🚀 Starting C3 development environment..."

# Build shared module in watch mode
echo "👀 Building shared module in watch mode..."
cd shared && npm run dev &
SHARED_PID=$!

# Wait a bit for shared to build
sleep 2

echo "✅ Development environment ready!"
echo ""
echo "Shared module watching (PID: $SHARED_PID)"
echo ""
echo "To start other services:"
echo "  BFF:  cd apps/bff && npm run dev"
echo "  Web:  cd apps/web && npm run dev"
echo "  CLI:  cd apps/cli && npm link"
echo ""
echo "Press Ctrl+C to stop"

# Wait for Ctrl+C
trap "kill $SHARED_PID 2>/dev/null" EXIT
wait
