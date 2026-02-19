#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
VERSION=$(date +%Y%m%d%H%M%S)
PACKAGE_NAME="g2web-${VERSION}"
BUILD_DIR="${PROJECT_DIR}/build/${PACKAGE_NAME}"

echo "=== Packaging g2web ${VERSION} ==="

# Clean previous build
rm -rf "${PROJECT_DIR}/build"
mkdir -p "${BUILD_DIR}"

# --- Build frontend ---
echo "Building frontend..."
cd "${PROJECT_DIR}/frontend"
npm ci --silent
npm run build
echo "Frontend build complete."

# --- Copy compiled frontend ---
cp -r "${PROJECT_DIR}/frontend/dist" "${BUILD_DIR}/frontend_dist"

# --- Copy Python backend files ---
echo "Copying backend files..."
cp "${PROJECT_DIR}/g2web.py" "${BUILD_DIR}/"
cp "${PROJECT_DIR}/g2.py" "${BUILD_DIR}/"
cp "${PROJECT_DIR}/g2interface.py" "${BUILD_DIR}/"
cp "${PROJECT_DIR}/routes_patch.py" "${BUILD_DIR}/"
cp "${PROJECT_DIR}/routes_bank.py" "${BUILD_DIR}/"
cp "${PROJECT_DIR}/routes_configuration.py" "${BUILD_DIR}/"
cp "${PROJECT_DIR}/routes_parameters.py" "${BUILD_DIR}/"
# Include routes_etc.py if it exists
[ -f "${PROJECT_DIR}/route_etc.py" ] && cp "${PROJECT_DIR}/route_etc.py" "${BUILD_DIR}/"
cp "${PROJECT_DIR}/requirements.txt" "${BUILD_DIR}/"

# --- Copy g2ools library (exclude dev/build artifacts) ---
echo "Copying g2ools library..."
rsync -a \
    --exclude='.git' \
    --exclude='__pycache__' \
    --exclude='build' \
    --exclude='tests' \
    --exclude='*.pyc' \
    "${PROJECT_DIR}/g2ools/" "${BUILD_DIR}/g2ools/"

# --- Create tar.gz ---
echo "Creating archive..."
cd "${PROJECT_DIR}/build"
tar czf "${PROJECT_DIR}/${PACKAGE_NAME}.tar.gz" "${PACKAGE_NAME}"

# --- Cleanup ---
rm -rf "${PROJECT_DIR}/build"

echo "=== Package created: ${PACKAGE_NAME}.tar.gz ==="
echo "Contents:"
tar tzf "${PROJECT_DIR}/${PACKAGE_NAME}.tar.gz" | head -20
echo "..."
