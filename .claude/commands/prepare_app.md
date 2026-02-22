# Prepare Application

Setup the RIS HR System application for E2E testing or review.

## Variables

PORT: If `.ports.env` exists, read FRONTEND_PORT from it, otherwise default to 8080

## Overview

The RIS HR System is a vanilla JavaScript SPA with no build step required. It uses:
- Static HTML/JS/CSS files in `apps/` directory
- CDN dependencies (Tailwind CSS, Material Icons, Google Fonts)
- Mock data (no database)

## Setup Steps

### 1. Determine Port Configuration

```bash
# Check for .ports.env file
if [ -f .ports.env ]; then
    source .ports.env
    PORT=${FRONTEND_PORT:-8080}
else
    PORT=8080
fi
```

### 2. Check if Application is Already Running

```bash
# Check if port is in use
curl -s -o /dev/null -w "%{http_code}" http://localhost:$PORT/ 2>/dev/null
```

If the response is `200`, the application is already running. Skip to verification step.

### 3. Start the Application (if not running)

Choose one of the following methods based on available tools:

**Option A: Using npx serve (Node.js - Recommended)**
```bash
nohup npx serve apps -l $PORT > /dev/null 2>&1 &
```

**Option B: Using Python http.server**
```bash
nohup python3 -m http.server $PORT -d apps > /dev/null 2>&1 &
```

**Option C: Using PHP built-in server**
```bash
nohup php -S localhost:$PORT -t apps > /dev/null 2>&1 &
```

### 4. Wait for Server Startup

```bash
# Wait up to 10 seconds for the server to start
for i in {1..10}; do
    if curl -s -o /dev/null -w "%{http_code}" http://localhost:$PORT/ 2>/dev/null | grep -q "200"; then
        echo "Server is ready"
        break
    fi
    sleep 1
done
```

### 5. Verify Application is Running

```bash
# Final verification
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:$PORT/)
if [ "$HTTP_CODE" = "200" ]; then
    echo "Application is running at http://localhost:$PORT"
else
    echo "ERROR: Application failed to start. HTTP Code: $HTTP_CODE"
    exit 1
fi
```

## Stopping the Application

To stop the application, find and kill the server process:

```bash
# Find process on port
lsof -ti :$PORT | xargs kill -9 2>/dev/null
```

## Quick Reference

| Action | Command |
|--------|---------|
| Check status | `curl -s http://localhost:8080/` |
| Start (npx) | `npx serve apps -l 8080` |
| Start (Python) | `python3 -m http.server 8080 -d apps` |
| Stop | `lsof -ti :8080 \| xargs kill -9` |
| Open browser | `open http://localhost:8080` |

## Notes

- No database to reset (uses mock data in `apps/js/data/`)
- No build step required (vanilla JS, no bundler)
- Supports Thai/English via URL language toggle
- Default employee ID is `EMP001`
- Profile URL: `http://localhost:8080/#/profile/EMP001`
