# GreekSort

GreekSort is a Node.js script that converts polytonic Greek text into simplified Greek text without diacritical marks. Additionally, all final sigmas (ς) are replaced with medial sigmas (σ). This transformation facilitates proper sorting of polytonic Greek according to standard Greek lexicographical rules, which is not handled correctly by default sorting algorithms.

## Features

- Removes all diacritical marks from polytonic Greek text
- Converts final sigmas (ς) to medial sigmas (σ)
- Processes input files and generates output files for sorting

## Usage

1. Place your input files in the `input` directory.
2. Run the script:
   ```bash
   node src/script.js input/sample.txt output/result.txt
   ```
3. The processed output will be saved in the `output` directory.

## Installation

Make sure you have [Node.js](https://nodejs.org/) installed.

Install dependencies (if any):

```bash
npm install
```

## License

ISC

##