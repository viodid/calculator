let buffer = "0";
let runningTotal = 0;
let previousOperator = null;
let compoundInterest = false;
let totalMount;
let interestRate;
let time;
let interval;
const screen = document.querySelector(".display-numbers");

document
    .querySelector(".calculator")
    .addEventListener("click", function (event) {
        buttonClick(event.target.innerText, event.target.tagName);
        rerender();
    });

function buttonClick(value, tag) {
    if (tag == "BUTTON")
        if (!compoundInterest) {
            if (isNaN(value)) {
                handleSymbol(value);
            } else {
                handleNumber(value);
            }
        } else if (value === "C") {
            compoundInterest = false;
            totalMount = "";
            interestRate = "";
            time = "";
            interval = "";
            buffer = "0";
        } else {
            makeCompound(value);
            //console.log(buffer, totalMount, interestRate, time, interval);
        }
}

function handleNumber(value) {
    if (
        buffer === "0" ||
        buffer == "Amount:" ||
        buffer == "Inter.(%):" ||
        buffer == "Time(month):"
    ) {
        buffer = value;
    } else {
        buffer += value;
    }
}

function handleSymbol(value) {
    switch (value) {
        case "C":
            buffer = "0";
            runningTotal = 0;
            previousOperator = null;
            break;
        case "←":
            if (buffer.length === 1) {
                buffer = "0";
                break;
            }
            buffer = buffer.substr(0, buffer.length - 1);
            break;
        case "=":
            if (previousOperator === null) {
                break;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = "" + runningTotal;
            runningTotal = 0;
            break;

        case "C.I":
            buffer = "Amount:";
            previousOperator = null;
            runningTotal = 0;
            compoundInterest = true;
            break;

        default:
            handleMath(value);
            buffer = "0";
            break;
    }
}

function handleMath(value) {
    intBuffer = parseInt(buffer);
    if (runningTotal === 0) {
        runningTotal = parseInt(buffer);
    } else {
        flushOperation(intBuffer);
    }
    previousOperator = value;
}

function flushOperation(intBuffer) {
    switch (previousOperator) {
        case "+":
            runningTotal += intBuffer;
            break;
        case "-":
            runningTotal -= intBuffer;
            break;
        case "x":
            runningTotal *= intBuffer;
            break;
        case "÷":
            runningTotal = Math.round((runningTotal / intBuffer) * 1000) / 1000;
            break;
    }
}

function rerender() {
    screen.innerText = buffer;
}

function makeCompound(value) {
    if (!isNaN(value)) {
        handleNumber(value);
    } else if (value == "C.I") {
        handleCompound();
    } else if (value == "←") {
        buffer = buffer.substr(0, buffer.length - 1);
    }
}

function handleCompound() {
    if (!totalMount) {
        totalMount = buffer;
        buffer = "Inter.(%):";
    } else if (!interestRate) {
        interestRate = buffer;
        buffer = "Time(month):";
    } else if (!time) {
        time = buffer;
        buffer = handleInterest() + "";
    }
}

function handleInterest() {
    let intTotalMount = parseInt(totalMount);
    const intInterestRate = parseInt(interestRate);
    const intTime = parseInt(time);
    let totalInterest = 0;
    const percentaje = 100 / intTime;
    for (let i = 0; i < intTime; i++) {
        totalInterest += intTotalMount * (intInterestRate / 100);
        intTotalMount -= percentaje;
    }
    return Math.round(totalInterest * 1000) / 1000;
}
