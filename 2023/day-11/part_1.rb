# Read File
path = File.join(File.dirname(__FILE__), 'input.txt')
file = File.open(path, 'r+')
matrix = File.readlines(file, chomp: true)

galaxies = []
total_space = 0

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

# Expand rows
rows_to_expand.reverse.each do |row|
  matrix.insert(row, matrix[row].clone)
end

matrix.pop

# Expand Cols
cols_to_expand.reverse.each do |col|
  matrix.map! do |line|
    line.insert(col, ".")
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
galaxies.each do |galaxy_a|
  galaxy_a.visited = true
  galaxies.select(&:un_visited?).each do |galaxy_b|
    # Add the absolute distance between each galaxy
    total_space += (galaxy_a.row - galaxy_b.row).abs + (galaxy_a.column - galaxy_b.column).abs
  end
end

puts total_space # 9918828