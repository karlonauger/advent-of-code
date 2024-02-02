'strict'
const AOC = require('./AOC')

AOC.setDay(2)

const cubes = { red: 12, green: 13, blue: 14 }

AOC.part1(() => {
  var total = 0;
  var game = 0;

  AOC.lines.forEach((line) => {
    game++
    var valid = true

    var sets = line.split(': ')[1].split('; ')
    sets.forEach((set) => {
      var spheres = set.split(', ')
      spheres.forEach((sphere) => {
        var [count, color] = sphere.split(" ")

        if (!(count <= cubes[color])) {
          // Fail
          valid = false
        }
      })
    });

    if (valid) {
      total += game
    }
  });

  return total
});

AOC.part2(() => {
  var total = 0;

  AOC.lines.forEach((line) => {
    var cubes = { red: 0, green: 0, blue: 0 }
    var sets = line.split(': ')[1].split('; ')

    sets.forEach((set) => {
      var spheres = set.split(', ')

      spheres.forEach((sphere) => {
        var [count, color] = sphere.split(" ")
        
        if (cubes[color] < count) {
          cubes[color] = parseFloat(count)
        }
      })
    });

    total += Object.values(cubes).reduce((a, b) => a * b);
  });
  
  return total
});
