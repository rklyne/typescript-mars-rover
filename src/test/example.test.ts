type Direction = "N" | "S" | "E" | "W";
type RoverPosition = [number, number, Direction];

type RoverInput = "R" | "L" | "M";

type RoverCommand = (position: RoverState) => RoverState;
type RoverState = {positionHistory: RoverPosition[]};

/*
 *   N
 * W   E
 *   S
 */

const initialState: RoverState = {
  positionHistory: [[0, 0, "N"]],
};

const getPosition = (state: RoverState): RoverPosition => {
  return state.positionHistory[0];
};

const setPosition = (
  state: RoverState,
  newPosition: RoverPosition
): RoverState => {
  return {...state, positionHistory: [newPosition, ...state.positionHistory]}
};

const turnLeft: RoverCommand = (state) => {
  const position = getPosition(state);
  return setPosition(state, [
    position[0],
    position[1],
    ({
      N: "W",
      E: "N",
      S: "E",
      W: "S",
    } as const)[position[2]],
  ]);
};

const turnRight: RoverCommand = (state) => {
  const position = getPosition(state);
  return setPosition(state, [
    position[0],
    position[1],
    ({
      N: "E",
      E: "S",
      S: "W",
      W: "N",
    } as const)[position[2]],
  ]);
};

const moveForwards: RoverCommand = (state) => {
  const position = getPosition(state);
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

  return setPosition(state, newPosition);
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

  state: RoverState;

  constructor() {
    this.state = initialState;
  }

  getPosition(): string {
    return getPosition(this.state).join(":");
  }

  executeInputs(inputs: string) {
    for (const input of inputs) {
      if (isRoverInput(input)) {
        this.executeInput(input);
      } else {
        throw `Invalid input received: ${input}`;
      }
    }
  }

  private executeInput(input: RoverInput) {
    const roverCommand = Rover.roverCommands[input];
    this.executeCommand(roverCommand);
  }

  private executeCommand(roverCommand: RoverCommand): void {
    this.state = roverCommand(this.state);
  }
}

describe("mars rover", () => {
  it("the rover has an initial position on the plateau", () => {
    const rover = new Rover();
    const initialPosition = rover.getPosition();

    expect(initialPosition).toBe("0:0:N");
  });

  it("the rover can move forward on input 'M'", () => {
    const rover = new Rover();
    rover.executeInputs("M");
    const position = rover.getPosition();
    expect(position).toBe("0:1:N");
  });

  it("the rover can turn to the right on input 'R'", () => {
    const rover = new Rover();
    rover.executeInputs("R");
    const position = rover.getPosition();
    expect(position).toBe("0:0:E");
  });

  it("the rover can turn right four times and not change position", () => {
    const rover = new Rover();
    const initialPosition = rover.getPosition();
    rover.executeInputs("R");
    rover.executeInputs("R");
    rover.executeInputs("R");
    rover.executeInputs("R");
    const position = rover.getPosition();
    expect(position).toBe(initialPosition);
  });

  it("the rover can turn to the left on input 'L'", () => {
    const rover = new Rover();
    rover.executeInputs("L");
    const position = rover.getPosition();
    expect(position).toBe("0:0:W");
  });

  it("the rover can turn left four times and not change position", () => {
    const rover = new Rover();
    const initialPosition = rover.getPosition();
    rover.executeInputs("L");
    rover.executeInputs("L");
    rover.executeInputs("L");
    rover.executeInputs("L");
    const position = rover.getPosition();
    expect(position).toBe(initialPosition);
  });

  it("can move forwards twice and get to '0:2:N'", () => {
    const rover = new Rover();
    rover.executeInputs("M");
    rover.executeInputs("M");
    const position = rover.getPosition();
    expect(position).toBe("0:2:N");
  });

  it("the rover position will be '2:3:N' given the input 'MMRMMLM", () => {
    const rover = new Rover();
    rover.executeInputs("MMRMMLM");
    const position = rover.getPosition();
    expect(position).toBe("2:3:N");
  });

  it("the rover position will be '0:0:N' given the input 'MLMLMLML", () => {
    const rover = new Rover();
    rover.executeInputs("MLMLMLML");
    const position = rover.getPosition();
    expect(position).toBe("0:0:N");
  });

  it("the rover position will be '0:0:N' given the input 'MMMMMMMMMM", () => {
    const rover = new Rover();
    rover.executeInputs("MMMMMMMMMM");
    const position = rover.getPosition();
    expect(position).toBe("0:0:N");
  });

  it("the rover position will be '0:0:N' given the input 'RMMMMMMMMMMRRR", () => {
    const rover = new Rover();
    rover.executeInputs("RMMMMMMMMMMRRR");
    const position = rover.getPosition();
    expect(position).toBe("0:0:N");
  });

  it("the rover position will be '0:0:N' given the input 'RRMMMMMMMMMMRR", () => {
    const rover = new Rover();
    rover.executeInputs("RRMMMMMMMMMMRR");
    const position = rover.getPosition();
    expect(position).toBe("0:0:N");
  });
});
