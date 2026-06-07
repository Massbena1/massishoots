#!/bin/bash

# Auto-deployment script for Claude Code
# Triggered when tasks complete and user approves

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to output JSON messages for Claude Code
output_system_message() {
    echo "{\"systemMessage\": \"$1\"}"
}

# Function to show colored messages in terminal
show_message() {
    echo -e "${2:-$BLUE}$1$NC" >&2
}

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    output_system_message "❌ Not in a git repository"
    exit 1
fi

# Check for unstaged/staged changes
if git diff --quiet && git diff --cached --quiet; then
    output_system_message "✅ No changes to deploy"
    exit 0
fi

# Show what will be deployed
show_message "📋 Changes to be deployed:" "$YELLOW"
git status --porcelain >&2

# Count changes
MODIFIED=$(git status --porcelain | wc -l | tr -d ' ')
show_message "📊 Total files changed: $MODIFIED" "$BLUE"

# Get current branch
BRANCH=$(git branch --show-current)
if [ "$BRANCH" != "main" ]; then
    show_message "⚠️  Warning: You're on branch '$BRANCH', not 'main'" "$YELLOW"
fi

# Deployment confirmation prompt
output_system_message "🚀 Ready to deploy $MODIFIED changed files to production..."

if command -v osascript >/dev/null 2>&1; then
    # macOS dialog
    RESPONSE=$(osascript -e "tell app \"System Events\" to display dialog \"Deploy to Production?

Files changed: $MODIFIED
Branch: $BRANCH

This will:
1. Stage all changes
2. Commit with timestamp
3. Push to origin/$BRANCH
4. Trigger automatic deployment

Continue?\" buttons {\"Cancel\", \"Deploy\"} default button \"Deploy\" with icon caution" 2>/dev/null)

    if [[ "$RESPONSE" == *"Deploy"* ]]; then
        DEPLOY=true
    else
        DEPLOY=false
    fi

elif command -v zenity >/dev/null 2>&1; then
    # Linux dialog
    if zenity --question \
        --title="Deploy to Production" \
        --text="Deploy to Production?

Files changed: $MODIFIED
Branch: $BRANCH

This will:
1. Stage all changes
2. Commit with timestamp
3. Push to origin/$BRANCH
4. Trigger automatic deployment

Continue?" \
        --ok-label="Deploy" \
        --cancel-label="Cancel" \
        2>/dev/null; then
        DEPLOY=true
    else
        DEPLOY=false
    fi

else
    # Terminal fallback
    show_message "Deploy to Production?" "$YELLOW"
    show_message "Files changed: $MODIFIED" "$BLUE"
    show_message "Branch: $BRANCH" "$BLUE"
    show_message ""
    show_message "This will:" "$BLUE"
    show_message "1. Stage all changes" "$BLUE"
    show_message "2. Commit with timestamp" "$BLUE"
    show_message "3. Push to origin/$BRANCH" "$BLUE"
    show_message "4. Trigger automatic deployment" "$BLUE"
    show_message ""
    echo -n -e "${YELLOW}Continue? [y/N]: $NC" >&2
    read -r REPLY

    if [[ "$REPLY" =~ ^[Yy]$ ]]; then
        DEPLOY=true
    else
        DEPLOY=false
    fi
fi

if [ "$DEPLOY" = false ]; then
    output_system_message "⏸️ Deployment cancelled by user"
    exit 0
fi

# Pre-deployment validation
show_message "🔍 Running pre-deployment validation..." "$BLUE"

# Check if package.json exists and run build if needed
if [ -f "package.json" ]; then
    if command -v npm >/dev/null 2>&1; then
        show_message "🔨 Running build check..." "$BLUE"
        if ! npm run build >/dev/null 2>&1; then
            output_system_message "❌ Build failed - deployment cancelled"
            exit 1
        fi
        show_message "✅ Build successful" "$GREEN"
    fi
fi

# Stage all changes
show_message "📦 Staging changes..." "$BLUE"
git add .

# Generate commit message
TIMESTAMP=$(date '+%Y-%m-%d %H:%M')
COMMIT_MSG="deploy: $TIMESTAMP - Auto-deployment after task completion

Co-Authored-By: Claude Sonnet 4 <noreply@anthropic.com>"

# Create commit
show_message "💾 Creating commit..." "$BLUE"
if ! git commit -m "$COMMIT_MSG"; then
    output_system_message "❌ Commit failed"
    exit 1
fi

# Push to remote
show_message "🚀 Pushing to origin/$BRANCH..." "$BLUE"
if ! git push origin "$BRANCH"; then
    output_system_message "❌ Push failed - you may need to pull changes first"
    exit 1
fi

# Success!
output_system_message "✅ Successfully deployed to production! 🎉"
show_message "✅ Deployment completed successfully!" "$GREEN"
show_message "🌐 Changes pushed to origin/$BRANCH" "$GREEN"
show_message "⚡ Automatic deployment should trigger shortly..." "$BLUE"