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

    swapOperation() {
       if(this.currentScreenText === '') return
       const current = parseFloat(this.currentScreenText);
       this.currentScreenText = current * -1;
        
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

const equalsButton = document.querySelector('[data-equals]');
const clearButton = document.querySelector('[data-all-clear]');
const swapButton = document.querySelector('[data-swap-operand]');
const operationButtons = document.querySelectorAll('[data-operation]');
const numbersButtons = document.querySelectorAll('[data-number]');
const previousScreen = document.querySelector('[data-previous]');
const currentScreen = document.querySelector('[data-current]');

const calculator = new Calculator(previousScreen, currentScreen);

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

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

clearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

swapButton.addEventListener('click', button => {
    calculator.swapOperation();
    calculator.updateDisplay();
})
