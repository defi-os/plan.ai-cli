#!/usr/bin/env node

import  { exec } from 'child_process';
import fs from 'fs';

// Check if filepath is provided
if (process.argv.length < 3) {
    console.error('Please provide the file path of the JavaScript file.');
    process.exit(1);
}

const filePath = process.argv[2];

// Check if file exists
if (!fs.existsSync(filePath)) {
    console.error('The provided file path does not exist.');
    process.exit(1);
}

// Execute the JS file
exec(`node ${filePath}`, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error executing the file: ${error}`);
        return;
    }

    if (stderr) {
        console.error(`Error: ${stderr}`);
        return;
    }

    // Parse the output as an array of JSONs
    try {
        // Given JSON string
    const jsonString = eval('('+stdout+')');
    } catch (parseError) {
        console.error('Error parsing the output as JSON:', parseError);
    }

});
