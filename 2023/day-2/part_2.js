'strict'
const fs = require('fs');
const path = require('path');

const input_path = path.join(__dirname, '/input.txt')
fs.readFile(input_path, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  var total = 0;
  const data_array = data.split('\n')

  data_array.forEach((line) => {
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

  console.log(total) // 69110
});