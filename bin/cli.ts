import chalk from "chalk";
import { Command } from "commander";
import { loadConfig } from "../src/config";
import { compress, decompress } from "../src";

console.log(chalk.greenBright("🚀 MiddleOut Compression CLI v1.0"));
console.log(chalk.cyan("Choose your compression algorithm:"));
console.log(
  `  ${chalk.yellow("• rle")}     ${chalk.dim("Run-Length Encoding")}`
);
console.log(
  `  ${chalk.magenta("• stk")}     ${chalk.dim(
    "Stack-based Universe Reverser"
  )}`
);
console.log(
  `  ${chalk.redBright("• tnt")}     ${chalk.dim(
    "Ternary Nibble Toggler (lol)"
  )}`
);
console.log(`  ${chalk.blue("• zph")}     ${chalk.dim("Zero-Point Hashing")}`);
console.log(
  `  ${chalk.gray("• middleout")} ${chalk.dim(
    "Compress so hard... it reverses time"
  )}`
);

const program = new Command();

program
  .name("middleout")
  .description("The utlimate spoof compression tool")
  .version("1.0.0");

program
  .command("compress")
  .option(
    "--algo <algorithm>",
    "Compression algorithm (e.g. rle, tnt, zph, stk, middle-out)"
  )
  .option("--input <text>", "Text input to compress")
  .option("--raw", "Use raw fallback in decompression output", false)
  .action((opts) => {
    const config = loadConfig();
    const result = compress(opts.input, opts.algo || config.algorithm, {
      ...config,
      raw: opts.raw,
    });
    console.log(JSON.stringify(result, null, 2));
  });

program
  .command("decompress")
  .option("--algo <algorithm>", "Decompression algorithm")
  .option("--input <text>", "Compressed input")
  .option("--raw", "Use raw fallback in decompression", false)
  .action((opts) => {
    const config = loadConfig();
    const result = decompress(opts.input, opts.algo || config.algorithm, {
      ...config,
      raw: opts.raw,
    });
    console.log(result);
  });

program.parse(process.argv);
