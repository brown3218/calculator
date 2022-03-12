// Create the functions that populate the display when you click the number buttons… you should be storing the ‘display value’ in a variable somewhere for use in the next step.

let display = document.getElementById("display");
const equalsButton = document.getElementById("equals");

display.innerText = "";
let storedValue = "";
let tempValue = 0;
let displayValue = 0;
let operator;

const updateDisplayy = () => {
  display.innerText = displayValue;
};

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
      // store display as first number
      // storedValue = parseInt(tempValue);
      operator = item.textContent;
      secondNumber = parseInt(tempValue);
      storedValue = parseInt(tempValue);
      display.innerText = tempValue;
      activeState = "reset";
    } else {
      operator = item.textContent;
      secondNumber = parseInt(tempValue);
      storedValue = parseInt(operate(item.textContent, storedValue, secondNumber));
      display.innerText = storedValue;
      activeState = "reset";
    }
  });
});

equalsButton.addEventListener("click", () => {
  storedValue = operate(operator, parseInt(storedValue), parseInt(tempValue));
  tempValue = 0;
  display.innerText = storedValue;
});

//   item.addEventListener("click", () => {
//     storedValue = operate(operator, storedValue, tempValue);
//     display.innerText = storedValue;
//   });
// });

// equalsButton.forEach((item) => {
//     item.addEventListener("click", () => {
//         storedValue = operate(item.textContent, storedValue, tempValue)
//         display.innerText = storedValue;

let secondNumber = 0;
let activeState = "typing";

let clearDispaly = () => {
  storedValue = 0;
  tempValue = 0;
  display.innerText = 0;
};

document.getElementById("clear").addEventListener("click", clearDispaly);
// Create a new function operate that takes an operator and 2 numbers and then calls one of the above functions on the numbers.

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
  return a / b;
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

//pressOperater

// press +

// displayValue =3
// storedValue = 2
// tempValue
//operatorValue

//storedValue = 0
//When press number button, update display values

//When press operator button operate
//tempValue = displayValue
// storedValue = operate(item.contents, storedValue, tempValue)
//displayValue = storedValue

// storedValue = operate(item, storedValue, displayValue)
//display = stored value
