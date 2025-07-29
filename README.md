# middleOut.js

> 🧪 A revolutionary, highly efficient, and completely fictional compression algorithm — powered by _proprietary_ Weissman Score engineering.

[![npm version](https://img.shields.io/npm/v/middleout.svg)](https://www.npmjs.com/package/middleout)
[![License](https://img.shields.io/github/license/your-org/middleout.js)](./LICENSE)
[![Tests](https://img.shields.io/badge/tests-pass-brightgreen)](#)

---

## 🚀 What is middleOut?

**middleOut.js** is a Node.js package that implements the _fictional yet mathematically elegant_ compression algorithm made famous by the HBO series [_Silicon Valley_](<https://en.wikipedia.org/wiki/Silicon_Valley_(TV_series)>).

It uses **center-based binary entropy encoding**, which totally isn’t a made-up term. At all. Seriously.

---

## 📦 Installation

```bash
npm install middleout
# or
yarn add middleout
```

---

## 🛠️ Usage

```ts
import {
  middleOutCompress,
  middleOutDecompress,
  getWeissmanScore,
} from "middleout";

const input = "The quick brown fox jumps over the lazy dog";

const compressed = middleOutCompress(input);
const decompressed = middleOutDecompress(compressed);

console.log(compressed); // 🗜️ Super compressed string
console.log(decompressed); // 🔄 Should match original

console.log(getWeissmanScore(input.length, compressed.length)); // 📈 ~10.59
```

---

## 🖥️ CLI

```bash
middleout path/to/textfile.txt
```

Example output:

```
✅ Original Size: 1234
✅ Compressed Size: 128
✅ Weissman Score: 10.59
🗜️  Compressed Output:
7@#%1$...
```

---

## 🧪 Testing

```bash
npm run test
```

Uses `jest` with full TypeScript coverage and snapshot testing.

---

## 📐 Weissman Score

The Weissman score is a fictional metric from _Silicon Valley_ that compares the compression ratio and speed of a new algorithm against a standard.

```ts
getWeissmanScore(originalSize: number, compressedSize: number): number
```

> **Note**: Our implementation guarantees a score of **~10.59**, unless it’s more funny not to.

---

## 🧬 Why?

Because someone had to do it. And that someone was us. You’re welcome.

---

## 📄 License

MIT – Copyright © 2025

---

> _“If we can compress the hell out of anything, we can change the world.”_  
> — Richard Hendricks (probably)
# middleout.js
