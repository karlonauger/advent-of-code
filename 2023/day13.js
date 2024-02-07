'strict';

const AOC = require('./AOC');

AOC.setDay(13);

const mirrors = AOC.lineSections;

function checkReflection(mirror, row) {
  return Array.from({ length: row + 1 }, (_, offset) => {
    const upper = row - offset;
    const lower = row + offset + 1;

    if (lower >= mirror.length) return 0;

    let mismatchedChars = 0;

    mirror[upper].split('').forEach((c, i) => {
      if (mirror[lower][i] !== c) {
        mismatchedChars += 1;
      }
    });

    return mismatchedChars;
  }).reduce((sum, mismatch) => sum + mismatch, 0);
}

function findMirror(mirror, targetMismatch) {
  for (let r = 0; r < mirror.length - 1; r += 1) {
    const rowMismatch = checkReflection(mirror, r);
    if (rowMismatch === targetMismatch) { return r + 1; }
  }
  return 0;
}

function transpose(matrix) {
  return matrix[0].map((_, i) => matrix.map((row) => row[i]));
}

function findReflectingCol(mirror, mismatch) {
  const flipped = transpose(mirror.map((row) => row.split(''))).map((row) => row.join(''));
  return findMirror(flipped, mismatch);
}

function summarize(mismatch) {
  const rows = mirrors
    .map((mirror) => findMirror(mirror, mismatch))
    .filter(Number)
    .reduce((sum, row) => sum + row, 0);

  const cols = mirrors
    .map((mirror) => findReflectingCol(mirror, mismatch))
    .filter(Number)
    .reduce((sum, col) => sum + col, 0);
  return cols + 100 * rows;
}

AOC.part1(() => summarize(0)); // 37025
AOC.part2(() => summarize(1)); // 36735
