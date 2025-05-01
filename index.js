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
let prevent_alpha_delete = false;
let lock_num_input = false;

let abort = false;

function clear_display() {
  DISPLAY_ELEMENT.textContent = "";
}

function flash_to_display(foo) {
  if (isNaN(+DISPLAY_ELEMENT.textContent)) {
    clear_display();
  } else if (displaying_result === true) {
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
      if (answer === "BLACKHOLE!"){
        clear_memory();
        flash_to_display(answer);
        abort = true;
        return "";
      }
      break;
    case "":
      answer = a;
      break;
  }

  const rounded_answer = Number.isInteger(+answer)
    ? +answer
    : +answer.toFixed(2);

  flash_to_display(rounded_answer);
  displaying_result = true;
  operator = "";
  clear_all_operator_style();

  beta = "";
  alpha = rounded_answer.toString();

  return alpha;
}

function num_pressed(number) {
  if (lock_num_input=== true){
    clear_memory();
  }

  if (displaying_result === true && operator === "" ){
    clear_memory();
  }

  if (alpha === "") {
    if (number === "0"){
      return;
    }
    alpha += number;
    flash_to_display(alpha);
  } else if (alpha !== "" && operator === "" && beta === "") {

    alpha += number;
    flash_to_display(alpha);
  } else {
    beta += number;
    flash_to_display(beta);
  }
}

function equal_pressed() {
  if (!alpha) {
    flash_to_display("Enter an expression!");
    clear_memory();
  } else {
    alpha = operate(alpha, operator, beta);
  }
}

function operator_pressed(oper) {
  if (alpha === "") {
    flash_to_display("Enter an expression!");
  } else if (alpha !== "" && beta === "") {
    lock_num_input = false;
    operator = oper;
    show_operator_select(operator);
  } else if (alpha !== "" && beta !== "") {
    lock_num_input = false;
    alpha = operate(alpha, operator, beta);
    if (abort === true){
      abort = false;
    } else {
    operator = oper;
    show_operator_select(operator);
    }
  }
  prevent_alpha_delete = true;
}

function delete_pressed() {
  if (alpha === "" && beta === "" && operator == "") {
    return;
  } else if (alpha !== "" && operator === "" && beta === "" && prevent_alpha_delete === true) {
    return;
    //clear_memory(); // either clear calculator memory, or ignore
  } else if ( alpha !== "" && operator === "" && beta === "" && prevent_alpha_delete === false) {
    alpha = remove_last_char(alpha);
    flash_to_display(alpha);
  } else if ( alpha !== "" && operator !== "" && beta === ""){
    operator = remove_last_char(operator);
    clear_all_operator_style();
    if (alpha !== ""){
      lock_num_input = true;
    }
  }
  else if ( alpha !== "" && operator !== "" && beta !== "" ){
    beta = remove_last_char(beta);
    flash_to_display(beta);
  }
}

function clear_memory() {
  clear_all_operator_style();
  DISPLAY_ELEMENT.textContent = "";
  alpha = "";
  beta = "";
  operator = "";
  prevent_alpha_delete = false;
  displaying_result = false;
  lock_num_input = false;
}

function remove_last_char(arg) {
  if (arg.length === 0) {
    console.log(`Can't remove char from "${arg}"`);
  } else {
    return arg.substring(0, arg.length - 1);
  }
}

// Operator style functions

const PLUS = document.querySelector(".plus");
const SUBTRACT = document.querySelector(".subtract");
const MULTIPLY = document.querySelector(".multiply");
const DIVIDE = document.querySelector(".divide");
const OPER_BUTTONS = [PLUS, SUBTRACT, MULTIPLY, DIVIDE]

let un_selected_color = "rgb(19, 136, 136)";
let selected_color = "#1dcd9f";

function oper_to_element(string){
  switch (string){
    case "+":
      return "plus";
    case "-":
      return "subtract";
    case "*":
      return "multiply";
    case "/":
      return "divide";
  }
}

function show_operator_select(selected){
  clear_all_operator_style();

  if (selected === ""){
    console.log("Tried to select an operator, but it was not detected.")
    return;
  }

  let name = oper_to_element(selected);
  for (let i = 0; i < OPER_BUTTONS.length ; i++){
    if (OPER_BUTTONS[i].classList.contains(name)){
      OPER_BUTTONS[i].classList.add("selected");
      break;
    }
  }
}

function clear_all_operator_style(){
  OPER_BUTTONS.forEach(button => button.classList.remove("selected"));
}



// Math functions

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
