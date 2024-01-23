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

  const file_lines = data.split('\n')
  // time: 44707080
  const time = parseFloat(file_lines.shift().split("Time:      ")[1].replaceAll(" ", ""))
  const distance = parseFloat(file_lines.shift().split("Distance:  ")[1].replaceAll(" ", ""))

  var total = 0

  for (t = 0; t <= time; t++) { // Brute Force approach worked with time = 44707080
    //console.log(`d: ${distance} t: ${time} : ${(time - t) * t} : ${distance < ((time - t) * t)}`)
    if (distance <= ((time - t) * t)) {
      total++
    }
  }

  console.log(total) // 29432455
});