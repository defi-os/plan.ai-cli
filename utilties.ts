import path from 'path'
import { fileURLToPath } from 'url'
import { Keypair, PublicKey } from '@solana/web3.js'
import fs from 'fs'
import * as anchor from '@project-serum/anchor'
import dotenv from 'dotenv'
// @ts-ignore
import findConfig from 'find-config'

dotenv.config({ path: findConfig('.env') })
const { web3 } = anchor

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROGRAM_ID = new web3.PublicKey(process.env.SkillStaking_PROGRAM_ID)

export function loadKeypairFromFile(filename: string) {
    const secret = JSON.parse(fs.readFileSync(filename).toString())
    const secretKey = Uint8Array.from(secret)
    return Keypair.fromSecretKey(secretKey)
}

export const readConfig = () => {
    const configPath = path.resolve(__dirname, 'cli-config.json')
    const configString = fs.readFileSync(configPath, 'utf-8')
    return JSON.parse(configString)
}

export const getNameRouterAccount = async (
    signingName: string,
    signatureVersion: string
) => {
    const [nameRouterAccount] = await web3.PublicKey.findProgramAddress(
        [
            Buffer.from(signingName),
            Buffer.from(signatureVersion.toString()),
            Buffer.from(process.env.AuthKey),
        ],
        PROGRAM_ID
    )
    return nameRouterAccount
}

export const mintAddress = new PublicKey(
    '4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU'
)
