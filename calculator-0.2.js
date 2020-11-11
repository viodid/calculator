let buffer = "0";
let runningTotal = 0;
let previousOperator = null;
const screen = document.querySelector('.display-numbers');

document.querySelector('.calculator').addEventListener('click', function(event) {
	buttonClick(event.target.innerText);
	rerender();
});

function buttonClick(value) {
	if (isNaN(value)) {
		handleSymbol(value);
	}else {
		handleNumber(value);
	}
}

function handleNumber(value) {
	if (buffer === "0") {
		buffer = value;
	} else {
		buffer += value;
	}
}

function handleSymbol(value){
	switch (value) {
		case "C":
			buffer = "0";
			runningTotal = 0;
			previousOperator = null;
			break;
		case "←":
			if (buffer.length === 1){
				buffer = "0";
				break;
			}
			buffer = buffer.substr(0, buffer.length -1);
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
			runningTotal = Math.round((runningTotal / intBuffer) * 10) / 10;;
			break;
	}
}

function rerender() {
	screen.innerText = buffer;
}

