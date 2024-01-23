'strict'
const fs = require('fs');
const path = require('path');

const cubes = { red: 12, green: 13, blue: 14 }

const input_path = path.join(__dirname, '/input.txt')
fs.readFile(input_path, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  var total = 0;

  var game = 0;
  const data_array = data.split('\n')
  data_array.forEach((line) => {
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

  console.log(total) // 2810
});