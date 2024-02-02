'strict'
const AOC = require('./AOC')

AOC.setDay(4)

AOC.part1(() => {
  var total = 0

  AOC.lines.forEach((line) => { 
    var line_total = 0
    const [winning_nums, my_nums] = line.split(": ")[1].split(" | ").map((nums) => nums.split(" ").filter(n => n))

    winning_nums.forEach((winning_num) => {
      if (my_nums.find((item) => item == winning_num)) {
        line_total = line_total == 0 ? 1 : line_total * 2
      }
    });

    total += line_total
  });

  return total // 21959
});

AOC.part2(() => {
  var total = 0;
  var results_array = []

  // Need to run in reverse to because later results accumulate up
  AOC.lines.reverse().forEach((line) => { 
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

  return total // 5132675
});
