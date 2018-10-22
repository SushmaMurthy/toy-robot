const expect = require("chai").expect;
const sinon = require("sinon");
const Robot = require("../../src/models/robot");

describe("Robot", function() {
  let robot, stub;

  beforeEach(function() {
    robot = new Robot();
  });

  it("should place a robot correctly on valid point on the table", () => {
    robot = robot.place([0, 1, "north"]);
    expect(robot.isPlaced).to.be.true;
    expect(robot.position).to.deep.equal({ x: 0, y: 1 });
    expect(robot.direction).to.equal("north");
  });

  it("should ignore any place instruction that is off the board", () => {
    robot = robot.place([0, 1, "north"]);
    robot = robot.place([5, 3, "west"]);
    expect(robot.isPlaced).to.be.true;
    expect(robot.position).to.deep.equal({ x: 0, y: 1 });
    expect(robot.direction).to.equal("north");
  });

  it("should correctly replace the robot if asked to", () => {
    robot = robot.place([0, 1, "north"]);
    robot = robot.move();
    robot = robot.place([2, 2, "east"]);
    expect(robot.position).to.deep.equal({ x: 2, y: 2 });
    expect(robot.direction).to.equal("east");
  });

  it("should correctly turn when issued a turn command", () => {
    robot = robot.place([0, 1, "east"]);
    robot = robot.turn("left");
    expect(robot.direction).to.equal("north");
  });

  it("should correctly move when issued a move command", () => {
    robot = robot.place([0, 1, "east"]);
    robot = robot.move();
    expect(robot.position).to.deep.equal({ x: 1, y: 1 });
  });

  it("should report it's current position & direction when issued a report instruction", () => {
    stub = sinon.stub(console, "log");
    robot = robot.place([0, 1, "east"]);
    robot = robot.report();
    robot = robot.move();
    robot = robot.place([1, 1, "south"]);
    robot = robot.move();
    robot = robot.place([1, 0, "west"]);
    robot = robot.move();
    robot = robot.report();

    expect(stub.called).to.be.true;
    expect(stub.callCount).to.equal(2);
    expect(stub.getCall(0).args[0].split(" ")[1]).to.equal("0,1,EAST");
    expect(stub.getCall(1).args[0].split(" ")[1]).to.equal("0,0,WEST");
    stub.restore();
  });

  it("should ignore all instructions before the first place instruction", () => {
    robot = robot.turn("left");
    robot = robot.move();
    robot = robot.place([0, 0, "south"]);
    expect(robot.position).to.deep.equal({ x: 0, y: 0 });
    expect(robot.direction).to.equal("south");
  });

  it("should ignore all instructions that would make it fall off the board", () => {
    robot = robot.place([4, 4, "north"]);
    robot = robot.move();
    robot = robot.turn("right");
    robot = robot.move();
    robot = robot.place([0, 0, "south"]);
    robot = robot.move();
    robot = robot.place([0, 0, "west"]);
    robot = robot.move();
    expect(robot.position).to.deep.equal({ x: 0, y: 0 });
    expect(robot.direction).to.equal("west");
  });

  it("should not log the report if robot is not placed", () => {
    stub = sinon.stub(console, "log");
    robot = robot.report();
    expect(stub.callCount).to.equal(0);
  });

  it("should correctly run a series of parsed instructions", () => {
    robot.runInstructions([
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
    expect(robot.position).to.deep.equal({ x: 0, y: 1 });
    expect(robot.direction).to.equal("north");
    expect(stub.called).to.be.true;
    expect(stub.getCall(0).args[0].split(" ")[1]).to.equal("0,1,NORTH");
    stub.restore();
  });
});
