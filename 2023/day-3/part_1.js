'strict'
const fs = require('fs');
const path = require('path');

const file_name = 'input.txt'

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

const input_path = path.join(__dirname, file_name)
fs.readFile(input_path, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  var total = 0;

  const data_matrix = data.split('\n')
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

  console.log(total) // 529618
});