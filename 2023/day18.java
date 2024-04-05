import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Queue;
import java.awt.Point;

class day18 {
    public static void main(String[] args) {
        System.out.println("Part 2: " + findFill(157, 10, 244, 282, getDirections(true))); // 31171
        // System.out.println("Part 2: " + findFill(19586151, 5982259, 20322286, 15921071, getDirections(false)));
    }

    private static int findFill(int startR, int startC, int maxR, int maxC, String[][] directions) {
        // Create empty matrix
        char[][] matrix = new char[maxR][maxC];
        for (int i = 0; i < maxR; i++) {
            for (int j = 0; j < maxC; j++) {
                matrix[i][j] = '.';
            }
        }
        fillDigPath(startR, startC, directions, matrix);

        int total = 0;
        for (int i = 0; i < maxR; i++) {
            for (int j = 0; j < maxC; j++) {
                if (matrix[i][j] == '#') total++;
            }
        }
        int totalFill = floodFillCount(startR + 1, startC + 1, matrix);

        return total + totalFill;
    }

    private static String[][] getDirections(boolean part1) {
        Path path = Paths.get(System.getProperty("user.dir"), "18_input.txt");

        try {
            List<String> lines = Files.readAllLines(path);
            String[][] directions = new String[lines.size()][1];

            for (int l = 0; l < lines.size(); l++) {
                String line = lines.get(l);
                String direction = String.valueOf(line.charAt(0));
                String distance = line.substring(2, line.indexOf(' ', 2)).trim();
                String colorCode = line.substring(line.indexOf('#')).trim();
                if (part1) {
                    directions[l] = new String[]{direction, distance};
                } else {
                    directions[l] = convertColorCodeToInstruction(colorCode);
                }
            }
            return directions;
        } catch (IOException e) {
            System.err.println("Error reading file: " + e.getMessage());
            return null;
        }
    }

    private static String[] convertColorCodeToInstruction(String colorCode) {
        Map<Character, String> directionMappings = new HashMap<>();
        directionMappings.put('0', "R");
        directionMappings.put('1', "D");
        directionMappings.put('2', "L");
        directionMappings.put('3', "U");
        String distanceHex = colorCode.substring(1, 6); // Omit the '#' and take the next 5 characters
        char directionCode = colorCode.charAt(6); // Take the last character for the direction

        // Convert the distance from hexadecimal to decimal
        String distance = String.valueOf(Integer.parseInt(distanceHex, 16));

        // Map the direction code to the actual direction
        String direction = directionMappings.get(directionCode);

        return new String[]{direction, distance};
    }

    private static void fillDigPath(int r, int c, String[][] directions, char[][] matrix) {
        for (String[] direction : directions) {
            String dir = direction[0];
            int distance = Integer.parseInt(direction[1]);
            for (int i = 0; i < distance; i++) {
                switch (dir) {
                    case "U": r--; break;
                    case "D": r++; break;
                    case "R": c++; break;
                    case "L": c--; break;
                }
                matrix[r][c] = '#';
            }
        }
    }

    private static int floodFillCount(int startR, int startC, char[][] matrix) {
        int[][] directions = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}}; // Right, Down, Left, Up
        int areaCount = 0;
        Queue<Point> queue = new LinkedList<>();
        queue.offer(new Point(startR, startC));

        while (!queue.isEmpty()) {
            Point current = queue.poll();
            int r = current.x;
            int c = current.y;

            if (matrix[r][c] != '.') {
                continue;
            }

            matrix[r][c] = '*'; // Mark as visited
            areaCount++;

            for (int[] dir : directions) {
                int nextR = r + dir[0];
                int nextC = c + dir[1];
                if (matrix[nextR][nextC] == '.') {
                    queue.offer(new Point(nextR, nextC));
                }
            }
        }

        return areaCount;
    }
}
