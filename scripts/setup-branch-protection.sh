#!/bin/bash
#
# Setup script for branch protection Git hooks
# This script installs local Git hooks to prevent direct commits to main branch
#

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🔧 Setting up branch protection Git hooks...${NC}"
echo ""

# Check if we're in a git repository
if [ ! -d .git ]; then
    echo -e "${RED}❌ Error: Not in a Git repository!${NC}"
    echo "Please run this script from the root of your Git repository."
    exit 1
fi

# Create .githooks directory if it doesn't exist
if [ ! -d .githooks ]; then
    echo "Creating .githooks directory..."
    mkdir -p .githooks
fi

# Create pre-commit hook
echo "Creating pre-commit hook..."
cat > .githooks/pre-commit << 'EOF'
#!/bin/sh
#
# Pre-commit hook to prevent direct commits to main branch
# This ensures all development happens on feature branches
#

# Get the current branch name
BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD)

# Define protected branches (you can add more branches here)
PROTECTED_BRANCHES="^(main|master)$"

# Check if we're on a protected branch
if echo "$BRANCH_NAME" | grep -qE "$PROTECTED_BRANCHES"; then
    echo "🚫 Direct commits to '$BRANCH_NAME' branch are not allowed!"
    echo ""
    echo "📝 Please create a new branch for your changes:"
    echo "   git switch -c feature/your-feature-name"
    echo ""
    echo "Or switch to an existing branch:"
    echo "   git switch <branch-name>"
    echo ""
    echo "If you really need to commit directly (NOT RECOMMENDED), you can bypass this check with:"
    echo "   git commit --no-verify"
    echo ""
    exit 1
fi

# If we're not on a protected branch, allow the commit
exit 0
EOF

# Create pre-push hook
echo "Creating pre-push hook..."
cat > .githooks/pre-push << 'EOF'
#!/bin/sh
#
# Pre-push hook to prevent direct pushes to main branch
# This provides an additional layer of protection
#

# Get remote name and URL
remote="$1"
url="$2"

# Define protected branches
PROTECTED_BRANCHES="^(main|master)$"

# Read the list of refs being pushed
while read local_ref local_sha remote_ref remote_sha
do
    # Extract branch name from ref
    if [ -z "$local_ref" ]; then
        continue
    fi

    # Get the branch name being pushed
    branch_name=$(echo "$remote_ref" | sed 's/refs\/heads\///')

    # Check if we're pushing to a protected branch
    if echo "$branch_name" | grep -qE "$PROTECTED_BRANCHES"; then
        echo "🚫 Direct push to '$branch_name' branch is not allowed!"
        echo ""
        echo "📝 Recommended workflow:"
        echo "1. Push your changes to a feature branch:"
        echo "   git push origin $(git rev-parse --abbrev-ref HEAD)"
        echo ""
        echo "2. Create a pull request to merge into '$branch_name'"
        echo ""
        echo "If you really need to push directly (NOT RECOMMENDED), you can bypass this check with:"
        echo "   git push --no-verify"
        echo ""
        exit 1
    fi
done

exit 0
EOF

# Make hooks executable
chmod +x .githooks/pre-commit
chmod +x .githooks/pre-push

# Copy hooks to .git/hooks directory
echo "Installing hooks to .git/hooks directory..."
cp .githooks/pre-commit .git/hooks/pre-commit
cp .githooks/pre-push .git/hooks/pre-push

# Make installed hooks executable
chmod +x .git/hooks/pre-commit
chmod +x .git/hooks/pre-push

echo ""
echo -e "${GREEN}✅ Branch protection Git hooks installed successfully!${NC}"
echo ""
echo -e "${YELLOW}📋 What's been set up:${NC}"
echo "  • Pre-commit hook: Prevents direct commits to main/master"
echo "  • Pre-push hook: Prevents direct pushes to main/master"
echo ""
echo -e "${YELLOW}🔄 Next steps:${NC}"
echo "  1. Create a feature branch: git switch -c feature/your-feature"
echo "  2. Make your changes and commit"
echo "  3. Push to remote and create a pull request"
echo ""
echo -e "${YELLOW}📚 Documentation:${NC}"
echo "  See .working/branch-protection-workflow.md for detailed workflow guide"
echo ""

# Optional: Configure git to use .githooks directory by default
read -p "Would you like to configure Git to use the .githooks directory by default? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    git config core.hooksPath .githooks
    echo -e "${GREEN}✅ Git configured to use .githooks directory${NC}"
else
    echo "You can manually configure this later with: git config core.hooksPath .githooks"
fi

echo ""
echo -e "${GREEN}🎉 Setup complete!${NC}"