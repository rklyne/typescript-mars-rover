type Direction = "N" | "S" | "E" | "W";
type RoverPosition = [number, number, Direction];

class Rover {
  position: RoverPosition;

  constructor() {
    this.position = [0, 0, "N"];
  }

  getPosition(): string {
    return this.position.join(":");
  }

  command(commands: string) {
    for (const command of commands) {
      this.singleCommand(command);
    }
  }

  private singleCommand(_command: string) {
    if (_command === "R") {
      this.turnRight();
    } else if (_command === "L") {
      this.turnLeft();
    } else {
      this.moveForwards();
    }
  }

  /*
   *   N
   * W   E
   *   S
   */
  private turnRight() {
    this.position[2] = ({
      N: "E",
      E: "S",
      S: "W",
      W: "N",
    } as const)[this.position[2]];
  }

  private turnLeft() {
    this.position[2] = ({
      N: "W",
      E: "N",
      S: "E",
      W: "S",
    } as const)[this.position[2]];
  }

  private moveForwards() {
    switch (this.position[2]) {
      case "N":
        this.moveNorth();
        break;
      case "E":
        this.moveEast();
        break;
      case "S":
        this.moveSouth();
        break;
      case "W":
        this.moveWest();
        break;
      default:
        throw new Error(`What even is "${this.position[2]}"`);
    }
    this.wrapAroundPlateau();
  }

  private moveNorth() {
    this.position[1] += 1;
  }

  private moveSouth() {
    this.position[1] -= 1;
  }

  private moveEast() {
    this.position[0] += 1;
  }

  private moveWest() {
    this.position[0] -= 1;
  }

  private wrapAroundPlateau() {
    const height = 10;
    const width = 10;
    this.position[0] %= width;
    this.position[1] %= height;
  }
}

describe("mars rover", () => {
  it("the rover has an initial position on the plateau", () => {
    const rover = new Rover();
    const initialPosition = rover.getPosition();

    expect(initialPosition).toBe("0:0:N");
  });

  it("the rover can move forward on command 'M'", () => {
    const rover = new Rover();
    rover.command("M");
    const position = rover.getPosition();
    expect(position).toBe("0:1:N");
  });

  it("the rover can turn to the right on command 'R'", () => {
    const rover = new Rover();
    rover.command("R");
    const position = rover.getPosition();
    expect(position).toBe("0:0:E");
  });

  it("the rover can turn right four times and not change position", () => {
    const rover = new Rover();
    const initialPosition = rover.getPosition();
    rover.command("R");
    rover.command("R");
    rover.command("R");
    rover.command("R");
    const position = rover.getPosition();
    expect(position).toBe(initialPosition);
  });

  it("the rover can turn to the left on command 'L'", () => {
    const rover = new Rover();
    rover.command("L");
    const position = rover.getPosition();
    expect(position).toBe("0:0:W");
  });

  it("the rover can turn left four times and not change position", () => {
    const rover = new Rover();
    const initialPosition = rover.getPosition();
    rover.command("L");
    rover.command("L");
    rover.command("L");
    rover.command("L");
    const position = rover.getPosition();
    expect(position).toBe(initialPosition);
  });

  it("can move forwards twice and get to '0:2:N'", () => {
    const rover = new Rover();
    rover.command("M");
    rover.command("M");
    const position = rover.getPosition();
    expect(position).toBe("0:2:N");
  });

  it("the rover position will be '2:3:N' given the command 'MMRMMLM", () => {
    const rover = new Rover();
    rover.command("MMRMMLM");
    const position = rover.getPosition();
    expect(position).toBe("2:3:N");
  });

  it("the rover position will be '0:0:N' given the command 'MLMLMLML", () => {
    const rover = new Rover();
    rover.command("MLMLMLML");
    const position = rover.getPosition();
    expect(position).toBe("0:0:N");
  });

  it("the rover position will be '0:0:N' given the command 'MMMMMMMMMM", () => {
    const rover = new Rover();
    rover.command("MMMMMMMMMM");
    const position = rover.getPosition();
    expect(position).toBe("0:0:N");
  });

  it("the rover position will be '0:0:N' given the command 'RMMMMMMMMMMRRR", () => {
    const rover = new Rover();
    rover.command("RMMMMMMMMMMRRR");
    const position = rover.getPosition();
    expect(position).toBe("0:0:N");
  });

  it("the rover position will be '0:0:N' given the command 'RRMMMMMMMMMMRR", () => {
    const rover = new Rover();
    rover.command("RRMMMMMMMMMMRR");
    const position = rover.getPosition();
    expect(position).toBe("0:0:N");
  });
});
