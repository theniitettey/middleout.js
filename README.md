# 🧠 middleOut.js

> 🚨 A **spoof** compression library that _pretends_ to revolutionize the world of data compression using made-up, dubiously effective algorithms — inspired by the legendary **middle-out** compression from _Silicon Valley_.

[![npm version](https://img.shields.io/npm/v/middleout.svg)](https://www.npmjs.com/package/middleout)
[![License](https://img.shields.io/github/license/your-org/middleout.js)](./LICENSE)
[![Tests](https://img.shields.io/badge/tests-pass-brightgreen)](#)
[![Weissman Score](https://img.shields.io/badge/Weissman%20Score-5.2-gold)](#)

> 🚨 **Warning**: This library is **not** for real compression use. It's satire. It's sarcasm. It's suspiciously brilliant.

---

## 🚀 What is middleOut?

**middleOut.js** implements the _fictional yet mathematically elegant_ compression algorithm made famous by HBO's [_Silicon Valley_](<https://en.wikipedia.org/wiki/Silicon_Valley_(TV_series)>).

It uses **center-based binary entropy encoding** with **Weissman Score optimization**, which totally aren't made-up terms. At all. Seriously.

### ✨ Features

- 🤹 **Multiple fake algorithms**: Choose from `RLE`, `STK`, `TNT`, and `ZPH`
- 🎩 **Auto-generated Weissman Scores** that _always_ look impressive
- ⚙️ **`.middleoutrc` config support** for maximum enterprise readiness
- 🧪 **Fully tested** with Jest (because fake compression deserves real tests)
- 💻 **CLI support** for compression & decompression
- 📊 **TypeScript support** with beautiful IntelliSense

---

## 📦 Installation

```bash
npm install middleout
# or
yarn add middleout
# or (if you're feeling dangerous)
pnpm add middleout
```

---

## 🛠️ Usage

### Basic Compression

```typescript
import { middleOutCompress, middleOutDecompress } from "middleout";

const input = "The quick brown fox jumps over the lazy dog";

// Compress with default algorithm
const compressed = middleOutCompress(input);
console.log(compressed); // 🗜️ Super compressed string

// Decompress back to original
const decompressed = middleOutDecompress(compressed);
console.log(decompressed); // Should match original (hopefully)
```

### Algorithm Selection

```typescript
const compressed = middleOutCompress(input, {
  algorithm: "rle", // or 'stk', 'tnt', 'zph'
});
```

### Weissman Score Calculation

```typescript
import { getWeissmanScore } from "middleout";

const score = getWeissmanScore(input, compressed, "rle");
console.log(score); // 📈 "🏅 Weissman Score (RLE): 5.13 — You're basically a legend."
```

---

## 🧬 Algorithms

| Algorithm | Description                     | Best Use Case                                                       |
| --------- | ------------------------------- | ------------------------------------------------------------------- |
| `rle`     | Run-Length Encoding             | Strings with repeating characters. Classic. Predictable. Overhyped. |
| `stk`     | Stack-based reverse compression | When you want to reverse the universe                               |
| `tnt`     | Ternary Nibble Toggler          | Converts to base-3, toggles bits, pretends it's efficient           |
| `zph`     | Zero-Point Hashing              | Fake hash with made-up dictionary. Very scientific.                 |

All compressed outputs are suffixed with `⟩[algo]` for easy identification during decompression.

---

## 🖥️ CLI Usage

```bash
# Compress a string
npx middleout compress "some text" --algorithm rle

# Decompress
npx middleout decompress "sometext⟩rle"

# Show Weissman Score
npx middleout score "original" "compressed⟩rle"
```

### Configuration via `.middleoutrc`

```json
{
  "algorithm": "stk",
  "weissmanOptimized": true,
  "showScore": true
}
```

---

## 🧪 Testing

```bash
npm run test
```

Our test suite includes:

- ✔️ Compression output validation
- ✔️ Weissman Score bounds checking (2.89-5.2 range)
- ✔️ Edge cases (empty files, binary data, unicode)
- ✔️ Algorithm-specific behavior
- ✔️ CLI integration tests

---

## 📐 Weissman Score

The Weissman score is a fictional metric from _Silicon Valley_ that measures compression efficiency. Our implementation provides algorithm-specific scoring:

```typescript
// Each algorithm has its own "personality"
getWeissmanScore(original, compressed, "rle"); // Conservative scores
getWeissmanScore(original, compressed, "tnt"); // Wildly optimistic scores
getWeissmanScore(original, compressed, "zph"); // Mysteriously perfect scores
```

> **Note**: Our implementation guarantees a score between **2.89-5.2**, because anything higher would be suspicious.

---

## 🎯 Breaking Changes in v2.0

- **BREAKING**: Removed `pip_piper_compress()` - we're not savages
- **BREAKING**: `compress()` now returns a `MiddleOutResult` object
- **NEW**: Multiple algorithm support
- **NEW**: Weissman Score integration
- **NEW**: TypeScript definitions

### Migration Guide

```typescript
// Old way (amateur hour)
const result = compress(data);

// New way (Weissman-approved)
const result = middleOutCompress(data, {
  algorithm: "middle-out",
  weissmanOptimized: true,
});
console.log(`Weissman Score: ${result.weissmanScore}`);
```

---

## 🧙 Why middleOut?

Why not? You could be building rockets. Or you could be simulating world-changing compression algorithms for the memes. You chose correctly.

### Real-world Applications\*

- 🤖 Passes all Hooli compliance checks
- 📱 Compatible with Nucleus integration (when it eventually works)
- 🏆 Guaranteed to impress VCs at demo day
- 🔒 More secure than Gavin Belson's password manager

_\*Not actually real-world applications_

---

## 🤝 Contributing

Pull requests welcome! Please ensure:

- Your fake algorithms are sufficiently over-engineered
- Weissman Scores remain within believable bounds
- All compression is lossless (we have standards)
- JSDoc comments include at least one Silicon Valley reference

---

## ⚠️ Disclaimer

This library is for **entertainment purposes** only. If you try using this in production, may the Weissman gods have mercy on your storage.

Not affiliated with HBO, Pied Piper, Hooli, or any actual compression standards.

---

## 📄 License

MIT – Copyright © 2025

---

> _"Compression isn't just science. It's art. It's pain. It's `middleOut.js`."_  
> — Definitely not Richard Hendricks

> _"If it's not Weissman-approved, did you even compress it?"_  
> — The middleOut.js Team
