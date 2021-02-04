export class Grid {
  state: {}[][];
  constructor(x: number, y: number) {
    this.state = this.generateState(x, y);
  }

  generateState(x: number, y: number): {}[][] {
    let result = [] as any;
    for (let i = 0; i < y; i++) {
      result[i] = [];
      for (let j = 0; j < x; j++) {
        result[i][j] = {};
      }
    }
    return result;
  }

  getState() {
    return this.state;
  }
}
