module UtsCrypto
  module Modular
    module_function

    def inverse(value, modulus)
      old_r, r = value % modulus, modulus
      old_s, s = 1, 0
      until r.zero?
        quotient = old_r / r
        old_r, r = r, old_r - quotient * r
        old_s, s = s, old_s - quotient * s
      end
      old_r == 1 ? old_s % modulus : nil
    end

    def solve_prime(matrix, prime)
      n = matrix.length
      work = matrix.map { |row| row.map { |v| v % prime } }
      result = Array.new(n) { |r| Array.new(n) { |c| r == c ? 1 : 0 } }
      determinant = 1
      n.times do |column|
        pivot = (column...n).find { |row| work[row][column] != 0 }
        return [0, nil] unless pivot

        if pivot != column
          work[pivot], work[column] = work[column], work[pivot]
          result[pivot], result[column] = result[column], result[pivot]
          determinant = -determinant % prime
        end
        value = work[column][column]
        determinant = determinant * value % prime
        scale = inverse(value, prime)
        n.times do |c|
          work[column][c] = work[column][c] * scale % prime
          result[column][c] = result[column][c] * scale % prime
        end
        n.times do |row|
          next if row == column

          factor = work[row][column]
          n.times do |c|
            work[row][c] = (work[row][c] - factor * work[column][c]) % prime
            result[row][c] = (result[row][c] - factor * result[column][c]) % prime
          end
        end
      end
      [determinant, result]
    end

    def crt26(mod2, mod13)
      (mod13 + 13 * ((mod2 - mod13) % 2)) % 26
    end

    # Work on the fields F2 and F13, then combine by CRT; no real-number inverse.
    def matrix_inverse(matrix)
      d2, inverse2 = solve_prime(matrix, 2)
      d13, inverse13 = solve_prime(matrix, 13)
      determinant = crt26(d2, d13)
      return [determinant, nil] unless inverse2 && inverse13

      n = matrix.length
      result = Array.new(n) do |r|
        Array.new(n) { |c| crt26(inverse2[r][c], inverse13[r][c]) }
      end
      [determinant, result]
    end
  end
end
