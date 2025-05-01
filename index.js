// Display DOM variable
const DISPLAY_ELEMENT = document.querySelector(".display");

// Number DOM variables, add event listeners
const NUMBER_BUTTONS = Array.from(document.querySelectorAll(".nums button"));

NUMBER_BUTTONS.slice(0, NUMBER_BUTTONS.length - 1).map((element) => {
  element.addEventListener("click", () => num_pressed(element.textContent));
});

NUMBER_BUTTONS.slice(-1)[0].addEventListener("click", () => equal_pressed());

// Operator listeners

const OPERATOR_BUTTONS = Array.from(
  document.querySelectorAll(".operators button")
);
OPERATOR_BUTTONS.map((element) => {
  element.addEventListener("click", () => {
    operator_pressed(element.textContent);
  });
});

// Delete and Clear logic

const CONTROLLER_ARRAY = Array.from(
  document.querySelectorAll(".controller button")
);

const DELETE = CONTROLLER_ARRAY[0];
const CLEAR = CONTROLLER_ARRAY[1];

DELETE.addEventListener("click", () => delete_pressed());
CLEAR.addEventListener("click", () => clear_memory());

// calculator functions

let alpha = "";
let beta = "";
const OPERATORS = ["+", "-", "*", "/"];
let operator = "";
let displaying_result = false;

function clear_display() {
  DISPLAY_ELEMENT.textContent = "";
}

// function append_to_display(foo) {
//   if (isNaN(+DISPLAY_ELEMENT.textContent)) {
//     clear_display();
//   }
//   DISPLAY_ELEMENT.textContent += foo;
// }

function flash_to_display(foo) {
  if (isNaN(+DISPLAY_ELEMENT.textContent)) {
    clear_display();
  }
  else if (displaying_result === true) {
    clear_display();
    displaying_result = false;
  }
  DISPLAY_ELEMENT.textContent = foo;
}

function operate(a, func, b = "") {
  a = +a;
  b = +b;

  clear_display();

  console.log(`OPERATE: ${a} ${func} ${b}`);

  let answer;
  switch (func) {
    case "+":
      answer = add(a, b);
      break;
    case "-":
      answer = subtract(a, b);
      break;
    case "*":
      answer = multiply(a, b);
      break;
    case "/":
      answer = divide(a, b);
      break;
  }

  
  const rounded_answer = Number.isInteger(+answer) ? +answer : +answer.toFixed(2);

  flash_to_display(rounded_answer);
  displaying_result = true;
  operator = "";

  beta = "";
  alpha = rounded_answer.toString();

  return alpha;
}

function num_pressed(number) {
  if (alpha === "") {
    alpha += number;
    flash_to_display(alpha);
  } else if (alpha !== "" && operator === "" && beta === "") {
    alpha += number;
    flash_to_display(alpha);
  } else if (alpha !== "" && operator !== "" && beta === "") {
    beta += number;
    flash_to_display(beta);
  } else if (alpha !== "" && operator !== "" &&beta !== "") {
    beta += number;
    flash_to_display(beta);
  }
}

function equal_pressed() {
  if (!alpha) {
    flash_to_display("Enter an expression!");
  } else {
    alpha = operate(alpha, operator, beta);
  }
}

function operator_pressed(oper) {
  if (alpha === "") {
    flash_to_display("Enter an expression!");
  } else if (alpha !== "" && beta === "") {
    operator = oper;
  } else if (alpha !== "" && beta !== "") {
    alpha = operate(alpha, operator, beta);
    operator = oper;
  }
}

function delete_pressed() {
  
}

function clear_memory() {
  DISPLAY_ELEMENT.textContent = "";
  alpha = "";
  beta = "";
  operator = "";
}

// Operator functions

function add(alpha, beta = 0) {
  return +alpha + +beta;
}

function subtract(alpha, beta = 0) {
  return +alpha - +beta;
}

function multiply(alpha, beta = 1) {
  return +alpha * +beta;
}

function divide(alpha, beta = 1) {
  if (+beta === 0) {
    return "BLACKHOLE!";
  }
  return +alpha / +beta;
}
