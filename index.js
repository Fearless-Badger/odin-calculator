// Calculator Logic
let operator_present = false;
let operator = "";
let expression = "";
const OPERATORS = ["+", "-", "*", "/"];
let ans = "";
let result_displayed = false;

// Display DOM variables
const DISPLAY_ELEMENT = document.querySelector(".display");
let display = document.querySelector(".display").textContent;

// Number DOM variables, add event listeners
const NUMBER_BUTTONS = Array.from(document.querySelectorAll(".nums button"));

NUMBER_BUTTONS.slice(0, NUMBER_BUTTONS.length - 1).map((element) => {
  element.addEventListener("click", () => add_to_display(element.textContent));
});

NUMBER_BUTTONS.slice(-1)[0].addEventListener("click", () => operate());

// Operator listeners

const OPERATOR_BUTTONS = Array.from(
  document.querySelectorAll(".operators button")
);
OPERATOR_BUTTONS.map((element) => {
  element.addEventListener("click", () => {
    add_to_expression(element.textContent);
  });
});

// Delete and Clear logic

const CONTROLLER_ARRAY = Array.from(
  document.querySelectorAll(".controller button")
);

const DELETE = CONTROLLER_ARRAY[0];
const CLEAR = CONTROLLER_ARRAY[1];

DELETE.addEventListener("click", () => display_delete());
CLEAR.addEventListener("click", () => clear_memory());

function clear_display() {
  display = "";
  DISPLAY_ELEMENT.textContent = "";
}

function display_delete() {
  if (display && result_displayed===false) {
    display = display.slice(0, display.length - 1);
    expression = expression.slice(0, expression.length - 1);
    DISPLAY_ELEMENT.textContent = display;
  }
}

function clear_memory() {
  result_displayed = false;
  operator="";
  ans ='';
  clear_display();
  expression = "";
  operator_present = false;
}

function help(answer) {
  DISPLAY_ELEMENT.textContent = answer;
  expression = answer;
  ans = answer;
  operator = "";
  result_displayed = true;
}

function operate() {
  clear_display();
  //console.log(`Evaluate : ${expression}`);

  if (!expression) {
    DISPLAY_ELEMENT.textContent = "Enter an expression!";
  } else if (expression && !operator_present) {
    DISPLAY_ELEMENT.textContent = expression;
  } else {
    let nums;
    let answer;
    switch (operator) {
      case "+":
        nums = expression.split("+");
        answer = add(nums[0], nums[1]).toFixed(2);
        help(answer);
        break;
      case "-":
        nums = expression.split("-");
        answer = subtract(nums[0], nums[1]).toFixed(2);
        help(answer);
        break;
      case "*":
        nums = expression.split("*");
        answer = multiply(nums[0], nums[1]).toFixed(2);
        help(answer);
        break;
      case "/":
        nums = expression.split("/");
        answer = divide(nums[0], nums[1]).toFixed(2);
        help(answer);
        break;
    }
  }

  operator_present = false;
}

function add_to_display(val) {
  if (result_displayed){
    clear_memory();
  }
  display += val;
  DISPLAY_ELEMENT.textContent = display;
  add_to_expression(val);
}

function parse_display() {
  //console.log(display);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function add_to_expression(val) {
  //console.log("val = " + val);
  let is_operator = OPERATORS.includes(val);
  if (expression === "" && is_operator) {
    DISPLAY_ELEMENT.textContent = "Enter a number first!";
  } else if (operator_present && is_operator) {
    operate();
    operator_present = true;
    operator = val;
    expression = ans + operator;
    DISPLAY_ELEMENT.textContent = ans;
  } else if (is_operator) {
    operator = val;
    clear_display();
    operator_present = true;
    expression += val;
  } else if (operator_present===false && ans==="" && is_operator) {
    DISPLAY_ELEMENT.textContent = "Enter an operator";
  } else {
    expression += val;
  }
}

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
