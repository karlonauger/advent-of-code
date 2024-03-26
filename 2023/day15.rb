# Read File
path = File.join(File.dirname(__FILE__), '../15_input.txt')
file = File.open(path, 'r+')
sequence = File.readlines(file, chomp: true).first
steps = sequence.split(',')

def hash_algorithm(s)
  current_value = 0
  s.each_byte do |byte|
    current_value += byte # Increase by ASCII code
    current_value *= 17
    current_value %= 256
  end
  current_value
end

puts "part 1 : #{steps.sum { |step| hash_algorithm(step) }}" # 519603

# Initialize 256 boxes
boxes = Array.new(256) { Hash.new }

# Process each step in the initialization sequence
def process_steps(steps, boxes)
  steps.each do |step|
    if step.include?('=')
      label, focal_length = step.split('=')
      box_index = hash_algorithm(label)
      boxes[box_index][label] = focal_length.to_i
    elsif step.include?('-')
      label = step[0..-2]
      box_index = hash_algorithm(label)
      boxes[box_index].delete(label)
    end
  end
end

# Calculate the focusing power of all lenses
def calculate_focusing_power(boxes)
  focusing_power = 0
  boxes.each_with_index do |box, box_index|
    slot_number = 1
    box.each_value do |focal_length|
      focusing_power += (box_index + 1) * slot_number * focal_length
      slot_number += 1
    end
  end
  focusing_power
end

process_steps(steps, boxes)

puts "part 2 : #{calculate_focusing_power(boxes)}" # 244342
