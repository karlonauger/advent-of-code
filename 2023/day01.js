'strict'
const AOC = require('./AOC');

AOC.setDay(1);

const numberWordsMap = {
  "one": 1,
  "two": 2,
  "three": 3,
  "four": 4,
  "five": 5,
  "six": 6,
  "seven": 7,
  "eight": 8,
  "nine": 9,
};

function findNum(line, location, isStart, isSimple) {
  var c = line.charAt(location);
  if (!isNaN(parseFloat(c))) {
    return c;
  }

  if (isSimple) {
    return null;
  }

  for (const word in numberWordsMap) {
    if ((isStart && line.startsWith(word, location)) || (!isStart && line.endsWith(word, location+1))) {
      return numberWordsMap[word];
    }
  }

  return null;
}

function findFirst(line, isSimple) {
  for (var i = 0; i < line.length; i++) {
    var found = findNum(line, i, true, isSimple);
    if (found !== null) {
      return found;
    }
  }
}

function findLast(line, isSimple) {
  for (var i = line.length - 1; i >= 0; i--) {
    var found = findNum(line, i, false, isSimple);
    if (found !== null) {
      return found;
    }
  }
}

function sumLines(isSimple) {
  var total = 0

  AOC.lines.forEach((line) => {
    var first = findFirst(line, isSimple);
    var last = findLast(line, isSimple);

    total += parseFloat(`${first}${last}`);
  });

  return total;
}

AOC.part1(() => { return sumLines(true) });  // 53974
AOC.part2(() => { return sumLines(false) }); // 52840
