#!/usr/bin/env node

'use strict';

const process = require('process');

let _input = '';
let _inputLines = null;

const processTime = (timeStr) => {
  let match = timeStr.match(/(\d{2})(\d{2})/);
  return match[1] * 60 + +match[2];
};

const processLine = (line) => {
  let tokens = line.split(/\s+/);
  // TODO dropping time for the time being
  tokens.shift();
  // TODO not checking times come in pairs yet
  let minutes = tokens.map(processTime);
  let acum = 0;
  for (let i = 0; i < minutes.length; i += 2) {
    // get the differences
    acum += minutes[i + 1] - minutes[i];
  }
  return acum;
};

const main = () => {
  let result = _inputLines.map(processLine);
  result.forEach((r) => {
    let hours = Math.floor(r / 60);
    let minutes = r % 60;
    console.log(`Done: ${hours}:${minutes} - Remote: ${r - 480} - InOffice: ${r - 540}`);
  });
};

process.stdin.resume();
process.stdin.setEncoding('ascii');

process.stdin.on('data', (data) => _input += data);
process.stdin.on('end', () => {
  _inputLines = _input.split(/\n/);
  main();
});

