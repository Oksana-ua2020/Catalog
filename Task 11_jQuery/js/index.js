const logElement = document.getElementById('logsArea');
let counter = 0;

let equation = [];

function addLogIntoBlock() {
	const divElement = document.createElement('div');
	divElement.className = `log ${counter}`;
	divElement.innerHTML = `
    <div>
    <input class="marker" type="button" value="">
  </div>
  <div class="equation">
    <p>${equation.join('')}</p> 
  </div>
  <div>
    <input class="close" type="button" value=&#215 onclick="deleteLog(${counter})">
  </div>
`;
	logElement.prepend(divElement)
}

function deleteLog(elementIndex) {
	const element = document.getElementsByClassName(elementIndex)[0];
	element.remove();
}

function clearInput() {
	equation = [];	
	setInput();
}

function setInput(value) {
	$('.inputDisplay').val(value || '0');
}

function insertCharacter(char) {
	const isCurrentCharNumber = !!Number(char) || char === '0';
	if (!isCurrentCharNumber && !equation.length) {
		return	
	}
	const prevIndex = -1;
	const lastChar = equation.slice(prevIndex)[0];
	const isPreviousCharNumber = !!Number(lastChar) || lastChar === '0'; 
	if (!isCurrentCharNumber && !isPreviousCharNumber) {
		equation.pop();
	}

	equation.push(char);
	setInput(equation.join(''));
}

function calculate() {
	const fixNumber = 2;
	let symbol = equation.find((item) => {
		return !Number(item);
	})
	let symbolIndex = equation.indexOf(symbol);
	const firstCalculateElement = Number(equation.slice(0,symbolIndex).join(''));
	const lastCalculateElement = Number(equation.slice(symbolIndex+1).join(''));
	let calcResult = 0;
	switch (symbol) {
		case '/':
			calcResult = firstCalculateElement/lastCalculateElement;
			break;
		case '*':
			calcResult = firstCalculateElement*lastCalculateElement;
			break;
		case '+':
			calcResult = firstCalculateElement+lastCalculateElement;
			break;
		case '-':
			calcResult = firstCalculateElement-lastCalculateElement;
			break;
		default:
			break;
	}
	return calcResult.toFixed(fixNumber);
}

function result() {
	counter++;
	let isError = false;
	equation.forEach((char, index, array) => {
		if (char === '0' && array[index-1] === '/') {
			isError = true;
		}
	})
	const result = isError ? 'ERROR'.split() : calculate();
	setInput(result);
	equation.push('=', result);
	!isError && addLogIntoBlock(); 
	equation = [];	
}