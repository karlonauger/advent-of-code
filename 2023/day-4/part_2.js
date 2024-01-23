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
  var results_array = []

  const data_matrix = data.split('\n')

  // Need to run in reverse to because later results accumulate up
  data_matrix.reverse().forEach((line) => { 
    var line_total = 1
    var total_wins = 0

    // Parse Line
    const [winning_nums, my_nums] = line.split(": ")[1].split(" | ").map((nums) => nums.split(" ").filter(n => n))

    // Sum total matches
    winning_nums.forEach((winning_num) => {
      if (my_nums.find((item) => item == winning_num)) {
        total_wins++
      }
    });

    // Sum wins of previous cards won
    if (total_wins > 0) {
      line_total += results_array.slice(total_wins * -1).reduce((acc, item) => acc + item)
    }
    results_array.push(line_total) // Record for later summing

    total += line_total
  });

  console.log(total) // 5132675
});