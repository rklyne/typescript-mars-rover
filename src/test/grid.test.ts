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
      [{}, {}]
    ]);
  });
});
