import "dotenv/config";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { executePayout } from "../src/lib/wallet-exec";
// send 100 USDT treasury → demo-pool
const r = await executePayout(100, "0x95381F076dD23078D8c9F6D2ab4e8a0500E01c07", "treasury");
console.log("POOL FUNDED:", JSON.stringify(r));
