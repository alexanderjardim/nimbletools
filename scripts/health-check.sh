#!/bin/bash

# Health check script for Nimble Tools deployment
# This script performs basic health checks on the deployed application

URL=$1
TIMEOUT=${2:-30}

if [ -z "$URL" ]; then
    echo "Usage: $0 <url> [timeout]"
    echo "Example: $0 https://staging.nimble-tools.com 30"
    exit 1
fi

echo "🔍 Performing health check on $URL"

# Check if the application is responding
echo "Checking HTTP response..."
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" --max-time $TIMEOUT "$URL")

if [ "$HTTP_STATUS" -eq 200 ]; then
    echo "✅ HTTP Status: $HTTP_STATUS - Application is responding"
else
    echo "❌ HTTP Status: $HTTP_STATUS - Application health check failed"
    exit 1
fi

# Check if the main page loads
echo "Checking page content..."
PAGE_CONTENT=$(curl -s --max-time $TIMEOUT "$URL")

if echo "$PAGE_CONTENT" | grep -q "Nimble Tools"; then
    echo "✅ Page content loaded successfully"
else
    echo "❌ Page content check failed"
    exit 1
fi

# Check for JavaScript errors in console (basic check)
echo "Checking for basic functionality..."
if echo "$PAGE_CONTENT" | grep -q "react"; then
    echo "✅ React application detected"
else
    echo "⚠️  React application not clearly detected"
fi

echo "🎉 Health check completed successfully!"
echo "Application is healthy and responding at $URL"