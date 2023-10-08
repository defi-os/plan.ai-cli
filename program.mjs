import * as anchor from '@project-serum/anchor'
import { SkillStaking, IDL } from './type-file/skill_staking.ts'
import dotenv from 'dotenv'
import findConfig from 'find-config'

dotenv.config({ path: findConfig('.env') })
const { web3 } = anchor

const PROGRAM_ID = new web3.PublicKey(process.env.SkillStaking_PROGRAM_ID)

anchor.setProvider(anchor.AnchorProvider.env())
export const program = new anchor.Program(IDL, PROGRAM_ID)
const {
    provider: { connection },
} = program

export async function get_pda_from_seeds(seeds) {
    return await web3.PublicKey.findProgramAddressSync(seeds, program.programId)
}
