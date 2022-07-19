import { PublicKey } from '@solana/web3.js';
export declare const ENABLE_FEES_INPUT = false;
export declare const PROGRAM_IDS: {
    name: string;
}[];
export declare const setStoreID: (storeId: any) => void;
export declare const setProgramIds: (envName: string) => Promise<void>;
export declare const programIds: () => {
    token: PublicKey;
    associatedToken: PublicKey;
    bpf_upgrade_loader: PublicKey;
    system: PublicKey;
    metadata: string;
    memo: PublicKey;
    vault: string;
    auction: string;
    metaplex: string;
    store: PublicKey | undefined;
};
//# sourceMappingURL=programIds.d.ts.map