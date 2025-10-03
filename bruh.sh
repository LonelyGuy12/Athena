#!/bin/bash

# One-Time ASAR Extraction & RE Script for Newton Athena
# Run from Athena/ folder. Extracts app.asar, beautifies JS, searches configs, preps repackage.
# Outputs: ./app_extracted/ (ASAR contents), ./app_analysis.txt (report).

set -e

# Step 1: Install asar if missing.
if ! command -v asar &> /dev/null; then
  echo "Installing asar..."
  npm install -g asar
fi

# Step 2: Ensure in app Contents dir (adjust path if needed).
APP_CONTENTS="/Applications/Newton Athena.app/Contents"
if [ ! -d "$APP_CONTENTS" ]; then
  echo "Error: Run from dir with $APP_CONTENTS accessible."
  exit 1
fi

# Step 3: Extract app.asar.
ASAR_PATH="$APP_CONTENTS/Resources/app.asar"
EXTRACT_DIR="./app_extracted"
rm -rf "$EXTRACT_DIR"
asar extract "$ASAR_PATH" "$EXTRACT_DIR"
echo "Extracted app.asar to $EXTRACT_DIR."

# Step 4: Beautify JS/TS in extracted dir (src/ only, avoid node_modules).
cd "$EXTRACT_DIR"
if [ -d "src" ]; then
  npm install --save-dev js-beautify || true
  find src -type f \( -name "*.js" -o -name "*.ts" \) -exec npx js-beautify -r {} + || echo "Beautify skipped (no JS/TS)."
  echo "Beautified src/ files."
else
  echo "No src/ dir; searching root."
  find . -maxdepth 2 -type f \( -name "*.js" -o -name "*.ts" \) -exec npx js-beautify -r {} + || true
fi

# Step 5: Deep search for config.json & related (grep/strings).
mkdir -p ../extracted_json
find . -name "config.json" -o -name "*.json" | xargs cat > ../extracted_json/all_jsons.txt || echo "No JSONs found."
grep -r -i "config" . > ../extracted_json/config_mentions.txt || true
find . -type f -name "*.js" -o -name "*.ts" | xargs strings -n 10 > ../extracted_json/strings.txt || true
echo "Extracted JSONs/strings to ../extracted_json/."

# Step 6: Prep repackaging (add electron-builder to package.json if exists).
if [ -f "package.json" ]; then
  jq '.devDependencies += {"electron-builder": "^24.13.3"} | .scripts += {"dist": "electron-builder"}' package.json > tmp.json
  mv tmp.json package.json
  npm install
  echo "Added electron-builder; run 'npm run dist' to repackage."
else
  echo "No package.json; manual repackaging needed (electron-builder)."
fi

# Step 7: Analysis report.
echo "App Analysis:" > ../app_analysis.txt
tree -a > ../app_analysis.txt
echo "Key files:" >> ../app_analysis.txt
find . -name "main.js" -o -name "index.html" -o -name "config*" | head -10 >> ../app_analysis.txt
grep -i "fetch\|require.*config" -r . >> ../app_analysis.txt || true
echo "Report in ../app_analysis.txt."

cd ..
echo "Done! Check ./app_extracted for code, ./extracted_json for configs."
echo "To repackage: cd app_extracted; npm run dist."