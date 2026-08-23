import "dotenv/config";
import { executePayout } from "/Users/clawdio/Projects/pocketvc/web/src/lib/wallet-exec";
const r = await executePayout(5, "0xC413707F12C1a08bFc8Dc6cD091bF69762B2b255");
console.log("EXEC RESULT:", JSON.stringify(r));
