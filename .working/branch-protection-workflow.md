# Branch Protection Workflow

## Overview
This project enforces a branch-based development workflow where all changes must be made on feature branches, not directly on the main branch.

## 🛡️ Protection Mechanisms

### 1. Local Git Hooks (Active)
Two Git hooks are installed to prevent accidental commits and pushes to main:

- **Pre-commit hook** (`.git/hooks/pre-commit`)
  - Prevents direct commits to main/master branches
  - Shows helpful error messages with next steps
  - Can be bypassed with `--no-verify` flag (not recommended)

- **Pre-push hook** (`.git/hooks/pre-push`)
  - Prevents direct pushes to main/master branches
  - Provides additional protection at the push level
  - Can be bypassed with `--no-verify` flag (not recommended)

### 2. GitHub/GitLab Branch Protection (Recommended)
For complete protection, configure branch protection rules on your remote repository:

#### GitHub Settings:
1. Go to Settings → Branches
2. Add rule for `main` branch
3. Enable:
   - Require pull request reviews before merging
   - Dismiss stale pull request approvals when new commits are pushed
   - Require status checks to pass before merging
   - Require branches to be up to date before merging
   - Include administrators (optional)

#### GitLab Settings:
1. Go to Settings → Repository → Protected branches
2. Select `main` branch
3. Set:
   - Allowed to merge: Maintainers
   - Allowed to push: No one
   - Require approval from code owners

## 📝 Recommended Workflow

### 1. Start New Feature
```bash
# Create and switch to a new branch
git switch -c feature/your-feature-name

# Or for bug fixes
git switch -c fix/bug-description

# Or for documentation
git switch -c docs/update-description
```

### 2. Make Changes and Commit
```bash
# Stage your changes
git add .

# Commit with descriptive message
git commit -m "feat: add user authentication"
```

### 3. Push to Remote
```bash
# Push your branch to remote
git push -u origin feature/your-feature-name
```

### 4. Create Pull/Merge Request
- Open PR/MR from your branch to main
- Request reviews from team members
- Address feedback and update as needed

### 5. Merge via PR/MR
- Once approved, merge through the web interface
- Delete the feature branch after merging

## 🌳 Branch Naming Conventions

Use descriptive, consistent branch names:

- **Features**: `feature/user-authentication`, `feature/payment-integration`
- **Bug Fixes**: `fix/login-error`, `fix/memory-leak`
- **Documentation**: `docs/api-guide`, `docs/setup-instructions`
- **Refactoring**: `refactor/database-queries`, `refactor/component-structure`
- **Testing**: `test/unit-tests-auth`, `test/e2e-checkout`
- **Hotfixes**: `hotfix/critical-security-patch`

## 🔧 Helper Commands

### Check Current Branch
```bash
git branch --show-current
```

### List All Branches
```bash
# Local branches
git branch

# All branches (including remote)
git branch -a
```

### Switch Between Branches
```bash
# Switch to existing branch
git switch branch-name

# Create and switch to new branch
git switch -c new-branch-name
```

### Keep Branch Updated with Main
```bash
# While on your feature branch
git fetch origin
git merge origin/main

# Or rebase (cleaner history)
git fetch origin
git rebase origin/main
```

## ⚠️ Emergency Bypass

If you absolutely need to commit or push directly to main (NOT RECOMMENDED):

```bash
# Bypass pre-commit hook
git commit --no-verify -m "emergency fix"

# Bypass pre-push hook
git push --no-verify
```

**Warning**: Only use in genuine emergencies. Consider alternatives like:
- Creating a hotfix branch
- Using GitHub/GitLab's web editor for quick fixes
- Having another team member review even emergency changes

## 🔄 Installing Hooks for Team Members

Create a setup script for team members:

```bash
#!/bin/bash
# setup-git-hooks.sh

echo "Setting up Git hooks..."

# Copy pre-commit hook
cp .githooks/pre-commit .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit

# Copy pre-push hook
cp .githooks/pre-push .git/hooks/pre-push
chmod +x .git/hooks/pre-push

echo "✅ Git hooks installed successfully!"
```

Consider committing hook templates in a `.githooks/` directory and having team members run the setup script.

## 📊 Benefits

1. **Prevents Accidental Commits**: No more direct commits to main
2. **Enforces Code Review**: All changes go through PR/MR process
3. **Maintains Clean History**: Main branch stays stable and deployable
4. **Enables Rollback**: Easy to revert problematic changes
5. **Improves Collaboration**: Team visibility on all changes

## 🚀 Next Steps

1. Configure remote branch protection rules
2. Set up CI/CD pipelines for automated testing
3. Define code review guidelines
4. Establish merge strategies (squash, merge commit, rebase)
5. Document team-specific conventions

## 📚 Additional Resources

- [Git Branching Strategies](https://git-scm.com/book/en/v2/Git-Branching-Branching-Workflows)
- [GitHub Protected Branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/about-protected-branches)
- [GitLab Protected Branches](https://docs.gitlab.com/ee/user/project/protected_branches.html)
- [Git Hooks Documentation](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)

---

Generated: 2024-11-14
Location: `/Users/samuelgleeson/dev/c3/.working/branch-protection-workflow.md`