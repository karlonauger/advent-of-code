'strict';

const AOC = require('./AOC');

AOC.setDay(4);

AOC.part1(() => {
  let total = 0;

  AOC.lines.forEach((line) => {
    let lineTotal = 0;
    const [winningNums, myNums] = line.split(': ')[1].split(' | ').map((nums) => nums.split(' ').filter((n) => n));

    winningNums.forEach((winningNum) => {
      if (myNums.find((item) => item === winningNum)) {
        lineTotal = lineTotal === 0 ? 1 : lineTotal * 2;
      }
    });

    total += lineTotal;
  });

  return total; // 21959
});

AOC.part2(() => {
  let total = 0;
  const resultsArray = [];

  // Need to run in reverse to because later results accumulate up
  AOC.lines.reverse().forEach((line) => {
    let lineTotal = 1;
    let totalWins = 0;

    // Parse Line
    const [winningNums, myNums] = line.split(': ')[1].split(' | ').map((nums) => nums.split(' ').filter((n) => n));

    // Sum total matches
    winningNums.forEach((winningNum) => {
      if (myNums.find((item) => item === winningNum)) {
        totalWins += 1;
      }
    });

    // Sum wins of previous cards won
    if (totalWins > 0) {
      lineTotal += resultsArray.slice(totalWins * -1).reduce((acc, item) => acc + item);
    }
    resultsArray.push(lineTotal); // Record for later summing

    total += lineTotal;
  });

  return total; // 5132675
});
