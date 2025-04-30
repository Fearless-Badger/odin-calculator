const nums = Array.from(document.querySelectorAll(".nums button"));

// Display DOM variables
const DISPLAY_ELEMENT = document.querySelector(".display");
let display = document.querySelector(".display").textContent;

// Number DOM variables, add event listeners
const NUMBER_BUTTONS = Array.from(document.querySelectorAll(".nums button"));

NUMBER_BUTTONS.slice(0, NUMBER_BUTTONS.length-1).map((element) => {
  element.addEventListener("click", () => add_to_display(element.textContent));
});

NUMBER_BUTTONS.slice(-1)[0].addEventListener("click", () => evaluate_expression());


// Calculator Logic
let operator_present = false;
let expression = "";

function evaluate_expression(){
    console.log("Evaluate");
}

function add_to_display(val) {
  display += val;
  DISPLAY_ELEMENT.textContent = display;
}

function parse_display() {
  console.log(display);
}

function add_to_expression(val) {

}

function add(alpha, beta) {
  return +alpha + +beta;
}

function subtract(alpha, beta) {
  return +alpha - +beta;
}

function multiply(alpha, beta) {
  return +alpha * +beta;
}

function divide(alpha, beta) {
  if (+beta === 0) {
    return "Blackhole";
  }
  return +alpha / +beta;
}
