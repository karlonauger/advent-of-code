'strict'
const fs = require('fs');
const path = require('path');

const input_path = path.join(__dirname, '/input.txt')
fs.readFile(input_path, 'utf8', (err, data_string) => {
  if (err) {
    console.error(err);
    return;
  }
  var total = 0;

  const data_array = data_string.split('\n')
  data_array.forEach((item_string) => {
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
  console.log(total)
});