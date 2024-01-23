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
  file_lines.shift()

  // build graph
  const map = new Map()
  var current_nodes = [] // AAA LQA SGA BJA SVA GFA 
  const ending_nodes = [] // ZZZ QXZ LHZ QNZ FBZ BRZ
  // Need to find Least common factor

  file_lines.forEach((line) => {
    const [node, left_right] = line.split(" = ")
    const [left, right] = left_right.replace("(", "").replace(")", "").split(", ")
    
    map.set(node, [left, right])

    if (node.charAt(2) == "A") {
      current_nodes.push(node)
      
    }
    if (node.charAt(2) == "Z")
      ending_nodes.push(node)
  })

  var searching = true
  var count = 0

  var found = new Map()

  while (searching) {
    for (let i = 0; i < directions.length; i++) {
      const direction = directions.charAt(i)
      
      count ++

      all_matched = true
      found = 0
      //console.log(`${count} : ${current_nodes}`)

      current_nodes = current_nodes.map((current_node) => {
        const left_right_array = map.get(current_node)
        current_node = direction == "L" ? left_right_array[0] : left_right_array[1]

        if (!ending_nodes.includes(current_node)) {
          all_matched = false
        } else {
          found++
        }

        return current_node
      })

      if (2 < found) {
        console.log(`${count} : ${found} : ${current_nodes}`)
      }

      if (all_matched == true) { 
        searching = false
        break
      }
    }
  }

  console.log(count) // 219849
});

// 100 000 000 - 1 000 000 000