#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';

// Import meta.url for ESM
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Questions to ask the user
const questions = [
    {
        type: 'input',
        name: 'keyPath',
        message: 'Please enter the path to your Solana key:',
        validate: (input) => {
            const filePath = path.resolve(input);
            if (fs.existsSync(filePath)) {
                return true;
            }
            return 'The file path you entered does not exist. Please enter a valid path.';
        }
    },
    {
        type: 'input',
        name: 'rpcUrl',
        message: 'Please enter the Solana RPC URL:',
        default: 'https://api.devnet.solana.com',  // default can be changed as per requirement
        validate: (input) => !!input && input.startsWith('http'),
    }
];

// Prompt the user
inquirer.prompt(questions)
    .then(answers => {
        // Resolve the absolute path
        const keyPath = path.resolve(answers.keyPath);

        // Create a config object
        const config = {
            solanaKeyPath: keyPath,
            solanaRPCUrl: answers.rpcUrl  // Added RPC URL to the config
        };

        // Convert the config object to a string
        const configString = JSON.stringify(config, null, 2);

        // Define the path to save the config
        const configPath = path.resolve(__dirname, 'cli-config.json');

        // Write the config string to a file
        fs.writeFileSync(configPath, configString);

        console.log('Solana key path and RPC URL have been set successfully in the CLI config.');
    })
    .catch(error => {
        console.error('An error occurred:', error);
    });

