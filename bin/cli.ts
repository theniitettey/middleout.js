import chalk from "chalk";
import { Command } from "commander";
import { loadConfig } from "../src/config";
import { compress, decompress } from "../src";
import { getWeissmanScore } from "../src";
import type { CompressionResult, MiddleOutConfig } from "../types";

console.log(chalk.greenBright("🚀 MiddleOut Compression CLI v1.0"));
console.log(chalk.cyan("Choose your compression algorithm:"));
console.log(
  `  ${chalk.yellow("• rle")}        ${chalk.dim("Run-Length Encoding")}`
);
console.log(
  `  ${chalk.magenta("• stk")}        ${chalk.dim(
    "Stack-based Universe Reverser"
  )}`
);
console.log(
  `  ${chalk.redBright("• tnt")}        ${chalk.dim(
    "Ternary Nibble Toggler (lol)"
  )}`
);
console.log(
  `  ${chalk.blue("• zph")}        ${chalk.dim("Zero-Point Hashing")}`
);
console.log(
  `  ${chalk.gray("• middle-out")}  ${chalk.dim(
    "Compress so hard... it reverses time"
  )}`
);
console.log(); // Empty line for spacing

const program = new Command();

program
  .name("middleout")
  .description("The ultimate spoof compression tool")
  .version("1.0.0");

// Helper function to display compression results with chalk
function displayCompressionResult(result: CompressionResult) {
  console.log(chalk.greenBright("✅ Compression Complete!"));
  console.log(chalk.gray("═".repeat(50)));

  console.log(chalk.cyan("📝 Original Text:"));
  console.log(`   ${chalk.white(result.original)}`);
  console.log();

  console.log(chalk.magenta("🗜️  Compressed:"));
  console.log(`   ${chalk.yellow(result.compressed)}`);
  console.log();

  console.log(chalk.blue("📊 Stats:"));
  console.log(
    `   ${chalk.dim("Algorithm:")}     ${chalk.bold(
      result.algorithm.toUpperCase()
    )}`
  );
  console.log(
    `   ${chalk.dim("Original Size:")} ${chalk.white(
      result.originalSize
    )} bytes`
  );
  console.log(
    `   ${chalk.dim("Compressed:")}    ${chalk.white(
      result.compressedSize
    )} bytes`
  );

  // Calculate compression ratio
  const ratio =
    ((result.originalSize - result.compressedSize) / result.originalSize) * 100;
  const ratioColor = ratio > 0 ? chalk.green : chalk.red;
  console.log(
    `   ${chalk.dim("Compression:")}   ${ratioColor(ratio.toFixed(1) + "%")}`
  );
  console.log();

  // Weissman Score with extra flair
  const scoreColor =
    result.weissmanScore >= 4.5
      ? chalk.yellowBright
      : result.weissmanScore >= 4.0
      ? chalk.green
      : result.weissmanScore >= 3.5
      ? chalk.yellow
      : chalk.red;

  console.log(chalk.bold("🏆 Weissman Score:"));
  console.log(
    `   ${scoreColor(result.weissmanScore.toFixed(2))} ${getScoreMessage(
      result.weissmanScore
    )}`
  );
  console.log();

  console.log(chalk.dim("🔒 MO:: Format:"));
  console.log(`   ${chalk.gray(result.encoded)}`);
  console.log(chalk.gray("═".repeat(50)));
}

// Helper function to get score message
function getScoreMessage(score: number): string {
  if (score >= 5.0) return chalk.yellowBright("— Legendary! 🏅");
  if (score >= 4.5) return chalk.green("— Excellent! 🎉");
  if (score >= 4.0) return chalk.cyan("— Very Good! 👍");
  if (score >= 3.5) return chalk.yellow("— Good 👌");
  if (score >= 3.0) return chalk.magentaBright("— Decent 😐");
  return chalk.red("— Needs Work 😅");
}

// Helper function to display config
function displayConfig(config: MiddleOutConfig) {
  console.log(chalk.blueBright("⚙️  Current Configuration:"));
  console.log(chalk.gray("─".repeat(30)));
  console.log(
    `${chalk.dim("Algorithm:")}          ${chalk.bold(
      config.algorithm.toUpperCase()
    )}`
  );
  console.log(
    `${chalk.dim("Weissman Optimized:")} ${
      config.wisemanOptimized ? chalk.green("✓ Yes") : chalk.red("✗ No")
    }`
  );
  console.log(
    `${chalk.dim("Aggression Level:")}   ${chalk.yellow(
      config.aggressionLevel
    )}`
  );
  console.log(
    `${chalk.dim("Preserve Whitespace:")} ${
      config.preserveWhitespace ? chalk.green("✓ Yes") : chalk.red("✗ No")
    }`
  );
  console.log(
    `${chalk.dim("Target Weissman:")}    ${chalk.cyan(config.targetWeissman)}`
  );
  console.log(chalk.gray("─".repeat(30)));
  console.log();
}

