const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '..', 'input');
const outputDir = path.join(__dirname, '..', 'output');
const replacementsPath = path.join(__dirname, 'replacements.json');

// Load replacements mapping
let replacements = {};
try {
  replacements = JSON.parse(fs.readFileSync(replacementsPath, 'utf8'));
} catch (err) {
  console.error('Error loading replacements.json:', err);
  process.exit(1);
}

// Build a lookup map for all replacement characters
const charMap = {};
for (const [basic, chars] of Object.entries(replacements)) {
  for (const c of chars) {
    charMap[c] = basic;
  }
}

// Transform function
function transform(text) {
  return text
    .normalize('NFC')
    .toLowerCase()
    .split('')
    .map((ch) => charMap[ch] || ch)
    .join('');
}

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Scan input directory for files
fs.readdir(inputDir, (err, files) => {
  if (err) {
    console.error('Error reading input directory:', err);
    process.exit(1);
  }

  if (!files || files.length === 0) {
    console.log('No input files found.');
    return;
  }

  // Ignore files starting with an underscore
  const filteredFiles = files.filter((file) => !file.startsWith('_'));

  if (filteredFiles.length === 0) {
    console.log('No input files found (all files ignored).');
    return;
  }

  filteredFiles.forEach((file) => {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file);

    // Read file contents
    fs.readFile(inputPath, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading file ${file}:`, err);
        return;
      }

      // Transform the contents
      const transformed = transform(data);

      // Add local timestamp to top of output file
      const timestamp = new Date().toLocaleString();
      const outputData = `# Processed on ${timestamp}\n\n${transformed}`;

      // Write to output file (overwrite if exists)
      fs.writeFile(outputPath, outputData, 'utf8', (err) => {
        if (err) {
          console.error(`Error writing file ${file}:`, err);
        } else {
          console.log(`Processed ${file} -> ${outputPath}`);
        }
      });
    });
  });
});
