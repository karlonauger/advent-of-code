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
  var total = 0;

  const data_matrix = data.split('\n')

  data_matrix.forEach((line) => { 
    var line_total = 0
    const [winning_nums, my_nums] = line.split(": ")[1].split(" | ").map((nums) => nums.split(" ").filter(n => n))

    winning_nums.forEach((winning_num) => {
      if (my_nums.find((item) => item == winning_num)) {
        line_total = line_total == 0 ? 1 : line_total * 2
      }
    });

    total += line_total
  });

  console.log(total) // 21959
});