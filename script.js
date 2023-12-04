const displayTop = document.querySelector(".expression-displayer-top");
const displayBot = document.querySelector(".expression-displayer");

const buttons = document.querySelectorAll(".button");
let expression = "";
buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    displayBot.textContent = displayBot.textContent + event.target.textContent;
  });
});

let waitingSecondOperand = false;
displayBot.addEventListener("change", (event) => {
  let lastInput = event.target.textContent.slice(
    event.target.textContent.length,
    -1
  );
  console.log(lastInput);
});
