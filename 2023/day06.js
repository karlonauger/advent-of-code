'strict'
const AOC = require('./AOC')

AOC.setDay(6)

AOC.part1(() => {
  var total = -1

  const file_lines = AOC.lines

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

  return total // 219849
});

AOC.part2(() => {
  const file_lines = AOC.lines
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

  return total // 29432455
});
