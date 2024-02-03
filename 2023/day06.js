'strict';

const AOC = require('./AOC');

AOC.setDay(6);

AOC.part1(() => {
  let total = -1;

  const fileLines = AOC.lines;

  const timeArray = fileLines.shift().split('Time:      ')[1].split(' ').filter((n) => n);
  const distanceArray = fileLines.shift().split('Distance:  ')[1].split(' ').filter((n) => n);

  for (let i = 0; i < timeArray.length; i += 1) {
    const time = parseFloat(timeArray[i]);
    const distance = parseFloat(distanceArray[i]);

    let wins = 0;

    for (let t = 0; t <= time; t += 1) {
      if (distance < ((time - t) * t)) {
        wins += 1;
      }
    }

    if (total === -1) {
      total = wins;
    } else {
      total *= wins;
    }
  }

  return total; // 219849
});

AOC.part2(() => {
  const fileLines = AOC.lines;
  const time = parseFloat(fileLines.shift().split('Time:      ')[1].replaceAll(' ', ''));
  const distance = parseFloat(fileLines.shift().split('Distance:  ')[1].replaceAll(' ', ''));

  let total = 0;

  for (let t = 0; t <= time; t += 1) {
    if (distance <= ((time - t) * t)) {
      total += 1;
    }
  }

  return total; // 29432455
});
