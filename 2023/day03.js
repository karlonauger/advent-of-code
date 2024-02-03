'strict';

const AOC = require('./AOC');

AOC.setDay(3);

function search(dataMatrix, row, col) {
  const searchOffset = [-1, 0, 1];

  let isPart = false;
  let partNum = '.';

  if (!(col >= 0 && col < dataMatrix[0].length)) { // Invalid Row
    return [partNum, isPart];
  }

  searchOffset.forEach((rowOffset) => { // Top, mid, bottom
    const searchRow = row + rowOffset;

    if (searchRow >= 0 && searchRow < dataMatrix.length) {
      const searchItem = dataMatrix[searchRow][col];

      if (searchItem !== '.' && Number.isNaN(Number(searchItem))) {
        isPart = true;
      }

      if (!Number.isNaN(Number(searchItem))) {
        partNum = searchItem;
      }
    }
  });

  return [partNum, isPart];
}

function search2(dataMatrix, row, col) {
  const searchOffset = [-1, 0, 1];

  let isGearPart = false;
  let gearLocation = 'n:a';
  let partNum = '.';

  if (!(col >= 0 && col < dataMatrix[0].length)) { // Invalid Row
    return [partNum, isGearPart, gearLocation];
  }

  searchOffset.forEach((rowOffset) => { // Top, mid, bottom
    const searchRow = row + rowOffset;

    if (searchRow >= 0 && searchRow < dataMatrix.length) {
      const searchItem = dataMatrix[searchRow][col];

      if (searchItem === '*') {
        isGearPart = true;
        gearLocation = `${searchRow}:${col}`;
      }

      if (!Number.isNaN(Number(searchItem))) {
        partNum = searchItem;
      }
    }
  });

  return [partNum, isGearPart, gearLocation];
}

AOC.part1(() => {
  let total = 0;

  const dataMatrix = AOC.lines;
  dataMatrix.forEach((line, index) => {
    dataMatrix[index] = line.split('');
  });

  let skipCols = 0;

  dataMatrix.forEach((row, rowIndex) => {
    row.forEach((item, colIndex) => {
      if (skipCols !== 0) { // Skip parts nums that have already been searched by previous num
        skipCols -= 1;
      } else if (!Number.isNaN(Number(item))) { // If item is a number then search
        let isPart = false;
        let partNum = item;

        // Search left
        isPart = isPart || search(dataMatrix, rowIndex, colIndex - 1)[1];
        // Search current
        isPart = isPart || search(dataMatrix, rowIndex, colIndex)[1];
        // Search right until done no more numbers
        let searchRight = true;
        let searchCol = colIndex + 1;
        while (searchRight) {
          const [foundPartNum, foundIsPart] = search(dataMatrix, rowIndex, searchCol);
          isPart = isPart || foundIsPart;

          // Found num: Add to part num and search farther, skip future part search
          if (!Number.isNaN(Number(foundPartNum))) {
            partNum += foundPartNum;
            searchCol += 1;
            skipCols += 1;
          } else {
            searchRight = false; // Stop searching right
          }
        }

        if (isPart) {
          total += parseFloat(partNum);
        }
      }
    });
  });

  return total; // 529618
});

AOC.part2(() => {
  let total = 0;
  const gears = {};

  const dataMatrix = AOC.lines;
  dataMatrix.forEach((line, index) => {
    dataMatrix[index] = line.split('');
  });

  let skipCols = 0;

  dataMatrix.forEach((row, rowIndex) => {
    row.forEach((item, colIndex) => {
      if (skipCols !== 0) { // Skip parts nums that have already been searched by previous num
        skipCols -= 1;
      } else if (!Number.isNaN(Number(item))) { // If item is a number then search
        let isGearPart = false;
        let gearLocation = 'n:a';
        let partNum = item;

        // Search left
        const leftSearch = search2(dataMatrix, rowIndex, colIndex - 1);
        if (leftSearch[1]) {
          isGearPart = true;
          gearLocation = leftSearch[2];
        }
        // Search current
        const midSearch = search2(dataMatrix, rowIndex, colIndex);
        if (midSearch[1]) {
          isGearPart = true;
          gearLocation = midSearch[2];
        }
        // Search right until done no more numbers
        let searchRight = true;
        let searchCol = colIndex + 1;
        while (searchRight) {
          const [
            foundPartNum,
            foundIsGearPart,
            foundGearLocation,
          ] = search2(dataMatrix, rowIndex, searchCol);

          if (foundIsGearPart) {
            isGearPart = true;
            gearLocation = foundGearLocation;
          }

          // Found num: Add to part num and search farther, skip future part search
          if (!Number.isNaN(Number(foundPartNum))) {
            partNum += foundPartNum;
            searchCol += 1;
            skipCols += 1;
          } else {
            searchRight = false; // Stop searching right
          }
        }

        if (isGearPart) {
          if (gears[gearLocation]) {
            total += parseFloat(partNum) * parseFloat(gears[gearLocation]);
          } else {
            gears[gearLocation] = partNum;
          }
        }
      }
    });
  });

  return total; // 77509019
});
