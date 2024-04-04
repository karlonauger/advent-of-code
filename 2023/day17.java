import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashSet;
import java.util.List;
import java.util.PriorityQueue;
import java.util.Queue;
import java.util.Set;

// DesertIslandCrucible
class day17 {
    public static void main(String[] args) {
        Path path = Paths.get(System.getProperty("user.dir"), "17_input.txt");

        try {
            List<String> lines = Files.readAllLines(path);
            int rows = lines.size();
            int cols = lines.get(0).length();
            int[][] map = new int[rows][cols];

            for (int i = 0; i < rows; i++) {
                for (int j = 0; j < cols; j++) {
                    map[i][j] = Character.getNumericValue(lines.get(i).charAt(j));
                }
            }

            System.out.println("Part 1: " + dijkstra(map, true)); // 785
            System.out.println("Part 2: " + dijkstra(map, false)); // 922
        } catch (IOException e) {
            System.err.println("Error reading file: " + e.getMessage());
        }
    }

    private static int dijkstra(int[][] grid, boolean part1) {
        Queue<Cell> queue = new PriorityQueue<>();
        Set<String> visited = new HashSet<>();
        int endX = grid[grid.length - 1].length - 1;
        int endY = grid.length - 1;

        queue.add(new Cell(1, 0, 1, Cell.RIGHT, grid[0][1]));
        queue.add(new Cell(0, 1, 1, Cell.DOWN, grid[1][0]));

        while (!queue.isEmpty()) {
            final Cell current = queue.poll();
            if (visited.contains(current.strigify())) {
                continue;
            }
            visited.add(current.strigify());
            if (current.getX() == endX && current.getY() == endY
                    && (part1 || current.getSteps() >= 4)) {
                return current.getHeatLoss();
            }

            queue.addAll(current.getNeighbours(grid, part1));

        }

        return 0;
    }
}
