const { processOrder } = require("./order");

test("applies discount when total is greater than 100", () => {
  // Arrange
  const price = 25;
  const quantity = 5;
  const expected = (115).toFixed(2);

  // Act
  const result = processOrder(price, quantity);

  // Assert
  expect(result).toBe(expected);
});

test("no discount applied when total is less than 100", () => {
  // Arrange
  const price = 20;
  const quantity = 4; // total = 80
  const expected = (80).toFixed(2);

  // Act
  const result = processOrder(price, quantity);

  // Assert
  expect(result).toBe(expected);
});

test("edge case: no discount applied when total is exactly 100", () => {
  // Arrange
  const price = 25;
  const quantity = 4; // total = 100
  const expected = (100).toFixed(2);

  // Act
  const result = processOrder(price, quantity);

  // Assert
  expect(result).toBe(expected);
});

test("discount applied when total is just over 100", () => {
  // Arrange
  const price = 50.5;
  const quantity = 2; // total = 101
  const expected = (91).toFixed(2); // 101 - 10

  // Act
  const result = processOrder(price, quantity);

  // Assert
  expect(result).toBe(expected);
});

test("invalid input: throws error for negative quantity", () => {
  // Arrange
  const price = 25;
  const quantity = -1;

  // Act
  const run = () => processOrder(price, quantity);

  // Assert
  expect(run).toThrow("price and quantity must be non-negative");
});