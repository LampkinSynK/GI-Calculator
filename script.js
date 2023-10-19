class Calculator {
    constructor(previousScreen, currentScreen) {
        this.previousScreen = previousScreen;
        this.currentScreen = currentScreen;
        this.clear();
    }

    clear() {
        this.previousScreenText = '';
        this.currentScreenText = '';
        this.operation = undefined;
    } 

    swap() {
         
    }

    addScreen(number) {
        if (number === '.' && this.currentScreenText.includes('.')) return
        this.currentScreenText = this.currentScreenText.toString() + number.toString();
        
    }

    chooseOperation(operation) {
        if (this.currentScreenText === '') return
        if (this.previousScreenText !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousScreenText = this.currentScreenText;
        this.currentScreenText = '';
    }

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
                computation = prev/current;
                break;
            case '%':
                computation = prev%current;
                break;
            default:
                return;
        }
        this.currentScreenText = computation;
        this.operation = undefined;
        this.previousScreenText = '';
    }

    updateDisplay() {
        this.currentScreen.innerText = this.currentScreenText;
        this.previousScreen.innerText = this.previousScreenText;
    }
}

const equalsButton = document.querySelector('[data-equals]');
const clearButton = document.querySelector('[data-all-clear]');
const swapButton = document.querySelector('[data-sawp-operand]');
const operationButtons = document.querySelectorAll('[data-operation]');
const numbersButtons = document.querySelectorAll('[data-number]');
const previousScreen = document.querySelector('[data-previous]');
const currentScreen = document.querySelector('[data-current]');

const calculator = new Calculator(previousScreen, currentScreen);

numbersButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.addScreen(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

clearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

// add = (a,b) => {
//     return a+b;
// }

// subtract = (a,b) => {
//     return a-b;
// }

// divide = (a,b) => {
//     if ((a != 0) && (b!=0)) {
//         return a/b;
//     }
//     else {
//         return false;
//     }
// }

// moduleo = (a,b) => {
//     if ((a != 0) && (b!=0)) {
//         return a%b;
//     }
//     else {
//         return false;
//     }
// }

// multiply = (a,b) => {
//     return a*b;
// }

