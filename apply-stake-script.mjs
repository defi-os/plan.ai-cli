#!/usr/bin/env node

import { exec } from 'child_process'
import fs from 'fs'
import { get_pda_from_seeds, mintAddress } from './utilties.mjs'
import { program } from './program.mjs'
import { rpcConfig } from './rpcConfig.mjs'
import * as anchor from '@project-serum/anchor'
import {
    ASSOCIATED_TOKEN_PROGRAM_ID,
    getAssociatedTokenAddress,
    TOKEN_PROGRAM_ID,
} from '@solana/spl-token'
import { loadKeypairFromFile, readConfig, mintAddress } from './utilties.mjs'

// Check if filepath is provided
if (process.argv.length < 3) {
    console.error('Please provide the file path of the JavaScript file.')
    process.exit(1)
}

const filePath = process.argv[2]

// Check if file exists
if (!fs.existsSync(filePath)) {
    console.error('The provided file path does not exist.')
    process.exit(1)
}

// Execute the JS file
exec(`node ${filePath}`, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error executing the file: ${error}`)
        return
    }

    if (stderr) {
        console.error(`Error: ${stderr}`)
        return
    }

    // Parse the output as an array of JSONs
    try {
        // Given JSON string
        const jsonString = eval('(' + stdout + ')')
        const staker = loadKeypairFromFile(readConfig().solanaKeyPath)
        for (data in jsonString) {
            let skill = data.skill
            let freelancer = data.freelancer
            let stakeAmount = data.stakeAmount
            get_pda_from_seeds([
                Buffer.from('skillStake'),
                Buffer.from(skill),
                Buffer.from(freelancer),
            ]).then((skillStakeAccount) => {
                let [skillStake] = skillStakeAccount
                getAssociatedTokenAddress(mintAddress, skillStake, true).then(
                    (skillStakeTokenAccount) => {
                        let skillStakeTokenAddress = skillStakeTokenAccount
                        getAssociatedTokenAddress(
                            mintAddress,
                            staker,
                            false
                        ).then((stakerToken) => {
                            let stakerTokenAddress = stakerToken
                            get_pda_from_seeds([
                                Buffer.from('freelance'),
                                freelancer.toBuffer(),
                            ]).then((freelanceAccount) => {
                                program.methods
                                    .stakeSkillset(
                                        skill,
                                        new anchor.BN(stakeAmount)
                                    )
                                    .accounts({
                                        staker: staker.publicKey,
                                        freelanceAccount: freelanceAccount,
                                        skillStake: skillStake,
                                        skillStakeTokenAccount:
                                            skillStakeTokenAddress,
                                        usdcMint: mintAddress,
                                        stakerTokenAccount: stakerTokenAddress,
                                        systemProgram:
                                            web3.SystemProgram.programId,
                                        tokenProgram: TOKEN_PROGRAM_ID,
                                        associatedTokenProgram:
                                            ASSOCIATED_TOKEN_PROGRAM_ID,
                                    })
                                    .signers([staker])
                                    .rpc(rpcConfig)
                                    .then(console.log('Stake completed'))
                            })
                        })
                    }
                )
            })
        }
    } catch (parseError) {
        console.error('Error parsing the output as JSON:', parseError)
    }
})
