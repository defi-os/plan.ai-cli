#!/usr/bin/env node
// @ts-ignore
import inquirer from 'inquirer'
import * as anchor from '@project-serum/anchor'
// @ts-ignore
import BN from 'bn.js';
import {
    ASSOCIATED_TOKEN_PROGRAM_ID,
    getAssociatedTokenAddress,
    TOKEN_PROGRAM_ID,
} from '@solana/spl-token'
import { loadKeypairFromFile, readConfig, mintAddress } from './utilties.js'
import { rpcConfig } from './rpcConfig.js'
import { program, get_pda_from_seeds } from './program.js'
import { PublicKey } from '@solana/web3.js';
const { web3 } = anchor

// Questions to ask the user
const questions = [
    {
        type: 'number',
        name: 'stakeAmount',
        message: 'Please enter amount to be staked?:',
        validate: (input: number) => !!input,
    },
    {
        type: 'input',
        name: 'freelancer',
        message: 'Please enter Freelancer to stake on:',
        validate: (input: string) => !!input,
    },
    {
        type: 'input',
        name: 'skill',
        message: 'Input name of skill to stake on: ',
        validate: (input: string) => !!input,
    },
]

inquirer.prompt(questions).then((answers:any) => {
    let freelancer = new PublicKey(answers.freelancer)
    get_pda_from_seeds([
        Buffer.from('skillStake'),
        Buffer.from(answers.skill),
        freelancer.toBuffer()
    ]).then((skillStakeAccount) => {
        const [skillStake] = skillStakeAccount
        getAssociatedTokenAddress(mintAddress, skillStake, true).then(
            (skillStakeTokenAccount) => {
                const skillStakeTokenAddress = skillStakeTokenAccount
                const staker = loadKeypairFromFile(readConfig().solanaKeyPath)
                getAssociatedTokenAddress(
                    mintAddress,
                    staker.publicKey,
                    false
                ).then((stakerToken) => {
                    const stakerTokenAddress = stakerToken
                    get_pda_from_seeds([
                        Buffer.from('freelance'),
                        freelancer.toBuffer()
                    ]).then(([freelanceAccount]) => {
                        let stakeAmount = new BN(answers.stakeAmount)
                        program.methods
                            .stakeSkillset(
                                answers.skill,
                                stakeAmount
                            )
                            .accounts({
                                staker: staker.publicKey,
                                freelanceAccount: freelanceAccount,
                                skillStake: skillStake,
                                skillStakeTokenAccount: skillStakeTokenAddress,
                                usdcMint: mintAddress,
                                stakerTokenAccount: stakerTokenAddress,
                                systemProgram: web3.SystemProgram.programId,
                                tokenProgram: TOKEN_PROGRAM_ID,
                                associatedTokenProgram:
                                    ASSOCIATED_TOKEN_PROGRAM_ID,
                            })
                            .signers([staker])
                            .rpc(rpcConfig)
                            .then((_) => {
                                console.log('Stake completed')
                            })
                            .catch((err:Error) => {
                                console.log("Stake failed")
                                console.log(err)
                            })
                    })
                })
            }
        )
    })
})
