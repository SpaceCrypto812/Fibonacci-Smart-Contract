"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.programIds = exports.setProgramIds = exports.setStoreID = exports.PROGRAM_IDS = exports.ENABLE_FEES_INPUT = void 0;
const web3_js_1 = require("@solana/web3.js");
const utils_1 = require("../utils");
const ids_1 = require("./ids");
exports.ENABLE_FEES_INPUT = false;
// legacy pools are used to show users contributions in those pools to allow for withdrawals of funds
exports.PROGRAM_IDS = [
    {
        name: 'mainnet-beta',
    },
    {
        name: 'testnet',
    },
    {
        name: 'devnet',
    },
    {
        name: 'localnet',
    },
];
let STORE_OWNER_ADDRESS;
const setStoreID = (storeId) => {
    STORE_OWNER_ADDRESS = storeId
        ? new web3_js_1.PublicKey(`${storeId}`)
        : // DEFAULT STORE FRONT OWNER FOR METAPLEX
            undefined;
};
exports.setStoreID = setStoreID;
const getStoreID = async () => {
    if (!STORE_OWNER_ADDRESS) {
        return undefined;
    }
    let urlStoreId = null;
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const text = urlParams.get('store');
        if (text) {
            urlStoreId = new web3_js_1.PublicKey(text);
        }
    }
    catch {
        // ignore
    }
    const storeOwnerAddress = urlStoreId || STORE_OWNER_ADDRESS;
    console.log(`STORE_OWNER_ADDRESS: ${storeOwnerAddress === null || storeOwnerAddress === void 0 ? void 0 : storeOwnerAddress.toBase58()}`);
    const programs = await utils_1.findProgramAddress([
        Buffer.from('metaplex'),
        ids_1.toPublicKey(ids_1.METAPLEX_ID).toBuffer(),
        storeOwnerAddress.toBuffer(),
    ], ids_1.toPublicKey(ids_1.METAPLEX_ID));
    const CUSTOM = programs[0];
    console.log(`CUSTOM STORE: ${CUSTOM}`);
    return CUSTOM;
};
const setProgramIds = async (envName) => {
    let instance = exports.PROGRAM_IDS.find(env => envName.indexOf(env.name) >= 0);
    if (!instance) {
        return;
    }
    if (!STORE) {
        const potential_store = await getStoreID();
        STORE = potential_store ? ids_1.toPublicKey(potential_store) : undefined;
    }
};
exports.setProgramIds = setProgramIds;
let STORE;
const programIds = () => {
    return {
        token: ids_1.TOKEN_PROGRAM_ID,
        associatedToken: ids_1.SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
        bpf_upgrade_loader: ids_1.BPF_UPGRADE_LOADER_ID,
        system: ids_1.SYSTEM,
        metadata: ids_1.METADATA_PROGRAM_ID,
        memo: ids_1.MEMO_ID,
        vault: ids_1.VAULT_ID,
        auction: ids_1.AUCTION_ID,
        metaplex: ids_1.METAPLEX_ID,
        store: STORE,
    };
};
exports.programIds = programIds;
//# sourceMappingURL=programIds.js.map