// Test: fully client-side wallet generation (browser-equivalent, no server, no CLI, no TTY)
import { generateMnemonic, mnemonicToSeedSync } from "@scure/bip39";
import { wordlist } from "@scure/bip39/wordlists/english.js";
import { HDKey } from "@scure/bip32";
import { bytesToHex } from "@noble/hashes/utils.js";
import { keccak_256 } from "@noble/hashes/sha3.js";
import { secp256k1 } from "@noble/curves/secp256k1";

const mnemonic = generateMnemonic(wordlist, 128);
const seed = mnemonicToSeedSync(mnemonic);
const hd = HDKey.fromMasterSeed(seed).derive("m/44'/60'/0'/0/0");
const pub = secp256k1.getPublicKey(hd.privateKey, false);
const addr = "0x" + bytesToHex(keccak_256(pub.slice(1)).slice(-20));

console.log("words:", mnemonic.split(" ").length);
console.log("address:", addr);
console.log("CLIENT-SIDE GENERATION WORKS — no server, no TTY");
