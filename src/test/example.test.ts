type Direction = "N" | "S" | "E" | "W";
type RoverPosition = [number, number, Direction];

class Rover {
  position: RoverPosition;

  constructor() {
    this.position = [0, 0, "N"];
  }
  getPosition() {
    return this.position.join(":");
  }
}

describe("mars rover", () => {
  it("the rover has an initial position on the plateau", () => {
    const rover = new Rover();
    const initialPosition = rover.getPosition();

    expect(initialPosition).toBe("0:0:N");
  });
});
