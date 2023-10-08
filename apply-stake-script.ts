#!/usr/bin/env node

import { exec } from 'child_process'
import fs from 'fs'
import { get_pda_from_seeds,program } from './program.js'
import { rpcConfig } from './rpcConfig.js'
import * as anchor from '@project-serum/anchor'
import {
    ASSOCIATED_TOKEN_PROGRAM_ID,
    getAssociatedTokenAddress,
    TOKEN_PROGRAM_ID,
} from '@solana/spl-token'
import {
    loadKeypairFromFile,
    readConfig,
    mintAddress,
} from './utilties.js'
// @ts-ignore
import { BN } from 'bn.js';
import { PublicKey } from '@solana/web3.js'

const { web3 } = anchor
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
        const jsonString:Array<JSON> = eval('(' + stdout + ')')
        const staker = loadKeypairFromFile(readConfig().solanaKeyPath)
        for (let i = 0; i < jsonString.length; i++) {
            let data = jsonString[i];
            let skill = data.skill
            let freelancer = new PublicKey(data.freelancer)
            let stakeAmount = data.stake
            get_pda_from_seeds([
                Buffer.from('skillStake'),
                Buffer.from(skill),
                freelancer.toBuffer(),
            ]).then((skillStakeAccount) => {
                let [skillStake] = skillStakeAccount
                getAssociatedTokenAddress(mintAddress, skillStake, true).then(
                    (skillStakeTokenAccount) => {
                        let skillStakeTokenAddress = skillStakeTokenAccount
                        getAssociatedTokenAddress(
                            mintAddress,
                            staker.publicKey,
                            false
                        ).then((stakerToken) => {
                            let stakerTokenAddress = stakerToken
                            get_pda_from_seeds([
                                Buffer.from('freelance'),
                                freelancer.toBuffer(),
                            ]).then(([freelanceAccount]) => {
                                program.methods
                                    .stakeSkillset(
                                        skill,
                                        new BN(stakeAmount)
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
                                    .then((_) => {
                                        console.log('Stake completed')
                                    })
                                    .catch((err:Error)=>{
                                        console.log("Stake failed")
                                        console.log(err)
                                    })
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
