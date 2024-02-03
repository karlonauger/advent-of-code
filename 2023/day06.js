'strict';

const AOC = require('./AOC');

AOC.setDay(6);

const times = AOC.lines[0].split(/\s+/).slice(1).map(Number);
const distances = AOC.lines[1].split(/\s+/).slice(1).map(Number);

AOC.part1(() => {
  let total = -1;

  for (let i = 0; i < times.length; i += 1) {
    const time = times[i];
    const distance = distances[i];

    let wins = 0;

    for (let t = 0; t <= time; t += 1) {
      if (distance < ((time - t) * t)) {
        wins += 1;
      }
    }

    total = (total === -1) ? wins : total * wins;
  }

  return total; // 219849
});

AOC.part2(() => {
  const time = times.join('');
  const distance = distances.join('');

  let total = 0;

  for (let t = 0; t <= time; t += 1) {
    if (distance <= ((time - t) * t)) {
      total += 1;
    }
  }

  return total; // 29432455
});
