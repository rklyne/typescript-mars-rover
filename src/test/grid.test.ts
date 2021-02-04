import { Grid } from "../main/grid";

describe("Grid", () => {
  it("creates a board of 4 cells", () => {
    let grid: Grid = new Grid(2, 2);
    expect(grid.getState()).toEqual([
      [{}, {}],
      [{}, {}],
    ]);
  });

  it("creates a board of 6 cells", () => {
    let grid: Grid = new Grid(2, 3);
    expect(grid.getState()).toEqual([
      [{}, {}],
      [{}, {}],
      [{}, {}],
    ]);
  });

  it("creates a board of 10 cells", () => {
    let grid: Grid = new Grid(10, 10);
    expect(grid.getState()).toEqual([
      [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    ]);
  });

  it("has a dead state", () => {
    let grid: Grid = new Grid(1, 1);
    expect(grid.getStateOfCell(0, 0)).toBe("dead");
  });

  it("has an alive state", () => {
    let grid: Grid = new Grid(1, 1);
    expect(grid.getStateOfCell(0, 0)).toBe("alive");
  });
});
