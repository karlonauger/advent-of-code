'strict';

const AOC = require('./AOC');

AOC.setDay(10);

function buildDistanceMatrix(grid) {
  const directions = [
    { // Down
      x: 0, y: 1, current: ['S', 'F', '7', '|'], next: ['J', 'L', '|'],
    },
    { // Up
      x: 0, y: -1, current: ['S', 'J', 'L', '|'], next: ['F', '7', '|'],
    },
    { // Right
      x: 1, y: 0, current: ['S', 'F', 'L', '-'], next: ['J', '7', '-'],
    },
    { // Left
      x: -1, y: 0, current: ['S', 'J', '7', '-'], next: ['F', 'L', '-'],
    },
  ];

  // Find the starting position
  let start;
  for (let i = 0; i < grid.length; i += 1) {
    for (let j = 0; j < grid[i].length; j += 1) {
      if (grid[i][j] === 'S') {
        start = { x: j, y: i };
        break;
      }
    }
  }

  const queue = [{ x: start.x, y: start.y, distance: 0 }];

  // Initialize distances with -1 (unvisited)
  const distances = Array.from({ length: grid.length }, () => Array(grid[0].length).fill(-1));

  while (queue.length > 0) {
    const { x, y, distance } = queue.shift();

    // Update distance for the current position
    distances[y][x] = distance;

    directions.forEach((dir) => {
      const newX = x + dir.x;
      const newY = y + dir.y;

      // Check if the new position is within bounds and is a valid pipe
      if (
        newX >= 0
        && newY >= 0
        && newX < grid[0].length
        && newY < grid.length
        && dir.current.includes(grid[y][x])
        && dir.next.includes(grid[newY][newX])
      ) {
        // If the new position is unvisited, add it to the queue
        if (distances[newY][newX] === -1) {
          queue.push({ x: newX, y: newY, distance: distance + 1 });
        }
      }
    });
  }

  return distances;
}

function countTrappedCells(grid, distances) {
  // Visit each blank cell and count times pipe passes by before reaching end of grid
  // If odd cell is trapped if even cell is not trapped
  let trappedCells = 0;
  for (let i = 0; i < grid.length; i += 1) {
    for (let j = 0; j < grid[i].length; j += 1) {
      if (distances[i][j] === -1) { // If empty cell
        let pipeCrosses = 0;
        let last = '0';

        // Search to the right of the blank cell
        for (let y = j + 1; y < grid[i].length; y += 1) {
          if (distances[i][y] !== -1) { // If not empty cell
            const cell = grid[i][y];
            // In this input S acts as a |
            if (cell === '|' || cell === 'S') { pipeCrosses += 1; }
            // Pipe is making a turn along the search direction need to learn where it goes next
            if (cell === 'L') { last = 'L'; }
            if (cell === 'F') { last = 'F'; }
            // Resolve Pipe turn
            if (last === 'L') {
              if (cell === 'J') { // Pipe makes a U turn, don't count
                last = '0';
              }
              if (cell === '7') { // Pipe makes an S turn
                last = '0';
                pipeCrosses += 1;
              }
            }
            if (last === 'F') {
              if (cell === '7') { // Pipe makes a U turn, don't count
                last = '0';
              }
              if (cell === 'J') { // Pipe makes an S turn
                last = '0';
                pipeCrosses += 1;
              }
            }
          }
        }
        // If we cross an odd number of pipes on our way out cell is traped
        if (pipeCrosses % 2 === 1) {
          trappedCells += 1;
        }
      }
    }
  }

  return trappedCells;
}

const grid = AOC.lines;
const distances = buildDistanceMatrix(grid);

AOC.part1(() => {
  // Find the maximum distance in the distances array
  let maxDistance = 0;
  for (let i = 0; i < distances.length; i += 1) {
    for (let j = 0; j < distances[i].length; j += 1) {
      if (distances[i][j] > maxDistance) {
        maxDistance = distances[i][j];
      }
    }
  }
  return maxDistance;
}); // 7093

AOC.part2(() => countTrappedCells(grid, distances)); // 407
