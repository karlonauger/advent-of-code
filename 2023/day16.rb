# Read File
path = File.join(File.dirname(__FILE__), '../16_input.txt')
file = File.open(path, 'r+')
@grid = File.readlines(file, chomp: true).map(&:chars)

DIRECTIONS = { right: [0, 1], left: [0, -1], up: [-1, 0], down: [1, 0] }
TURNS = {
  '/' => { right: :up, down: :left, left: :down, up: :right },
  '\\' => { right: :down, up: :left, left: :up, down: :right }
}
SPLITTERS = {
  '|' => { up: [:up], down: [:down], right: [:up, :down], left: [:up, :down] },
  '-' => { left: [:left], right: [:right], up: [:left, :right], down: [:left, :right] }
}

@energized = Array.new(@grid.size) { Array.new(@grid.first.size, false) }
@visited = Array.new(@grid.size) { Array.new(@grid.first.size) { [] } }

# Follow the beam's path
def follow_path(energized, visited, x, y, direction)
  return if x < 0 || x >= @grid.size || y < 0 || y >= @grid.first.size
  return if visited[x][y].include?(direction)
  visited[x][y] << direction
  energized[x][y] = true
  
  cell = @grid[x][y]
  next_directions = case cell
    when '|', '-'
      SPLITTERS[cell][direction]
    when '/', '\\'
      [TURNS[cell][direction]]
    else
      [direction]
    end

  next_directions.each do |next_direction|
    dx, dy = DIRECTIONS[next_direction]
    nx, ny = x + dx, y + dy
    follow_path(energized, visited, nx, ny, next_direction)
  end
end

def process_path(start_x, start_y, direction)
  energized = Array.new(@grid.size) { Array.new(@grid.first.size, false) }
  visited = Array.new(@grid.size) { Array.new(@grid.first.size) { [] } }
  follow_path(energized, visited, start_x, start_y, direction)
  energized.sum { |row| row.count(true) }
end

puts "part 1 : #{process_path(0, 0, :right)}" # 7236

max = 0
(0...@grid.size).each do |y|
  max = [max, process_path(0, y, :down), process_path(@grid.first.size - 1, y, :up)].max
end

(0...@grid.first.size).each do |x|
  max = [max, process_path(x, 0, :right), process_path(x, @grid.size - 1, :left)].max
end

puts "part 2 : #{max}" # 7521
