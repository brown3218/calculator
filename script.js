const add = (storedValue, nextNumber) => {
  return storedValue + nextNumber;
};

const subtract = (storedValue, nextNumber) => {
  return storedValue - nextNumber;
};

const multiply = (storedValue, nextNumber) => {
  return storedValue * nextNumber;
};

const divide = (storedValue, nextNumber) => {
  return storedValue / nextNumber;
};

// Create a new function operate that takes an operator and 2 numbers and then calls one of the above functions on the numbers.

const operate = (operator, firstNumber, secondNumber) => {
  switch (operator) {
    case "+":
      return add(firstNumber, secondNumber);
      break;
    case "-":
      return subtract(firstNumber, secondNumber);
      break;
    case "*":
      return multiply(firstNumber, secondNumber);
      break;
    case "/":
      return divide(firstNumber, secondNumber);
      break;
  }
};
