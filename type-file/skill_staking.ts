export type SkillStaking = {
    version: '0.1.0'
    name: 'skill_staking'
    constants: [
        {
            name: 'PROTOCOL_FEE'
            type: 'u64'
            value: '12'
        },
        {
            name: 'BOUNTY_CREATOR_COMPENSATION'
            type: 'u64'
            value: '2 * PROTOCOL_FEE'
        },
        {
            name: 'AUTHORIZED_PUBLIC_KEY'
            type: 'publicKey'
            value: 'pubkey ! ("55kBY9yxqSC42boV8PywT2gqGzgLi5MPAtifNRgPNezF")'
        },
    ]
    instructions: [
        {
            name: 'createNameRouter'
            accounts: [
                {
                    name: 'routerCreator'
                    isMut: true
                    isSigner: true
                },
                {
                    name: 'nameRouterAccount'
                    isMut: true
                    isSigner: false
                },
                {
                    name: 'systemProgram'
                    isMut: false
                    isSigner: false
                },
            ]
            args: [
                {
                    name: 'signingDomain'
                    type: 'string'
                },
                {
                    name: 'signatureVersion'
                    type: 'u8'
                },
            ]
        },
        {
            name: 'addVerifiedUser'
            accounts: [
                {
                    name: 'routerCreator'
                    isMut: true
                    isSigner: true
                },
                {
                    name: 'nameRouterAccount'
                    isMut: true
                    isSigner: false
                },
                {
                    name: 'verifiedUserAccount'
                    isMut: true
                    isSigner: false
                },
                {
                    name: 'sysvarInstructions'
                    isMut: false
                    isSigner: false
                },
                {
                    name: 'systemProgram'
                    isMut: false
                    isSigner: false
                },
            ]
            args: [
                {
                    name: 'userName'
                    type: 'string'
                },
                {
                    name: 'userPubkey'
                    type: 'publicKey'
                },
                {
                    name: 'msg'
                    type: 'bytes'
                },
                {
                    name: 'sig'
                    type: {
                        array: ['u8', 64]
                    }
                },
            ]
        },
        {
            name: 'addFreelancer'
            accounts: [
                {
                    name: 'freelancer'
                    isMut: true
                    isSigner: true
                },
                {
                    name: 'freelancerVerifiedUser'
                    isMut: false
                    isSigner: false
                },
                {
                    name: 'freelanceAccount'
                    isMut: true
                    isSigner: false
                },
                {
                    name: 'systemProgram'
                    isMut: false
                    isSigner: false
                },
            ]
            args: [
                {
                    name: 'freelancerMetadata'
                    type: 'string'
                },
            ]
        },
        {
            name: 'stakeSkillset'
            accounts: [
                {
                    name: 'staker'
                    isMut: true
                    isSigner: true
                },
                {
                    name: 'freelanceAccount'
                    isMut: true
                    isSigner: false
                },
                {
                    name: 'usdcMint'
                    isMut: false
                    isSigner: false
                },
                {
                    name: 'stakerTokenAccount'
                    isMut: true
                    isSigner: false
                },
                {
                    name: 'skillStake'
                    isMut: true
                    isSigner: false
                },
                {
                    name: 'skillStakeTokenAccount'
                    isMut: true
                    isSigner: false
                },
                {
                    name: 'tokenProgram'
                    isMut: false
                    isSigner: false
                },
                {
                    name: 'associatedTokenProgram'
                    isMut: false
                    isSigner: false
                },
                {
                    name: 'systemProgram'
                    isMut: false
                    isSigner: false
                },
            ]
            args: [
                {
                    name: 'skill'
                    type: 'string'
                },
                {
                    name: 'stakeAmount'
                    type: 'u64'
                },
            ]
        },
        {
            name: 'createBounty'
            accounts: [
                {
                    name: 'bountyCreator'
                    isMut: true
                    isSigner: true
                },
                {
                    name: 'bountyCreatorTokenAccount'
                    isMut: true
                    isSigner: false
                },
                {
                    name: 'usdcMint'
                    isMut: false
                    isSigner: false
                },
                {
                    name: 'bountyAccount'
                    isMut: true
                    isSigner: false
                },
                {
                    name: 'bountyTokenAccount'
                    isMut: true
                    isSigner: false
                },
                {
                    name: 'tokenProgram'
                    isMut: false
                    isSigner: false
                },
                {
                    name: 'associatedTokenProgram'
                    isMut: false
                    isSigner: false
                },
                {
                    name: 'systemProgram'
                    isMut: false
                    isSigner: false
                },
            ]
            args: [
                {
                    name: 'bountyIndex'
                    type: 'string'
                },
                {
                    name: 'bountyReward'
                    type: 'u64'
                },
                {
                    name: 'bountyMetadata'
                    type: 'string'
                },
                {
                    name: 'bountySkillset'
                    type: {
                        vec: 'string'
                    }
                },
                {
                    name: 'bountyDeadline'
                    type: {
                        option: 'u64'
                    }
                },
            ]
        },
        {
            name: 'applyBounty'
            accounts: [
                {
                    name: 'freelancer'
                    isMut: false
                    isSigner: true
                },
                {
                    name: 'freelanceAccount'
                    isMut: false
                    isSigner: false
                },
                {
                    name: 'bountyAccount'
                    isMut: true
                    isSigner: false
                },
                {
                    name: 'systemProgram'
                    isMut: false
                    isSigner: false
                },
            ]
            args: []
        },
        {
            name: 'assignFreelancer'
            accounts: [
                {
                    name: 'authority'
                    isMut: true
                    isSigner: true
                },
                {
                    name: 'freelanceAccount'
                    isMut: false
                    isSigner: false
                },
                {
                    name: 'multiSig'
                    isMut: true
                    isSigner: false
                },
                {
                    name: 'bountyAccount'
                    isMut: true
                    isSigner: false
                },
                {
                    name: 'systemProgram'
                    isMut: false
                    isSigner: false
                },
            ]
            args: []
        },
        {
            name: 'acceptBounty'
            accounts: [
                {
                    name: 'firstSigner'
                    isMut: false
                    isSigner: true
                },
                {
                    name: 'secondSigner'
                    isMut: false
                    isSigner: true
                },
                {
                    name: 'freelanceAccount'
                    isMut: false
                    isSigner: false
                },
                {
                    name: 'multiSig'
                    isMut: false
                    isSigner: false
                },
                {
                    name: 'bountyAccount'
                    isMut: true
                    isSigner: false
                },
                {
                    name: 'systemProgram'
                    isMut: false
                    isSigner: false
                },
            ]
            args: []
        },
        {
            name: 'claimBounty'
            accounts: [
                {
                    name: 'claimer'
                    isMut: true
                    isSigner: true
                },
                {
                    name: 'bountyAccount'
                    isMut: true
                    isSigner: false
                },
                {
                    name: 'bountyTokenAccount'
                    isMut: true
                    isSigner: false
                },
                {
                    name: 'claimerTokenAccount'
                    isMut: true
                    isSigner: false
                },
                {
                    name: 'usdcMint'
                    isMut: false
                    isSigner: false
                },
                {
                    name: 'systemProgram'
                    isMut: false
                    isSigner: false
                },
                {
                    name: 'associatedTokenProgram'
                    isMut: false
                    isSigner: false
                },
                {
                    name: 'tokenProgram'
                    isMut: false
                    isSigner: false
                },
            ]
            args: []
        },
        {
            name: 'claimReward'
            accounts: [
                {
                    name: 'staker'
                    isMut: true
                    isSigner: true
                },
                {
                    name: 'bountyAccount'
                    isMut: true
                    isSigner: false
                },
                {
                    name: 'usdcMint'
                    isMut: false
                    isSigner: false
                },
                {
                    name: 'stakerTokenAccount'
                    isMut: true
                    isSigner: false
                },
                {
                    name: 'skillStake'
                    isMut: false
                    isSigner: false
                },
                {
                    name: 'skillStakeTokenAccount'
                    isMut: true
                    isSigner: false
                },
                {
                    name: 'tokenProgram'
                    isMut: false
                    isSigner: false
                },
                {
                    name: 'associatedTokenProgram'
                    isMut: false
                    isSigner: false
                },
                {
                    name: 'systemProgram'
                    isMut: false
                    isSigner: false
                },
            ]
            args: []
        },
    ]
    accounts: [
        {
            name: 'nameRouter'
            type: {
                kind: 'struct'
                fields: [
                    {
                        name: 'bump'
                        type: 'u8'
                    },
                    {
                        name: 'signatureVersion'
                        type: 'u8'
                    },
                    {
                        name: 'totalVerifiedUsers'
                        type: 'u64'
                    },
                    {
                        name: 'routerCreator'
                        type: 'publicKey'
                    },
                    {
                        name: 'signingDomain'
                        type: 'string'
                    },
                ]
            }
        },
        {
            name: 'verifiedUser'
            type: {
                kind: 'struct'
                fields: [
                    {
                        name: 'bump'
                        type: 'u8'
                    },
                    {
                        name: 'nameRouter'
                        type: 'publicKey'
                    },
                    {
                        name: 'userName'
                        type: 'string'
                    },
                    {
                        name: 'userPubkey'
                        type: 'publicKey'
                    },
                ]
            }
        },
        {
            name: 'bounty'
            type: {
                kind: 'struct'
                fields: [
                    {
                        name: 'bump'
                        type: 'u8'
                    },
                    {
                        name: 'bountyCreator'
                        type: 'publicKey'
                    },
                    {
                        name: 'bountyMetadata'
                        type: 'string'
                    },
                    {
                        name: 'bountyReward'
                        type: 'u64'
                    },
                    {
                        name: 'bountySkillset'
                        type: {
                            vec: 'string'
                        }
                    },
                    {
                        name: 'bountyDeadline'
                        type: {
                            option: 'u64'
                        }
                    },
                    {
                        name: 'bountyAssigned'
                        type: {
                            option: 'publicKey'
                        }
                    },
                    {
                        name: 'bountyAppliers'
                        type: {
                            vec: 'publicKey'
                        }
                    },
                    {
                        name: 'bountyClosed'
                        type: 'bool'
                    },
                    {
                        name: 'bountyClaimed'
                        type: 'bool'
                    },
                    {
                        name: 'claimed'
                        type: {
                            vec: 'publicKey'
                        }
                    },
                    {
                        name: 'index'
                        type: 'string'
                    },
                ]
            }
        },
        {
            name: 'freelancer'
            type: {
                kind: 'struct'
                fields: [
                    {
                        name: 'bump'
                        type: 'u8'
                    },
                    {
                        name: 'freelancer'
                        type: 'publicKey'
                    },
                    {
                        name: 'userMetadata'
                        type: 'string'
                    },
                    {
                        name: 'skills'
                        type: {
                            vec: 'string'
                        }
                    },
                ]
            }
        },
        {
            name: 'skillStake'
            type: {
                kind: 'struct'
                fields: [
                    {
                        name: 'bump'
                        type: 'u8'
                    },
                    {
                        name: 'freelancer'
                        type: 'publicKey'
                    },
                    {
                        name: 'skill'
                        type: 'string'
                    },
                    {
                        name: 'stakeAmounts'
                        type: {
                            vec: 'u64'
                        }
                    },
                    {
                        name: 'stakers'
                        type: {
                            vec: 'publicKey'
                        }
                    },
                    {
                        name: 'totalSkillStake'
                        type: 'u64'
                    },
                ]
            }
        },
        {
            name: 'multisig'
            type: {
                kind: 'struct'
                fields: [
                    {
                        name: 'bump'
                        type: 'u8'
                    },
                    {
                        name: 'owners'
                        type: {
                            vec: 'publicKey'
                        }
                    },
                    {
                        name: 'threshold'
                        type: 'u64'
                    },
                ]
            }
        },
    ]
    events: [
        {
            name: 'NameRouterCreated'
            fields: [
                {
                    name: 'routerCreator'
                    type: 'publicKey'
                    index: false
                },
                {
                    name: 'nameRouterAccount'
                    type: 'publicKey'
                    index: false
                },
            ]
        },
        {
            name: 'VerifiedUserAdded'
            fields: [
                {
                    name: 'routerCreator'
                    type: 'publicKey'
                    index: false
                },
                {
                    name: 'nameRouterAccount'
                    type: 'publicKey'
                    index: false
                },
                {
                    name: 'verifiedUserAccount'
                    type: 'publicKey'
                    index: false
                },
                {
                    name: 'userName'
                    type: 'string'
                    index: false
                },
                {
                    name: 'userPubkey'
                    type: 'publicKey'
                    index: false
                },
            ]
        },
        {
            name: 'FreelancerCreated'
            fields: [
                {
                    name: 'freelancer'
                    type: 'publicKey'
                    index: false
                },
                {
                    name: 'freelancerMetadata'
                    type: 'string'
                    index: false
                },
            ]
        },
        {
            name: 'BountyCreated'
            fields: [
                {
                    name: 'bountyCreator'
                    type: 'publicKey'
                    index: false
                },
                {
                    name: 'bountyMetadata'
                    type: 'string'
                    index: false
                },
                {
                    name: 'bountyReward'
                    type: 'u64'
                    index: false
                },
                {
                    name: 'bountySkillsets'
                    type: {
                        vec: 'string'
                    }
                    index: false
                },
            ]
        },
        {
            name: 'BountyDestroyed'
            fields: [
                {
                    name: 'bounty'
                    type: 'publicKey'
                    index: false
                },
            ]
        },
        {
            name: 'SkillsetStaked'
            fields: [
                {
                    name: 'staker'
                    type: 'publicKey'
                    index: false
                },
                {
                    name: 'freelancer'
                    type: 'publicKey'
                    index: false
                },
                {
                    name: 'skillset'
                    type: 'string'
                    index: false
                },
                {
                    name: 'stakeAmount'
                    type: 'u64'
                    index: false
                },
            ]
        },
        {
            name: 'SkillsetUnStaked'
            fields: [
                {
                    name: 'skill'
                    type: 'publicKey'
                    index: false
                },
                {
                    name: 'freelancer'
                    type: 'publicKey'
                    index: false
                },
                {
                    name: 'unstakeAmount'
                    type: 'u64'
                    index: false
                },
                {
                    name: 'unstaker'
                    type: 'publicKey'
                    index: false
                },
            ]
        },
        {
            name: 'BountyFailed'
            fields: [
                {
                    name: 'freelancer'
                    type: 'publicKey'
                    index: false
                },
                {
                    name: 'bounty'
                    type: 'publicKey'
                    index: false
                },
                {
                    name: 'bountyDeadline'
                    type: 'u64'
                    index: false
                },
                {
                    name: 'skillsets'
                    type: {
                        vec: 'string'
                    }
                    index: false
                },
            ]
        },
        {
            name: 'BountyFailedClaimed'
            fields: [
                {
                    name: 'stakeAmount'
                    type: 'u64'
                    index: false
                },
                {
                    name: 'redeemedAmount'
                    type: 'u64'
                    index: false
                },
                {
                    name: 'bounty'
                    type: 'publicKey'
                    index: false
                },
            ]
        },
        {
            name: 'BountyWon'
            fields: [
                {
                    name: 'bounty'
                    type: 'publicKey'
                    index: false
                },
                {
                    name: 'freelancer'
                    type: 'publicKey'
                    index: false
                },
                {
                    name: 'bountyReward'
                    type: 'u64'
                    index: false
                },
            ]
        },
        {
            name: 'BountyApplied'
            fields: [
                {
                    name: 'bounty'
                    type: 'publicKey'
                    index: false
                },
                {
                    name: 'freelancer'
                    type: 'publicKey'
                    index: false
                },
            ]
        },
        {
            name: 'FreelancerAssigned'
            fields: [
                {
                    name: 'bounty'
                    type: 'publicKey'
                    index: false
                },
                {
                    name: 'freelancer'
                    type: 'publicKey'
                    index: false
                },
            ]
        },
        {
            name: 'BountyClaimed'
            fields: [
                {
                    name: 'bounty'
                    type: 'publicKey'
                    index: false
                },
                {
                    name: 'freelancer'
                    type: 'publicKey'
                    index: false
                },
                {
                    name: 'claimedAmount'
                    type: 'u64'
                    index: false
                },
            ]
        },
        {
            name: 'RewardClaimed'
            fields: [
                {
                    name: 'bounty'
                    type: 'publicKey'
                    index: false
                },
                {
                    name: 'staker'
                    type: 'publicKey'
                    index: false
                },
                {
                    name: 'claimedAmount'
                    type: 'u64'
                    index: false
                },
            ]
        },
    ]
    errors: [
        {
            code: 6000
            name: 'SignatureVerificationFailed'
            msg: 'Invalid Signature'
        },
        {
            code: 6001
            name: 'UnauthorizedUser'
            msg: 'User not verified'
        },
        {
            code: 6002
            name: 'UnauthorizedActionAttempted'
            msg: 'Unauthorized smart contract Action'
        },
        {
            code: 6003
            name: 'InsufficientStakingFunds'
            msg: 'Insufficient funds for staking'
        },
        {
            code: 6004
            name: 'TokenAccountMismatch'
            msg: 'Token account mismatch'
        },
    ]
}

