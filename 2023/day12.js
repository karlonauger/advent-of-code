'strict';

const AOC = require('./AOC');

AOC.setDay(12);

function isValidArrangement(row, expectedDamagedGroups) {
  // Check if the arrangement satisfies the damagedGroups criteria
  const damagedGroups = [0];
  for (let i = 0; i < row.length; i += 1) {
    if (row[i] === '#') {
      damagedGroups[damagedGroups.length - 1] += 1;
    }
    if (row[i] === '.' && damagedGroups[damagedGroups.length - 1] !== 0) {
      damagedGroups.push(0);
    }
  }

  if (damagedGroups[damagedGroups.length - 1] === 0) { damagedGroups.pop(); }

  return JSON.stringify(damagedGroups) === JSON.stringify(expectedDamagedGroups);
}

function countArrangements(row, damagedGroups) {
  let count = 0;

  function dfs(currentRow) {
    const index = currentRow.indexOf('?');
    if (index === -1) {
      // All damaged groups have been filled, check if the arrangement is valid
      if (isValidArrangement(currentRow, damagedGroups)) {
        count += 1;
      }
      return;
    }

    // Replace the damaged group at the current index with operational springs
    dfs(`${currentRow.substring(0, index)}.${currentRow.substring(index + 1)}`);

    // Replace the damaged group at the current index with broken springs
    dfs(`${currentRow.substring(0, index)}#${currentRow.substring(index + 1)}`);
  }

  dfs(row);

  return count;
}

function calculateTotalArrangements(rows) {
  let totalArrangements = 0;

  rows.forEach((row) => {
    const [springRow, damagedGroupsStr] = row.split(' ');
    const damagedGroups = damagedGroupsStr.split(',').map(Number);

    totalArrangements += countArrangements(springRow, damagedGroups);
  });

  return totalArrangements;
}

AOC.part1(() => calculateTotalArrangements(AOC.lines)); // 8180
