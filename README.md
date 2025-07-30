# 🧠 middleOut.js

> 🚨 A **spoof** compression library that _pretends_ to revolutionize the world of data compression using made-up, dubiously effective algorithms — inspired by the legendary **middle-out** compression from _Silicon Valley_.

[![npm version](https://img.shields.io/npm/v/middleout.svg)](https://www.npmjs.com/package/middleout.js)
[![License](https://img.shields.io/github/license/theniitettey/middleout.js)](./LICENSE)
[![Tests](https://img.shields.io/badge/tests-pass-brightgreen)](#)
[![Weissman Score](https://img.shields.io/badge/Weissman%20Score-9.8-gold)](#)

> 🚨 **Warning**: This library is **not** for real compression use. It's satire. It's sarcasm. It's suspiciously brilliant.
> but it works apparently

---

## 🚀 What is middleOut?

**middleOut.js** implements the _fictional yet mathematically elegant_ compression algorithm made famous by HBO's [_Silicon Valley_](<https://en.wikipedia.org/wiki/Silicon_Valley_(TV_series)>).

It uses **center-based binary entropy encoding** with **Weissman Score optimization**, which totally aren't made-up terms. At all. Seriously.

### ✨ Features

- 🤹 **Multiple fake algorithms**: Choose from `rle`, `stk`, `tnt`, `zph`, and the legendary `middle-out`
- 🎩 **Auto-generated Weissman Scores** that _always_ look impressive
- ⚙️ **`.middleoutrc` config support** for maximum enterprise readiness
- 🧪 **Fully tested** with Jest (because fake compression deserves real tests)
- 💻 **Optional CLI support** for compression & decompression
- 📊 **TypeScript support** with beautiful IntelliSense
- 🔒 **MO:: encoding format** for maximum authenticity
- 🪶 **Lightweight**: Core library has zero dependencies

---

## 📦 Installation

### Option 1: Library Only (Recommended)

Perfect for using in your applications with minimal overhead:

```bash
npm install middleout.js
# or
yarn add middleout.js
# or (if you're feeling dangerous)
pnpm add middleout.js
```

### Option 2: Library + CLI

For the full middleOut experience with command-line tools:

```bash
npm install middleout.js chalk commander
# or
yarn add middleout.js chalk commander
```

### Option 3: Global CLI Installation

Install globally for system-wide middleOut compression powers:

```bash
npm install -g middleout.js chalk commander
```

---

## 🛠️ Usage

### Basic Compression

```typescript
import { middleOutCompress, middleOutDecompress } from "middleout.js";

const input = "The quick brown fox jumps over the lazy dog";

// Compress with default algorithm
const compressed = middleOutCompress(input);
console.log(compressed); // MO::middle-out:compressed_data::WEISSMAN::4.20

// Decompress back to original
const decompressed = middleOutDecompress(compressed);
console.log(decompressed); // Should match original (hopefully)
```

### Algorithm Selection

```typescript
const compressed = middleOutCompress(input, {
  algorithm: "rle", // or 'stk', 'tnt', 'zph', 'middle-out'
});
```

### Weissman Score Calculation

```typescript
import { getWeissmanScore } from "middleout.js";

const score = getWeissmanScore(input, compressed, "rle");
console.log(score); // 📈 "🏅 Weissman Score (RLE): 5.13 — You're basically a legend."
```

### Low-Level Encoding/Decoding

```typescript
import { encodeMO, decodeMO } from "middleout.js";

// Encode compressed data with Weissman score
const encoded = encodeMO("rle", "a3b2c1", 4.2);
// Returns: "MO::rle:a3b2c1::WEISSMAN::4.20"

// Decode to extract components
const decoded = decodeMO("MO::rle:a3b2c1::WEISSMAN::4.20");
// Returns: { algorithm: "rle", compressedData: "a3b2c1", weissmanScore: 4.2 }
```

---

## 🧬 Algorithms

| Algorithm    | Name                           | Description                                     | Best For                                                                                         |
| ------------ | ------------------------------ | ----------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `rle`        | 🧱 **Run-Length Encoding**     | Because repeating letters are just lazy.        | Strings with repeating characters. Classic. Predictable. Overhyped. Like vinyl but for bytes.    |
| `stk`        | 🌀 **Stack Trace Kompression** | For your inner Java debugger.                   | When you want to reverse the universe by pretending it's all just stack traces. Dev trauma fuel. |
| `tnt`        | 💣 **Textual Noise Trimmer**   | It removes "um", "uh", and sometimes your soul. | Converts to base-3, toggles pseudo-bits, and whispers to the CPU: "Trust me, I'm fast."          |
| `zph`        | 🧬 **Zero-Pattern Hider**      | Because zeroes don't deserve to be seen.        | Hashes everything with a fake dictionary. Quantum-sounding. Zero proof. Maximum vibes.           |
| `middle-out` | 🧠 **Middle-Out Compression**  | The one, the myth, the legend.                  | The mythical algorithm. Splits from the middle like a coding Moses. Nobody knows how it works.   |

---

## 🖥️ CLI Usage

> **Note**: CLI requires optional dependencies. Install with: `npm install chalk commander`

```bash
# Check if CLI is available
npx middleout --help

# Compress a string
npx middleout compress --algo rle --input "some text to compress"

# Decompress
npx middleout decompress --algo tnt --input "MO::tnt:ss*bu*yu*hh*kk|TNT_SIG|914::WEISSMAN::4.31"

# Show Weissman Score
npx middleout weissman --algo middle-out --original "original text" --compressed "MO::middle-out:compressed::WEISSMAN::4.20"
```

### Installing CLI Dependencies

If you see this message:

```
⚠️  CLI dependencies not installed.
```

Install the CLI dependencies:

```bash
npm install chalk commander
```

### Configuration via `.middleoutrc`

```json
{
  "algorithm": "middle-out",
  "weissmanOptimized": true,
  "showScore": true
}
```

---

## 🔒 MO:: Encoding Format

All compressed output uses our proprietary **MO::** format:

```
MO::<algorithm>:<compressed_data>::WEISSMAN::<score>
```

**Examples:**

- `MO::rle:a3b2c1::WEISSMAN::4.20`
- `MO::middle-out:QkxBSCBCTEFI::WEISSMAN::5.12`
- `MO::tnt:101010110::WEISSMAN::3.89`

This format ensures maximum compatibility with Pied Piper infrastructure and provides built-in Weissman score validation.

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
- ✔️ MO:: format encoding/decoding

---

## 📐 Weissman Score

The Weissman score is a fictional metric from _Silicon Valley_ that measures compression efficiency. Our implementation provides algorithm-specific scoring:

```typescript
// Each algorithm has its own "personality"
getWeissmanScore(original, compressed, "rle"); // Conservative scores
getWeissmanScore(original, compressed, "tnt"); // Wildly optimistic scores
getWeissmanScore(original, compressed, "zph"); // Mysteriously perfect scores
getWeissmanScore(original, compressed, "middle-out"); // Legendary scores
```

> **Note**: Our implementation guarantees a score between **2.89-5.2**, because anything higher would be suspicious.

---

## 🎯 Breaking Changes in v2.0

- **BREAKING**: Removed `pip_piper_compress()` - we're not savages
- **BREAKING**: `compress()` now returns a `MiddleOutResult` object
- **BREAKING**: All output now uses **MO::** encoding format
- **NEW**: Multiple algorithm support including the mythical `middle-out`
- **NEW**: Weissman Score integration
- **NEW**: TypeScript definitions
- **NEW**: `encodeMO()` and `decodeMO()` utilities
- **NEW**: Optional CLI dependencies for smaller installs

### Migration Guide

```typescript
// Old way (amateur hour)
const result = compress(data);

// New way (Weissman-approved)
const result = middleOutCompress(data, {
  algorithm: "middle-out",
  weissmanOptimized: true,
});

// Extract components from MO:: format
const { algorithm, compressedData, weissmanScore } = decodeMO(result);
console.log(`Weissman Score: ${weissmanScore}`);
```

---

## 🧙 Why middleOut?

Why not? You could be building rockets. Or you could be simulating world-changing compression algorithms for the memes. You chose correctly.

### Real-world Applications\*

- 🤖 Passes all Hooli compliance checks
- 📱 Compatible with Nucleus integration (when it eventually works)
- 🏆 Guaranteed to impress VCs at demo day
- 🔒 More secure than Gavin Belson's password manager
- 🧬 MO:: format ensures enterprise-grade authenticity
- 🪶 Zero dependencies for core library (CLI optional)

_\*Not actually real-world applications_

---

## 🤝 Contributing

Pull requests welcome! Please ensure:

- Your fake algorithms are sufficiently over-engineered
- Weissman Scores remain within believable bounds
- All compression is lossless (we have standards)
- JSDoc comments include at least one Silicon Valley reference
- New algorithms integrate with the MO:: encoding format
- Core library remains dependency-free

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

> _"MO:: format is the future. The future is MO::."_  
> — Probably Erlich Bachman
