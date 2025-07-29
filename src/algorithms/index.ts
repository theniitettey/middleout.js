import { compressWithRLE, decompressWithRLE } from "./rle";
import { compressWithSTK, decompressWithSTK } from "./stk";
import { compressWithTNT, decompressWithTNT } from "./tnt";
import { compressWithZPH, decompressWithZPH } from "./zph";
import { compressWithMiddleOut, decompressWithMiddleOut } from "./mo";

export {
  compressWithRLE,
  compressWithSTK,
  compressWithTNT,
  compressWithZPH,
  compressWithMiddleOut,
  decompressWithRLE,
  decompressWithSTK,
  decompressWithTNT,
  decompressWithZPH,
  decompressWithMiddleOut,
};