export const IDL: SkillStaking = {
    version: '0.1.0',
    name: 'skill_staking',
    constants: [
        {
            name: 'PROTOCOL_FEE',
            type: 'u64',
            value: '12',
        },
        {
            name: 'BOUNTY_CREATOR_COMPENSATION',
            type: 'u64',
            value: '2 * PROTOCOL_FEE',
        },
        {
            name: 'AUTHORIZED_PUBLIC_KEY',
            type: 'publicKey',
            value: 'pubkey ! ("55kBY9yxqSC42boV8PywT2gqGzgLi5MPAtifNRgPNezF")',
        },
    ],
    instructions: [
        {
            name: 'createNameRouter',
            accounts: [
                {
                    name: 'routerCreator',
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: 'nameRouterAccount',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'systemProgram',
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: 'signingDomain',
                    type: 'string',
                },
                {
                    name: 'signatureVersion',
                    type: 'u8',
                },
            ],
        },
        {
            name: 'addVerifiedUser',
            accounts: [
                {
                    name: 'routerCreator',
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: 'nameRouterAccount',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'verifiedUserAccount',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'sysvarInstructions',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'systemProgram',
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: 'userName',
                    type: 'string',
                },
                {
                    name: 'userPubkey',
                    type: 'publicKey',
                },
                {
                    name: 'msg',
                    type: 'bytes',
                },
                {
                    name: 'sig',
                    type: {
                        array: ['u8', 64],
                    },
                },
            ],
        },
        {
            name: 'addFreelancer',
            accounts: [
                {
                    name: 'freelancer',
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: 'freelancerVerifiedUser',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'freelanceAccount',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'systemProgram',
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: 'freelancerMetadata',
                    type: 'string',
                },
            ],
        },
        {
            name: 'stakeSkillset',
            accounts: [
                {
                    name: 'staker',
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: 'freelanceAccount',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'usdcMint',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'stakerTokenAccount',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'skillStake',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'skillStakeTokenAccount',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'tokenProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'associatedTokenProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'systemProgram',
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: 'skill',
                    type: 'string',
                },
                {
                    name: 'stakeAmount',
                    type: 'u64',
                },
            ],
        },
        {
            name: 'createBounty',
            accounts: [
                {
                    name: 'bountyCreator',
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: 'bountyCreatorTokenAccount',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'usdcMint',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'bountyAccount',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'bountyTokenAccount',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'tokenProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'associatedTokenProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'systemProgram',
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: 'bountyIndex',
                    type: 'string',
                },
                {
                    name: 'bountyReward',
                    type: 'u64',
                },
                {
                    name: 'bountyMetadata',
                    type: 'string',
                },
                {
                    name: 'bountySkillset',
                    type: {
                        vec: 'string',
                    },
                },
                {
                    name: 'bountyDeadline',
                    type: {
                        option: 'u64',
                    },
                },
            ],
        },
        {
            name: 'applyBounty',
            accounts: [
                {
                    name: 'freelancer',
                    isMut: false,
                    isSigner: true,
                },
                {
                    name: 'freelanceAccount',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'bountyAccount',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'systemProgram',
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [],
        },
        {
            name: 'assignFreelancer',
            accounts: [
                {
                    name: 'authority',
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: 'freelanceAccount',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'multiSig',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'bountyAccount',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'systemProgram',
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [],
        },
        {
            name: 'acceptBounty',
            accounts: [
                {
                    name: 'firstSigner',
                    isMut: false,
                    isSigner: true,
                },
                {
                    name: 'secondSigner',
                    isMut: false,
                    isSigner: true,
                },
                {
                    name: 'freelanceAccount',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'multiSig',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'bountyAccount',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'systemProgram',
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [],
        },
        {
            name: 'claimBounty',
            accounts: [
                {
                    name: 'claimer',
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: 'bountyAccount',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'bountyTokenAccount',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'claimerTokenAccount',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'usdcMint',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'systemProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'associatedTokenProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'tokenProgram',
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [],
        },
        {
            name: 'claimReward',
            accounts: [
                {
                    name: 'staker',
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: 'bountyAccount',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'usdcMint',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'stakerTokenAccount',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'skillStake',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'skillStakeTokenAccount',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'tokenProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'associatedTokenProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'systemProgram',
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [],
        },
    ],
    accounts: [
        {
            name: 'nameRouter',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'bump',
                        type: 'u8',
                    },
                    {
                        name: 'signatureVersion',
                        type: 'u8',
                    },
                    {
                        name: 'totalVerifiedUsers',
                        type: 'u64',
                    },
                    {
                        name: 'routerCreator',
                        type: 'publicKey',
                    },
                    {
                        name: 'signingDomain',
                        type: 'string',
                    },
                ],
            },
        },
        {
            name: 'verifiedUser',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'bump',
                        type: 'u8',
                    },
                    {
                        name: 'nameRouter',
                        type: 'publicKey',
                    },
                    {
                        name: 'userName',
                        type: 'string',
                    },
                    {
                        name: 'userPubkey',
                        type: 'publicKey',
                    },
                ],
            },
        },
        {
            name: 'bounty',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'bump',
                        type: 'u8',
                    },
                    {
                        name: 'bountyCreator',
                        type: 'publicKey',
                    },
                    {
                        name: 'bountyMetadata',
                        type: 'string',
                    },
                    {
                        name: 'bountyReward',
                        type: 'u64',
                    },
                    {
                        name: 'bountySkillset',
                        type: {
                            vec: 'string',
                        },
                    },
                    {
                        name: 'bountyDeadline',
                        type: {
                            option: 'u64',
                        },
                    },
                    {
                        name: 'bountyAssigned',
                        type: {
                            option: 'publicKey',
                        },
                    },
                    {
                        name: 'bountyAppliers',
                        type: {
                            vec: 'publicKey',
                        },
                    },
                    {
                        name: 'bountyClosed',
                        type: 'bool',
                    },
                    {
                        name: 'bountyClaimed',
                        type: 'bool',
                    },
                    {
                        name: 'claimed',
                        type: {
                            vec: 'publicKey',
                        },
                    },
                    {
                        name: 'index',
                        type: 'string',
                    },
                ],
            },
        },
        {
            name: 'freelancer',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'bump',
                        type: 'u8',
                    },
                    {
                        name: 'freelancer',
                        type: 'publicKey',
                    },
                    {
                        name: 'userMetadata',
                        type: 'string',
                    },
                    {
                        name: 'skills',
                        type: {
                            vec: 'string',
                        },
                    },
                ],
            },
        },
        {
            name: 'skillStake',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'bump',
                        type: 'u8',
                    },
                    {
                        name: 'freelancer',
                        type: 'publicKey',
                    },
                    {
                        name: 'skill',
                        type: 'string',
                    },
                    {
                        name: 'stakeAmounts',
                        type: {
                            vec: 'u64',
                        },
                    },
                    {
                        name: 'stakers',
                        type: {
                            vec: 'publicKey',
                        },
                    },
                    {
                        name: 'totalSkillStake',
                        type: 'u64',
                    },
                ],
            },
        },
        {
            name: 'multisig',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'bump',
                        type: 'u8',
                    },
                    {
                        name: 'owners',
                        type: {
                            vec: 'publicKey',
                        },
                    },
                    {
                        name: 'threshold',
                        type: 'u64',
                    },
                ],
            },
        },
    ],
    events: [
        {
            name: 'NameRouterCreated',
            fields: [
                {
                    name: 'routerCreator',
                    type: 'publicKey',
                    index: false,
                },
                {
                    name: 'nameRouterAccount',
                    type: 'publicKey',
                    index: false,
                },
            ],
        },
        {
            name: 'VerifiedUserAdded',
            fields: [
                {
                    name: 'routerCreator',
                    type: 'publicKey',
                    index: false,
                },
                {
                    name: 'nameRouterAccount',
                    type: 'publicKey',
                    index: false,
                },
                {
                    name: 'verifiedUserAccount',
                    type: 'publicKey',
                    index: false,
                },
                {
                    name: 'userName',
                    type: 'string',
                    index: false,
                },
                {
                    name: 'userPubkey',
                    type: 'publicKey',
                    index: false,
                },
            ],
        },
        {
            name: 'FreelancerCreated',
            fields: [
                {
                    name: 'freelancer',
                    type: 'publicKey',
                    index: false,
                },
                {
                    name: 'freelancerMetadata',
                    type: 'string',
                    index: false,
                },
            ],
        },
        {
            name: 'BountyCreated',
            fields: [
                {
                    name: 'bountyCreator',
                    type: 'publicKey',
                    index: false,
                },
                {
                    name: 'bountyMetadata',
                    type: 'string',
                    index: false,
                },
                {
                    name: 'bountyReward',
                    type: 'u64',
                    index: false,
                },
                {
                    name: 'bountySkillsets',
                    type: {
                        vec: 'string',
                    },
                    index: false,
                },
            ],
        },
        {
            name: 'BountyDestroyed',
            fields: [
                {
                    name: 'bounty',
                    type: 'publicKey',
                    index: false,
                },
            ],
        },
        {
            name: 'SkillsetStaked',
            fields: [
                {
                    name: 'staker',
                    type: 'publicKey',
                    index: false,
                },
                {
                    name: 'freelancer',
                    type: 'publicKey',
                    index: false,
                },
                {
                    name: 'skillset',
                    type: 'string',
                    index: false,
                },
                {
                    name: 'stakeAmount',
                    type: 'u64',
                    index: false,
                },
            ],
        },
        {
            name: 'SkillsetUnStaked',
            fields: [
                {
                    name: 'skill',
                    type: 'publicKey',
                    index: false,
                },
                {
                    name: 'freelancer',
                    type: 'publicKey',
                    index: false,
                },
                {
                    name: 'unstakeAmount',
                    type: 'u64',
                    index: false,
                },
                {
                    name: 'unstaker',
                    type: 'publicKey',
                    index: false,
                },
            ],
        },
        {
            name: 'BountyFailed',
            fields: [
                {
                    name: 'freelancer',
                    type: 'publicKey',
                    index: false,
                },
                {
                    name: 'bounty',
                    type: 'publicKey',
                    index: false,
                },
                {
                    name: 'bountyDeadline',
                    type: 'u64',
                    index: false,
                },
                {
                    name: 'skillsets',
                    type: {
                        vec: 'string',
                    },
                    index: false,
                },
            ],
        },
        {
            name: 'BountyFailedClaimed',
            fields: [
                {
                    name: 'stakeAmount',
                    type: 'u64',
                    index: false,
                },
                {
                    name: 'redeemedAmount',
                    type: 'u64',
                    index: false,
                },
                {
                    name: 'bounty',
                    type: 'publicKey',
                    index: false,
                },
            ],
        },
        {
            name: 'BountyWon',
            fields: [
                {
                    name: 'bounty',
                    type: 'publicKey',
                    index: false,
                },
                {
                    name: 'freelancer',
                    type: 'publicKey',
                    index: false,
                },
                {
                    name: 'bountyReward',
                    type: 'u64',
                    index: false,
                },
            ],
        },
        {
            name: 'BountyApplied',
            fields: [
                {
                    name: 'bounty',
                    type: 'publicKey',
                    index: false,
                },
                {
                    name: 'freelancer',
                    type: 'publicKey',
                    index: false,
                },
            ],
        },
        {
            name: 'FreelancerAssigned',
            fields: [
                {
                    name: 'bounty',
                    type: 'publicKey',
                    index: false,
                },
                {
                    name: 'freelancer',
                    type: 'publicKey',
                    index: false,
                },
            ],
        },
        {
            name: 'BountyClaimed',
            fields: [
                {
                    name: 'bounty',
                    type: 'publicKey',
                    index: false,
                },
                {
                    name: 'freelancer',
                    type: 'publicKey',
                    index: false,
                },
                {
                    name: 'claimedAmount',
                    type: 'u64',
                    index: false,
                },
            ],
        },
        {
            name: 'RewardClaimed',
            fields: [
                {
                    name: 'bounty',
                    type: 'publicKey',
                    index: false,
                },
                {
                    name: 'staker',
                    type: 'publicKey',
                    index: false,
                },
                {
                    name: 'claimedAmount',
                    type: 'u64',
                    index: false,
                },
            ],
        },
    ],
    errors: [
        {
            code: 6000,
            name: 'SignatureVerificationFailed',
            msg: 'Invalid Signature',
        },
        {
            code: 6001,
            name: 'UnauthorizedUser',
            msg: 'User not verified',
        },
        {
            code: 6002,
            name: 'UnauthorizedActionAttempted',
            msg: 'Unauthorized smart contract Action',
        },
        {
            code: 6003,
            name: 'InsufficientStakingFunds',
            msg: 'Insufficient funds for staking',
        },
        {
            code: 6004,
            name: 'TokenAccountMismatch',
            msg: 'Token account mismatch',
        },
    ],
}
