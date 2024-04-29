'strict';

const AOC = require('./AOC');

AOC.setDay(19);

const workflows = new Map();
const inputs = [];

// Store workflows in hash map
for (let l = 0; l < AOC.lines.length; l += 1) {
  const line = AOC.lines[l];
  if (line.startsWith('{')) break;
  const [identifier, conditionsPart] = line.split('{');
  workflows.set(identifier, conditionsPart.slice(0, -1).split(','));
}

// Build array of input hash objects
for (let l = 0; l < AOC.lines.length; l += 1) {
  const line = AOC.lines[l];
  if (line.startsWith('{')) {
    const keyValuePairs = line.replace(/[{}]/g, '').split(',');

    inputs.push(keyValuePairs.reduce((acc, keyValue) => {
      const [key, value] = keyValue.split('=');
      acc[key] = parseInt(value, 10);
      return acc;
    }, {}));
  }
}

function evaluateCondition(inputValue, operator, value) {
  switch (operator) {
    case '<': return inputValue < value;
    case '>': return inputValue > value;
    default: return false;
  }
}

function evaluateInstructions(identifier, input) {
  const conditions = workflows.get(identifier);

  // Evaluate each condition in workflow
  for (let c = 0; c < conditions.length - 1; c += 1) {
    const condition = conditions[c];
    const [cond, result] = condition.split(':');
    const [variable, operator, value] = cond.split(/(<|>)/);

    // Check the condition against input
    if (evaluateCondition(input[variable], operator, value)) {
      if (result === 'A' || result === 'R') return result; // End condition met
      return evaluateInstructions(result, input); // Next workflow
    }
  }

  const condition = conditions[conditions.length - 1];
  const result = condition.split('}')[0];

  if (result === 'A' || result === 'R') return result; // End condition met
  return evaluateInstructions(result, input); // Next workflow
}

function sumValues(obj) {
  let sum = 0;
  for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
          sum += obj[key];
      }
  }
  return sum;
}

let result = 0;
for (let i = 0; i < inputs.length; i += 1) {
  const input = inputs[i];
  if (evaluateInstructions('in', input) === 'A') result += sumValues(input);
}

AOC.part1(() => result); // 406934
