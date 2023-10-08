import path from 'path'
import { fileURLToPath } from 'url'
import { Keypair, PublicKey } from '@solana/web3.js'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export function loadKeypairFromFile(filename) {
    const secret = JSON.parse(fs.readFileSync(filename).toString())
    const secretKey = Uint8Array.from(secret)
    return Keypair.fromSecretKey(secretKey)
}

export const readConfig = () => {
    const configPath = path.resolve(__dirname, 'cli-config.json')
    const configString = fs.readFileSync(configPath, 'utf-8')
    return JSON.parse(configString)
}

export const getNameRouterAccount = async (signingName, signatureVersion) => {
    const [nameRouterAccount] = await web3.PublicKey.findProgramAddress(
        [
            Buffer.from(signingName),
            Buffer.from(signatureVersion.toString()),
            authKeyPair.publicKey.toBuffer(),
        ],
        PROGRAM_ID
    )
    return nameRouterAccount
}

export const mintAddress = new PublicKey(
    '4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU'
)
