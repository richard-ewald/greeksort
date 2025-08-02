const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '..', 'input');
const outputDir = path.join(__dirname, '..', 'output');

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

    files.forEach(file => {
        const inputPath = path.join(inputDir, file);
        const outputPath = path.join(outputDir, file);

        // Read file contents
        fs.readFile(inputPath, 'utf8', (err, data) => {
            if (err) {
                console.error(`Error reading file ${file}:`, err);
                return;
            }

            // Add timestamp to top of output file
            const timestamp = new Date().toISOString();
            const outputData = `# Processed on ${timestamp}\n\n${data}`;

            // Write to output file (overwrite if exists)
            fs.writeFile(outputPath, outputData, 'utf8', err => {
                if (err) {
                    console.error(`Error writing file ${file}:`, err);
                } else {
                    console.log(`Processed ${file} -> ${outputPath}`);
                }
            });
        });
    });
});