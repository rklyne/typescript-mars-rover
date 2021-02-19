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
});
