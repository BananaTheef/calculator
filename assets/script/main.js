// Determine the Mathematical Operation
function operate(operator, numberOne, numberTwo)
{
  switch (operator)
  {
    case '\53':
      return Math.round((numberOne + numberTwo) * 100) / 100;

    case '\u2212':
      return Math.round((numberOne - numberTwo) * 100) / 100;

    case '\367':
      return Math.round((numberOne / numberTwo) * 100) / 100;

    case '\327':
      return Math.round((numberOne * numberTwo) * 100) / 100;
  }
}

// Reset
function resetCalculator()
{
  firstOperand = true;
  numberOne = 0;
  numberTwo = 0;
  display.textContent = clear;
  periodBtn.addEventListener('click', readUserInput);
}

// Read the Input from Calculator
function readUserInput()
{
  userInput = this.textContent;

  // Disabling the Period Button
  if (userInput === periodSign)
  {
    display.textContent += userInput;
    periodBtn.removeEventListener('click', readUserInput);
  }
  else if (userInput === clearSign)
  {
    resetCalculator();
  }
  else if(operatorSigns.includes(userInput))
  {
    if (userInput === equalSign)
    {
      if (operator === '\367' && display.textContent === '0')
      {
        return alert('It\'s all fun and games until someone divides by zero.')
      }
      else
      {
        numberTwo = Number(display.textContent);
        numberOne = operate(operator, numberOne, numberTwo);
        display.textContent = numberOne;
        firstOperand = true;
      }
    }
    else if (firstOperand)
    {
      operator = userInput;
      numberOne = Number(display.textContent);
      display.textContent = clear;
      firstOperand = false;
    }
    else if (!firstOperand)
    {
      numberTwo = Number(display.textContent);
      numberOne = operate(operator, numberOne, numberTwo);
      operator = userInput;
      display.textContent = clear;
    }
    // Enabling Period Button
    periodBtn.addEventListener('click', readUserInput);
  }
  else
  {
    display.textContent += userInput;
  }
}

// Variable Declaration
let operator;
let operatorSigns = ['\53', '\u2212', '\327', '\367', '\75'];
let clear = '';
let clearSign = 'AC';
let divideSign = '\367';
let equalSign = '\75';
let periodSign = '\56';
let firstOperand = true;
let numberOne = 0, numberTwo = 0;

// Selecting HTML-Elements
const buttons = Array.from(document.querySelectorAll('.btn'));
buttons.forEach(btn => btn.addEventListener('click', readUserInput));

const display = document.querySelector('.display');
const periodBtn = document.querySelector('.period');
const undoBtn = document.querySelector('.undo');
undoBtn.addEventListener('click', () => {
  n = display.textContent.length;
  display.textContent = display.textContent.slice(0, n-1);
});
