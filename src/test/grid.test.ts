import {Cell, Grid} from "../main/grid";

describe("Grid", () => {
  it("creates a board of 4 cells", () => {
    let grid: Grid = new Grid(2, 2, new Cell('dead'));
    expect(grid.getState().flat().length).toEqual(4);
  });

  it("creates a board of 6 cells", () => {
    let grid: Grid = new Grid(2, 3, new Cell('dead'));
    expect(grid.getState().flat().length).toEqual(6);
  });

  it("creates a board of 10 cells", () => {
    let grid: Grid = new Grid(10, 10, new Cell('dead'));
    expect(grid.getState().flat().length).toEqual(100);
  });

  it("has a dead state", () => {
    let grid: Grid = new Grid(1, 1, new Cell('dead'));
    expect(grid.getItemInPosition(0, 0).getState()).toBe("dead");
  });

  it("has an alive state", () => {
    let grid: Grid = new Grid(1, 1, new Cell("alive"));
    expect(grid.getItemInPosition(0, 0).getState()).toBe("alive");
  });

  it('when cell has no neighbours, it dies :(', () => {
    let grid: Grid = new Grid(3, 3, new Cell("dead"));

    grid.setStateAt(1,1, 'alive');

    grid.evolve();

    expect(grid.getItemInPosition(1,1).getState()).toBe('dead');
  });

});
