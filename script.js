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
      secondNumber = parseInt(tempValue);
      storedValue = parseInt(tempValue);
      display.innerText = tempValue;
      operator = item.textContent;
      activeState = "reset";
    } else if (operator === undefined || tempValue === 0) {
      operator = item.textContent;
    } else {
      storedValue = operate(operator, parseInt(storedValue), parseInt(tempValue));
      display.innerText = storedValue;
      operator = item.textContent;
      activeState = "reset";
    }
  });
});

equalsButton.addEventListener("click", () => {
  if (storedValue === "") {
  } else if (operator === undefined) {
    storedValue = operate(operatorMemory, parseInt(storedValue), parseInt(tempValue));
    display.innerText = storedValue;
    activeState = "reset";
  } else {
    storedValue = operate(operator, parseInt(storedValue), parseInt(tempValue));
    operatorMemory = operator;
    operator = undefined;
    display.innerText = storedValue;
    activeState = "reset";
  }
});

minusButton.addEventListener("click", () => {
  if ((operator === undefined) & (storedValue === "")) {
    storedValue = parseInt(tempValue) * -1;
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
  // tempValue can be a number after operations or clearing the calculator.
  // Converting it to a string prevents runtime errors when using split.
  if (tempValue.toString().split(".").length < 2) {
    tempValue = tempValue.toString() + ".";
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

// Play a short "fat" noise when the button is clicked
const noiseButton = document.getElementById("noise-button");
if (noiseButton) {
  noiseButton.addEventListener("click", () => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(120, ctx.currentTime);
    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.3);
  });
}
