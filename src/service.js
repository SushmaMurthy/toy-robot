const clc = require("cli-color");
const reader = require("./helpers/file-reader");
const parser = require("./helpers/instructions-parser");

// Predefine styling
const codeRed = clc.red.bold;

const runSimulator = fileName => {
    reader
        .readInputFile(fileName)
        .then(fileData => parser.parseInstructions(fileData))
        .then(commands => {
            // TODO Call Robot function
        })
        .catch(error => console.log(codeRed(`ERROR: ${error.message}`)));
};

// run simulator with input file argument
runSimulator(process.argv[2]);