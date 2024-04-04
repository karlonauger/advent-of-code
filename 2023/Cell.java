import java.util.ArrayList;
import java.util.List;

public class Cell implements Comparable<Cell> {

    public static final int UP = 0;
    public static final int RIGHT = 1;
    public static final int DOWN = 2;
    public static final int LEFT = 3;
    public static final int[][] directions = {{0, -1}, {1, 0}, {0, 1}, {-1, 0}};
    

    private int x, y, steps, dir;
    private int heatLoss;

    public Cell(int x, int y, int steps, int dir, int heatLoss) {
        this.x = x;
        this.y = y;
        this.steps = steps;
        this.dir = dir;
        this.heatLoss = heatLoss;
    }

    public List<Cell> getNeighbours(int[][] grid, boolean part1) {
        int turnStart = part1 ? 0 : 4;
        int turnEnd = part1 ? 3 : 10;
        List<Cell> neighbours = new ArrayList<>();
        if (steps >= turnStart) {
            Cell left = getNextCell(Math.floorMod(dir - 1, 4), grid, 1);
            if (left != null) {
                neighbours.add(left);
            }

            Cell right = getNextCell((dir + 1) % 4, grid, 1);
            if (right != null) {
                neighbours.add(right);
            }
        }
        if (steps < turnEnd) {
            Cell straight = getNextCell(dir, grid, steps + 1);
            if (straight != null) {
                neighbours.add(straight);
            }
        }
        return neighbours;
    }

    private Cell getNextCell(int direction, int[][] grid, int blocks) {
        int nextX = x + directions[direction][0];
        int nextY = y + directions[direction][1];
        if (nextX >= 0 && nextX < grid[0].length && nextY >= 0 && nextY < grid.length) {
            return new Cell(nextX, nextY, blocks, direction, heatLoss + grid[nextY][nextX]);
        }
        return null;
    }

    @Override
    public int compareTo(Cell o) {
        if (this.heatLoss != o.getHeatLoss()) {
            return Integer.compare(this.heatLoss, o.getHeatLoss());
        } else if (this.dir == o.getDir() && this.steps != o.getSteps()) {
            return Integer.compare(this.steps, o.getSteps());
        } else if (this.y != o.getY()) {
            return Integer.compare(this.y, o.getY());
        } else {
            return Integer.compare(this.y, o.getX());
        }
    }

    public int getX() {
        return this.x;
    }

    public int getY() {
        return this.y;
    }

    public int getSteps() {
        return this.steps;
    }

    public int getDir() {
        return this.dir;
    }

    public int getHeatLoss() {
        return this.heatLoss;
    }

    public String strigify() {
        return this.x + "," + this.y + "," + this.steps + "," + this.dir;
    }
}