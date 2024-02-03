'strict';

const AOC = require('./AOC');

AOC.setDay(1);

const numberWordsMap = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

function findNum(line, loc, isStart, isSimple) {
  const c = line.charAt(loc);
  if (!Number.isNaN(Number(c))) {
    return c;
  }

  const foundWord = Object.keys(numberWordsMap)
    .find((word) => (isStart && line.startsWith(word, loc))
      || (!isStart && line.endsWith(word, loc + 1)));

  if (foundWord && isSimple) {
    return numberWordsMap[foundWord];
  }
  return null;
}

function findFirst(line, isSimple) {
  for (let i = 0; i < line.length; i += 1) {
    const found = findNum(line, i, true, isSimple);
    if (found !== null) {
      return found;
    }
  }
  return null;
}

function findLast(line, isSimple) {
  for (let i = line.length - 1; i >= 0; i -= 1) {
    const found = findNum(line, i, false, isSimple);
    if (found !== null) {
      return found;
    }
  }
  return null;
}

function sumLines(isSimple) {
  let total = 0;

  AOC.lines.forEach((line) => {
    const first = findFirst(line, isSimple);
    const last = findLast(line, isSimple);

    total += parseFloat(`${first}${last}`);
  });

  return total;
}

AOC.part1(() => sumLines(true)); // 53974
AOC.part2(() => sumLines(false)); // 52840
