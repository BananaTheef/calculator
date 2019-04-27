// Variable Declaration
let operator;
let operatorSigns = ['\53', '\u2212', '\327', '\367', '\75'];
/*let plusSign = '\53', minusSign = '\u2212', timesSign = '\327', divideSign = '\367'
    equalSign = '\75', clearSign = 'AC';*/
let clear = '';
let clearSign = 'AC';
let divideSign = '\367';
let equalSign = '\75';
let reset = 0;
let flag = 0;
let flagPeriod = 0;
let intermediateResult = 0;
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

// Mathematical Operations
function getSum(numberOne, numberTwo)
{
  return Math.round((numberOne + numberTwo) * 100) / 100;
}

function getDifference(numberOne, numberTwo)
{
  return Math.round((numberOne - numberTwo) * 100) / 100;
}

function getQuotient(numberOne, numberTwo)
{
  return Math.round((numberOne / numberTwo) * 100) / 100;
}

function getProduct(numberOne, numberTwo)
{
  return Math.round((numberOne * numberTwo) * 100) / 100;
}

// Determine the Mathematical Operation
function operate(operator, numberOne, numberTwo)
{
  switch (operator)
  {
    case '\53':
      return getSum(numberOne, numberTwo);
      break;

    case '\u2212':
      return getDifference(numberOne, numberTwo);
      break;

    case '\367':
      return getQuotient(numberOne, numberTwo);
      break;

    case '\327':
      return getProduct(numberOne, numberTwo);
      break;
  }
}

function resetCalculator()
{
  flag = 0;
  reset = 0;
  numberOne = 0;
  numberTwo = 0;
  intermediateResult = 0;
  display.textContent = clear;
  periodBtn.addEventListener('click', readUserInput);
}

// Read the Input from Calculator
function readUserInput()
{
  userInput = this.textContent;

  if (userInput === '\56' && flagPeriod === 0)
  {
    display.textContent += userInput;
    periodBtn.removeEventListener('click', readUserInput);
    flagPeriod = 1;
  }

  else if (/*reset === 1 ||*/ userInput === clearSign)
  {
    resetCalculator();
  }
  /*else if (userInput === divideSign || userInput === timesSign || userInput === plusSign
          || userInput === minusSign)
  {
    if (flag === 0)
    {
      operator = userInput;
      numberOne = Number(display.textContent);
      display.textContent = clear;
      flag = 1;
    }
    else if (flag === 1)
    {
      numberTwo = Number(display.textContent);
      intermediateResult = operate(operator, numberOne, numberTwo);
      operator = userInput;
      numberOne = intermediateResult;
      display.textContent = clear;
    }
  }
  else if (userInput === equalSign)
  {
    numberTwo = Number(display.textContent);
    display.textContent = operate(operator, numberOne, numberTwo);
    reset = 1;
    flag = 0;
  }*/
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
        //reset = 1;
        flag = 0;
      }
    }
    else if (flag === 0)
    {
      operator = userInput;
      numberOne = Number(display.textContent);
      display.textContent = clear;
      flag = 1;
    }
    else if (flag === 1)
    {
      numberTwo = Number(display.textContent);
      intermediateResult = operate(operator, numberOne, numberTwo);
      operator = userInput;
      numberOne = intermediateResult;
      display.textContent = clear;
    }
    periodBtn.addEventListener('click', readUserInput);
    flagPeriod = 0;
  }
  else
  {
    display.textContent += userInput;
  }
}

// Keyboard Support
window.addEventListener('keydown', keyboardInput);

function keyboardInput()
{
  userInput = event.key;

  if (userInput === '\56' && flagPeriod === 0)
  {
    display.textContent += userInput;
    periodBtn.removeEventListener('click', readUserInput);
    flagPeriod = 1;
  }

  else if (/*reset === 1 ||*/ userInput === clearSign)
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
        //reset = 1;
        flag = 0;
      }
    }
    else if (flag === 0)
    {
      operator = userInput;
      numberOne = Number(display.textContent);
      display.textContent = clear;
      flag = 1;
    }
    else if (flag === 1)
    {
      numberTwo = Number(display.textContent);
      intermediateResult = operate(operator, numberOne, numberTwo);
      operator = userInput;
      numberOne = intermediateResult;
      display.textContent = clear;
    }
    periodBtn.addEventListener('click', readUserInput);
    flagPeriod = 0;
  }
  else
  {
    display.textContent += userInput;
  }
}
