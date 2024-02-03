'strict';

const AOC = require('./AOC');

AOC.setDay(10);

const map = new Map();
map.set('up');
map.set('up|', 'up');
map.set('up7', 'left');
map.set('upF', 'rigt');
map.set('down|', 'down');
map.set('downJ', 'left');
map.set('downL', 'rigt');
map.set('left-', 'left');
map.set('leftF', 'down');
map.set('leftL', 'up');
map.set('right-', 'right');
map.set('right7', 'down');
map.set('leftJ', 'up');

function follow(matrix, location, direction) {
  if (direction === 'up') {
    const newLocation = [location[0] - 1, location[1]];
    const newPipe = matrix(newLocation[0], newLocation[1]);
    if (newPipe === '|') {
      follow(matrix, newLocation, 'up');
    } else if (newPipe === '7') {
      follow(matrix, newLocation, 'up');
    } else if (newPipe === '7') {
      follow(matrix, newLocation, 'up');
    }
  } else if (offset[0] === -1 && ['|', '7', 'F'].includes(neighbor)) { // Up
    follow(pipeMatrix, startLocation, 'up');
  } else if (offset[0] === 1 && ['|', 'J', 'L'].includes(neighbor)) { // Down
    follow(pipeMatrix, startLocation, 'down');
  } else if (offset[1] === -1 && ['-', 'L', 'F'].includes(neighbor)) { // Left
    follow(pipeMatrix, startLocation, 'left');
  } else if (['-', 'J', '7'].includes(neighbor)) { // Right
    follow(pipeMatrix, startLocation, 'right');
  }
}

AOC.part1(() => {
  // build matrix graph

  const pipeMatrix = AOC.lines.map((line) => line.split(''));

  let startLocation = [0, 0];
  pipeMatrix.forEach((row, rowIndex) => {
    row.forEach((item, colIndex) => {
      if (item === 'S') {
        startLocation = [rowIndex, colIndex];
      }
    });
  });
  console.log(startLocation);

  const offsets = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  offsets.forEach((offset) => {
    const r = startLocation[0] + offset[0];
    const c = startLocation[1] + offset[1];
    if (r >= 0 && r < pipeMatrix.length && c >= 0 && c < pipeMatrix[0].length) {
      const neighbor = pipeMatrix(r, c);
      if (offset[0] === -1 && ['|', '7', 'F'].includes(neighbor)) { // Up
        follow(pipeMatrix, startLocation, 'up');
      } else if (offset[0] === 1 && ['|', 'J', 'L'].includes(neighbor)) { // Down
        follow(pipeMatrix, startLocation, 'down');
      } else if (offset[1] === -1 && ['-', 'L', 'F'].includes(neighbor)) { // Left
        follow(pipeMatrix, startLocation, 'left');
      } else if (['-', 'J', '7'].includes(neighbor)) { // Right
        follow(pipeMatrix, startLocation, 'right');
      }
    }
  });

  for (let r = 0; r < 3; r += 1) {
    for (let c = 0; c < 3; c += 1) {
      // if (["|", "7", "F"].includes(pipeMatrix(r,c))
    }
  }

  let searching = true;
  let currentNode = firstNode;
  let count = 0;

  while (searching) {
    for (let i = 0; i < directions.length; i += 1) {
      const direction = directions.charAt(i);
      const leftRightArray = map.get(currentNode);

      currentNode = direction === 'L' ? leftRightArray[0] : leftRightArray[1];

      count += 1;

      console.log(`${count} : ${currentNode} : ${direction}`);
      if (currentNode === 'ZZZ') {
        searching = false;
        break;
      }
    }
  }

  return count; // 14893
});

// 10000 - 692677
