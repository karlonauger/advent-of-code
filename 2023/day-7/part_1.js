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

  file_lines.foreach((line) => {
    const [hand, bid] = line.split(" ")


  })

  console.log(total) // 219849
});