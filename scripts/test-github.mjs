import { reviewRepo, fetchFile } from "../src/agent/github.js";

// Test against a real public repo — the 10-Doors Roblox project
const s = await reviewRepo("satojandro/venekovox");
console.log("repo:", s.repo, "| branch:", s.defaultBranch);
console.log("languages:", s.languages);
console.log("recent commits:");
for (const c of s.lastCommits.slice(0,5)) console.log(`  ${c.sha} ${c.date.slice(0,10)} +${c.additions}/-${c.deletions} ${c.message}`);
console.log("tree sample:", s.fileTree.slice(0,8));
const f = await fetchFile("satojandro/venekovox", s.fileTree.find(p => p.endsWith(".lua")) ?? "README.md", 15);
console.log("file preview:\n" + f.split("\n").slice(0,10).join("\n"));
