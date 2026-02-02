function calculateTotal(price, quantity) {
  return price * quantity;
}

function applyDiscount(total) {
  const discount = 10; // Flat $10 discount when total > 100

  if (total > 100) {
    console.warn(`Discount applied: -$${discount} because total ($${total}) > 100`);
    return total - discount;
  }

  console.info(`No discount applied because total ($${total}) <= 100`);
  return total;
}

function processOrder(price, quantity) {
  console.info("Program startup: processing order");

  // Input validation
  if (typeof price !== "number" || typeof quantity !== "number") {
    console.error("Invalid input type: price and quantity must be numbers");
    throw new Error("price and quantity must be numbers");
  }

  if (price < 0 || quantity < 0) {
    console.error("Invalid input: price and quantity must be non-negative");
    throw new Error("price and quantity must be non-negative");
  }

  console.info(`Inputs received: price=${price}, quantity=${quantity}`);

  const total = calculateTotal(price, quantity);
  console.info(`Calculated total: ${total}`);

  const discounted = applyDiscount(total);
  const finalResult = discounted.toFixed(2);

  console.info(`Final result: ${finalResult}`);
  return finalResult;
}

module.exports = {
  calculateTotal,
  applyDiscount,
  processOrder
};

// Demo run 
console.log(processOrder(25, 5));
