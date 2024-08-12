
document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    const clearButton = document.getElementById('clear');
    const equalButton = document.getElementById('equal');

    let currentInput = '';
    let fullExpression = '';
    let operator = null;
    let previousInput = null;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            if (value === '.' && currentInput.includes('.')) return;

            if (currentInput === '' && value === '.') {
                currentInput = '0.';
            } else {
                currentInput += value;
            }

            fullExpression += value;
            display.textContent = fullExpression;
        });
    });

    clearButton.addEventListener('click', () => {
        currentInput = '';
        fullExpression = '';
        operator = null;
        previousInput = null;
        display.textContent = '0';
    });

    equalButton.addEventListener('click', () => {
        if (operator && previousInput !== null) {
            currentInput = String(operate(operator, previousInput, parseFloat(currentInput)));
            fullExpression = currentInput;
            display.textContent = currentInput;
            operator = null;
            previousInput = null;
        }
    });

    document.querySelectorAll('.operator').forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');
            
            if (operator && previousInput !== null) {
                currentInput = String(operate(operator, previousInput, parseFloat(currentInput)));
                fullExpression = currentInput;
                display.textContent = fullExpression;
            }

            // Avoid multiple consecutive operators
            if (/[+\-*/]/.test(fullExpression.slice(-1))) {
                fullExpression = fullExpression.slice(0, -1) + value;
            } else {
                fullExpression += value;
            }

            operator = value;
            previousInput = parseFloat(currentInput);
            currentInput = '';
            display.textContent = fullExpression;
        });
    });

    function operate(operator, a, b) {
        switch (operator) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                return a / b;
            default:
                return b;
        }
    }
});
