alert("Hello! Welcome to my Online Calculator \nThe Commands are simple:\n+, -, /, *, and % correspond to their button counterparts\n'0-9' & '.' also correspond to their button counterparts\n'C' is for clear\n'Enter' does not calculate your answer please use '=' instead\n and finally 'N' is to swap operand (- or +)\n Thank you for using this calculator, Enjoy!")

// Calculator class that holds all functions
class Calculator {
    constructor(previousScreen, currentScreen) {
        this.previousScreen = previousScreen;
        this.currentScreen = currentScreen;
        this.clear();
    }
    // clear function
    clear() {
        this.previousScreenText = '';
        this.currentScreenText = '';
        this.operation = undefined;
    } 
    // swap operation (- or +) function
    swapOperation() {
       if(this.currentScreenText === '') return
       const current = parseFloat(this.currentScreenText);
       this.currentScreenText = current * -1;
        
    }
    // Adds numbers to screen function
    addScreen(number) {
        if (number === '.' && this.currentScreenText.includes('.')) return
        this.currentScreenText = this.currentScreenText.toString() + number.toString();
        
    }
    // Choose Operation + - / * % function
    chooseOperation(operation) {
        if (this.currentScreenText === '') return
        if (this.previousScreenText !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousScreenText = this.currentScreenText;
        this.currentScreenText = '';
    }
    // calculate function
    compute() {
        let computation;
        const prev = parseFloat(this.previousScreenText);
        const current = parseFloat(this.currentScreenText);
        if (isNaN===(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case 'x':
                computation = prev * current;
                break;
            case '÷':
                if ((prev !== 0) && (current !== 0)) {
                    computation = prev/current;
                }
                else {
                    computation = 'ERROR';                     
                }
                break;
            case '%':
                computation = prev * (current*.01);
                break;
            default:
                return;
        }
          
        this.currentScreenText = computation;
        this.operation = undefined;
        this.previousScreenText = '';
    }
    //Changes screen display
    updateDisplay() {
        this.currentScreen.innerText = this.currentScreenText;
        if (this.operation != null) {
            this.previousScreen.innerText = `${this.previousScreenText} ${this.operation}`;
        }
        else {
            this.previousScreen.innerText = '';
        }
        
    }
}

// Initializing all variables pulling from HTML via Data
const equalsButton = document.querySelector('[data-equals]');
const clearButton = document.querySelector('[data-all-clear]');
const swapButton = document.querySelector('[data-swap-operand]');
const operationButtons = document.querySelectorAll('[data-operation]');
const numbersButtons = document.querySelectorAll('[data-number]');
const previousScreen = document.querySelector('[data-previous]');
const currentScreen = document.querySelector('[data-current]');

// Function for easier accessability to call
const calculator = new Calculator(previousScreen, currentScreen);


// Begin Button Arguments
// Begin Keyboard Arguments
document.addEventListener("keydown", function(event) {
    if (currentScreen.innerText === 'ERROR') {
        calculator.clear();
        calculator.updateDisplay();
    }
    if(/^[0-9]$/i.test(event.key) == true){
       calculator.addScreen(event.key);
       calculator.updateDisplay();
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'c') {
        calculator.clear();
        calculator.updateDisplay();
    }
})

document.addEventListener('keydown', function(event) {
    if (event.key === 'n') {
        if (currentScreen.innerText === 'ERROR') {
            calculator.clear();
            calculator.updateDisplay();
        }
        calculator.swapOperation();
        calculator.updateDisplay();
    }
})

document.addEventListener('keydown', function(event) {
    if (event.key === '.') {
        if (currentScreen.innerText === 'ERROR') {
            calculator.clear();
            calculator.updateDisplay();
        }
        calculator.addScreen(event.key);
        calculator.updateDisplay();
    }
})

document.addEventListener("keydown", function(event) {
    switch(event.key) {
        case '=':
            calculator.compute();
            calculator.updateDisplay();
            break;
        case '+':
            if (currentScreen.innerText === 'ERROR') {
                calculator.clear();
                calculator.updateDisplay();
            }
            calculator.chooseOperation('+');
            calculator.updateDisplay();
        case '-':
            if (currentScreen.innerText === 'ERROR') {
                calculator.clear();
                calculator.updateDisplay();
            }
            calculator.chooseOperation('-');
            calculator.updateDisplay();
        case '/':
            if (currentScreen.innerText === 'ERROR') {
                calculator.clear();
                calculator.updateDisplay();
               }
            calculator.chooseOperation('÷');
            calculator.updateDisplay();
        case '*':
            if (currentScreen.innerText === 'ERROR') {
                calculator.clear();
                calculator.updateDisplay();
            }
            calculator.chooseOperation('x');
            calculator.updateDisplay();
        case '%':
            if (currentScreen.innerText === 'ERROR') {
                calculator.clear();
                calculator.updateDisplay();
            }
            calculator.chooseOperation('%');
            calculator.updateDisplay();    
        default: 
            return;
    }
});
// End Keyboard Arguments
// Add numbers to screen
numbersButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (currentScreen.innerText === 'ERROR') {
            calculator.clear();
            calculator.updateDisplay();
        }
        calculator.addScreen(button.innerText)
        calculator.updateDisplay()
    })
    
})

// Choose Operation
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (currentScreen.innerText === 'ERROR') {
            calculator.clear();
            calculator.updateDisplay();
        }
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
        
    })
})

// Equal Button
equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

// Clear Screen
clearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

// Swap operand
swapButton.addEventListener('click', button => {
    if (currentScreen.innerText === 'ERROR') {
        calculator.clear();
        calculator.updateDisplay();
    }
    calculator.swapOperation();
    calculator.updateDisplay();
})
// End Button arguments