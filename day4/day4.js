const fs = require("fs");
const path = require("path");

function lineToPassport(line) {
  const matches = line.match(/(\w+):(#?\w+)/g);
  const result = {};
  matches.forEach((match) => {
    const splitted = match.split(":");
    result[splitted[0]] = splitted[1];
  });
  return result;
}

const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"]; // optional cid

function isValid(item) {
  const keys = Object.keys(item);
  const missing = requiredFields.filter((field) => !keys.includes(field));
  return missing.length === 0;
}

const fixLine = (line) => line.trim().replace("\r\n", " ");

function partA() {
  const txt = fs.readFileSync(path.join(__dirname, "./input.txt"), "utf8");

  const lines = txt.split("\r\n\r\n");

  const fixedLines = lines.map(fixLine).map(lineToPassport).filter(isValid);

  return fixedLines;
}

console.log(partA().length);
