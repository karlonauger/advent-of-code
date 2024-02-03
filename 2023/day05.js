'strict';

const AOC = require('./AOC');

AOC.setDay(5);

AOC.part1(() => {
  const maps = [];

  const seedArray = AOC.lines.shift().split('seeds: ')[1].split(' ');

  AOC.lines.forEach((line) => {
    if (line.length === 0) {
      // Skip empty lines
    } else if (Number.isNaN(Number(line.charAt(0)))) { // Reached new map
      maps.push([]);
    } else {
      const rangeMap = line.split(' ');
      // const destStart = parseFloat(rangeMap[0]);
      // const sourceStart = parseFloat(rangeMap[1]);
      // const rangeLength = parseFloat(rangeMap[2]);
      maps.at(-1).push(rangeMap);
    }
  });

  let minLocation = -1;

  seedArray.forEach((seed) => {
    let tracker = parseFloat(seed);

    maps.forEach((map) => {
      let search = true;
      map.forEach((rangeMap) => {
        if (search) {
          const destStart = parseFloat(rangeMap[0]);
          const sourceStart = parseFloat(rangeMap[1]);
          const rangeLength = parseFloat(rangeMap[2]);

          if (sourceStart <= tracker && tracker <= sourceStart + rangeLength) {
            tracker = tracker - sourceStart + destStart;
            search = false;
          }
        }
      });
    });

    if (minLocation === -1) {
      minLocation = tracker;
    } else if (tracker < minLocation) {
      minLocation = tracker;
    }
  });

  return minLocation; // 535088217
});