// Compress command
program
  .command("compress")
  .option(
    "--algo <algorithm>",
    "Compression algorithm (rle, tnt, zph, stk, middleout)"
  )
  .option("--input <text>", "Text input to compress")
  .option("--raw", "Use raw fallback in decompression output", false)
  .option("--config", "Show current configuration", false)
  .action((opts) => {
    const config = loadConfig();

    if (opts.config) {
      displayConfig(config);
      return;
    }

    if (!opts.input) {
      console.log(chalk.red("❌ Error: --input is required"));
      console.log(
        chalk.dim(
          'Example: middleout compress --algo rle --input "Hello World"'
        )
      );
      process.exit(1);
    }

    try {
      const result: CompressionResult = compress(
        opts.input,
        opts.algo || config.algorithm,
        {
          ...config,
          raw: opts.raw,
        }
      );

      displayCompressionResult(result);
    } catch (error: any) {
      console.log(chalk.red("❌ Compression failed:"));
      console.log(chalk.red(`   ${error.message}`));
      process.exit(1);
    }
  });

// Decompress command
program
  .command("decompress")
  .option("--algo <algorithm>", "Decompression algorithm")
  .option("--input <text>", "Compressed input (MO:: format)")
  .option("--raw", "Use raw fallback in decompression", false)
  .action((opts) => {
    const config = loadConfig();

    if (!opts.input) {
      console.log(chalk.red("❌ Error: --input is required"));
      console.log(
        chalk.dim(
          'Example: middleout decompress --input "MO::rle:a3b2c1::WEISSMAN::4.20"'
        )
      );
      process.exit(1);
    }

    try {
      const result = decompress(opts.input, opts.algo || config.algorithm, {
        ...config,
        raw: opts.raw,
      });

      console.log(chalk.greenBright("✅ Decompression Complete!"));
      console.log(chalk.gray("═".repeat(50)));
      console.log(chalk.cyan("📄 Decompressed Text:"));
      console.log(`   ${chalk.white(result)}`);
      console.log(chalk.gray("═".repeat(50)));
    } catch (error: any) {
      console.log(chalk.red("❌ Decompression failed:"));
      console.log(chalk.red(`   ${error.message}`));
      process.exit(1);
    }
  });

// Weissman Score command
program
  .command("weissman")
  .option("--algo <algorithm>", "Algorithm used for compression")
  .option("--original <text>", "Original uncompressed text")
  .option("--compressed <text>", "Compressed text (MO:: format)")
  .action((opts) => {
    if (!opts.original || !opts.compressed) {
      console.log(
        chalk.red("❌ Error: Both --original and --compressed are required")
      );
      console.log(
        chalk.dim(
          'Example: middleout weissman --original "Hello" --compressed "MO::rle:H1e1l2o1::WEISSMAN::4.20"'
        )
      );
      process.exit(1);
    }

    try {
      // Extract algorithm from MO:: format if not provided
      let algorithm = opts.algo;
      if (!algorithm && opts.compressed.startsWith("MO::")) {
        const parts = opts.compressed.split(":");
        algorithm = parts[1];
      }

      if (!algorithm) {
        console.log(
          chalk.red("❌ Error: Could not determine algorithm. Use --algo flag.")
        );
        process.exit(1);
      }

      const originalSize = opts.original.length;
      const compressedSize = opts.compressed.length;

      const score = getWeissmanScore(algorithm, originalSize, compressedSize);

      console.log(chalk.blueBright("🧮 Weissman Score Calculator"));
      console.log(chalk.gray("═".repeat(40)));
      console.log(
        `${chalk.dim("Algorithm:")}      ${chalk.bold(algorithm.toUpperCase())}`
      );
      console.log(
        `${chalk.dim("Original Size:")}  ${chalk.white(originalSize)} bytes`
      );
      console.log(
        `${chalk.dim("Compressed Size:")} ${chalk.white(compressedSize)} bytes`
      );
      console.log();

      const scoreColor =
        score >= 4.5
          ? chalk.yellow
          : score >= 4.0
          ? chalk.green
          : score >= 3.5
          ? chalk.yellow
          : chalk.red;

      console.log(chalk.bold("🏆 Weissman Score:"));
      console.log(
        `   ${scoreColor(score.toFixed(2))} ${getScoreMessage(score)}`
      );
      console.log(chalk.gray("═".repeat(40)));
    } catch (error: any) {
      console.log(chalk.red("❌ Score calculation failed:"));
      console.log(chalk.red(`   ${error.message}`));
      process.exit(1);
    }
  });

// Config command
program
  .command("config")
  .description("Show current configuration")
  .action(() => {
    const config = loadConfig();
    displayConfig(config);
  });

program.parse(process.argv);
