const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculator-keys");
const display = calculator.querySelector(".calculator-display");
const operatorKeys = keys.querySelectorAll('[data-type="operator"]');

keys.addEventListener("click", (event) => {
    const key = event.target;
    const keyValue = key.textContent;
    const displayValue = display.textContent;
    const { type } = key.dataset;
    const { previousKeyType } = calculator.dataset;

    if (type === "number") {
        if (displayValue.length > 16) return;
        if (displayValue.length > 7) {
            display.style.fontSize = "2rem";
        }
        if (displayValue === "0" || previousKeyType === "operator") {
            display.textContent = keyValue;
        } else {
            display.textContent = displayValue + keyValue;
        }
    }

    if (type === "operator") {
        operatorKeys.forEach((el) => {
            el.dataset.state = "";
        });
        key.dataset.state = "selected";

        calculator.dataset.firstNumber = displayValue;
        calculator.dataset.operator = key.dataset.key;
    }

    if (type === "equal") {
        const firstNumber = calculator.dataset.firstNumber;
        const operator = calculator.dataset.operator;
        const secondNumber = displayValue;
        display.textContent = calculate(firstNumber, operator, secondNumber);
    }

    if (type === "clear") {
        display.textContent = "0";
        delete calculator.dataset.firstNumber;
        delete calculator.dataset.operator;
    }

    calculator.dataset.previousKeyType = type;
});

function calculate(firstNumber, operator, secondNumber) {
    firstNumber = parseInt(firstNumber);
    secondNumber = parseInt(secondNumber);

    switch (operator) {
        case "plus":
            return firstNumber + secondNumber;
        case "minus":
            return firstNumber - secondNumber;
        case "multiply":
            return firstNumber * secondNumber;
        case "divide":
            return firstNumber / secondNumber;
    }
}
