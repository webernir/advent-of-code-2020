const input = require("./input");

const isTree = (x) => x === "#";

function partA() {
  let position = [0, 0]; // [line, index]
  const results = [];
  for (let i = 0; i < input.length - 1; i++) {
    var line = position[0] + 1;
    var index = position[1] + 3;
    const fixedIndex = index % input[0].length;
    position[0] = line;
    position[1] = index;
    const selected = input[line][fixedIndex];
    console.log(
      i,
      input[line],
      position,
      selected,
      fixedIndex % input[0].length
    );
    if (isTree(selected)) {
      results.push(1);
    }
  }
  return results.length;
}

const patterns = [
  { right: 1, down: 1 },
  { right: 3, down: 1 },
  { right: 5, down: 1 },
  { right: 7, down: 1 },
  { right: 1, down: 2 },
];

function partB() {
  const results = [];
  patterns.forEach((pattern) => {
    const patternTrees = [];
    const { right, down } = pattern;
    let position = [0, 0]; // [line, index]
    for (let i = 0; i < input.length - 1; i++) {
      var line = position[0] + down;
      if (line > input.length) {
        continue;
      }
      var index = position[1] + right;
      const fixedIndex = index % input[0].length;
      position[0] = line;
      position[1] = index;
      const selected = input[line][fixedIndex];
      //   console.log(
      //     i,
      //     input[line],
      //     position,
      //     selected,
      //     fixedIndex % input[0].length
      //   );
      if (isTree(selected)) {
        patternTrees.push(1);
      }
    }
    results.push({ pattern, count: patternTrees.length });
  });
  return results;
}

console.log(partA());

console.log(
  partB()
    .map((t) => t.count)
    .reduce((acc, curr) => acc * curr, 1)
);
