'strict'
const AOC = require('./AOC')

AOC.setDay(5)

AOC.part1(() => {
  var maps = []

  const seed_array = AOC.lines.shift().split("seeds: ")[1].split(" ")

  AOC.lines.forEach((line) => { 
    if (line.length == 0) {
      //Skip empty lines
    } else if (isNaN(parseFloat(line.charAt(0)))) { // Reached new map
      maps.push([])
    } else {
      const range_map = line.split(" ")
      const dest_start = parseFloat(range_map[0])
      const source_start = parseFloat(range_map[1])
      const range_length = parseFloat(range_map[2])
      maps.at(-1).push(range_map)
    }
  });

  var min_location = -1

  seed_array.forEach((seed) => {
    var tracker = parseFloat(seed)

    maps.forEach((map) => {
      var search = true
      map.forEach((range_map) => {
        if (search) {
          const dest_start = parseFloat(range_map[0])
          const source_start = parseFloat(range_map[1])
          const range_length = parseFloat(range_map[2])
  
          if (source_start <= tracker && tracker <= source_start + range_length) {
            tracker = tracker - source_start + dest_start
            search = false
          }
        }
      })
    })
    
    if (min_location == -1) {
      min_location = tracker
    } else if (tracker < min_location) {
      min_location = tracker
    }
  })

  return min_location // 535088217
});
