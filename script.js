let display = document.getElementById("display");
const equalsButton = document.getElementById("equals");
const minusButton = document.getElementById("+/-");
const decimal = document.getElementById("decimal");

display.innerText = "";
let storedValue = "";
let tempValue = 0;
let operator;
let activeState = "typing";
let operatorMemory;

document.querySelectorAll(".number").forEach((item) => {
  item.addEventListener("click", () => {
    if (activeState === "typing") {
      tempValue = display.innerText + item.textContent;
      display.innerText = tempValue;
    } else if (activeState === "reset") {
      display.innerText = item.textContent;
      tempValue = display.innerText;
      activeState = "typing";
    }
  });
});

document.querySelectorAll(".operator").forEach((item) => {
  item.addEventListener("click", () => {
    if (storedValue === "") {
      secondNumber = parseFloat(tempValue);
      storedValue = parseFloat(tempValue);
      display.innerText = tempValue;
      operator = item.textContent;
      activeState = "reset";
    } else if (operator === undefined || tempValue === 0) {
      operator = item.textContent;
    } else {
      storedValue = operate(operator, parseFloat(storedValue), parseFloat(tempValue));
      display.innerText = storedValue;
      operator = item.textContent;
      activeState = "reset";
    }
  });
});

equalsButton.addEventListener("click", () => {
  if (storedValue === "") {
  } else if (operator === undefined) {
    storedValue = operate(operatorMemory, parseFloat(storedValue), parseFloat(tempValue));
    display.innerText = storedValue;
    activeState = "reset";
  } else {
    storedValue = operate(operator, parseFloat(storedValue), parseFloat(tempValue));
    operatorMemory = operator;
    operator = undefined;
    display.innerText = storedValue;
    activeState = "reset";
  }
});

minusButton.addEventListener("click", () => {
  if ((operator === undefined) & (storedValue === "")) {
    storedValue = parseFloat(tempValue) * -1;
    display.innerText = storedValue;
    activeState = "reset";
  } else if (operator === undefined) {
    storedValue = storedValue * -1;
    display.innerText = storedValue;
  } else {
    tempValue = tempValue * -1;
    display.innerText = tempValue;
  }
});

decimal.addEventListener("click", () => {
  if (tempValue.split(".").length < 2) {
    tempValue = tempValue + ".";
    display.innerText = tempValue;
  }
});

let clearDispaly = () => {
  storedValue = "";
  tempValue = 0;
  display.innerText = storedValue;
};

document.getElementById("clear").addEventListener("click", clearDispaly);

//Math functions
const add = (a, b) => {
  return a + b;
};

const subtract = (a, b) => {
  return a - b;
};

const multiply = (a, b) => {
  return a * b;
};

const divide = (a, b) => {
  if (b === 0) {
    return "Ew! Don't divide by 0.";
  } else return a / b;
};

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
