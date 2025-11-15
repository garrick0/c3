# Remote Branch Protection via CLI/Code

## ✅ Yes, You Can Configure Remote Branch Protection via CLI!

You don't need to use the web UI - branch protection can be fully configured through CLI tools and APIs. Here are multiple methods available for GitHub:

## 🚀 Quick Start

### Method 1: GitHub CLI (Easiest)
```bash
# Run the provided script
./scripts/setup-github-branch-protection.sh

# Or use gh directly
gh api -X PUT /repos/OWNER/REPO/branches/main/protection \
  -f required_pull_request_reviews[required_approving_review_count]=1 \
  -f allow_force_pushes=false
```

### Method 2: Node.js Script
```bash
# Set your GitHub token
export GITHUB_TOKEN=your_token_here

# Run the Node.js script
node scripts/github-protection-api.js setup moderate
```

## 📋 Available Methods

### 1. GitHub CLI (`gh`)
**Pros:** Official tool, easy auth, simple commands
**Cons:** Requires gh installation

#### Installation:
```bash
# macOS
brew install gh

# Linux/WSL
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo tee /usr/share/keyrings/githubcli-archive-keyring.gpg > /dev/null
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
sudo apt update
sudo apt install gh

# Windows
winget install --id GitHub.cli
```

#### Authentication:
```bash
gh auth login
```

#### Basic Usage:
```bash
# Enable branch protection with 1 review required
gh api -X PUT /repos/OWNER/REPO/branches/main/protection \
  --field required_pull_request_reviews[required_approving_review_count]=1 \
  --field allow_force_pushes=false \
  --field allow_deletions=false

# View current protection
gh api /repos/OWNER/REPO/branches/main/protection

# Remove protection
gh api -X DELETE /repos/OWNER/REPO/branches/main/protection
```

### 2. GitHub REST API (Direct)
**Pros:** No dependencies, works anywhere
**Cons:** Need to handle auth tokens manually

#### Using cURL:
```bash
# Set up branch protection
curl -X PUT \
  -H "Authorization: Bearer YOUR_GITHUB_TOKEN" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/OWNER/REPO/branches/main/protection \
  -d '{
    "required_status_checks": {
      "strict": true,
      "contexts": []
    },
    "enforce_admins": false,
    "required_pull_request_reviews": {
      "required_approving_review_count": 1,
      "dismiss_stale_reviews": true
    },
    "restrictions": null,
    "allow_force_pushes": false,
    "allow_deletions": false
  }'
```

### 3. Node.js/JavaScript
```javascript
const { Octokit } = require("@octokit/rest");

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

async function protectBranch() {
  await octokit.repos.updateBranchProtection({
    owner: "OWNER",
    repo: "REPO",
    branch: "main",
    required_status_checks: {
      strict: true,
      contexts: []
    },
    enforce_admins: false,
    required_pull_request_reviews: {
      required_approving_review_count: 1,
      dismiss_stale_reviews: true
    },
    restrictions: null,
    allow_force_pushes: false,
    allow_deletions: false
  });
}
```

### 4. Python
```python
import requests
import os

token = os.environ.get('GITHUB_TOKEN')
headers = {
    'Authorization': f'Bearer {token}',
    'Accept': 'application/vnd.github+json'
}

data = {
    "required_pull_request_reviews": {
        "required_approving_review_count": 1,
        "dismiss_stale_reviews": True
    },
    "allow_force_pushes": False,
    "allow_deletions": False
}

response = requests.put(
    'https://api.github.com/repos/OWNER/REPO/branches/main/protection',
    headers=headers,
    json=data
)

if response.status_code == 200:
    print("✅ Branch protection enabled")
```

### 5. GitHub Actions (CI/CD)
```yaml
name: Setup Branch Protection
on:
  repository_dispatch:
  workflow_dispatch:

jobs:
  protect-branches:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Protect main branch
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          gh api -X PUT /repos/${{ github.repository }}/branches/main/protection \
            --field required_pull_request_reviews[required_approving_review_count]=1 \
            --field allow_force_pushes=false
```

## 🔧 Scripts Provided in This Project

