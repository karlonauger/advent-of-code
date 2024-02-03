'strict';

const AOC = require('./AOC');

AOC.setDay(8);
AOC.loadInput();

AOC.part1(() => {
  const fileLines = AOC.lines;
  const directions = fileLines.shift();
  const firstNode = 'AAA';
  fileLines.shift();

  // build graph
  const map = new Map();

  fileLines.forEach((line) => {
    const [node, leftRight] = line.split(' = ');
    const [left, right] = leftRight.replace('(', '').replace(')', '').split(', ');

    map.set(node, [left, right]);
  });

  let searching = true;
  let currentNode = firstNode;
  let count = 0;

  while (searching) {
    for (let i = 0; i < directions.length; i += 1) {
      const direction = directions.charAt(i);
      const leftRightArray = map.get(currentNode);

      currentNode = direction === 'L' ? leftRightArray[0] : leftRightArray[1];

      count += 1;

      if (currentNode === 'ZZZ') {
        searching = false;
        break;
      }
    }
  }

  return count; // 14893
});

AOC.part2(() => {
  const fileLines = AOC.lines;
  const directions = fileLines.shift();
  fileLines.shift();

  // build graph
  const map = new Map();
  let currentNodes = []; // AAA LQA SGA BJA SVA GFA
  const endingNodes = []; // ZZZ QXZ LHZ QNZ FBZ BRZ
  // Need to find Least common factor

  fileLines.forEach((line) => {
    const [node, leftRight] = line.split(' = ');
    const [left, right] = leftRight.replace('(', '').replace(')', '').split(', ');

    map.set(node, [left, right]);

    if (node.charAt(2) === 'A') {
      currentNodes.push(node);
    }
    if (node.charAt(2) === 'Z') endingNodes.push(node);
  });

  let searching = true;
  let count = 0;

  let found = new Map();

  while (searching) {
    for (let i = 0; i < directions.length; i += 1) {
      const direction = directions.charAt(i);

      count += 1;

      let allMatched = true;
      found = 0;
      // console.log(`${count} : ${currentNodes}`)

      currentNodes = currentNodes.map((currentNode) => {
        const leftRightArray = map.get(currentNode);
        currentNode = direction == 'L' ? leftRightArray[0] : leftRightArray[1];

        if (!endingNodes.includes(currentNode)) {
          allMatched = false;
        } else {
          found += 1;
        }

        return currentNode;
      });

      if (found > 2) {
        // console.log(`${count} : ${found} : ${currentNodes}`);
      }

      if (allMatched === true) {
        searching = false;
        break;
      }
    }
  }

  return count; // 100 000 000 - 1 000 000 000
});
