const expect = require("chai").expect;
const fileReader = require("../../src/helpers/file-reader");
const path = require("path");

describe("FileReader", () => {
  it("should throw an error if the file is not a valid file", () => {
    fileReader
      .readInputFile(path.join("./test/data/nonTextFile"))
      .catch(err => {
        expect(err).to.exist;
      });
  });

  it("should throw an error if the file is not a text file", () => {
    fileReader
      .readInputFile(path.join("./test/data/nonTextFile.xml"))
      .catch(err => {
        expect(err).to.exist;
      });
  });

  it("should throw an error if file is empty", () => {
    fileReader
      .readInputFile(path.join("./test/data/emptyInstructions.txt"))
      .catch(err => {
        expect(err).to.exist;
      });
  });

  it("should correctly read in the contents of a text file", () => {
    fileReader
      .readInputFile(path.join("./test/data/instructions1.txt"))
      .then(response => {
        expect(response).to.equal("PLACE 0,0,NORTH\nMOVE\nREPORT");
      });
  });
});
