const clc = require("cli-color");
const reader = require("./helpers/file-reader");
const parser = require("./helpers/instructions-parser");
const Robot = require("./models/robot");

// Predefine styling
const codeRed = clc.red.bold;
const codeYellow = clc.yellow.bold;

const runSimulator = fileName => {
  reader
          .readInputFile(fileName)
    .then(fileData => parser.parseInstructions(fileData))
    .then(commands => {
      const robotSimulator = new Robot().runInstructions(commands);
      if (!robotSimulator.isPlaced) {
        console.log(
          codeYellow("INFO: Ah! Your robot was never placed on the table")
        );
      }
    })
    .catch(error => console.log(codeRed(`ERROR: ${error.message}`)));
};

// run simulator with input file argument
runSimulator(process.argv[2]);
