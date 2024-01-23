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
  const directions = file_lines.shift()
  var first_node = "AAA"
  file_lines.shift()

  // build graph
  const map = new Map()

  file_lines.forEach((line) => {
    const [node, left_right] = line.split(" = ")
    const [left, right] = left_right.replace("(", "").replace(")", "").split(", ")
    
    map.set(node, [left, right])

  })

  var searching = true
  var current_node = first_node
  var count = 0

  while (searching) {
    for (let i = 0; i < directions.length; i++) {
      const direction = directions.charAt(i)
      const left_right_array = map.get(current_node)
      
      current_node = direction == "L" ? left_right_array[0] : left_right_array[1]

      count ++

      console.log(`${count} : ${current_node} : ${direction}`)
      if (current_node == "ZZZ") {
        searching = false
        break
      }
    }
  }

  console.log(count) // 14893
});
