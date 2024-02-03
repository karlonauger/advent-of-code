'strict';

const AOC = require('./AOC');

AOC.setDay(2);

AOC.part1(() => {
  const cubes = { red: 12, green: 13, blue: 14 };
  let total = 0;
  let game = 0;

  AOC.lines.forEach((line) => {
    game += 1;
    let valid = true;

    const sets = line.split(': ')[1].split('; ');
    sets.forEach((set) => {
      const spheres = set.split(', ');
      spheres.forEach((sphere) => {
        const [count, color] = sphere.split(' ');

        if (!(count <= cubes[color])) {
          // Fail
          valid = false;
        }
      });
    });

    if (valid) {
      total += game;
    }
  });

  return total;
});

AOC.part2(() => {
  const cubes = { red: 0, green: 0, blue: 0 };
  let total = 0;

  AOC.lines.forEach((line) => {
    const sets = line.split(': ')[1].split('; ');

    sets.forEach((set) => {
      const spheres = set.split(', ');

      spheres.forEach((sphere) => {
        const [count, color] = sphere.split(' ');

        if (cubes[color] < count) {
          cubes[color] = parseFloat(count);
        }
      });
    });

    total += Object.values(cubes).reduce((a, b) => a * b);
  });

  return total;
});
