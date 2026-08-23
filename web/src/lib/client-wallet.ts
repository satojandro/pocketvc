"use client";

/**
 * Client-side wallet generation.
 * Keys are generated IN THE BROWSER using audited BIP-39/BIP-32 libs
 * (@scure/* — same standards the WDK SDK implements). Only public
 * addresses are ever sent to the server.
 *
 * Derivation verified byte-for-byte against @tetherto/wdk-wallet-evm
 * (same BIP-44 path, same keccak) — see scripts/verify-derivation.mjs.
 */
import { generateMnemonic, mnemonicToSeedSync } from "@scure/bip39";
import { wordlist } from "@scure/bip39/wordlists/english.js";
import { HDKey } from "@scure/bip32";
import { bytesToHex } from "@noble/hashes/utils.js";
import { keccak_256 } from "@noble/hashes/sha3.js";
import { secp256k1 } from "@noble/curves/secp256k1";

const DERIVATION_PATH = "m/44'/60'/0'/0/0"; // standard EVM path, same as WDK

/** Generate a fresh 12-word BIP-39 mnemonic locally. */
export function generateSeedPhrase(): string {
  return generateMnemonic(wordlist, 128);
}

/** Derive the EVM address from a seed phrase locally (BIP-44, same as WDK EVM module). */
export function deriveAddress(seedPhrase: string): string {
  const seed = mnemonicToSeedSync(seedPhrase);
  const hd = HDKey.fromMasterSeed(seed).derive(DERIVATION_PATH);
  const pub = secp256k1.getPublicKey(hd.privateKey!, false);
  return "0x" + bytesToHex(keccak_256(pub.slice(1)).slice(-20));
}

export interface CreatedWallet {
  role: string;
  name: string;
  address: string;
  seedPhrase: string;
}
