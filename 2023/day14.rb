# Read File
path = File.join(File.dirname(__FILE__), '../14_input.txt')
file = File.open(path, 'r+')
grid = File.readlines(file, chomp: true)

def roll(grid, direction)
  nrows = grid.size
  ncols = grid.first.size

  moved = true
  while moved
    moved = false
    case direction
    when :north
      (1...nrows).each do |row|
        (0...ncols).each do |col|
          if grid[row][col] == 'O' && grid[row-1][col] == '.'
            grid[row][col], grid[row-1][col] = '.', 'O'
            moved = true
          end
        end
      end
    when :west
      (0...nrows).each do |row|
        (1...ncols).each do |col|
          if grid[row][col] == 'O' && grid[row][col-1] == '.'
            grid[row][col], grid[row][col-1] = '.', 'O'
            moved = true
          end
        end
      end
    when :south
      (0...nrows-1).reverse_each do |row|
        (0...ncols).each do |col|
          if grid[row][col] == 'O' && grid[row+1][col] == '.'
            grid[row][col], grid[row+1][col] = '.', 'O'
            moved = true
          end
        end
      end
    when :east
      (0...nrows).each do |row|
        (0...ncols-1).reverse_each do |col|
          if grid[row][col] == 'O' && grid[row][col+1] == '.'
            grid[row][col], grid[row][col+1] = '.', 'O'
            moved = true
          end
        end
      end
    end
  end
  grid
end

def load(grid)
  total_load = 0
  nrows = grid.size

  grid.each_with_index do |row, rindex|
    row.chars.each do |char|
      if char == 'O'
        total_load += nrows - rindex
      end
    end
  end

  total_load
end

roll(grid, :north)
puts "part 1 : #{load(grid)}" # 106186
roll(grid, :sount)


states = [grid.map(&:dup)]
loop_start = -1

loop do
  [:north, :west, :south, :east].each do |direction|
    roll(grid, direction)
  end
  
  if (loop_start = states.find_index(grid))
    break
  else
    states << grid.map(&:dup)
  end
end

current_cycle = states.size
loop_size = current_cycle - loop_start
remaining_cycles = (1_000_000_000 - current_cycle) % loop_size

puts "part 2 : #{load(states[loop_start + remaining_cycles])}" # 106390


