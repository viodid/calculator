let numbers1 = [];
let numbers2 = [];
let operation = [];

document
    .querySelector(".calculator")
    .addEventListener("click", function (event) {
        const input = event.target.tagName;
        const number1 = parseInt(numbers1.join(""));
        const number2 = parseInt(numbers2.join(""));
        let solution;
        if (input === "BUTTON") {
            let key = event.target.innerText;
            if (parseInt(key) || key === "0") {
                key = parseInt(key);
                if (operation.length === 0) {
                    numbers1.push(key);
                    solution = numbers1.join("");
                } else {
                    numbers2.push(key);
                    solution = numbers2.join("");
                }
            } else if (
                key === "+" ||
                key === "-" ||
                key === "x" ||
                key === "÷"
            ) {
                operation.push(key);
                solution = key;
                const operator = operation[operation.length - 2];
                if (numbers2.length > 0) {
                    if (operator === "x") {
                        numbers1 = [number1 * number2];
                        numbers2 = [];
                        solution = numbers1;
                    } else if (operator === "-") {
                        numbers1 = [number1 - number2];
                        numbers2 = [];
                        solution = numbers1;
                    } else if (operator === "+") {
                        numbers1 = [number1 + number2];
                        numbers2 = [];
                        solution = numbers1;
                    } else if (operator === "÷") {
                        numbers1 = [number1 / number2];
                        numbers2 = [];
                        solution = Math.round(numbers1 * 10) / 10;
                    }
                }
            } else if (key === "=") {
                const operator = operation[operation.length - 1];
                switch (operator) {
                    case "+":
                        solution = number1 + number2;
                        break;
                    case "-":
                        solution = number1 - number2;
                        break;
                    case "x":
                        solution = number1 * number2;
                        break;
                    case "÷":
                        solution = Math.round((number1 / number2) * 10) / 10;
                        break;
                }
            } else if (key === "C") {
                numbers1 = [];
                numbers2 = [];
                operation = [];
                solution = 0;
            } else if (key === "←") {
                if (numbers2.length === 0) {
                    numbers1.pop();
                    solution = numbers1.join("");
                } else if (numbers2.length > 0) {
                    numbers2.pop();
                    solution = numbers2.join("");
                }
            }
            document.querySelector(".display-numbers").innerText = solution;
        }
        //console.log(numbers1, numbers2, operation)
        //console.log(number1, number2)
    });
