'strict'
const AOC = require('./AOC')

AOC.setDay(3)

function search(data_matrix, row, col) {
  const search_offset = [-1, 0, 1]

  var is_part = false
  var part_num = '.'

  if (!(0 <= col && col < data_matrix[0].length)) { // Invalid Row
    return [part_num, is_part] 
  }

  search_offset.forEach((row_offset) => { // Top, mid, bottom
    const search_row = row + row_offset
    
    if (0 <= search_row && search_row < data_matrix.length) {
      const search_item = data_matrix[search_row][col]
      // console.log(`search ${search_item}: ${search_row} - ${col}`)

      if (search_item != '.' && isNaN(parseFloat(search_item))) {
        // console.log(`${search_item} is symbol`)
        is_part = true
      }

      if (!isNaN(parseFloat(search_item))) {
        part_num = search_item
      }
    }
  });

  return [part_num, is_part]
}

function search2(data_matrix, row, col) {
  const search_offset = [-1, 0, 1]

  var is_gear_part = false
  var gear_location = "n:a"
  var part_num = '.'

  if (!(0 <= col && col < data_matrix[0].length)) { // Invalid Row
    return [part_num, is_gear_part, gear_location] 
  }

  search_offset.forEach((row_offset) => { // Top, mid, bottom
    const search_row = row + row_offset
    
    if (0 <= search_row && search_row < data_matrix.length) {
      const search_item = data_matrix[search_row][col]
      
      if (search_item == '*') {
        is_gear_part = true
        gear_location = `${search_row}:${col}`
      }

      if (!isNaN(parseFloat(search_item))) {
        part_num = search_item
      }
    }
  });

  return [part_num, is_gear_part, gear_location]
}

AOC.part1(() => {
  var total = 0;

  const data_matrix = AOC.lines
  data_matrix.forEach((line, index) => { 
    data_matrix[index] = line.split('')
  });

  const search_offset = [-1, 0, 1]

  var skip_cols = 0

  data_matrix.forEach((row, row_index) => { 
    row.forEach((item, col_index) => { 
      if (skip_cols != 0) { // Skip parts nums that have already been searched by previous num
        skip_cols --
      } else if (!isNaN(parseFloat(item))) { // If item is a number then search
        var is_part = false
        var part_num = item

        // Search left
        is_part = is_part || search(data_matrix, row_index, col_index - 1)[1]
        // Search current
        is_part = is_part || search(data_matrix, row_index, col_index)[1]
        // Search right until done no more numbers
        var search_right = true
        var search_col = col_index + 1
        while (search_right) {
          const [found_part_num, found_is_part] = search(data_matrix, row_index, search_col)
          is_part = is_part || found_is_part

          // Found num: Add to part num and search farther, skip future part search
          if (!isNaN(parseFloat(found_part_num))) {
            part_num += found_part_num
            search_col ++ 
            skip_cols ++
          } else {
            search_right = false // Stop searching right
          }
        }

        if (is_part) {
          total += parseFloat(part_num)
        }
      }
    });
  });

  return total // 529618
});

AOC.part2(() => {
  var total = 0
  var gears = {}

  const data_matrix = AOC.lines
  data_matrix.forEach((line, index) => { 
    data_matrix[index] = line.split('')
  });

  var skip_cols = 0

  data_matrix.forEach((row, row_index) => { 
    row.forEach((item, col_index) => { 
      if (skip_cols != 0) { // Skip parts nums that have already been searched by previous num
        skip_cols --
      } else if (!isNaN(parseFloat(item))) { // If item is a number then search
        var is_gear_part = false
        var gear_location = "n:a"
        var part_num = item

        // Search left
        const left_search = search2(data_matrix, row_index, col_index - 1)
        if (left_search[1]) {
          is_gear_part = true
          gear_location = left_search[2]
        }
        // Search current
        const mid_search = search2(data_matrix, row_index, col_index)
        if (mid_search[1]) {
          is_gear_part = true
          gear_location = mid_search[2]
        }
        // Search right until done no more numbers
        var search_right = true
        var search_col = col_index + 1
        while (search_right) {
          const [found_part_num, found_is_gear_part, found_gear_location] = search2(data_matrix, row_index, search_col)
          if (found_is_gear_part) {
            is_gear_part = true
            gear_location = found_gear_location
          }

          // Found num: Add to part num and search farther, skip future part search
          if (!isNaN(parseFloat(found_part_num))) {
            part_num += found_part_num
            search_col ++ 
            skip_cols ++
          } else {
            search_right = false // Stop searching right
          }
        }

        if (is_gear_part) {
          if (gears[gear_location]) {
            total += parseFloat(part_num) * parseFloat(gears[gear_location])
          } else {
            gears[gear_location] = part_num
          }
        }
      }
    });
  });

  return total // 77509019
});