### 1. `scripts/setup-github-branch-protection.sh`
- Interactive bash script using GitHub CLI
- Offers multiple protection levels
- Checks authentication automatically
- Shows current settings after setup

### 2. `scripts/github-protection-api.js`
- Node.js implementation using GitHub API
- Three protection levels: strict, moderate, minimal
- Can be used in CI/CD pipelines
- No external dependencies (uses native https)

## 🎯 Common Protection Settings

### Minimal (PR Required Only)
```bash
gh api -X PUT /repos/OWNER/REPO/branches/main/protection \
  -f "required_pull_request_reviews[required_approving_review_count]=0" \
  -f "allow_force_pushes=false"
```

### Standard (1 Review Required)
```bash
gh api -X PUT /repos/OWNER/REPO/branches/main/protection \
  -f "required_pull_request_reviews[required_approving_review_count]=1" \
  -f "required_pull_request_reviews[dismiss_stale_reviews]=true" \
  -f "allow_force_pushes=false" \
  -f "required_conversation_resolution=true"
```

### Strict (Multiple Reviews + CI)
```bash
gh api -X PUT /repos/OWNER/REPO/branches/main/protection \
  -f "required_pull_request_reviews[required_approving_review_count]=2" \
  -f "required_pull_request_reviews[dismiss_stale_reviews]=true" \
  -f "required_pull_request_reviews[require_code_owner_reviews]=true" \
  -f "required_status_checks[strict]=true" \
  -f "required_status_checks[contexts][]=continuous-integration" \
  -f "enforce_admins=true" \
  -f "allow_force_pushes=false"
```

## 🔑 Authentication

### Create Personal Access Token:
1. Go to https://github.com/settings/tokens
2. Generate new token (classic)
3. Select scopes: `repo` (full control)
4. Save token securely

### Use Token:
```bash
# Environment variable
export GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx

# Or with gh CLI
gh auth login

# Or in .env file
echo "GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx" >> .env
```

## 🚫 Common Errors & Solutions

### "Not Found"
- Branch doesn't exist on remote yet
- Solution: Push branch first: `git push -u origin main`

### "Unauthorized"
- Invalid or missing token
- Solution: Check token and authentication

### "Forbidden"
- No admin access to repository
- Solution: Need repository admin permissions

### "Validation Failed"
- Invalid protection rules combination
- Solution: Check API documentation for valid combinations

## 📊 Verify Protection

```bash
# View protection status
gh api /repos/OWNER/REPO/branches/main/protection | jq '.'

# Check specific settings
gh api /repos/OWNER/REPO/branches/main/protection \
  --jq '.required_pull_request_reviews.required_approving_review_count'

# List all protected branches
gh api /repos/OWNER/REPO/branches --jq '.[] | select(.protected==true) | .name'
```

## 🔄 Update Protection

Protection settings can be updated by running the PUT command again with new settings. The entire configuration will be replaced.

## ❌ Remove Protection

```bash
# Remove all protection
gh api -X DELETE /repos/OWNER/REPO/branches/main/protection

# Confirm removal
gh api /repos/OWNER/REPO/branches/main --jq '.protected'
```

## 🎨 Other Platforms

### GitLab
```bash
# Using GitLab CLI
glab api -X POST projects/:id/protected_branches \
  -f name=main \
  -f push_access_level=0 \
  -f merge_access_level=30
```

### Bitbucket
```bash
# Using API
curl -X PUT https://api.bitbucket.org/2.0/repositories/OWNER/REPO/branch-restrictions \
  -H "Authorization: Bearer TOKEN" \
  -d '{"pattern": "main", "type": "branchrestriction", "value": 1}'
```

## 📚 Resources

- [GitHub Branch Protection API](https://docs.github.com/en/rest/branches/branch-protection)
- [GitHub CLI Manual](https://cli.github.com/manual/)
- [Octokit SDK](https://octokit.github.io/rest.js/)
- [GitLab Protected Branches API](https://docs.gitlab.com/ee/api/protected_branches.html)
- [Bitbucket Branch Restrictions](https://developer.atlassian.com/cloud/bitbucket/rest/api-group-branch-restrictions/)

---

Generated: 2024-11-14
Location: `/Users/samuelgleeson/dev/c3/.working/remote-branch-protection-cli.md`