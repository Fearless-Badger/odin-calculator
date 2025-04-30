console.log("Hello, calculator");

function add(alpha, beta){
    return +(alpha) + +(beta);
}

function subtract(alpha, beta){
    return +(alpha) - +(beta);
}

function multiply(alpha, beta){
    return +(alpha) * +(beta);
}

function divide(alpha, beta){
    if (+beta === 0){
        return "Blackhole";
    }
    return +(alpha) / +(beta);
}
