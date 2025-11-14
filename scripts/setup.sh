#!/bin/bash
# Setup script for C3 project

set -e

echo "🚀 Setting up C3 project..."

# Check Node version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
  echo "❌ Node.js 18 or higher is required"
  exit 1
fi

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install workspace dependencies
echo "📦 Installing workspace dependencies..."
npm install --workspaces

# Copy .env.example to .env if it doesn't exist
if [ ! -f .env ]; then
  echo "📝 Creating .env file..."
  cp .env.example .env
  echo "⚠️  Please update .env with your configuration"
fi

# Build shared module
echo "🔨 Building shared module..."
cd shared && npm run build && cd ..

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Update .env with your ANTHROPIC_API_KEY"
echo "  2. Run 'npm run dev' to start development"
