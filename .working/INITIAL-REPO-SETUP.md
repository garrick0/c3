# Initial Repository Setup - No Main Branch Yet

## Current Situation

You're working on branch `scaffold` but there's no `main` branch on the remote yet. This is a new repository that hasn't been initialized with a default branch.

## Solutions

### Option 1: Make Scaffold the Main Branch (Recommended)

Since this is the initial architecture, make `scaffold` the main branch directly.

```bash
# Rename your local branch to main
git branch -m scaffold main

# Push to remote as main
git push -u origin main

# Set main as default branch on GitHub
# (Do this in GitHub settings if it doesn't auto-detect)
```

**Why this works**:
- You're creating the initial codebase
- No history to preserve
- Clean start with proper architecture
- No need for PR - this IS the main branch

**After this**:
- Future work branches off `main`
- PRs merge into `main`
- Normal workflow established

---

### Option 2: Create Empty Main First, Then PR

If you want to keep the PR workflow:

#### Step 1: Create an empty main branch

```bash
# Create a new orphan branch (no history)
git checkout --orphan main

# Remove all files from staging
git rm -rf .

# Create a minimal initial commit
echo "# C3" > README.md
git add README.md
git commit -m "chore: initialize repository"

# Push to create main on remote
git push -u origin main
```

#### Step 2: Go back to scaffold and create PR

```bash
# Switch back to scaffold
git checkout scaffold

# Now you can create PR from scaffold → main
git push origin scaffold

# Create PR on GitHub: scaffold → main
```

**Why this works**:
- Creates a minimal main branch
- Allows PR workflow
- Preserves all your work in scaffold

---

### Option 3: Push Scaffold as Initial Main, Create New Branch for Future Work

```bash
# Push scaffold as main
git branch -m scaffold main
git push -u origin main

# Create a new development branch for future work
git checkout -b develop
git push -u origin develop

# Set up branch protection on main (in GitHub settings)
```

**Why this works**:
- Main has the full architecture
- Future PRs go from feature branches → develop → main
- Follows gitflow-style workflow

---

## Recommendation: Option 1

**Go with Option 1** because:
- ✅ Simplest approach
- ✅ This IS your initial codebase
- ✅ No need for PR to merge initial architecture
- ✅ Sets up clean workflow going forward
- ✅ No empty commits or extra branches needed

### Commands to Run:

```bash
# 1. Rename branch to main
git branch -m scaffold main

# 2. Push as main
git push -u origin main

# 3. Verify
git branch -a
# Should show: main (local) and origin/main (remote)
```

### After This

**Normal workflow**:
```bash
# Future work
git checkout -b feature/implement-typescript-parser
# ... make changes ...
git commit -m "feat(parsing): implement real TypeScript parser"
git push origin feature/implement-typescript-parser
# Create PR: feature/implement-typescript-parser → main
```

---

## Why You Don't Need a PR for Initial Setup

**PR workflow is for**:
- Reviewing changes to existing code
- Collaborating on features
- Protecting stable code

**Your situation**:
- You're creating the initial architecture
- There's nothing to "protect" yet
- No existing code to compare against
- This scaffold IS the foundation

**It's perfectly normal** to push the initial architecture directly to `main`, then use PRs for all future work.

---

## If You Really Want a PR Workflow

If your organization requires PRs for everything:

1. Create an empty `main` with just a README (Option 2)
2. Then PR your scaffold into it
3. This satisfies the "always use PRs" rule
4. But it's ceremonial - there's nothing to review against

**Most projects** push initial architecture directly to main, then use PRs from there.

---

## Summary

**Recommended Action**:
```bash
git branch -m scaffold main
git push -u origin main
```

This establishes `main` as your default branch with the complete architecture scaffold. Future work uses PRs into `main`.

**Alternative** (if PRs required for compliance):
Create empty main first (Option 2), then PR scaffold into it.

Choose based on your team's workflow preferences!
