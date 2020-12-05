const input = require("./input");

const timesInString = (text, char) =>
  [...text].filter((s) => s === char).length;

function isValidA({ pass, min, max, letter }) {
  const times = timesInString(pass, letter);
  return times >= min && times <= max;
}

const partA = () => input.filter(isValidA);

function isValidB({ pass, min, max, letter }) {
  const a = pass[min - 1];
  const b = pass[max - 1];
  return a !== b && (a === letter || b === letter);
}

const partB = () => input.filter(isValidB);

console.log("Part A:", partA().length);
console.log("Part B:", partB().length);
