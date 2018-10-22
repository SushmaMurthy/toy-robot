const fs = require("fs");

const readInputFile = fileName => {
  // validate instructions file
  const splitArray = fileName.split(".");

  if (splitArray[splitArray.length - 1] !== "txt") {
    return Promise.reject(
      new Error("Toy Robot accepts instruction only from .txt files")
    );
  }

  try {
    const fileData = fs.readFileSync(fileName, "utf8");
    if (fileData.length === 0) {
      throw new Error();
    }
    return Promise.resolve(fileData);
  } catch (fsError) {
    return Promise.reject(
      new Error("Instructions file doesn't exist or could not be accessed")
    );
  }
};

module.exports = { readInputFile };
