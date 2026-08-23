"use client";

import { QRCodeSVG } from "qrcode.react";

/**
 * Fund-the-project card: anyone can scan and send USDT straight to the
 * kid's project treasury. Grandparents, uncles, family friends — the
 * "Trump accounts" idea applied to kids' projects: anyone can back a kid.
 */
export default function FundCard({ address, kidName = "your kid" }: { address: string; kidName?: string }) {
  const ethUrl = `ethereum:${address}@11155111`;
  return (
    <div className="rounded-3xl border-4 border-black bg-white p-6 shadow-[8px_8px_0_0_rgba(255,210,63,1)]">
      <p className="text-xs font-black uppercase tracking-widest text-gray-500">Back this builder</p>
      <h2 className="mt-1 text-2xl font-black">Fund {kidName}&apos;s project 💛</h2>
      <p className="mt-2 font-medium text-gray-700">
        Anyone can deposit USDT into the project treasury — grandparents, uncles,
        family friends. Every deposit raises the stakes and the incentive to ship.
      </p>
      <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row">
        <div className="rounded-2xl border-4 border-black bg-white p-2">
          <QRCodeSVG value={ethUrl} size={140} />
        </div>
        <div className="text-center sm:text-left">
          <p className="font-bold">Scan with any wallet</p>
          <p className="mt-1 break-all rounded-lg border border-gray-300 bg-gray-50 p-2 font-mono text-xs text-gray-600">
            {address}
          </p>
          <p className="mt-2 text-sm font-semibold text-gray-500">
            Sepolia testnet USDT (demo). Mainnet USDT on production.
          </p>
        </div>
      </div>
    </div>
  );
}
