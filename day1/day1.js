const input = require("./input");

function partA() {
  for (let i = 0; i < input.length; i++) {
    const a = input[i];
    for (let k = 0; k < input.length; k++) {
      const b = input[k];
      if (i == k) {
        continue;
      }
      if (a + b === 2020) {
        return a * b;
      }
    }
  }
  throw Error("no match");
}

function partB() {
  const result = [];
  for (let i = 0; i < input.length; i++) {
    const a = input[i];
    for (let k = 0; k < input.length; k++) {
      const b = input[k];
      for (let m = 0; m < input.length; m++) {
        const c = input[m];
        if (a + b + c === 2020) {
          result.push({ a, b, c, i, k, m });
        }
      }
    }
  }
  return [
    ...new Set(
      result
        .filter((r) => r.i !== r.k && r.i !== r.m && r.m !== r.k)
        .map((t) => t.a * t.b * t.c)
    ),
  ];
}

console.log(partA());
console.log(partB());
