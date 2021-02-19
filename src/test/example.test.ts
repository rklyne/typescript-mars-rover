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

  command(_command: string) {
    if (_command === "R") {
      this.turnRight()
    } else if (_command === "L") {
      this.turnLeft()
    } else {
      this.moveForwards()
    }
  }

  /*
   *   N
   * W   E
   *   S
   */
  private turnRight() {
    this.position[2] = {
      'N': 'E' as Direction,
      'E': 'S' as Direction,
      'S': 'W' as Direction,
      'W': 'N' as Direction,
    }[this.position[2]]
  }

  private turnLeft() {
    this.position[2] = {
      'N': 'W' as Direction,
      'E': 'N' as Direction,
      'S': 'E' as Direction,
      'W': 'S' as Direction,
    }[this.position[2]]
  }

  private moveForwards() {
    this.position = [0, 1, "N"]
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
    rover.command('M');
    const position = rover.getPosition();
    expect(position).toBe('0:1:N');
  });

  it("the rover can turn to the right on command 'R'", () => {
    const rover = new Rover();
    rover.command('R');
    const position = rover.getPosition();
    expect(position).toBe('0:0:E');
  });

  it("the rover can turn right four times and not change position", () => {
    const rover = new Rover();
    const initialPosition = rover.getPosition();
    rover.command('R');
    rover.command('R');
    rover.command('R');
    rover.command('R');
    const position = rover.getPosition();
    expect(position).toBe(initialPosition);
  })

  it("the rover can turn to the left on command 'L'", () => {
    const rover = new Rover();
    rover.command('L');
    const position = rover.getPosition();
    expect(position).toBe('0:0:W');
  });

  it("the rover can turn left four times and not change position", () => {
    const rover = new Rover();
    const initialPosition = rover.getPosition();
    rover.command('L');
    rover.command('L');
    rover.command('L');
    rover.command('L');
    const position = rover.getPosition();
    expect(position).toBe(initialPosition);
  })

  it("the rover position will be '2:3:N' given the command 'MMRMMLM", () => {
    const rover = new Rover();
    rover.command('MMRMMLM');
    const position = rover.getPosition();
    expect(position).toBe('2:3:N');
  })

});
