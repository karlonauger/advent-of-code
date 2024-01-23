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
  var maps = []

  const file_lines = data.split('\n')

  const seed_array = file_lines.shift().split("seeds: ")[1].split(" ")
  console.log(seed_array)

  file_lines.forEach((line) => { 
    console.log(line)

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

  console.log(maps)

  var min_location = -1

  seed_array.forEach((seed) => {
    console.log(`seed: ${seed}`)
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

      console.log(`Tracker: ${tracker}`)
    })
    
    if (min_location == -1) {
      min_location = tracker
    } else if (tracker < min_location) {
      min_location = tracker
    }
  })

  console.log(min_location) // 535088217
});