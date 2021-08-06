let displayVal, operand1=null, operand2=null, currOperand = null, operator=null,result=null;


function add(op1, op2){
    return op1+op2;
}

function multiply(op1,op2){
    return op1*op2;
}

function divide(op1,op2){
    while(op2===0){
        op2 = prompt("Dividing by Zero is not allowed. Enter new Value for operand two");
    }
   return op1/op2;
}

function subtract(op1,op2){
    return op1-op2;
}

function operate(op1, op2, operator){
    if(operator === "additon"){
        return add(op1,op2);
    } else if(operator === "subtraction"){
        return subtract(op1,op2);
    } else if(operator === "mutiplication"){
        return multiply(op1,op2);
    } else if(operator === "division"){
        return divide(op1,op2);
    }
}

function changeDispVal(){
    let inputStr = document.querySelector("#inputString");
    inputStr.textContent = displayVal;
}

let buttonPar = document.querySelector(".buttonContainer");
buttonPar.addEventListener('click', function(event){
    handleClick(event.target.id);
});

function handleClick(id){
    if(isOperator( String(id) ) ){
        if(currOperand ===0){
            operand11 = result;
        } else{
            operand1 = currOperand;
        }
        operator = id;
    }  
    
    else if(isSpecialButton(id)){
        handleSpecialButton(id);
    } else if(isOperand()){
        handleOperand();
    }


}


function isOperator(id){
    if(id==="addition" || id === "mutiplication" || id ==="division" || id ==="subtraction" || id ==="modulus"){
        return true;
    }  
    else{
        return false;
    }    
}

function isSpecialButton(id){
    if(id === "clear" || id==="back" || id === "equals" || id==="decimal"){
        return true;
    }
    else {
        return false;
    }
}

function handleSpecialButton(id){
    if(id ==="clear"){
        displayVal = 0;
        changeDispVal();
        operator = "";
        result = 0;
        changeResultVal();
        currOperand = 0;
        operand1 = 0;
        operand2 = 0;
    } else if(id === "back"){
        handleBackOperation();
    } else if(id === "equals"){
        if(operand1 != null && operand22 != null && operator != null){
            result = operate(operand1,operand2,operator);
            changeResultVal;
        }
        else{
            let errorMsg = document.querySelector(".errorMessage");
            errorMsg.textContent = "You need to enter a valid expression to evaluate it.";
            erroMsg.style.display= "block"
        }
         
    }

}

function changeResultVal(){
    let myResult = document.querySelector("#result");
    myResult.textContent = result;
}