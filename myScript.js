let displayVal = "",
    operand1 = null,
    operand2 = null,
    currOperand = null,
    operator = null,
    decimalAllowed = true;
    result = null;
    


function add(op1, op2) {
    return op1 + op2;
}

function multiply(op1, op2) {
    return op1 * op2;
}

function divide(op1, op2) {
    while (op2 === 0) {
        op2 = prompt("Dividing by Zero is not allowed. Enter new Value for operand two");
    }
    return op1 / op2;
}

function subtract(op1, op2) {
    return op1 - op2;
}

function operate(op1, op2, operator) {
    if (operator === "addition") {
        return add(op1, op2);
    } else if (operator === "subtraction") {
        return subtract(op1, op2);
    } else if (operator === "multiplication") {
        return multiply(op1, op2);
    } else if (operator === "division") {
        return divide(op1, op2);
    }
}

function evalute() {
    if (operand1 != null && operand2 != null && operator != null) {
        result = operate(operand1, operand2, operator);
        changeResultVal();
        operand1 = null;
        operand2 = null;
        operator = null;
    } else {

        giveError("You need to enter a valid expression to evaluate it.")

    }

}




let buttonPar = document.querySelector(".buttonContainer");
buttonPar.addEventListener('click', function (event) {
    handleClick(event.target.id);
});

function handleClick(id) {
    removeErrorMessage();
    if (isOperator(String(id))) {

        handleOperator(id);
    } else if (isSpecialButton(id)) {
        handleSpecialButton(id);
    } else {
        handleOperand(id);
    }
}

function changeResultVal() {
    let myResult = document.querySelector("#result");
    if (result === null)
        myResult.textContent = 0;
    else
        myResult.textContent = result;
}

function changeDispVal() {
    let inputStr = document.querySelector("#inputString");
    if (displayVal === "")
        inputStr.textContent = 0;
    else {
        inputStr.textContent = displayVal;
    }
}

function changeDispValOperator(operator1) {
    if (operator1 === "addition") {
        displayVal += "+";
        changeDispVal();
    } else if (operator1 === "subtraction") {
        displayVal += "-";
        changeDispVal();
    } else if (operator1 === "multiplication") {
        displayVal += "*";
        changeDispVal();
    } else if (operator1 === "division") {
        displayVal += "/";
        changeDispVal();
    }
}

function isOperator(id) {
    if (id === "addition" || id === "multiplication" || id === "division" || id === "subtraction" || id === "modulus") {
        return true;
    } else {
        return false;
    }
}

function isSpecialButton(id) {
    if (id === "clear" || id === "back" || id === "equals" || id === "decimal") {
        return true;
    } else {
        return false;
    }
}

function handleSpecialButton(id) {
    if (id === "clear") {
       clearEverything();
    } else if (id === "back") {
        handleBackOperation();
    } else if (id === "equals") {
        evalute();
    } else if(id ==="decimal"){
        handleDecimal();
    }

}



function handleOperand(id) {
    if(result != null && operator === null){
        clearEverything();
    }
    if (operator === null) {
        if (operand1 === null) {
            operand1 = parseInt(id);
        } else {
            operand1 = operand1 * 10;
            operand1 += parseInt(id);
        }
        displayVal += id;
        changeDispVal();
    } else {
        if (operand2 === null) {
            operand2 = (parseInt(id));
        } else {
            operand2 *= 10;
            operand2 += parseInt(id);
        }
        displayVal += id;
        changeDispVal();
    }
}

function handleOperator(id) {
    //If user is trying to solve a complex equation.
    if (operator != null && operand1 != null && operand2 != null) {
        let tempOperator = operator;
        evalute();
        displayVal = result;
        changeDispVal();
        operator = id;
        changeDispValOperator(id);
        operand1 = result;
    }

    //IF user is trying to use result of previous calculation as operand1
    else if (operand1 === null && result != null) {
        operand1 = result;
        operator = id;
        changeDispValOperator(String(id));
        displayVal = result;
        changeDispValOperator(id);
        changeDispVal();
        result = null;
        changeResultVal();
    }
    //if user is trying to perform a simple calculation.   
    else if (operand1 != null) {
        operator = id;
        changeDispValOperator(String(id));
    } else {
        giveError("You need to give value of operand before selecting operator");
    }
}

function handleBackOperation(){
    let myChar = displayVal.charAt(displayVal.length-1);
    if(isOperator(myChar)){
        operator = null;
    }
    else{
        if(operator === null && operand1>10){
            operand1 = Math.floor(operand1/10);
        }
        else if(operator === null && operand1<=10){
            operand1=0;
        }
        else if(operator!= null && operand2>10){
            operand2 = Math.floor(operand2/10);
        }
            
        else{
            operand2=0;
        }
    }

    displayVal = displayVal.slice(0,displayVal.length-1);
    changeDispVal();
}

function handleDecimal(){
    if(decimalAllowed===false){
        return;
    } 
    if(operator === null){
        operand1 = operand1+0.0;
        decimalAllowed = false;
        displayVal += ".";
        changeDispVal();
    }
}

function giveError(string) {
    let errorMsg = document.querySelector(".errorMessage");
    errorMsg.textContent = string;
    errorMsg.style.display = "block"
}

function removeErrorMessage() {
    let errorMsg = document.querySelector(".errorMessage");
    //errorMsg.textContent = "";
    errorMsg.style.display = "none";
}

function clearEverything(){
    displayVal = "";
    changeDispVal();
    operator = null;
    result = null;
    changeResultVal();
    currOperand = null;
    operand1 = null;
    operand2 = null;
}