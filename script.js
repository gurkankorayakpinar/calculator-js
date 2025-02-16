const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";
let operator = "";
let previousInput = "";

function clearCalculator() {
    currentInput = "";
    operator = "";
    previousInput = "";
    display.value = "";
}

function calculateResult() {
    if (previousInput && operator && currentInput) {
        const num1 = parseFloat(previousInput);
        const num2 = parseFloat(currentInput);

        if (isNaN(num1) || isNaN(num2)) {
            display.value = "Error";
            return;
        }

        let result;
        try {
            switch (operator) {
                case "+":
                    result = num1 + num2;
                    break;
                case "-":
                    result = num1 - num2;
                    break;
                case "*":
                    result = num1 * num2;
                    break;
                case "/":
                    if (num2 === 0) {
                        throw new Error("0'a bölemezsiniz");
                    }
                    result = num1 / num2;
                    break;
                default:
                    display.value = "Error";
                    return;
            }
        } catch (error) {
            display.value = error.message;
            return;
        }

        display.value = result;
        previousInput = result.toString();
        currentInput = "";
        operator = "";
    }
}

function handleOperator(value) {
    if (currentInput) {
        if (previousInput) {
            calculateResult();
        } else {
            previousInput = currentInput;
        }
        currentInput = "";
    }
    operator = value;
    display.value = `${sanitize(previousInput)} ${operator}`;
}

function handleNumber(value) {
    currentInput += value;
    display.value = operator ? `${sanitize(previousInput)} ${operator} ${sanitize(currentInput)}` : sanitize(currentInput);
}

function sanitize(input) {
    const element = document.createElement('div');
    element.innerText = input;
    return element.innerHTML;
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.getAttribute("data-value");

        if (value === "C") {
            clearCalculator();
        } else if (value === "=") {
            calculateResult();
        } else if (button.classList.contains("operator")) {
            handleOperator(value);
        } else {
            handleNumber(value);
        }
    });
});

// "Sağ tık ile menü açma" özelliği devre dışı
document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
});