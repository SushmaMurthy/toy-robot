const expect = require("chai").expect;
const parser = require("../../src/helpers/instructions-parser");

describe("Instructions Parser", () => {
  it("should throw an error if no instructions are passed", () => {
    parser.parseInstructions("").catch(err => {
      expect(err).to.exist;
    });
  });

  it("should throw an error if only invalid instructions are passed", () => {
    parser.parseInstructions("Jump\nUp").catch(err => {
      expect(err).to.exist;
    });
  });

  it("should correctly parse file contents into an array of instructions", () => {
    parser
      .parseInstructions("PLACE 0,0,NORTH\nMOVE\nLEFT\nRIGHT\nREPORT")
      .then(instructionList => {
        expect(instructionList).to.deep.equal([
          {
            command: "place",
            args: [0, 0, "north"]
          },
          {
            command: "move"
          },
          {
            command: "turn",
            args: "left"
          },
          {
            command: "turn",
            args: "right"
          },
          {
            command: "report"
          }
        ]);
      });
  });

  it("should not parse any unknown instructions", () => {
    parser
      .parseInstructions(
        "PLACE 0,0,NORTH\nJump\nUpAndDown\nPLACE 0,1,north-west\nMOVE\nREPORT"
      )
      .then(instructionList => {
        expect(instructionList).to.deep.equal([
          {
            command: "place",
            args: [0, 0, "north"]
          },
          {
            command: "move"
          },
          {
            command: "report"
          }
        ]);
      });
  });
});
