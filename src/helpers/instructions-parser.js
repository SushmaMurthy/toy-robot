const validDirections = ["north", "south", "east", "west"];

const parseInstruction = rawInstructionString => {
  let instructionObject;
  const multiWordInstructionList = rawInstructionString.split(" ");

  if (
    multiWordInstructionList.length > 1 &&
    multiWordInstructionList[0] === "place"
  ) {
    instructionObject = parsePlaceInstruction(multiWordInstructionList);
  } else {
    instructionObject = parseSingleWordInstruction(rawInstructionString);
  }

  if (instructionObject) {
    return instructionObject;
  }
};

const parsePlaceInstruction = placeInstruction => {
  const placeArgsList = placeInstruction[1].split(",");

  const x = parseInt(placeArgsList[0], 10);
  const y = parseInt(placeArgsList[1], 10);
  const direction = placeArgsList[2];

  if (!isNaN(x) && !isNaN(y) && validDirections.indexOf(direction) > -1) {
    return {
      command: "place",
      args: [x, y, direction]
    };
  } else {
    return null;
  }
};

const parseSingleWordInstruction = instructionString => {
  switch (instructionString) {
    case "move":
      return {
        command: "move"
      };
    case "left":
      return {
        command: "turn",
        args: "left"
      };
    case "right":
      return {
        command: "turn",
        args: "right"
      };
    case "report":
      return {
        command: "report"
      };
    default:
      return null;
  }
};

const parseInstructions = instructions => {
  if (!instructions.length) {
    return Promise.reject(
      new RangeError("Please pass instructions to the Toy Robot!")
    );
  }

  const parsedInstructionsArray = instructions
    .split("\n")
    .map(function(instruction) {
      return instruction.toLowerCase();
    })
    .reduce(
      function(instructionList, rawInstruction) {
        const parsedInstruction = parseInstruction(rawInstruction);

        if (parsedInstruction) {
          instructionList.push(parsedInstruction);
        }
        return instructionList;
      }.bind(this),
      []
    );

  // Throw error if no valid instructions were passed
  if (!parsedInstructionsArray.length) {
    return Promise.reject(new TypeError("No valid instructions passed"));
  }

  return Promise.resolve(parsedInstructionsArray);
};

module.exports = { parseInstructions };
