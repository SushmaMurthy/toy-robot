const clc = require("cli-color");

const directionMap = {
  north: {
    value: "north",
    left: "west",
    right: "east"
  },
  east: {
    value: "east",
    left: "north",
    right: "south"
  },
  south: {
    value: "south",
    left: "east",
    right: "west"
  },
  west: {
    value: "west",
    left: "south",
    right: "north"
  }
};

const tableSize = { x: 4, y: 4 };

class Robot {
  constructor() {
    this.isPlaced = false;
    this.position = {
      x: null,
      y: null
    };
    this.direction = null;
  }

  place(paramList) {
    const x = paramList[0];
    const y = paramList[1];
    const direction = directionMap[paramList[2]].value;

    // Ignore if placement is off the table
    if (x > tableSize.x || x < 0 || y > tableSize.y || y < 0) {
      return this;
    }

    // Modify robot with directions
    this.isPlaced = true;
    this.position.x = x;
    this.position.y = y;
    this.direction = direction;

    return this;
  }

  move() {
    // Ignore command if robot is not yet placed
    if (!this.isPlaced) {
      return this;
    }

    let x = this.position.x;
    let y = this.position.y;

    switch (this.direction) {
      case "north":
        if (++y < tableSize.y) {
          this.position = { x: x, y: y };
        }
        break;
      case "east":
        if (++x < tableSize.x) {
          this.position = { x: x, y: y };
        }
        break;
      case "south":
        if (--y >= 0) {
          this.position = { x: x, y: y };
        }
        break;
      case "west":
        if (--x >= 0) {
          this.position = { x: x, y: y };
        }
        break;
    }

    return this;
  }

  turn(direction) {
    // Ignore command if robot is not yet placed
    if (!this.isPlaced) {
      return this;
    }
    this.direction = directionMap[this.direction][direction];
    return this;
  }

  report() {
    // Ignore command if robot is not yet placed
    if (!this.isPlaced) {
      return this;
    }

    console.log(
      clc.green("REPORT:") +
        " " +
        [this.position.x, this.position.y, this.direction.toUpperCase()].join(
          ","
        )
    );

    return this;
  }

  runInstructions(instructionList) {
    let robot = this;

    instructionList.forEach(instruction => {
      if (instruction.args) {
        robot = this[instruction.command](instruction.args);
      } else {
        robot = this[instruction.command]();
      }
    });

    return robot;
  }
}

module.exports = Robot;
