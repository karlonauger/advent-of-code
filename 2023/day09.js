'strict';

const AOC = require('./AOC');

AOC.setDay(9);

function extrapolateExtremes(values) {
  const differences = [];

  for (let i = 0; i < values.length - 1; i += 1) {
    differences.push(values[i + 1] - values[i]);
  }

  if (differences.every((diff) => diff === 0)) {
    return [values[0], values[values.length - 1]];
  }
  const [prevDiff, nextDiff] = extrapolateExtremes(differences);

  return [
    values[0] - prevDiff,
    values[values.length - 1] + nextDiff,
  ];
}

const histories = AOC.lines.map((line) => line.split(' ').map(Number));
const extrapolated = histories.map((h) => extrapolateExtremes(h));

AOC.part1(() => extrapolated.reduce((acc, val) => acc + val[1], 0)); // 2038472161
AOC.part2(() => extrapolated.reduce((acc, val) => acc + val[0], 0)); // 1091
