type Direction = "N" | "S" | "E" | "W";
type RoverPosition = [number, number, Direction];

type RoverInput = "R" | "L" | "M";

type RoverCommand = (position: RoverPosition) => RoverPosition;

/*
 *   N
 * W   E
 *   S
 */
const turnLeft: RoverCommand = (position) => {
  return [
    position[0],
    position[1],
    ({
      N: "W",
      E: "N",
      S: "E",
      W: "S",
    } as const)[position[2]],
  ];
};

const turnRight: RoverCommand = (position) => {
  return [
    position[0],
    position[1],
    ({
      N: "E",
      E: "S",
      S: "W",
      W: "N",
    } as const)[position[2]],
  ];
};

const moveForwards: RoverCommand = (position) => {
  const newPosition: RoverPosition = [...position];
  switch (position[2]) {
    case "N":
      newPosition[1] += 1;
      break;
    case "E":
      newPosition[0] += 1;
      break;
    case "S":
      newPosition[1] -= 1;
      break;
    case "W":
      newPosition[0] -= 1;
      break;
    default:
      throw new Error(`What even is "${newPosition[2]}"`);
  }
  const height = 10;
  const width = 10;
  newPosition[0] %= width;
  newPosition[1] %= height;

  return newPosition;
};

const isRoverInput = (maybeInput: string): maybeInput is RoverInput => {
  return maybeInput === "L" || maybeInput === "R" || maybeInput === "M";
};

class Rover {
  static roverCommands: Record<RoverInput, RoverCommand> = {
    R: turnRight,
    L: turnLeft,
    M: moveForwards,
  };

  position: RoverPosition;

  constructor() {
    this.position = [0, 0, "N"];
  }

  getPosition(): string {
    return this.position.join(":");
  }

  command(inputs: string) {
    for (const input of inputs) {
      if (isRoverInput(input)) {
        this.singleCommand(input);
      } else {
        throw `Invalid input received: ${input}`;
      }
    }
  }

  private singleCommand(input: RoverInput) {
    const roverCommand = Rover.roverCommands[input];
    if (roverCommand) {
      this.position = roverCommand(this.position);
    }
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
