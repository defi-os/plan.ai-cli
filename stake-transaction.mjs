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
      type: 'number',
      name: 'stakeAmount',
      message: 'Please enter amount to be staked?:',
      validate: (input) => !!input
  },
  {
      type: 'input',
      name: 'freelancer',
      message: 'Please enter Freelancer to stake on:',
      validate: (input) => !!input
  },
  {
    type: 'input',
    name: 'skill',
    message: 'Input name of skill to stake on: ',
    validate: (input) => !!input
  }
];

inquirer.prompt(questions)
    .then(answers => {
      const mintAddress = new PublicKey(
        "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU"
      );    
      get_pda_from_seeds([
        Buffer.from("skillStake"),
        Buffer.from(answers.skill),
        Buffer.from(answers.freelancer),
      ]).then((skillStakeAccount) => {
        const [skillStake] = skillStakeAccount;
        getAssociatedTokenAddress(
          mintAddress,
          skillStake,
          true
        ).then((skillStakeTokenAccount) => {
          const skillStakeTokenAddress = skillStakeTokenAccount;
          const staker = answers.staker;
          getAssociatedTokenAddress(
            mintAddress,
            staker,
            false
          ).then((stakerToken)=>{
            const stakerTokenAccount = stakerToken;
          })

        });
      });
});
