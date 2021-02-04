import { Grid } from "../main/grid";

describe("Grid", () => {
  it("creates a board of cells", () => {
    let grid: Grid = new Grid(2, 2);
    expect(grid.getState()).toBe([
      [{}, {}],
      [{}, {}],
    ]);
  });
});
