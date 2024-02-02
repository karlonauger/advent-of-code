'strict'
const AOC = require('./AOC')

AOC.setDay(10)

const map = new Map()
map.set("up")
map.set("up|", "up")
map.set("up7", "left")
map.set("upF", "rigt")
map.set("down|", "down")
map.set("downJ", "left")
map.set("downL", "rigt")
map.set("left-", "left")
map.set("leftF", "down")
map.set("leftL", "up")
map.set("right-", "right")
map.set("right7", "down")
map.set("leftJ", "up")

function follow(matrix, location, direction) {
  if (direction == "up") {
    const new_location = [location[0] - 1, location[1]]
    const new_pipe = matrix(new_location[0], new_location[1])
    if (new_pipe == "|") {
      follow(matrix, new_location, "up")
    } else if (new_pipe == "7") {
      follow(matrix, new_location, "up")
    } else if (new_pipe == "7") {
      follow(matrix, new_location, "up")
    }
  } else if (offset[0] == -1 && ["|", "7", "F"].includes(neighbor)) { // Up
    follow(pipe_matrix, start_location, "up")
  } else if (offset[0] == 1 && ["|", "J", "L"].includes(neighbor)) { // Down
    follow(pipe_matrix, start_location, "down")
  } else if (offset[1] == -1 && ["-", "L", "F"].includes(neighbor)) { // Left
    follow(pipe_matrix, start_location, "left")
  } else if (["-", "J", "7"].includes(neighbor)) { // Right
    follow(pipe_matrix, start_location, "right")
  }
}

AOC.part1(() => {
  // build matrix graph
  
  const pipe_matrix = AOC.lines.map((line) => {
    return line.split("")
  })

  var start_location = [0,0]
  pipe_matrix.forEach((row, row_index) => {
    row.forEach((item, col_index) => {
      if (item == "S") {
        start_location = [row_index, col_index]
      }
    })
  })
  console.log(start_location)

  const offsets = [[-1,0],[1,0],[0,-1],[0,1]]
  offsets.forEach((offset) => {
    const r = start_location[0] + offset[0]
    const c = start_location[1] + offset[1]
    if (0 <= r && r < pipe_matrix.length && 0 <= c && c < pipe_matrix[0].length) {
      neighbor = pipe_matrix(r,c)
      if (offset[0] == -1 && ["|", "7", "F"].includes(neighbor)) { // Up
        follow(pipe_matrix, start_location, "up")
      } else if (offset[0] == 1 && ["|", "J", "L"].includes(neighbor)) { // Down
        follow(pipe_matrix, start_location, "down")
      } else if (offset[1] == -1 && ["-", "L", "F"].includes(neighbor)) { // Left
        follow(pipe_matrix, start_location, "left")
      } else if (["-", "J", "7"].includes(neighbor)) { // Right
        follow(pipe_matrix, start_location, "right")
      }
    }
  })
  
  
  for (r = 0; r < 3; r++) {
    for (c = 0; c < 3; c++) {
      //if (["|", "7", "F"].includes(pipe_matrix(r,c))
    }  
  }

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

  return count // 14893
});

// 10000 - 692677 
