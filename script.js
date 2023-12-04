const displayTop = document.querySelector(".expression-displayer-top");
const displayBot = document.querySelector(".expression-displayer");

const buttons = document.querySelectorAll(".button");
let expression = "";
let waitingSecondOperand = false;
buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    let input = event.target.textContent;
    handleInput(input);
  });
});

function evalExpression(expression) {
  let operationRegex = /[+\-*\/]/g;
  let operation = expression.match(operationRegex).pop();
  let leftOperand = 0;
  let rightOperand = 0;
  if (expression.match(/[.]/g)) {
    leftOperand = parseFloat(
      expression.slice(0, expression.indexOf(operation))
    );
    rightOperand = parseFloat(
      expression.slice(expression.indexOf(operation) + 1)
    );
  } else {
    leftOperand = parseInt(expression.slice(0, expression.indexOf(operation)));
    rightOperand = parseInt(
      expression.slice(expression.indexOf(operation) + 1)
    );
  }

  if (leftOperand === 0 || rightOperand === 0 || operation === "/") {
    alert("It's impossible to divide 0 by 0");
    return "";
  }

  switch (operation) {
    case "+":
      return `${leftOperand + rightOperand}`;
    case "-":
      return `${leftOperand - rightOperand}`;
    case "*":
      return `${leftOperand * rightOperand}`;
    case "/":
      return `${leftOperand / rightOperand}`;
  }
  // return a string, the result of the expression.
}
function handleInput(input) {
  switch (input) {
    case "+":
    case "-":
    case "*":
    case "/":
      if (displayBot.textContent === "" && displayTop.textContent === "") {
        break;
      }
      if (waitingSecondOperand === true) {
        let resultOfExpression = evalExpression(
          displayTop.textContent + displayBot.textContent
        );
        displayBot.textContent = "";
        displayTop.textContent = resultOfExpression + input;
      } else {
        displayTop.textContent = displayBot.textContent + input;
        displayBot.textContent = "";
        waitingSecondOperand = true;
      }
      break;
    case ".":
      if (!displayBot.textContent.match(/[.]/g)) {
        displayBot.textContent += ".";
      }
      break;
    case "=":
      if (displayBot.textContent === "" || displayTop.textContent === "") {
        break;
      }
      displayBot.textContent = evalExpression(
        displayTop.textContent + displayBot.textContent
      );
      displayTop.textContent = "";
      waitingSecondOperand = false;
      break;
    case "Clear":
      displayBot.textContent = "";
      displayTop.textContent = "";
      waitingSecondOperand = false;
      break;
    default:
      displayBot.textContent += input;
  }
}
