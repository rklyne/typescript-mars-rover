type CellState = 'dead' | 'alive';

export class Cell {
  state: CellState;

  constructor(initialState: CellState) {
    this.state = initialState;
  }

  getState(): CellState {
    return this.state;
  }
}

export class Grid {
  state: {}[][];
  constructor(x: number, y: number, cell: Cell) {
    this.state = this.generateState(x, y, cell);
  }

  generateState(x: number, y: number, cell: Cell): {}[][] {
    let result = [] as any;
    for (let i = 0; i < y; i++) {
      result[i] = [];
      for (let j = 0; j < x; j++) {
        result[i][j] = cell;
      }
    }
    return result;
  }

  getState(): {}[][] {
    return this.state;
  }

  getItemInPosition(x: number, y: number): any {
    return this.state[x][y]
  }
}
