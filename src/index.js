const inputElement = document.querySelector('#inputElement')
const buttons = document.querySelectorAll('button')
const calculatorArr = []

let currentInputValue = ''
const checkInput = () => {
  if (inputElement.value.length > 8) {
    console.log('Exceeded Limit')
    inputElement.value = inputElement.value.slice(0, 8)
  }
   else console.log('Okay')
}




inputElement.addEventListener('input', checkInput)
inputElement.addEventListener('keydown', (event) => {
  if (isNaN(event.key) &&  event.key !== 'Backspace' && event.key !== 'Delete' && event.key !== 'ArrowLeft' && event.key !== 'ArrowRight' && event.key !== 'Tab' && event.key !== '.') {event.preventDefault(); console.log(event.key)}
})


buttons.forEach((button) => {
  button.addEventListener('click', () => {
    if (!button.classList.contains('operator') && inputElement.value.length < 8) inputElement.value += button.textContent
    else if (button.classList.contains('operator')) {
      calculatorArr.push(inputElement.value)
      calculatorArr.push(button.textContent)
      console.log('This is an operator', calculatorArr)
      calculate()
    }
  })
})


 

const calculate = () => {
  let total = 0
  let operator = null

  calculatorArr.forEach((token, i) => {

    if (isNaN(Number(token))) operator = token
    else if (!isNaN(Number(token))){
      if (i < 1) total = Number(token)
      else {
       if (operator === '+') total += Number(token)
       else if (operator === '-') total -= Number(token)
       else if (operator === '*') total = total * Number(token)
       else if (operator ==='/') total = total / Number(token) 
      }
    }
    console.log(total)
  })
}


