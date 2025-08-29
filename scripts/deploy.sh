#!/bin/bash

# Deployment script for Nimble Tools
# This script handles deployment to different environments

set -e

ENVIRONMENT=$1
ARTIFACTS_DIR="./artifacts"

if [ -z "$ENVIRONMENT" ]; then
    echo "Usage: $0 <environment>"
    echo "Environments: staging, production"
    exit 1
fi

echo "🚀 Starting deployment to $ENVIRONMENT"

# Create artifacts directory if it doesn't exist
mkdir -p "$ARTIFACTS_DIR"

# Copy build artifacts
if [ -d "dist" ]; then
    echo "📦 Copying build artifacts..."
    cp -r dist/* "$ARTIFACTS_DIR/"
else
    echo "❌ Error: dist directory not found. Run 'npm run build' first."
    exit 1
fi

# Environment-specific deployment logic
case $ENVIRONMENT in
    staging)
        echo "🌐 Deploying to staging environment..."
        # Add your staging deployment commands here
        # Example: rsync, scp, cloud deployment, etc.
        echo "✅ Staging deployment completed"
        ;;

    production)
        echo "🌐 Deploying to production environment..."
        # Add your production deployment commands here
        echo "✅ Production deployment completed"
        ;;

    *)
        echo "❌ Error: Unknown environment '$ENVIRONMENT'"
        echo "Available environments: staging, production"
        exit 1
        ;;
esac

echo "🎉 Deployment to $ENVIRONMENT completed successfully!"