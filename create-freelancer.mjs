#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { Keypair, Transaction, TransactionInstruction, Connection, sendAndConfirmTransaction,PublicKey } from '@solana/web3.js';
import { fileURLToPath } from 'url';
import inquirer from 'inquirer';
import * as anchor from "@project-serum/anchor";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

const { web3 } = anchor;
async function uploadJsonToIpfs(jsonObj) {
    try {
        const formData = new FormData();
        formData.append('file', JSON.stringify(jsonObj));

        const response = await fetch("https://gateway.ipfs.io:5001/api/v0/add", {
            method: "POST",
            data: formData,
        });

        if (response.ok) {
            const data = await response.json();
            return data.Hash;
        } else {
            console.error("Failed to upload:", response.statusText);
            return null;
        }
    } catch (error) {
        console.error("Error uploading file: ", error);
        return null;
    }
}

async function get_pda_from_seeds(seeds) {
  return await web3.PublicKey.findProgramAddressSync(
    seeds,
    program.programId
  );
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const readConfig = () => {
  const configPath = path.resolve(__dirname, 'cli-config.json');
  const configString = fs.readFileSync(configPath, 'utf-8');
  return JSON.parse(configString);
};

// Questions to ask the user
const questions = [
  {
      type: 'input',
      name: 'linkedinUrl',
      message: 'Please enter your likedin url: ',
      validate: (input) => !!input
  },
  {
    type: 'input',
    name: 'githubUrl',
    message: 'Input your github url:  ',
    validate: (input) => !!input
  },
  {
    type: 'input',
    name: 'resumeUrl',
    message: 'Input your resume url: ',
    validate: (input) => !!input
  },
  {
    type: 'input',
    name: 'otherUrl',
    message: 'Any other Url you want to include: ',
    validate: (input) => !!input
  }
];

inquirer.prompt(questions)
    .then(answers => {
        const jobData = {
            linkedinUrl: answers.linkedinUrl,
            githubUrl: answers.githubUrl,
            resumeUrl: answers.resumeUrl,
            otherUrl: answers.otherUrl
        }
        uploadJsonToIpfs(jobData).then((value) =>{
            console.log(value)
        })
    })