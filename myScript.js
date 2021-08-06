let displayVal="", operand1=null, operand2=null, currOperand = null, operator=null,result=null;


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
    if(operator === "addition"){
        return add(op1,op2);
    } else if(operator === "subtraction"){
        return subtract(op1,op2);
    } else if(operator === "multiplication"){
        return multiply(op1,op2);
    } else if(operator === "division"){
        return divide(op1,op2);
    }
}

function changeDispVal(){
    let inputStr = document.querySelector("#inputString");
    if(displayVal === "")
        inputStr.textContent= 0;
    else{
        inputStr.textContent = displayVal;
    }
}

let buttonPar = document.querySelector(".buttonContainer");
buttonPar.addEventListener('click', function(event){
    handleClick(event.target.id);
});

function handleClick(id){
    removeErrorMessage();
    if(isOperator( String(id) ) ){
        if(operand1 === null && result != null){
                operand1 = result;
                operator = id;
                addDispValOperator(String(id));
                displayVal = result;
                addDispValOperator(id);
                changeDispVal();
               result = null;
               changeResultVal();
            }
        else if(operand1 != null){
            operator = id;
            addDispValOperator(String(id));
        }   
        else{
            giveError("You need to give value of operand before selecting operator");
        }
        // if()
        // if(currOperand === null){
        //     operand1 = result;
        // } else{
        //     operand1 = currOperand;
        // }
        
    }  
    
    else if(isSpecialButton(id)){
        handleSpecialButton(id);
    } else {
        handleOperand(id);
    }


}


function isOperator(id){
    if(id==="addition" || id === "multiplication" || id ==="division" || id ==="subtraction" || id ==="modulus"){
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
        displayVal = "";
        changeDispVal();
        operator = null;
        result = null;
        changeResultVal();
        currOperand = null;
        operand1 = null;
        operand2 = null;
    } else if(id === "back"){
        handleBackOperation();
    } else if(id === "equals"){
        if(operand1 != null && operand2 != null && operator != null){
            result = operate(operand1,operand2,operator);
            changeResultVal();
             operand1 =null;
             operand2 = null;
             operator= null;
        }
        else{
            
            giveError("You need to enter a valid expression to evaluate it.")
            
        }
         
    }

}

function changeResultVal(){
    let myResult = document.querySelector("#result");
    if(result ===null)
        myResult.textContent = 0;
    else
        myResult.textContent = result;    
}

function handleOperand(id){

    if(operator === null){
        if(operand1 === null){
            operand1 = parseInt(id);
        } else{
            operand1 = operand1*10;
            operand1 += parseInt(id);
        }
        displayVal += id;
        changeDispVal();
    } else{
        if(operand2 === null){
            operand2= (parseInt(id));
        } else{
            operand2 *= 10;
            operand2 +=parseInt(id);
        }
        displayVal += id;
        changeDispVal();
    }
}

function giveError(string){
    let errorMsg = document.querySelector(".errorMessage");
    errorMsg.textContent = string;
    errorMsg.style.display= "block"
}

function removeErrorMessage(){
    let errorMsg = document.querySelector(".errorMessage");
    //errorMsg.textContent = "";
    errorMsg.style.display="none";
}

function addDispValOperator(operator1){
    if(operator1 === "addition"){
        displayVal += "+";
        changeDispVal();
    } else if(operator1 === "subtraction"){
        displayVal += "-";
        changeDispVal();
    } else if(operator1 === "multiplication"){
        displayVal += "*";
        changeDispVal();    
    } else if(operator1 === "division"){
        displayVal += "/";
        changeDispVal();
    }
}

