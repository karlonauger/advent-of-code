'strict'
const AOC = require('./AOC')

AOC.setDay(1)

AOC.part1(() => {
  var total = 0

  AOC.lines.forEach((item_string) => {
    var first = 0
    var last = 0

    for (var i = 0; i < item_string.length; i++) {
      var c = item_string.charAt(i);
      if (!isNaN(parseFloat(c))) {
        first = c
        break
      }
    }
    for (var i = item_string.length - 1; i >= 0; i--) {
      var c = item_string.charAt(i);
      if (!isNaN(parseFloat(c))) {
        last = c
        break
      }
    }
    total += parseFloat(`${first}${last}`)
  });

  return total
});

AOC.part2(() => {
  var total = 0;

  AOC.lines.forEach((item_string) => {
    var first = 0
    var last = 0

    for (var i = 0; i < item_string.length; i++) {
      var c = item_string.charAt(i);
      if (!isNaN(parseFloat(c))) {
        first = c
        break
      } else if (item_string.startsWith("one", i)) {
        first = 1
        break
      } else if (item_string.startsWith("two", i)) {
        first = 2
        break
      } else if (item_string.startsWith("three", i)) {
        first = 3
        break
      } else if (item_string.startsWith("four", i)) {
        first = 4
        break
      } else if (item_string.startsWith("five", i)) {
        first = 5
        break
      } else if (item_string.startsWith("six", i)) {
        first = 6
        break
      } else if (item_string.startsWith("seven", i)) {
        first = 7
        break
      } else if (item_string.startsWith("eight", i)) {
        first = 8
        break
      } else if (item_string.startsWith("nine", i)) {
        first = 9
        break
      }
    }
    for (var i = item_string.length - 1; i >= 0; i--) {
      var c = item_string.charAt(i);
      if (!isNaN(parseFloat(c))) {
        last = c
        break
      } else if (item_string.endsWith("one", i+1)) {
        last = 1
        break
      } else if (item_string.endsWith("two", i+1)) {
        last = 2
        break
      } else if (item_string.endsWith("three", i+1)) {
        last = 3
        break
      } else if (item_string.endsWith("four", i+1)) {
        last = 4
        break
      } else if (item_string.endsWith("five", i+1)) {
        last = 5
        break
      } else if (item_string.endsWith("six", i+1)) {
        last = 6
        break
      } else if (item_string.endsWith("seven", i+1)) {
        last = 7
        break
      } else if (item_string.endsWith("eight", i+1)) {
        last = 8
        break
      } else if (item_string.endsWith("nine", i+1)) {
        last = 9
        break
      }
    }

    total += parseFloat(`${first}${last}`)
  });
  
  return total
});
