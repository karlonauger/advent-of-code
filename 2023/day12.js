'strict';

const AOC = require('./AOC');

AOC.setDay(12);

const cache = {};

function trimStart(str) {
  return str.startsWith('.') ? str.split(/(?<=\.)(?=[^.])/).slice(1).join('') : str;
}

function findCombinations(row, groups) {
  const line = `${row} ${groups.join(',')}`;
  if (cache[line]) return cache[line];

  if (groups.length <= 0) return Number(!row.includes('#'));

  if (row.length - groups.reduce((a, b) => a + b) - groups.length + 1 < 0) return 0;

  const damagedOrUnknown = !row.slice(0, groups[0]).includes('.');
  if (row.length === groups[0]) return Number(damagedOrUnknown);

  let optOne = 0;
  let optTwo = 0;
  if (row[0] !== '#') {
    optOne = findCombinations(trimStart(row.slice(1)), groups);
  }
  if (damagedOrUnknown && row[groups[0]] !== '#') {
    optTwo = findCombinations(trimStart(row.slice(groups[0] + 1)), groups.slice(1));
  }
  cache[line] ??= optOne + optTwo;

  return cache[line];
}

function calculateTotalArrangements(rows) {
  let totalArrangements = 0;

  rows.forEach((row) => {
    const [springRow, damagedGroupsStr] = row.split(' ');
    const damagedGroups = damagedGroupsStr.split(',').map(Number);

    totalArrangements += findCombinations(springRow, damagedGroups);
  });

  return totalArrangements;
}

AOC.part1(() => calculateTotalArrangements(AOC.lines)); // 8180

function unfoldRecords(rows) {
  const unfoldedRows = [];

  rows.forEach((row) => {
    const [springRow, damagedGroupsStr] = row.split(' ');
    const damagedGroups = damagedGroupsStr.split(',').map(Number);

    const unfoldedSpringRow = Array.from({ length: 5 }, (_, index) => (index > 0 ? `?${springRow}` : springRow)).join('');
    const unfoldedDamagedGroups = Array.from({ length: 5 }, () => [...damagedGroups]).flat();

    unfoldedRows.push(`${unfoldedSpringRow} ${unfoldedDamagedGroups}`);
  });

  return unfoldedRows;
}

AOC.part2(() => calculateTotalArrangements(unfoldRecords(AOC.lines)));
