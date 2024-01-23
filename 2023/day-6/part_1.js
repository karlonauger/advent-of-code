'strict'
const fs = require('fs');
const path = require('path');

const file_name = 'input.txt'
const input_path = path.join(__dirname, file_name)

fs.readFile(input_path, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  var total = -1

  const file_lines = data.split('\n')

  const time_array = file_lines.shift().split("Time:      ")[1].split(" ").filter(n => n)
  const distance_array = file_lines.shift().split("Distance:  ")[1].split(" ").filter(n => n)

  for (i = 0; i < time_array.length; i++) {
    const time = parseFloat(time_array[i])
    const distance = parseFloat(distance_array[i])

    var wins = 0

    for (t = 0; t <= time; t++) {
      if (distance < ((time - t) * t)) {
        wins++
      }
    }

    if (total == -1) {
      total = wins
    } else {
      total *= wins
    }
  }

  console.log(total) // 219849
});