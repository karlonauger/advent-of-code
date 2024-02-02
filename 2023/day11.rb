# Read File
path = File.join(File.dirname(__FILE__), '../11_input.txt')
file = File.open(path, 'r+')
matrix = File.readlines(file, chomp: true)

galaxies = []

# Galaxy knows it's location and if it's been visited
class Galaxy
  attr_accessor :number, :row, :column, :visited

  def initialize(n, r, c)
    @number = n
    @row = r
    @column = c
    @visited = false
  end

  def to_s
    "#{number}: (#{row}, #{column}, #{visited})"
  end

  def un_visited?
    !@visited
  end
end

# Find empty spaces to be expanded
rows_to_expand = (0..matrix.length).to_a
cols_to_expand = (0..matrix.first.length).to_a

matrix.each_with_index do |line, row|
  line.each_char.with_index do |cell, column|
    if (cell == "#")
      rows_to_expand.delete(row)
      cols_to_expand.delete(column)
    end
  end
end

# Find and create Galaxies
matrix.each_with_index do |line, row|
  line.each_char.with_index do |cell, column|
    if (cell != ".")
      galaxies << Galaxy.new(cell, row, column)
    end
  end
end

# Loop through all galaxies and find the distance to other galaxies
def diff_between_galaxies(galaxies, rows_to_expand, cols_to_expand, expansion_size)
  total_space = 0
  
  galaxies.each do |galaxy_a|
    galaxy_a.visited = true
    galaxies.select(&:un_visited?).each do |galaxy_b|
      # Find the start and end range between locations
      minmax_row = [galaxy_a.row, galaxy_b.row].minmax
      minmax_col = [galaxy_a.column, galaxy_b.column].minmax
      row_min = minmax_row.first
      row_max = minmax_row.last
      col_min = minmax_col.first
      col_max = minmax_col.last

      # Count number of expansions to add
      row_expansions = rows_to_expand.count { |row| row_min < row && row < row_max }
      col_expansions = cols_to_expand.count { |col| col_min < col && col < col_max }

      # Diff the locations and add it up
      total_space += row_max - row_min + col_max - col_min + (row_expansions + col_expansions) * (expansion_size - 1)
    end
  end

  total_space
end

part1 = diff_between_galaxies(galaxies, rows_to_expand, cols_to_expand, 2)
puts "part 1 : #{part1}" # 9918828

# Reset Galaxies
galaxies.each do |galaxy|
  galaxy.visited = false
end

part2 = diff_between_galaxies(galaxies, rows_to_expand, cols_to_expand, 1000000)
puts "part 2 : #{part2}" # 692506533832