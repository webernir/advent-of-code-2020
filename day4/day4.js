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

function hasAllRequiredFields(item) {
  const keys = Object.keys(item);
  const missing = requiredFields.filter((field) => !keys.includes(field));
  return missing.length === 0;
}

const fixLine = (line) => line.trim().replace("\r\n", " ");

function partA() {
  const txt = fs.readFileSync(path.join(__dirname, "./input.txt"), "utf8");

  const lines = txt.split("\r\n\r\n");

  const fixedLines = lines
    .map(fixLine)
    .map(lineToPassport)
    .filter(hasAllRequiredFields);

  return fixedLines;
}

function isValidHeight(val) {
  if (val.includes("cm")) {
    const num = Number(val.replace("cm", "").trim());
    return num >= 150 && num <= 193;
  }
  if (val.includes("in")) {
    const num = Number(val.replace("in", "").trim());
    return num >= 59 && num <= 76;
  }
  return false;
}

const validEcls = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];

function isValidEcl(val) {
  return validEcls.includes(val);
}

const validators = {
  byr: (val) => val >= 1920 && val <= 2002,
  iyr: (val) => val >= 2010 && val <= 2020,
  eyr: (val) => val >= 2020 && val <= 2030,
  hgt: isValidHeight,
  hcl: (val) => /#([0-9a-f]){6}/.test(val),
  ecl: isValidEcl,
  pid: (val) => /^\d{9}$/.test(val),
  pidOld: (val) => /\d{9}/.test(val),
  cid: () => true,
};

function isValid(item) {
  console.log(item);
  return (
    Object.keys(item).filter((k) => {
      const isKeyValid = validators[k](item[k]);
      console.log(k, item[k], isKeyValid);
      return !isKeyValid;
    }).length == 0
  );
}

function partB() {
  const txt = fs.readFileSync(path.join(__dirname, "./input.txt"), "utf8");

  const lines = txt.split("\r\n\r\n");

  const fixedLines = lines
    .map(fixLine)
    .map(lineToPassport)
    .filter(hasAllRequiredFields)
    .filter(isValid);

  return fixedLines;
}

// console.log(partA().length);
console.log(partB().length);